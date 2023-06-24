export interface LoginDataIface {
  usernameEmail: string;
  password: string;
}

export interface ChangePassDataIface {
  oldPassword: string;
  newPassword: string;
  newPasswordConf: string;
}
