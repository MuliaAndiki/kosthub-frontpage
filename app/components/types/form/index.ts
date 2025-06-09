export interface formRegister {
  username: string;
  password: string;
  email: string;
  tanggal_lahir: string;
  fullname: string;
  gender: boolean | null;
  nomor: string;
  alamat: string;
  role: string;
}

export interface formLogin {
  username: string;
  password: string;
}

export interface formUbahPassword {
  oldPassword: string;
  newPassword: string;
}
