import { BaseReminder } from '@/reminder/common';
import { IReminderAppointment } from '@/reminder/common/reminder/common/interface';
import { TimeSlots } from '@/reminder/common/reminder/common/types';

import { Injectable } from '@nestjs/common';
import { client } from './common/config';

import { tz } from 'moment-timezone';
import {
  reduceFifteenMinutesLess,
  reduceThreeHourLess,
} from '@/global/function/reminder-time';
import { Cron } from '@nestjs/schedule';
import { MessagingService } from '@/message/messaging.service';
import { AppointmentUserFmc } from '@/appoinment/graphql/types/appointment-user-fmc.type';
import {
  timeSlotKeys,
  reminderMessageFifteenMinuteLeft,
  reminderMessageThreeHourLeft,
  reminderMessageOneDayLeft,
} from './common/reminder/common/constant';
import { NotificationService } from '@/notification/notification.service';
import { SendNotificationInput } from '@/notification/graphql/input/sendNotification.input';

tz.setDefault('America/Santo_Domingo');

@Injectable()
export class ReminderAppointment extends BaseReminder<
  Record<TimeSlots, IReminderAppointment[]>
> {
  constructor(
    private readonly messagingService: MessagingService,
    private readonly notificationService: NotificationService,
  ) {
    super();

    client.on('error', (err) => console.log('Redis Client Error', err));
    client.connect();
  }
  async scheduled(
    scheduleT: Record<TimeSlots, IReminderAppointment[]>,
  ): Promise<boolean> {
    console.log(scheduleT);
    const jsonData = JSON.stringify(scheduleT);
    const result = await client.set('schedule', jsonData);
    return result ? true : false;
  }

  async removed(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async setScheduleFormat(
    appointmentTaskSchedule: AppointmentUserFmc[],
  ): Promise<boolean> {
    const add: Record<TimeSlots, IReminderAppointment[]> = Object.fromEntries(
      timeSlotKeys.map((key) => [key, []]),
    ) as Record<TimeSlots, IReminderAppointment[]>;

    appointmentTaskSchedule.map((ap) => {
      const {
        id_pet,
        id_owner: id_user,
        start_at,
        Owner: {
          User_Fmc: { token_fmc },
        },
      } = ap;

      const { minute, hour, day } = this.getMinuteHourDay(start_at);

      const { minute: minuteStr, hour: hourStr } = this.getMinuteHourStr(
        minute,
        hour,
      );

      if (day !== this.today) {
        add[`${hourStr}:${minuteStr}`].push({
          id_user,
          id_pet,
          token_fmc,
          body: reminderMessageOneDayLeft,
        });
        return;
      }

      const { hour: hour_fifteenML, minute: minute_fifteenML } =
        reduceFifteenMinutesLess(hour, minute);

      const { minute: minute_fifteenMLStr, hour: hour_fifteenMLStr } =
        this.getMinuteHourStr(minute_fifteenML, hour_fifteenML);

      add[`${hour_fifteenMLStr}:${minute_fifteenMLStr}`].push({
        id_user,
        id_pet,
        token_fmc,
        body: reminderMessageFifteenMinuteLeft,
      });

      const { hour: hour_threeHL, minute: minute_threeHL } =
        reduceThreeHourLess(hour, minute);

      const { minute: minute_threeHLStr, hour: hour_threeHLStr } =
        this.getMinuteHourStr(minute_threeHL, hour_threeHL);

      add[`${hour_threeHLStr}:${minute_threeHLStr}`].push({
        id_user,
        id_pet,
        token_fmc,
        body: reminderMessageThreeHourLeft,
      });
    });

    return await this.scheduled(add);
  }

  @Cron('0 */15 5-23 * * *', { timeZone: 'America/Santo_Domingo' })
  async remindUsers() {
    const reminderSchedule: Record<TimeSlots, IReminderAppointment[]> =
      JSON.parse(await client.get('schedule'));
    const { minute, hour } = this.getMinuteHourDay();

    const { minute: currentMinute, hour: currentHour } = this.getMinuteHourStr(
      minute,
      hour,
    );

    const currentTime = `${currentHour}:${currentMinute}` as TimeSlots;

    if (!timeSlotKeys.includes(currentTime)) return;
    const remindersAppointment = reminderSchedule[currentTime];

    if (ReminderAppointment.length == 0) return;
    remindersAppointment.map(async (val) => {
      const { id_pet, id_user, body, token_fmc } = val;
      if (!token_fmc) return;
      const notificationInput: SendNotificationInput = {
        id_user,
        id_entity: id_pet,
        category: 'APPOINTMENT',
        title: 'INCOMING APPOINTMENT',
        subtitle: 'Appointment is getting closer to you',
      };
      await this.notificationService.saveNotification(notificationInput);
      await this.messagingService.sendMessage(token_fmc, body);
    });

    console.log(reminderSchedule);
  }

  @Cron('0 0 4 * * *', { timeZone: 'America/Santo_Domingo' })
  async clearReminder() {
    const scheduleT: Record<TimeSlots, IReminderAppointment[]> =
      Object.fromEntries(timeSlotKeys.map((key) => [key, []])) as Record<
        TimeSlots,
        IReminderAppointment[]
      >;
    const jsonData = JSON.stringify(scheduleT);
    await client.set('schedule', jsonData);
  }
}
