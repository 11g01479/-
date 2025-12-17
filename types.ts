
export interface Teacher {
  id: string;
  name: string;
  subject: string;
}

export interface TimeSlot {
  id: string;
  teacherId: string;
  date: string;
  startTime: string;
  endTime: string;
  isReserved: boolean;
}

export interface Reservation {
  id: string;
  slotId: string;
  studentName: string;
  guardianName: string;
  email: string;
  memo?: string;
}

export type ViewType = 'parent' | 'teacher' | 'guide';
