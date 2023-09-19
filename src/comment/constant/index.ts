export type Owner = {
  names: string;
  surnames: string;
  image: string;
};

export type ClinicSummaryScore = {
  total_users: number;
  total_points: number;
};

export type Clinic = {
  id: string;
  id_owner: string;
  name: string;
  telephone_number: string;
  google_maps_url: string;
  email: string;
  image: string;
  address: string;
  created_at: Date;
  updated_at: Date;
  status: boolean;
};

export type Comment = {
  id: string;
  id_clinic: string;
  id_owner: string;
  comment: string;
  created_at: Date;
  updated_at: Date;
  status: boolean;
};

export type CommentByIdClinic = {
  Owner: Owner & { ClinicUsers: ClinicUsers[] };
} & Comment;

export type AppointmentOwner = {
  start_at: Date;
  end_at: Date;
};
export type ClinicUsers = {
  points: number;
};

export type GetMyComment = {
  Owner: Owner & {
    AppointmentOwner: AppointmentOwner[];
    ClinicUsers: ClinicUsers[];
  };
} & Comment;
