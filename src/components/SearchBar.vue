<template>
  <div class="row" style="margin-bottom: 10px">
    <!-- 搜索词（回车触发） -->
    <input
      class="input"
      v-model.trim="model.name"
      type="text"
      placeholder="按名称搜索（name 参数，可留空）"
      @keyup.enter="emitSubmit(true)"
    />

    <!-- 每页条数（含“全部”） -->
    <div class="row">
      <span class="muted">每页</span>
      <select
        class="select"
        v-model="model.pageSize"
        @change="emitSubmit(true)"
      >
        <option :value="100">100</option>
        <option :value="200">200</option>
        <option :value="500">500</option>
        <option :value="1000">1000</option>
        <option :value="2000">2000</option>
        <option :value="3000">3000</option>
      </select>
      <span class="muted">条</span>
    </div>

    <!-- 查询按钮 -->
    <button class="btn" @click="emitSubmit(true)" :disabled="loading">
      <svg
        v-if="loading"
        width="16"
        height="16"
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
// 说明：使用 v-model:query 传入一个响应式对象（pageSize 支持 'all'）
import { toRefs, reactive, watch } from "vue";

const props = defineProps({
  query: { type: Object, required: true }, // { pageSize, pageNum, name }
  loading: { type: Boolean, default: false },
});
const emit = defineEmits(["submit"]);

// 本地镜像，避免直接修改父的数据指针（可选）
const model = reactive({
  name: props.query.name || "",
  pageSize: props.query.pageSize ?? 100,
});

// 同步父 -> 子
watch(
  () => props.query,
  (q) => {
    model.name = q.name || "";
    model.pageSize = q.pageSize ?? 100;
  },
  { deep: true }
);

// 同步子 -> 父：提交时回写
function emitSubmit(reset = true) {
  props.query.name = model.name;
  props.query.pageSize = model.pageSize;
  emit("submit", reset);
}
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
