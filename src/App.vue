<script setup lang="ts">
import { ref } from 'vue'
import { openModal } from '@/scripts/componentCtrl'
import { useAuthStore } from '@/scripts/stores/userAuth'

import ActionCard from '@/components/ActionCard.vue'
import TokenVerify from '@/components/TokenVerifyPopup.vue'
import ArchiveTable from '@/components/ArchiveTable.vue'

const authStore = useAuthStore();
const joinStatus = ref('')

function onJoinUs() {
  console.log("元神真好玩")
}

</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <main class="col-12 col-lg-10">
        <!-- 标题 -->
        <header class="text-center d-flex flex-column gap-1 my-1">
          <h1>Minecraft服务器存档点</h1>
          <p>A community-driven archive for Minecraft server data — making it easier for players to explore, share, and discover every detail of their world.</p>
        </header>

        <!-- 卡片 -->
        <section class="row g-3 m-2 align-items-stretch" aria-label="Action Cards">
          <div class="col-12 col-md-6">
            <ActionCard
              :isDark=true
              :status="authStore.isLogin ? ' - PASS' : ''"
              btnText="VERIFY TOKEN"
              subTitleText="Token Verity"
              titleText="令牌校验"
              descText="你需要先这样，然后再那样，就能拿到Token了！"
              :actionHandler="openModal"
            />
          </div>
          <div class="col-12 col-md-6">
            <ActionCard
              :isDark=false
              :status="joinStatus"
              btnText="GET IT"
              subTitleText="Join Us"
              titleText="加入我们"
              descText="想知道这样是哪样？加入我们就会知道。"
              :actionHandler="onJoinUs"
            />
          </div>
        </section>

        <!-- 表格 -->
        <section class="m-3" aria-label="Version Archive">
          <ArchiveTable />
        </section>
        
        <!-- 弹窗 -->
        <TokenVerify/>
        
        <div id="message-bar" class="message-bar" role="status" aria-live="polite"></div>
      </main>
    </div>
  </div>
</template>
