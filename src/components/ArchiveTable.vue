<script setup lang="ts">
import { useAuthStore } from '@/scripts/stores/userAuth' 
import { ref, onMounted, onBeforeUnmount, computed } from 'vue' 
import { getArchiveItems, downloadOSSAsset, updateDownloadUrl } from '@/scripts/archiveItem' 
import type { ArchiveColumn, ArchiveRow} from '@/scripts/constants'

import YesIcon from '@/components/icons/IconYes.vue'
import NoIcon from '@/components/icons/IconNo.vue'


const rows = ref<ArchiveRow[]>([])
const columns = ref<ArchiveColumn[]>([])
const authStore = useAuthStore();
const isNarrow = ref(window.innerWidth < 768)
const showActionCol = computed(() => authStore.isAdmin && !isNarrow.value)
const visibleColumns = computed(() =>
  isNarrow.value
  ? columns.value.filter((c) => c.is_necessary)
  : columns.value
)

async function updateArchiveItem() {
  const { columns: cols, rows: rws } = await getArchiveItems()
  columns.value = cols
  rows.value = rws
}

function handleResize() {
  isNarrow.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
updateArchiveItem()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="table-shell table-responsive-lg">
    <table class="table" id="svc-table">
      <thead>
        <tr>
          <th v-for="col in visibleColumns" :key="col.key">{{ col.title }}</th>
          <th v-if="showActionCol">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="col in visibleColumns" :key="col.key">
            <span v-if="col.value_type === 'text'">{{ row[col.key] || '' }}</span>
            <span v-else-if="col.value_type === 'num'" class="chip">{{ row[col.key] || 'null' }}</span>
            <a
              v-else-if="col.value_type === 'download' && row[col.key]"
              href="#"
              :title="row[col.key]"
              @click.prevent="downloadOSSAsset(row[col.key])"
            >
            Download
            </a>
            <span v-else-if="col.value_type === 'download' && row[col.key] === ''">-</span>
            <span v-else-if="col.value_type === 'bool'">
              <YesIcon v-if="row[col.key] === true" />
              <NoIcon v-else />
            </span>
            <span v-else>{{ row[col.key] || '' }}</span>
          </td>

          <td v-if="showActionCol">
            <button type="button" @click="updateDownloadUrl(row.id)">Update</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="note" aria-label="footnote">
      <span class="dot" aria-hidden="true"></span>
      <span>Powered by TropicalAlgae</span>
    </div>
  </div>
</template>