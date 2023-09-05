export enum ClinicResult {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type ServiceResult = {
  service: {
    name: string;
    description: string;
  };
} & {
  id_clinic: string;
  id_service: string;
  created_at: Date;
  updated_at: Date;
  status: boolean;
};
