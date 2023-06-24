export interface LoginPayloadIface {
  usernameEmail: string;
  password: string;
}

export interface ChangePassPayloadIface {
  password: string;
  updatedAt: string;
  updatedBy: string;
}
