import { Injectable } from '@nestjs/common';
import { TimeSlots } from './common/types';
import * as moment from 'moment-timezone';
import { timeZone } from '@/reminder/common/reminder/common/constant';
@Injectable()
export abstract class BaseReminder<T = Record<TimeSlots, any>> {
  constructor() {
    this.getMinuteHourDay();
  }
  protected today = moment.tz(timeZone);

  abstract scheduled(scheduleT: T): Promise<boolean>;
  abstract removed(): Promise<boolean>;

  protected getMinuteHourDay(date?: Date): {
    minute: number;
    hour: number;
    day: number;
  } {
    const today = moment.tz(timeZone);
    if (!date)
      return {
        minute: today.minutes(),
        hour: today.hours(),
        day: today.date(),
      };

    const adjustedDate = moment(date).tz(timeZone);

    const minute = adjustedDate.minutes();
    const hour = adjustedDate.hours() + 4;
    const day = adjustedDate.date();

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
