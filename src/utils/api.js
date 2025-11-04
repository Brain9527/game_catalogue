// src/utils/api.js
// 仅封装接口请求，处理 pageSize=“all”的情况

const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.steamlease.cn'

/**
 * 拉取游戏列表
 * @param {Object} params { pageSize, pageNum, name? }
 * @returns Promise<{list,total,pages,pageNum}>
 */
export async function fetchGameDownloadList(params) {
  // 如果选择“全部”，用超大 pageSize 扫一次（或你也可以做循环分页）
  const pageSize = params.pageSize === 'all' ? 4014 : params.pageSize
  const pageNum  = params.pageSize === 'all' ? 1 : params.pageNum

  const payload = { pageSize, pageNum }
  if (params.name) payload.name = params.name

  const resp = await fetch(`${API_BASE}/gameDownload/getGameDownloadListPage`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload)
  })

  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status} ${resp.statusText}`)
  }

  const json = await resp.json()
  const d = json && json.data ? json.data : null
  if (!d) throw new Error('响应结构异常：缺少 data')

  return {
    list: Array.isArray(d.list) ? d.list : [],
    total: Number(d.total || 0),
    pages: Number(d.pages || 0),
    pageNum: Number(d.pageNum || pageNum),
    pageSize: Number(d.pageSize || pageSize),
  }
}
