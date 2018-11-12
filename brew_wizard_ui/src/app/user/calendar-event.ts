import { ICalendarReminder } from './calendar-reminder';

export interface ICalendarEvent {
  name: string,
  id: number,
  description: string,
  calendar_start: Date,
  calendar_end: Date,
  color: string,
  calendar_reminders_attributes: ICalendarReminder[]
}
