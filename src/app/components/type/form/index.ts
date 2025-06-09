export interface formRegister {
  username: string;
  password: string;
  email: string;
  tanggal_lahir: string;
  fullname: string;
  gender: any;
  nomor: string;
  alamat: string;
}

export interface formLogin {
  username: string;
  password: string;
}

export interface formReservase {
  nama: string;
  tanggal_lahir: string;
  nomorHp: string;
  gender: boolean;
  email: string;
  metode_pembayaran: string;
  kontrak: File;
  bukti_pembayaran: File;
}

export interface formEditProfile {
  fotoProfile: File | null;
  fullname: string;
  tanggal_lahir: string;
  nomor: string;
  email: string;
  gender: boolean;
  bio: string;
  alamat: string;
}

export interface formChangePassword {
  oldPassword: string;
  newPassword: string;
}
