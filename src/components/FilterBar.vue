<template>
  <div class="panel" style="margin:12px 0; border-style:dashed;">
    <div class="row" style="row-gap:14px; align-items:flex-start; flex-wrap:wrap;">

      <!-- 类型：横向标签云，可多选 -->
      <div style="min-width:300px;">
        <div class="muted" style="margin-bottom:8px;">类型</div>
        <div class="type-cloud">
          <div
            v-for="t in types"
            :key="t"
            class="pill"
            :class="{active: (typesSelected || []).includes(t)}"
            @click="toggleType(t)"
            title="点击选择/取消该类型">
            <span>{{ t }}</span><span class="pill-check" aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <!-- 平台：同样 pill 风格，含“全部” -->
      <div style="min-width:300px;">
        <div class="muted" style="margin-bottom:8px;">平台链接</div>
        <div class="type-cloud">
          <div class="pill" :class="{active: platformsAllSelected}" @click="togglePlatformAll" title="全选/全不选">
            <span>全部</span><span class="pill-check"></span>
          </div>
          <div class="pill" :class="{active: platforms?.pc_baidu}"  @click="togglePlatform('pc_baidu')"><span>PC 百度</span><span class="pill-check"></span></div>
          <div class="pill" :class="{active: platforms?.pc_quark}"  @click="togglePlatform('pc_quark')"><span>PC 夸克</span><span class="pill-check"></span></div>
          <div class="pill" :class="{active: platforms?.ns_baidu}"  @click="togglePlatform('ns_baidu')"><span>NS 百度</span><span class="pill-check"></span></div>
          <div class="pill" :class="{active: platforms?.ns_quark}"  @click="togglePlatform('ns_quark')"><span>NS 夸克</span><span class="pill-check"></span></div>
        </div>
      </div>

      <!-- 发售日范围 -->
      <!-- <div>
        <div class="muted" style="margin-bottom:8px;">发售日</div>
        <div class="row">
          <input class="input" type="date" :value="dateStart" @input="$emit('update:dateStart', $event.target.value)" />
          <span class="muted">至</span>
          <input class="input" type="date" :value="dateEnd" @input="$emit('update:dateEnd', $event.target.value)" />
        </div>
      </div> -->

      <!-- 排序（换行独占） -->
      <div class="break-line" style="margin-top:6px;">
        <div class="muted" style="margin-bottom:8px;">排序</div>
        <select class="select" :value="sortOrder" @change="$emit('update:sortOrder', $event.target.value)">
          <option value="none">不排序</option>
          <option value="desc">发售日：新 → 旧</option>
          <option value="asc">发售日：旧 → 新</option>
        </select>
      </div>

      <!-- 标签：横向标签云 -->
      <div style="min-width:300px;">
        <div class="muted" style="margin-bottom:8px;">标签</div>
        <div class="tag-cloud">
          <div
            v-for="t in tags"
            :key="t"
            class="pill"
            :class="{active: (tagsSelected || []).includes(t)}"
            @click="toggleTag(t)"
            title="点击选择/取消该标签">
            <span>{{ t }}</span><span class="pill-check"></span>
          </div>
        </div>
      </div>

      <!-- 重置 -->
      <div style="align-self:flex-end;">
        <button class="btn ghost" @click="$emit('reset')">清空筛选</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 说明：与父组件用 v-model 进行双向绑定
import { computed } from 'vue'

const props = defineProps({
  types: { type: Array, default: () => [] },
  tags:  { type: Array, default: () => [] },
  typesSelected: Array,
  dateStart: String,
  dateEnd: String,
  platforms: Object,            // { pc_baidu, pc_quark, ns_baidu, ns_quark}
  tagsSelected: Array,
  sortOrder: { type: String, default: 'none' } // 'none' | 'desc' | 'asc'
})
const emit = defineEmits([
  'update:typesSelected','update:dateStart','update:dateEnd',
  'update:platforms','update:tagsSelected','update:sortOrder','reset'
])

// 计算：平台是否已“全选”
const platformsAllSelected = computed(() => {
  const p = props.platforms || {}
  return ['pc_baidu','pc_quark','ns_baidu','ns_quark'].every(k => p[k])
})

// 切换类型
function toggleType(t) {
  const set = new Set(props.typesSelected || [])
  set.has(t) ? set.delete(t) : set.add(t)
  emit('update:typesSelected', Array.from(set))
}
// 切换平台
function togglePlatform(key) {
  const next = { ...(props.platforms || {}) }
  next[key] = !next[key]
  emit('update:platforms', next)
}
// 平台全选/全不选
function togglePlatformAll() {
  const keys = ['pc_baidu','pc_quark','ns_baidu','ns_quark']
  const allSelected = keys.every(k => props.platforms?.[k])
  const next = {}; keys.forEach(k => next[k] = !allSelected)
  emit('update:platforms', next)
}
// 切换标签
function toggleTag(t) {
  const set = new Set(props.tagsSelected || [])
  set.has(t) ? set.delete(t) : set.add(t)
  emit('update:tagsSelected', Array.from(set))
}
</script>
