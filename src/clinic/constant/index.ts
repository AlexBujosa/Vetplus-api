import { Prisma } from '@prisma/client';
import { ClinicSummaryScore } from '../graphql/types/clinic-summary-score.type';
import { Schedule } from '../graphql/types/schedule.type';

export type ServiceResult = {
  services: string[];
};
export type ScheduleType = {
  workingDays: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  nonWorkingDays: string[];
};

export type ClinicType = {
  id: string;
  id_owner: string;
  name: string;
  telephone_number: string;
  google_maps_url: string;
  address: string;
  email: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  status: boolean;
  ClinicSummaryScore: ClinicSummaryScore;
};
export type FavoriteClinic = {
  Clinic: {
    name: string;
    address: string;
  };
} & {
  id_user: string;
  id_clinic: string;
  favorite: boolean;
  points: number;
};
