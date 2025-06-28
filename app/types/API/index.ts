export interface userType {
  token: string;
  user: {
    _id: string;
    fotoProfil: any;
    username: string;
    email: string;
    fullname?: string;
    tanggal_lahir?: string;
    nomor?: string;
    gender?: boolean;
    alamat?: string;
    bio?: string;
    role?: string;
    savedKos?: string[];
  };
}

export interface itemsType {
  _id: string;
  nama_kos: string;
  slug: string;
  alamat: string;
  fasilitas: [
    {
      nama: string;
      jumlah: string;
    }
  ];
  harga_perbulan: number;
  harga_pertahun: number;
  kontak: {
    email: string;
    nomor: string;
  };
  avgBintang: any;
  status: string;
  ulasan: {
    nama: string;
    bintang: number;
    komentar: string;
    tanggal: string;
    imageUlasan: string;
  }[];
  image: {
    thumbnail: any;
    gallery: any[];
  };
  deskripsi: string;
  tipe_kos: string;
  id_owner: userType;
}

export interface reservasiType {
  _id: string;
  id_user: userType;
  id_kos: itemsType;
  nama: string;
  nomor_hp: string;
  metode_pembayaran: string;
  tanggal_lahir: string;
  email: string;
  kontrak: string;
  status: string;
  bukti_pembayaran: string;
  createdAt: string;
  updatedAt: string;
}

export interface ModalProps {
  title: string;
  icon: "success" | "error" | "warning" | "info" | "question";
  deskripsi: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  onClose?: () => void;
}

export interface ReviewType {
  nama: string;
  komentar: string;
  bintang: number;
  tanggal: string;
  imageUlasan: string;
}

export interface ProfileType {
  fotoProfil: any;
  username: string;
  email: string;
  fullname?: string;
  tanggal_lahir?: string;
  nomor?: string;
  gender?: boolean;
  alamat?: string;
  bio?: string;
  role?: string;
}
