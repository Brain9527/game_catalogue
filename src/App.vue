<template>
  <div class="container">
    <div class="panel">
      <div class="header-row">
        <h1>🎮 SteamLease 游戏下载查询</h1>
        <button class="theme-toggle" @click="toggleTheme" :title="isDark ? '切换到浅色模式' : '切换到暗黑模式'">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>

      <SearchBar :query="query" :loading="loading" @submit="onSearch" />

      <FilterBar
        :types="typeOptions"
        :tags="tagOptions"
        v-model:types-selected="filters.typesSelected"
        v-model:date-start="filters.dateStart"
        v-model:date-end="filters.dateEnd"
        v-model:platforms="filters.platforms"
        v-model:tags-selected="filters.tagsSelected"
        v-model:sort-order="filters.sortOrder"
        @reset="resetFilters"
      />

      <transition name="fade">
        <div v-if="error" class="error" style="margin-top: 16px;">{{ error }}</div>
      </transition>

      <div class="footer" v-if="!loading">
        <div class="muted">
          共 <b>{{ total }}</b> 条；当前第 <b>{{ pageNum }}</b> / <b>{{ pages }}</b> 页（每页 {{ query.pageSize === 'all' ? '全部' : query.pageSize }} 条）
          <span v-if="activeFilterCount"> · 已应用 {{ activeFilterCount }} 项筛选</span>
        </div>
        <div class="row" style="gap: 10px;">
          <button class="btn ghost" @click="downloadCurrentPageJSON" :disabled="visibleList.length === 0">
            导出当前页 JSON
          </button>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <div v-if="loading" key="loading">
          <div class="grid">
            <div class="skeleton" v-for="i in 8" :key="i"><div class="shimmer"></div></div>
          </div>
        </div>
        <GameGrid v-else key="grid" :items="visibleList" :page-index="pageNum" :page-size="realPageSize" />
      </transition>

      <Pager
        :page="pageNum"
        :pages="pages"
        :loading="loading"
        v-model:jump="jumpPageInput"
        @prev="prevPage"
        @next="nextPage"
        @go="jumpPage"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, toRefs, ref, onMounted, watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import FilterBar from '@/components/FilterBar.vue'
import GameGrid from '@/components/GameGrid.vue'
import Pager from '@/components/Pager.vue'
import { fetchGameDownloadList } from '@/utils/api'
import { splitCSV, inDateRange, normalizeUrl, ymdToNum, downloadJSON } from '@/utils/helpers'

const isDark = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
})

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme()
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function applyTheme() {
  if (isDark.value) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

const query = reactive({ pageSize: 100, pageNum: 1, name: '' })

const state = reactive({
  list: [], total: 0, pages: 0, pageNum: 1,
  loading: false, error: '', jumpPageInput: 1
})
const { loading, error, jumpPageInput } = toRefs(state)

const filters = reactive({
  typesSelected: [],
  dateStart: '',
  dateEnd: '',
  platforms: { pc_baidu:false, pc_quark:false, ns_baidu:false, ns_quark:false },
  tagsSelected: [],
  sortOrder: 'none'
})

const total  = computed(() => state.total)
const pages  = computed(() => state.pages)
const pageNum = computed(() => state.pageNum)

const realPageSize = computed(() => query.pageSize === 'all' ? (state.list?.length || 0) : query.pageSize)

const typeOptions = computed(() => {
  const set = new Set(); state.list.forEach(r => splitCSV(r.g_types).forEach(t => set.add(t)))
  return Array.from(set)
})
const tagOptions = computed(() => {
  const set = new Set(); state.list.forEach(r => splitCSV(r.g_type).forEach(t => set.add(t)))
  return Array.from(set)
})

const filteredList = computed(() => {
  const typeSel = new Set(filters.typesSelected)
  const tagSel  = new Set(filters.tagsSelected)
  const needPlatforms = Object.entries(filters.platforms).filter(([k,v]) => v).map(([k]) => k)

  return state.list.filter(row => {
    if (typeSel.size) {
      const rowTypes = splitCSV(row.g_types)
      if (!rowTypes.some(t => typeSel.has(t))) return false
    }
    if (tagSel.size) {
      const rowTags = splitCSV(row.g_type)
      if (!rowTags.some(t => tagSel.has(t))) return false
    }
    if (filters.dateStart || filters.dateEnd) {
      if (!inDateRange(row.g_sell_date, filters.dateStart, filters.dateEnd)) return false
    }
    for (const key of needPlatforms) {
      if (!normalizeUrl(row[key])) return false
    }
    return true
  })
})

const visibleList = computed(() => {
  const arr = filteredList.value.slice()
  if (filters.sortOrder === 'none') return arr
  return arr.sort((a, b) => {
    const an = ymdToNum(a.g_sell_date), bn = ymdToNum(b.g_sell_date)
    const aHas = Number.isFinite(an), bHas = Number.isFinite(bn)
    if (!aHas && !bHas) return 0
    if (!aHas) return 1
    if (!bHas) return -1
    return filters.sortOrder === 'desc' ? bn - an : an - bn
  })
})

const activeFilterCount = computed(() => {
  let n = 0
  if (filters.typesSelected.length) n++
  if (filters.tagsSelected.length) n++
  if (filters.dateStart || filters.dateEnd) n++
  if (Object.values(filters.platforms).some(Boolean)) n++
  if (filters.sortOrder !== 'none') n++
  return n
})

async function fetchList(reset = false) {
  if (reset) query.pageNum = 1
  state.loading = true; state.error = ''; state.list = []
  try {
    const { list, total, pages, pageNum } = await fetchGameDownloadList(query)
    state.list = list
    state.total = total
    state.pages = pages
    state.pageNum = pageNum
    state.jumpPageInput = pageNum
  } catch (e) {
    state.error = '请求失败：' + (e?.message || String(e))
    state.list = []; state.total = 0; state.pages = 0
  } finally {
    state.loading = false
  }
}

function onSearch(reset = true){ fetchList(reset) }
function prevPage(){ if (state.pageNum <= 1) return; query.pageNum = state.pageNum - 1; fetchList(false) }
function nextPage(){ if (state.pageNum >= state.pages) return; query.pageNum = state.pageNum + 1; fetchList(false) }
function jumpPage(){
  const p = Number(state.jumpPageInput)
  if (!p || p < 1) return; if (state.pages && p > state.pages) return
  query.pageNum = p; fetchList(false)
}
function downloadCurrentPageJSON(){
  if (!visibleList.value.length) return
  const filename = `steamlease_page${state.pageNum}_size${query.pageSize === 'all' ? 'all' : query.pageSize}${query.name ? "_name_"+query.name : ""}_filtered_sorted_${filters.sortOrder}.json`
  downloadJSON(visibleList.value, filename)
}
function resetFilters(){
  filters.typesSelected = []
  filters.tagsSelected = []
  filters.dateStart = ''; filters.dateEnd = ''
  filters.platforms = { pc_baidu:false, pc_quark:false, ns_baidu:false, ns_quark:false }
  filters.sortOrder = 'none'
}

fetchList(true)
</script>

<style scoped>
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.header-row h1 {
  margin: 0;
}
</style>
