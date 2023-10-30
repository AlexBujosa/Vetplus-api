export interface IReminderAppointment {
  id_user: string;
  id_appointment: string;
  token_fmc: string | null;
  body: string;
}
