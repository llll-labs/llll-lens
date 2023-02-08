<script lang="ts" setup>
import type { PropType } from 'vue'

interface Tab {
  id: string
  name: string
  disabled?: boolean
  to?: string
}

const emit = defineEmits(['update:modelValue'])
defineProps({
  modelValue: {
    type: String
  },
  tabs: {
    type: Array as PropType<Tab[]>
  }
})
// TODO maybe use component lib for this comp
</script>

<template>
  <div class="flex flex-row w-full gap-x-2">
    <div
      v-for="t in tabs" :key="t.id"
      class="cursor-pointer"
      :class="{
        '!cursor-not-allowed': t.disabled,
      }"
      @click="t.disabled ? null : emit('update:modelValue', t.id)"
    >
      <span
        :class="{
          'text-gray-500': t.id !== modelValue,
          '!text-gray-300': t.disabled
        }"
      >
        {{ t.name }}
      </span>
    </div>
  </div>
</template>
