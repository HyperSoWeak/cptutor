<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  id: string
  href: string
  title: string
  difficulty: 'basic' | 'standard' | 'challenge'
  topic?: string
}>()

const done = ref(false)

const key = () => `problem-done:${props.id}`

onMounted(() => {
  done.value = localStorage.getItem(key()) === '1'
})

function toggle() {
  done.value = !done.value
  if (done.value) localStorage.setItem(key(), '1')
  else localStorage.removeItem(key())
}
</script>

<template>
  <li class="problem-item" :class="{ done }">
    <button class="problem-check" :aria-label="done ? '標記為未完成' : '標記為已完成'" @click="toggle">
      <svg v-if="done" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect width="16" height="16" rx="4" fill="currentColor" class="check-bg" />
        <path d="M4 8l3 3 5-5" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg v-else viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect width="16" height="16" rx="4" fill="currentColor" class="check-empty-bg" />
        <rect x="0.75" y="0.75" width="14.5" height="14.5" rx="3.25" stroke="currentColor" stroke-width="1.5" class="check-border" />
      </svg>
    </button>
    <a :href="href" target="_blank" rel="noopener" class="problem-link">{{ title }}</a>
    <span :class="['difficulty', difficulty]">{{ difficulty }}</span>
    <span
      v-if="topic"
      class="spoiler"
      tabindex="0"
      :data-topic="topic"
      :aria-label="`Topic: ${topic}`"
    ></span>
  </li>
</template>
