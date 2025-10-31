import request from '@/scripts/request'
import type { AccessTokenResp } from '@/scripts/constants'
import { ACCESS_TOKEN_API_URL } from '@/scripts/constants'
import { showMessage, closeModal } from '@/scripts/componentCtrl'
import { useAuthStore } from '@/scripts/stores/userAuth'


export async function getAccessToken(value: string){
  const authStore = useAuthStore();
  authStore.cleanAuthStatus();
  authStore.refreshAuthStatus();

  const data = {"token": value}
  const response = await request<AccessTokenResp>({ url: ACCESS_TOKEN_API_URL, method: 'POST', data })

  authStore.setAuthStatus(response)
  authStore.refreshAuthStatus();
  showMessage("Token校验成功！");
  closeModal();
}