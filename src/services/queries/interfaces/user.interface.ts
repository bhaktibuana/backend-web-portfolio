export interface LoginPayloadIface {
  usernameEmail: string;
  password: string;
}

export interface VerifyPassPayloadIface {
  id: string;
  password: string;
}
