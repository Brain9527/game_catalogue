<template>
  <div class="footer">
    <div class="pager">
      <button class="btn ghost" @click="$emit('prev')" :disabled="loading || page <= 1">
        ← 上一页
      </button>
      <button class="btn ghost" @click="$emit('next')" :disabled="loading || page >= pages">
        下一页 →
      </button>
    </div>
    <div class="pager">
      <span class="muted">跳至</span>
      <input class="input num" type="number" min="1" :max="Math.max(1,pages)" :value="jump" @input="$emit('update:jump', +$event.target.value)" />
      <span class="muted">页</span>
      <button class="btn" @click="$emit('go')" :disabled="loading || !pages">跳转</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  page: Number,
  pages: Number,
  loading: Boolean,
  jump: Number
})
defineEmits(['prev','next','go','update:jump'])
</script>
