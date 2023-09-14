export type ServiceResult = {
  services: string[];
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
};
export type FavoriteClinic = {
  clinic: {
    name: string;
    address: string;
  };
} & {
  id_user: string;
  id_clinic: string;
  favorite: boolean;
  points: number;
};
