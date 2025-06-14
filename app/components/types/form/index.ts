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

export interface formEditProfile {
  email: string;
  tanggal_lahir: string;
  fullname: string;
  gender: boolean | null;
  nomor: string;
  alamat: string;
  bio: string;
  fotoProfil: File | null;
}

export interface formReservase {
  nama: string;
  tanggal_lahir: string;
  nomor_hp: string;
  gender: boolean | null;
  email: string;
  metode_pembayaran: string;
  kontrak: File | null;
  bukti_pembayaran: File | null;
}

export interface formAddReview {
  komentar: string;
  image: File | null;
}
