export interface Booking {
  type?: string;
  name?: string;
  time: string;
  peopleCount?: number;
  phone?: string;
  status: string;
  tableIndex: number;
  startHour: number;
  duration: number;
  date?: Date;
}
