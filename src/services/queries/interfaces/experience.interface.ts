export interface SelectLatesIdExperienceIface {
  id: string;
}

export interface InsertDataPayloadExperienceIface {
  id: string;
  company: string;
  jobTitle: string;
  description: string;
  jobTypeId: string;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isDeleted: boolean;
  isPresent: boolean;
}

export interface UpdateDataPayloadExperienceIface {
  company: string;
  jobTitle: string;
  description: string;
  jobTypeId: string;
  startDate: string;
  endDate: string | null;
  updatedAt: string;
  updatedBy: string;
  isPresent: boolean;
}
