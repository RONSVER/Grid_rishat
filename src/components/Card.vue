<script setup lang="ts">
import { cn } from "../assets/cn";
import { getStatusColor, translateStatus } from "../assets/functions";

const { nameOrOrderName, peopleCount, phoneNumber, status, time, userNumber } =
  defineProps<{
    userNumber?: number | null;
    nameOrOrderName?: string;
    peopleCount?: string | number;
    status: string;
    phoneNumber?: string;
    time?: string;
  }>();
</script>

<template>
  <section>
    <div
      :class="
        cn(
          'p-2 rounded w-40 text-xs leading-tight transition-all duration-300 ease-in-out transform hover:scale-125 hover:shadow-2xl hover:z-20 hover:brightness-110 hover:translate-y-[-10px] text-white bg-black/50 backdrop-blur-md drop-shadow-md',
          getStatusColor(status)
        )
      "
    >
      <span v-if="userNumber" class="font-extralight font-sans block">
        {{ `№${userNumber}` }}
      </span>

      <div class="flex flex-wrap gap-1">
        <p v-if="peopleCount" class="font-medium">
          {{ `${nameOrOrderName};` }}
        </p>
        <p v-else>{{ nameOrOrderName }}</p>
        <span v-if="peopleCount">{{ `${peopleCount} чел` }}</span>
      </div>

      <span class="block">{{ translateStatus(status) }}</span>

      <div>
        <p>{{ phoneNumber }}</p>
      </div>

      <span class="block">{{ time }}</span>
    </div>
  </section>
</template>
