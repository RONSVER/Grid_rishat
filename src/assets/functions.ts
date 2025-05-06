import type { Booking } from "../types/Booking";

export function translateStatus(status: string): string {
  const map: Record<string, string> = {
    New: "Новая",
    Bill: "Пречек",
    Closed: "Закрытый",
    Banquet: "Банкет",
    "Живая очередь": "Живая очередь",
    Новая: "Ожидает подтверждения",
    Заявка: "Ожидаем",
    Открыт: "В зале",
    Закрыт: "Отменен",
    подтверждён: "Подтверждён",
  };

  return map[status] ?? status;
}

export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    New: "bg-cyan-500/70",
    Bill: "bg-cyan-500/70",
    Closed: "bg-cyan-500/70",
    "Живая очередь": "bg-blue-900/70",
    Banquet: "bg-purple-900/70",
    Новая: "bg-orange-900/70",
    Заявка: "bg-orange-900/70",
    Открыт: "bg-orange-900/70",
    Закрыт: "bg-orange-900/70",
    подтверждён: "bg-green-700/70",
  };

  return colorMap[status] ?? "bg-gray-400/30";
}

export function parseHour(time: string, tz: string): number {
  const date = new Date(time);
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const local = new Date(utc + getOffsetMs(tz, date));
  return local.getHours();
}

export function getOffsetMs(timezone: string, date: Date): number {
  const offset =
    {
      "Asia/Vladivostok": 10,
    }[timezone] ?? 0;
  return offset * 60 * 60 * 1000;
}

export function getOverlapOffset(
  booking: Booking,
  bookings: Booking[],
  currentIndex: number
): number {
  const overlapping = bookings.filter(
    (b, i) =>
      i < currentIndex &&
      b.tableIndex === booking.tableIndex &&
      b.startHour === booking.startHour &&
      b.duration === booking.duration
  );
  return overlapping.length * 10;
}

export function formatHour(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}
