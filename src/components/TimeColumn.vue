<script setup lang="ts">
defineProps<{ hours: string[] }>();
</script>

<template>
  <div class="flex flex-col sticky left-0 z-20 bg-white">
    <div class="w-20 h-[60px] border border-gray-300"></div>
    <div
      v-for="(hour, index) in hours"
      :key="'hour-' + index"
      class="h-10 w-20 flex items-center justify-end pr-2 text-sm text-gray-700 border-b border-r"
    >
      {{ hour }}
    </div>
  </div>
</template>
