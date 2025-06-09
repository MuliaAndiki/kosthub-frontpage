export interface userType {
  token: string;
  user: {
    _id: string;
    fotoProfile: any;
    username: string;
    email: string;
    fullname?: string;
    tanggal_lahir?: string;
    nomor?: string;
    gender?: any;
    alamat?: string;
    bio?: string;
    role?: string;
    savedKos?: string[];
  };
}

export interface itemsType {
  id_kos: number;
  nama_kos: string;
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
