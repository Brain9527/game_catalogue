<template>
  <div>
    <transition-group name="list" tag="div" class="grid">
      <div class="card" v-for="(row, idx) in items" :key="row.id || row.game_id || idx">
        <img v-if="row.g_picture" :src="row.g_picture" alt="cover" class="thumb" />
        <div class="card-body">
          <div class="title">{{ row.g_name || '-' }}</div>
          <div class="meta">
            <span class="tag" v-if="row.g_types">{{ row.g_types }}</span>
            <span v-if="row.g_sell_date">发售：{{ row.g_sell_date }}</span>
            <span v-if="row.g_type">标签：{{ row.g_type }}</span>
            <span class="muted">#{{ (pageIndex - 1) * pageSize + idx + 1 }}</span>
          </div>
          <div class="links">
            <a v-if="row.pc_baidu" class="link" :href="norm(row.pc_baidu)" target="_blank" rel="noopener">PC 百度</a>
            <a v-if="row.pc_quark" class="link" :href="row.pc_quark" target="_blank" rel="noopener">PC 夸克</a>
            <a v-if="row.ns_baidu" class="link" :href="norm(row.ns_baidu)" target="_blank" rel="noopener">NS 百度</a>
            <a v-if="row.ns_quark" class="link" :href="row.ns_quark" target="_blank" rel="noopener">NS 夸克</a>
          </div>
        </div>
      </div>
    </transition-group>
    <transition name="fade">
      <div v-if="!items.length" class="muted" style="text-align:center; padding: 28px 0;">暂无数据</div>
    </transition>
  </div>
</template>

<script setup>
import { normalizeUrl as norm } from '@/utils/helpers'
defineProps({
  items: { type: Array, default: () => [] },
  pageIndex: Number,
  pageSize: Number
})
</script>
