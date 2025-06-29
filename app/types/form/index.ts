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
  bintang: number | null;
  image: File[] | null;
}

export interface formLengkapiData {
  tanggal_lahir: string;
  alamat: string;
  gender: boolean | null;
  role: string;
  fotoProfil: File | null;
  bio: string;
}

interface fasilitas {
  nama: string;
  jumlah: string;
}
export interface formCreateKos {
  nama_kos: string;
  alamat: string;
  fasilitas: fasilitas[];
  harga_perbulan: number | null;
  harga_pertahun: number | null;
  image: {
    thumbnail: File | null;
    gallery: File[] | null;
  };
  tipe_kos: string;

  kontak: {
    email: string;
    nomor: string;
  };
}

export interface formApprove {
  status: string;
  alasan: string;
}
