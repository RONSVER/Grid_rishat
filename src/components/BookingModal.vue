<script setup lang="ts">
import { translateStatus } from "../assets/functions";
import type { Booking } from "../types/Booking";

defineProps<{
  booking: Booking;
  isOpen: boolean;
  close: () => void;
}>();
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded shadow-lg w-80 relative">
      <button class="absolute top-2 right-2 text-gray-500" @click="close">
        ✕
      </button>

      <h2 class="text-lg font-semibold mb-4">Информация</h2>

      <p v-if="booking.name"><strong>Имя:</strong> {{ booking.name ?? "—" }}</p>
      <p v-if="booking.time"><strong>Время:</strong> {{ booking.time }}</p>
      <p v-if="booking.peopleCount">
        <strong>Кол-во человек:</strong> {{ booking.peopleCount }}
      </p>
      <p v-if="booking.phone"><strong>Телефон:</strong> {{ booking.phone }}</p>
      <p><strong>Статус:</strong> {{ translateStatus(booking.status) }}</p>
    </div>
  </div>
</template>
