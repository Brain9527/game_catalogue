<template>
  <transition-group name="list" tag="div" class="grid">
    <div v-for="(row, i) in items" :key="row.g_id || row.id || i" class="card">
      <img
        class="thumb"
        :src="imageUrl(row) || placeholder"
        :alt="titleOf(row)"
        referrerpolicy="no-referrer"
        loading="lazy"
        @error="onImgError"
      />
      <div class="card-body">
        <div class="title">{{ titleOf(row) }}</div>
        <div class="meta">
          <span v-if="row.g_sell_date">发售：{{ row.g_sell_date }}</span>
          <span v-if="seqNumber(i) !== null">#{{ seqNumber(i) }}</span>
        </div>
        <div class="meta" v-if="tagsOf(row).length">
          <span v-for="t in tagsOf(row)" :key="t" class="tag">{{ t }}</span>
        </div>
        <div class="links">
          <a v-for="link in linksOf(row)" :key="link.label" class="link" :href="link.url" target="_blank" rel="noopener">{{ link.label }}</a>
        </div>
      </div>
    </div>
    <div v-if="!items || items.length === 0" key="empty" class="muted" style="padding: 24px;">暂无数据</div>
  </transition-group>
</template>

<script setup>
import { splitCSV, normalizeUrl } from '@/utils/helpers'

const props = defineProps({
  items: { type: Array, default: () => [] },
  pageIndex: { type: Number, default: 1 },
  pageSize: { type: Number, default: 0 }
})

const placeholder = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300"><rect width="100%" height="100%" fill="#f3f5f7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#999" font-family="Arial" font-size="20">No Image</text></svg>`
)

function titleOf(row){
  return row.g_title || row.name || row.g_name || row.g_ch_name || row.title || '未命名'
}
function thumbOf(row){
  return normalizeUrl(row.g_picture || row.g_cover || row.cover || row.image || row.poster || '')
}
function imageUrl(row){
  const u = thumbOf(row)
  if (!u) return ''
  const s = String(u)
  if (s.startsWith('//')) return 'https:' + s
  if (s.startsWith('http://')) {
    const without = s.replace(/^http:\/\//, '')
    return 'https://images.weserv.nl/?url=' + encodeURIComponent(without)
  }
  return s
}
function onImgError(e){
  e.target.src = placeholder
}
function tagsOf(row){
  const a = splitCSV(row.g_type)
  const b = splitCSV(row.g_types)
  const set = new Set([...a, ...b])
  return Array.from(set)
}
function linksOf(row){
  const pairs = [
    ['PC 百度', normalizeUrl(row.pc_baidu)],
    ['PC 夸克', normalizeUrl(row.pc_quark)],
    ['NS 百度', normalizeUrl(row.ns_baidu)],
    ['NS 夸克', normalizeUrl(row.ns_quark)]
  ]
  return pairs.filter(([,url]) => url).map(([label,url]) => ({ label, url }))
}
function seqNumber(i){
  if (!props.pageIndex || !props.pageSize) return null
  return (props.pageIndex - 1) * props.pageSize + (i + 1)
}
</script>
