import { apiRequest } from '@/services/apiClient';
import type { CreateScheduleEntryPayload, ScheduleEntry, ScheduleDay } from '@/types/schedule';

interface RawScheduleEntry {
  id: number;
  title?: string;
  type?: string;
  day?: string;
  startTime?: string;
  endTime?: string;
  room?: string | null;
}

const normalizeScheduleEntry = (entry: RawScheduleEntry): ScheduleEntry => ({
  id: entry.id,
  title: entry.title ?? '',
  type: (entry.type ?? 'lecture') as ScheduleEntry['type'],
  day: (entry.day ?? 'monday') as ScheduleDay,
  startTime: entry.startTime ?? '08:00',
  endTime: entry.endTime ?? '09:00',
  room: entry.room ?? '',
});

export const fetchScheduleEntries = async (day?: ScheduleDay): Promise<ScheduleEntry[]> => {
  const path = day ? `/schedule/${day}` : '/schedule';
  const entries = await apiRequest<RawScheduleEntry[]>(path);
  return entries.map((entry) => normalizeScheduleEntry(entry));
};

export const createScheduleEntry = async (
  payload: CreateScheduleEntryPayload,
): Promise<ScheduleEntry> => {
  const entry = await apiRequest<RawScheduleEntry>('/schedule', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return normalizeScheduleEntry(entry);
};

export const deleteScheduleEntry = async (id: number): Promise<void> => {
  await apiRequest<void>(`/schedule/${id}`, { method: 'DELETE' });
};