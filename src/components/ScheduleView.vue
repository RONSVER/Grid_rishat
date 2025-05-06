<script setup lang="ts">
import { ref, computed } from "vue";
import TableCell from "./TableCell.vue";
import TableHeaders from "./TableHeaders.vue";
import TimeColumn from "./TimeColumn.vue";
import Card from "./Card.vue";
import BookingModal from "./BookingModal.vue";

import { mockData } from "../assets/mock";
import { formatHour, getOverlapOffset, parseHour } from "../assets/functions";
import type { Booking } from "../types/Booking";

const horizontalScale = ref(80);
const verticalScale = ref(40);

const HEADER_HEIGHT = 60;
const HOURS = Array.from(
  { length: 24 },
  (_, i) => `${String(i).padStart(2, "0")}:00`
);

const selectedDate = ref(mockData.current_day);
const availableDays = mockData.available_days;

const mockTables = mockData.tables.map(({ number, capacity, zone }) => ({
  num: number,
  people: `${capacity} чел`,
  floor: zone,
}));

const bookings = computed(() => {
  const list: Booking[] = [];

  mockData.tables.forEach((table, tableIndex) => {
    table.orders.forEach((order) => {
      const startDate = order.start_time.slice(0, 10);
      if (startDate !== selectedDate.value) return;

      const start = parseHour(order.start_time, mockData.restaurant.timezone);
      const end = parseHour(order.end_time, mockData.restaurant.timezone);

      list.push({
        type: "order",
        tableIndex,
        startHour: start,
        duration: end - start,
        status: order.status,
        time: `${formatHour(start)}–${formatHour(end)}`,
      });
    });

    table.reservations.forEach((res) => {
      const startDate = res.seating_time.slice(0, 10);
      if (startDate !== selectedDate.value) return;

      const start = parseHour(res.seating_time, mockData.restaurant.timezone);
      const end = parseHour(res.end_time, mockData.restaurant.timezone);

      list.push({
        type: "reservation",
        tableIndex,
        startHour: start,
        duration: end - start,
        name: res.name_for_reservation,
        peopleCount: res.num_people,
        phone: res.phone_number,
        status: res.status,
        time: `${formatHour(start)}–${formatHour(end)}`,
      });
    });
  });

  return list;
});

const isModalOpen = ref(false);
const selectedBooking = ref<Booking | null>(null);

function openModal(booking: Booking) {
  selectedBooking.value = booking;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function increaseZoom() {
  horizontalScale.value += 16;
  verticalScale.value += 4;
}
function decreaseZoom() {
  if (horizontalScale.value > 32) horizontalScale.value -= 16;
  if (verticalScale.value > 8) verticalScale.value -= 4;
}
</script>

<template>
  <div class="p-4 overflow-auto">
    <div class="flex gap-4 mb-4 items-center">
      <div class="flex gap-2">
        <button @click="decreaseZoom" class="px-2 py-1 bg-gray-200 rounded">
          – Уменьшить
        </button>
        <button @click="increaseZoom" class="px-2 py-1 bg-gray-200 rounded">
          + Увеличить
        </button>
      </div>

      <select v-model="selectedDate" class="border px-2 py-1 rounded">
        <option v-for="date in availableDays" :key="date" :value="date">
          {{ date }}
        </option>
      </select>
    </div>

    <div class="flex w-fit relative">
      <TimeColumn :hours="HOURS" />

      <div class="relative">
        <div
          class="grid"
          :style="{
            gridTemplateColumns: `repeat(${mockTables.length}, ${horizontalScale}px)`,
            gridTemplateRows: `${HEADER_HEIGHT}px repeat(${HOURS.length}, ${verticalScale}px)`,
          }"
        >
          <TableHeaders :tables="mockTables" />

          <template v-for="rowIndex in HOURS.length">
            <TableCell
              v-for="colIndex in mockTables.length"
              :key="`cell-${rowIndex}-${colIndex}`"
              :row="rowIndex - 1"
              :col="colIndex - 1"
            />
          </template>
        </div>

        <Card
          v-for="(booking, index) in bookings"
          :key="`booking-${index}`"
          class="absolute cursor-pointer mx-1"
          :style="{
            top: `${HEADER_HEIGHT + booking.startHour * verticalScale}px`,
            left: `${
              booking.tableIndex * horizontalScale +
              getOverlapOffset(booking, bookings, index)
            }px`,
            width: `${horizontalScale}px`,
            height: `${booking.duration * verticalScale}px`,
            zIndex: 10 + getOverlapOffset(booking, bookings, index) / 10,
          }"
          @click="openModal(booking)"
          :user-number="booking.peopleCount"
          :name-or-order-name="
            booking.name ?? (booking.type === 'order' ? 'Заказ' : 'Банкет')
          "
          :people-count="booking.peopleCount"
          :phone-number="booking.phone"
          :status="booking.status"
          :time="booking.time"
        />

        <BookingModal
          :isOpen="isModalOpen"
          :close="closeModal"
          :booking="selectedBooking!"
        />
      </div>
    </div>
  </div>
</template>
