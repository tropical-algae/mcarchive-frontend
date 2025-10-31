import type { MessageBarElement } from '@/scripts/constants'


export function showMessage(message: string, duration: number = 3000){
  const msgBar = document.getElementById('message-bar') as MessageBarElement;
  if (msgBar) {
    msgBar.textContent=message;
    msgBar.setAttribute('data-show','true');
    clearTimeout(msgBar.hideTimer);
    msgBar.hideTimer = setTimeout(()=>{
      msgBar.removeAttribute('data-show');
    }, duration);
  }
}

export function openModal(){
  const tokenIpt = document.getElementById('token-input') as HTMLInputElement | null;
  const tokenCard = document.getElementById('token-card');

  tokenCard?.setAttribute('data-open','true');
  tokenCard?.removeAttribute('aria-hidden');
  if (tokenIpt) {
    tokenIpt.value = ""
  }
  setTimeout(() => tokenIpt?.focus(), 200);
}

export function closeModal(){
  const tokenIpt = document.getElementById('token-input');
  const tokenBtn = document.getElementById('modal-btn');
  const tokenCard = document.getElementById('token-card');

  tokenIpt?.blur();
  tokenBtn?.blur();
  requestAnimationFrame(() => {
    tokenCard?.removeAttribute('data-open');
    tokenCard?.setAttribute('aria-hidden','true');
  });
}
