export interface IReminderAppointment {
  id_user: string;
  id_pet: string;
  token_fmc: string | null;
  body: string;
}
