export interface SelectLatesIdResumeIface {
  id: string;
}

export interface InsertDataPayloadResumeIface {
  id: string;
  filePath: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isDeleted: boolean;
  inactive: boolean;
}
