
export const ACCESS_TOKEN_SESSION_KEY = 'access_token'
export const ACCESS_TOKEN_TYPE_SESSION_KEY = 'token_type'
export const ACCESS_TOKEN_AUTH_SESSION_KEY = "is_admin"

export const ACCESS_TOKEN_API_URL = "/user/access-token"
export const ARCHIVE_ITEM_API_URL = "/archive/items"
export const FILE_OSS_URL_API_URL = "/archive/get_download_url"
export const UPDATE_OSS_API_URL = "/archive/update_oss"

export type MessageBarElement = HTMLElement & {
  hideTimer?: ReturnType<typeof setTimeout>;
};

export type AccessTokenResp = {
  access_token: string
  token_type: string
  expires_in: number
  is_admin: boolean
}

export type ArchiveColumn = {
  key: string
  title: string
  value_type: 'text' | 'num' | 'download' | 'bool'
  is_necessary: boolean
}
export type ArchiveRow = Record<string, any> & { id: string }

export type ArchiveItemsResp = {
  status: number
  message: string
  timestamp: string
  data: {
    columns: ArchiveColumn[]
    rows: ArchiveRow[]
  }
}

export type FileOSSUrlResp = {
  status: number
  message: string
  timestamp: string
  data: {
    url: string
  }
}

export type UpdateOSSResp = {
  status: number
  message: string
  timestamp: string
  data: {
    message: string
  }
}