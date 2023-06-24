export interface SelectLatesIdSkillsIface {
  id: string;
}

export interface InsertDataPayloadSkillsIface {
  id: string;
  title: string;
  filePath: string;
  sourceLink: string;
  order: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isDeleted: boolean;
}
