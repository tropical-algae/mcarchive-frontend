import request from '@/scripts/request'
import { showMessage } from '@/scripts/componentCtrl'
import { ARCHIVE_ITEM_API_URL, FILE_OSS_URL_API_URL, UPDATE_OSS_API_URL } from '@/scripts/constants'
import type { ArchiveColumn, ArchiveRow, ArchiveItemsResp, FileOSSUrlResp, UpdateOSSResp } from '@/scripts/constants'

const downloadCoolDown = 8000
const updateCoolDown = 15000
const downloadCoolDownMap = new Map<string, number>()

export async function getArchiveItems(): Promise<{ columns: ArchiveColumn[]; rows: ArchiveRow[] }>{
  const response = await request<ArchiveItemsResp>({url: ARCHIVE_ITEM_API_URL, method: 'GET'})
  return {
    columns: response.data.columns,
    rows: response.data.rows,
  }
}


export async function downloadOSSAsset(filename: string) {
  if (!filename || filename == '-') return

  const now = Date.now()
  const lastDownload = downloadCoolDownMap.get(filename)
  if (lastDownload && now - lastDownload < downloadCoolDown) {
    // const remaining = Math.ceil((cooldown - (now - lastDownload)) / 1000)
    showMessage('请求过快！')
    return
  }
  downloadCoolDownMap.set(filename, now)

  const data = {'filename': filename}
  const response = await request<FileOSSUrlResp>({url: FILE_OSS_URL_API_URL, method: 'POST', data: data})

  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = response.data.url
  document.body.appendChild(iframe)
  iframe.onload = () => {
    setTimeout(() => iframe.remove(), 5000)
  }
  showMessage(`开始下载：${filename}`)
}

export async function updateDownloadUrl(archive_id: string) {
  const now = Date.now()
  const lastDownload = downloadCoolDownMap.get(archive_id)
  if (lastDownload && now - lastDownload < updateCoolDown) {
    showMessage('请求过快！')
    return
  }
  downloadCoolDownMap.set(archive_id, now)

  const data = {'archive_id': archive_id}
  const response = await request<UpdateOSSResp>({url: UPDATE_OSS_API_URL, method: "POST", data: data})
  showMessage(`${response.data.message}`)
}
