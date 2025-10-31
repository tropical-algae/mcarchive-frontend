<script setup lang="ts">
import { ref, computed } from 'vue'


const props = withDefaults(defineProps<{
  isDark?: boolean
  subTitleText?: string
  titleText?: string
  descText?: string
  btnText?: string
  status?: string
  actionHandler?: () => void
}>(), {
  isDark: true,
  nameText: '',
  themeText: '',
  descText: '',
  btnText: '',
  status: ''
})

const articleClass = computed(() => ([
  'card', { 'card-dark': props.isDark }
]))

function handleClick() {
  if (props.actionHandler) {
    props.actionHandler()
  }
}

</script>


<template>
  <article :class="articleClass">
    <div class="card-subtitle">
      {{ subTitleText }}
      <span>{{ props.status }}</span>
    </div>
    <div class="card-title">{{ titleText }}</div>
    <div class="card-desc">{{ descText }}</div>
    <button class="card-btn" @click="handleClick">
      {{ btnText }}
    </button>
  </article>
</template>
