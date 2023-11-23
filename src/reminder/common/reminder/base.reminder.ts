import { Injectable } from '@nestjs/common';
import { TimeSlots } from './common/types';

@Injectable()
export abstract class BaseReminder<T = Record<TimeSlots, any>> {
  protected today: number = new Date().getDate();

  abstract scheduled(scheduleT: T): Promise<boolean>;
  abstract removed(): Promise<boolean>;

  protected getMinuteHourDay(date?: Date): {
    minute: number;
    hour: number;
    day: number;
  } {
    const today = new Date();

    if (!date)
      return {
        minute: today.getMinutes(),
        hour: today.getHours(),
        day: today.getDate(),
      };
    const adjustedDate = new Date(date.toISOString());
    adjustedDate.setHours(adjustedDate.getHours() + 4);

    const minute = adjustedDate.getMinutes();
    const hour = adjustedDate.getHours();
    const day = adjustedDate.getDate();

    return { minute, hour, day };
  }

  protected getMinuteHourStr(
    minute: number,
    hour: number,
  ): {
    minute: string;
    hour: string;
  } {
    const minuteStr: string =
      minute < 10 ? minute.toString().padStart(2, '0') : minute.toString();
    const hourStr: string = hour.toString();
    return { minute: minuteStr, hour: hourStr };
  }
}
