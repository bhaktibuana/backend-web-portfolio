export interface SelectLatesIdProfileImageIface {
  id: string;
}

export interface InsertDataPayloadProfileImageIface {
  id: string;
  filePath: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isDeleted: boolean;
  inactive: boolean;
}