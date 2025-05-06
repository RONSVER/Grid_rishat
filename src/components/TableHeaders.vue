<script setup lang="ts">
defineProps<{
  tables: { num: string; people: string; floor: string }[];
}>();
</script>

<template>
  <div
    v-for="(table, index) in tables"
    :key="'header-' + index"
    class="w-[80px] h-[60px] border border-gray-300 flex flex-col justify-center items-center text-sm text-center sticky top-0 z-10 bg-white"
  >
    <span>#{{ table.num }}</span>
    <span>{{ table.people }}</span>
    <span>{{ table.floor }}</span>
  </div>
</template>
