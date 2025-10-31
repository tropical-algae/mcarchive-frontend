import { defineStore } from 'pinia'
import { 
  ACCESS_TOKEN_SESSION_KEY, 
  ACCESS_TOKEN_TYPE_SESSION_KEY,
  ACCESS_TOKEN_AUTH_SESSION_KEY
} from '@/scripts/constants'
import type { AccessTokenResp } from '@/scripts/constants'


function hasToken() {
  return (
    sessionStorage.getItem(ACCESS_TOKEN_SESSION_KEY) !== null &&
    sessionStorage.getItem(ACCESS_TOKEN_TYPE_SESSION_KEY) !== null
  )
}

function isAdmin() {
  return sessionStorage.getItem(ACCESS_TOKEN_AUTH_SESSION_KEY) === 'true' && hasToken();
}


export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: sessionStorage.getItem(ACCESS_TOKEN_SESSION_KEY),
    tokenType: sessionStorage.getItem(ACCESS_TOKEN_TYPE_SESSION_KEY),
    isLogin: hasToken(),
    isAdmin: isAdmin(),
  }),

  actions: {
    setAuthStatus(data: AccessTokenResp) {
      this.accessToken = data.access_token
      this.tokenType = data.token_type
      this.isAdmin = data.is_admin
      sessionStorage.setItem(ACCESS_TOKEN_SESSION_KEY, data.access_token);
      sessionStorage.setItem(ACCESS_TOKEN_TYPE_SESSION_KEY, data.token_type);
      sessionStorage.setItem(ACCESS_TOKEN_AUTH_SESSION_KEY, data.is_admin ? 'true' : 'false');
    },

    cleanAuthStatus() {
      this.accessToken = null
      this.tokenType = null
      this.isAdmin = false
      sessionStorage.removeItem(ACCESS_TOKEN_SESSION_KEY)
      sessionStorage.removeItem(ACCESS_TOKEN_TYPE_SESSION_KEY)
      sessionStorage.removeItem(ACCESS_TOKEN_AUTH_SESSION_KEY)
    },

    refreshAuthStatus() {
      this.isAdmin = isAdmin();
      this.isLogin = hasToken();
    }
  },
})