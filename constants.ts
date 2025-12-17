
import { Teacher, TimeSlot } from './types';

export const MOCK_TEACHERS: Teacher[] = [
  { id: 't1', name: '佐藤 健一', subject: '算数・数学' },
  { id: 't2', name: '鈴木 美香', subject: '国語' },
  { id: 't3', name: '高橋 浩', subject: '理科' },
  { id: 't4', name: '田中 恵', subject: '社会' },
];

export const INITIAL_SLOTS: TimeSlot[] = [
  { id: 's1', teacherId: 't1', date: '2024-12-10', startTime: '15:00', endTime: '15:20', isReserved: false },
  { id: 's2', teacherId: 't1', date: '2024-12-10', startTime: '15:30', endTime: '15:50', isReserved: true },
  { id: 's3', teacherId: 't1', date: '2024-12-10', startTime: '16:00', endTime: '16:20', isReserved: false },
  { id: 's4', teacherId: 't2', date: '2024-12-11', startTime: '14:00', endTime: '14:20', isReserved: false },
  { id: 's5', teacherId: 't2', date: '2024-12-11', startTime: '14:30', endTime: '14:50', isReserved: false },
];
