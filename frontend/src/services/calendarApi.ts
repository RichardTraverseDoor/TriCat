import { apiRequest } from '@/services/apiClient';
import type { StoredEvent } from '@/types/calendar';

interface RawCalendarEvent extends Partial<StoredEvent> {
  id: number;
  date?: string;
}

const normalizeCalendarEvent = (event: RawCalendarEvent): StoredEvent => ({
  id: event.id,
  title: event.title ?? '',
  date: event.date ?? '',
});

export const fetchCalendarEvents = async (): Promise<StoredEvent[]> => {
  const events = await apiRequest<RawCalendarEvent[]>('/calendar');
  return events.map((event) => normalizeCalendarEvent(event));
};

export const createCalendarEvent = async (payload: {
  title: string;
  date: string;
}): Promise<StoredEvent> => {
  const event = await apiRequest<RawCalendarEvent>('/calendar', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return normalizeCalendarEvent(event);
};

export const deleteCalendarEvent = async (id: number): Promise<void> => {
  await apiRequest<void>(`/calendar/${id}`, { method: 'DELETE' });
};