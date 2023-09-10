export type ServiceResult = {
  service: {
    name: string;
  };
} & {
  id_clinic: string;
  id_service: string;
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

export type SummaryScoreClinic = {
  _count: number;
  _sum: {
    points: number;
  };
};
