// src/utils/helpers.js
// 工具函数集合（全部带注释）

/** 去掉前后空格（部分返回数据的链接可能有前导空格） */
export function normalizeUrl(u) {
  return u == null ? u : String(u).trim()
}

/** 逗号分隔字符串 => 字符串数组（去空格/空项） */
export function splitCSV(s) {
  return (s || '').split(',').map(v => v.trim()).filter(Boolean)
}

/** 判断 YYYY-MM-DD 是否在 [start, end] 之间（字符串比较即可） */
export function inDateRange(ymd, start, end) {
  if (!ymd) return false            // 无日期视为不满足
  if (start && ymd < start) return false
  if (end && ymd > end) return false
  return true
}

/** YYYY-MM-DD -> 数字，如 2025-07-26 => 20250726（失败返回 NaN） */
export function ymdToNum(ymd) {
  if (!ymd || typeof ymd !== 'string') return NaN
  const n = Number(ymd.replaceAll('-', ''))
  return Number.isFinite(n) ? n : NaN
}

/** 下载 JSON 文件（纯前端） */
export function downloadJSON(obj, filename = 'data.json') {
  const jsonStr = JSON.stringify(obj, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
