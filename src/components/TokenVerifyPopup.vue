<script setup lang="ts">
import { onMounted } from 'vue'
import { closeModal } from '@/scripts/componentCtrl' 
import { getAccessToken } from '@/scripts/accessToken'


onMounted(() => {
  const tokenIpt = document.getElementById('token-input') as HTMLInputElement | null;
  const submitBtn = document.getElementById('modal-btn');
  const overlay = document?.getElementById('modal-overlay')

  overlay?.addEventListener('click', closeModal)
  submitBtn?.addEventListener('click', () => getAccessToken(tokenIpt?.value?.trim() || ""));
})

</script>

<template>
  <div id="token-card" class="modal" aria-hidden="true">
    <div id="modal-overlay" class="modal-bg" data-close></div>
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title" class="modal-tip">Please Enter Your Token</h2>
      <div class="modal-interact">
        <input id="token-input" type="text" class="modal-interact-input" placeholder="Token" />
        <button id="modal-btn" class="modal-interact-btn" type="button">Confirm</button>
      </div>
    </div>
  </div>
</template>
