<script setup lang="ts">
defineProps<{
  row: number;
  col: number;
}>();
</script>

<template>
  <div
    class="border border-gray-200 w-[80px] h-[40px] hover:bg-gray-100 transition cursor-pointer"
    @click="$emit('click')"
  ></div>
</template>
