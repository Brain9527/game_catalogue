<template>
  <div class="row" style="margin-bottom: 18px">
    <div class="search-bar" style="flex: 1; max-width: 500px;">
      <span class="search-icon">🔍</span>
      <input
        class="input"
        v-model.trim="model.name"
        type="text"
        placeholder="搜索游戏名称..."
        @keyup.enter="emitSubmit(true)"
        @input="onInput"
      />
      <button
        v-if="model.name"
        class="clear-btn"
        @click="clearSearch"
        title="清除搜索"
      >
        ✕
      </button>
    </div>

    <div class="row">
      <span class="muted">每页</span>
      <select
        class="select"
        v-model="model.pageSize"
        @change="emitSubmit(true)"
      >
        <option :value="50">50</option>
        <option :value="100">100</option>
        <option :value="200">200</option>
        <option :value="500">500</option>
        <option :value="1000">1000</option>
        <option :value="2000">2000</option>
        <option :value="3000">3000</option>
      </select>
      <span class="muted">条</span>
    </div>

    <button class="btn" @click="emitSubmit(true)" :disabled="loading">
      <svg
        v-if="loading"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        style="animation: spin 0.9s linear infinite"
      >
        <path fill="#fff" d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8z" />
      </svg>
      <span>{{ loading ? "查询中…" : "查询" }}</span>
    </button>
  </div>
</template>

<script setup>
import { toRefs, reactive, watch, ref } from 'vue'

const props = defineProps({
  query: { type: Object, required: true },
  loading: { type: Boolean, default: false },
})
const emit = defineEmits(['submit'])

const debounceTimer = ref(null)

const model = reactive({
  name: props.query.name || '',
  pageSize: props.query.pageSize ?? 100,
})

watch(
  () => props.query,
  (q) => {
    model.name = q.name || ''
    model.pageSize = q.pageSize ?? 100
  },
  { deep: true }
)

function onInput() {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  debounceTimer.value = setTimeout(() => {
    emitSubmit(true)
  }, 500)
}

function clearSearch() {
  model.name = ''
  emitSubmit(true)
}

function emitSubmit(reset = true) {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
    debounceTimer.value = null
  }
  props.query.name = model.name
  props.query.pageSize = model.pageSize
  emit('submit', reset)
}
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: var(--muted);
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: var(--primary-weak);
  color: var(--primary);
}
</style>
