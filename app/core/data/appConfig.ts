import { appFooterType } from "@/app/types/components/index";
import icon from "@/public/asset/icon.png";
import GogleIcon from "@/public/asset/GogleIcon.png";
import FacebookIcon from "@/public/asset/Facebook.png";
import LinkIn from "@/public/asset/Linkin.png";
import Github from "@/public/asset/GitHub.png";

import {
  MedsosConfig,
  NotifikasiConfig,
  PenyewaanConfig,
} from "@/app/types/components/index";
import {
  RouteStatic,
  RouteStaticProfile,
  RouteStaticLanding,
  RouteStaticInformation,
  ListConfig,
} from "../../types/appConfig";
import {
  User,
  File,
  HandCoins,
  Bookmark,
  KeyRound,
  Bell,
  Info,
} from "lucide-react";

export const NotifikasiConfigDatas: NotifikasiConfig[] = [
  {
    field: "id",
    label: "No :",
  },
  {
    field: "nama_kos",
    label: "Nama Kos :",
  },
  {
    field: "kontak",
    label: "Kontak :",
    value: (item) => {
      const email = item?.kontak.email;
      const nomor = item?.kontak.nomor;
      return `${email}/${nomor}`;
    },
  },
  {
    field: "alamat",
    label: "Alamat :",
  },
  {
    field: "harga_perbulan",
    label: "Harga Perbulan :",
  },
  {
    field: "harga_pertahun",
    label: "Harga Pertahun :",
  },
  {
    field: "tipe_kos",
    label: "Tipe Kos :",
  },
  {
    field: "status",
    label: "Status :",
  },
  {
    field: "all",
    label: "Selanjutnya :",
  },
];

export const PenyewaanConfigDatas: PenyewaanConfig[] = [
  {
    field: "nama_kos",
    label: "Nama Kost",
  },
  {
    field: "createdAt",
    label: "Tanggal",
  },
  {
    field: "metode_pembayaran",
    label: "Metode Pembayaran",
  },
  {
    field: "status",
    label: "Status",
  },
];

export const appFooterDatas: appFooterType[] = [
  {
    footerLeft: {
      image: icon,
      title: "KostHub",
      desc: "KOSTHUB adalah platform digital yang mempermudah pemilik kos dalam mengelola properti, penyewa, serta pembayaran sewa kos secara otomatis. Sistem ini juga membantu pencari kos menemukan tempat tinggal dengan fitur pencarian berbasis lokasi, harga, dan fasilitas.",
    },

    footerRight: [
      {
        title: "Perusahaan",
        href: "/",
      },
      {
        title: "About Us",
        href: "/",
      },
      {
        title: "Product & Layanan",
        href: "/",
      },
      {
        title: "Patner",
        href: "/",
      },
      {
        title: "Dukungan",
        href: "/",
      },
      {
        title: "Kebijakan Privasi",
        href: "/",
      },
      {
        title: "Syarat Penggunaan",
        href: "/",
      },
      {
        title: "Syarat Penggunaan Agen",
        href: "/",
      },
      {
        title: "Hubungi Kami",
        href: "/",
      },
      {
        title: "kosthub@gmail.com",
        href: "/",
      },
      {
        title: "+621134455666",
        href: "/",
      },
    ],
  },
];

export const MedsosData: MedsosConfig[] = [
  {
    image: FacebookIcon,
    href: "/",
    label: "KOSTHUB",
  },
  {
    image: Github,
    href: "/",
    label: "KOSTHUB",
  },
  {
    image: GogleIcon,
    href: "/",
    label: "KOSTHUB",
  },
  {
    image: LinkIn,
    href: "/",
    label: "KOSTHUB",
  },
];

export const RouteStatiData: RouteStatic[] = [
  {
    login: {
      title: "Masuk",
      href: "/auth/login",
    },
    register: {
      title: "Daftar",
      href: "/auth/register",
    },
  },
];

export const RouteStaticProfileData: RouteStaticProfile[] = [
  {
    href: "/profile",
    icon: User,
    label: "Profile",
  },
  {
    href: "/profile/data-kost",
    icon: File,
    label: "Data Kost",
  },
  {
    href: "/profile/simpan-kost",
    icon: Bookmark,
    label: "Simpan Kost",
  },
  {
    href: "/profile/penyewaan",
    icon: HandCoins,
    label: "Penyewaan",
  },
  {
    href: "/profile/ubah-password",
    icon: KeyRound,
    label: "Ubah Password",
  },
  {
    href: "/profile/notifikasi",
    icon: Bell,
    label: "Notifikasi",
  },
  {
    label: "Approve",
    href: "/profile/information",
    icon: Info,
  },
];

export const RouteStaticLandingData: RouteStaticLanding[] = [
  {
    label: "home",
    href: "#",
  },
  {
    label: "Layanan",
    href: "#",
  },
  {
    label: "Produk",
    href: "#",
  },
  {
    label: "Tentang Kami",
    href: "#",
  },
  {
    label: "Masuk",
    href: "/auth/login",
  },
];

export const RouteStaticInformationData: RouteStaticInformation[] = [
  {
    label: "Infomation",
    href: "/profile/information",
    icon: Info,
  },
];

export const ListConfigKos: ListConfig[] = [
  {
    label: "Nama",
  },
  {
    label: "Nama-Kos",
  },
  {
    label: "Kontak",
  },
  {
    label: "Status",
  },
  {
    label: "Dokument",
  },
  {
    label: "Tool",
  },
];

export const ListConfigReservase: ListConfig[] = [
  {
    label: "Nama",
  },
  {
    label: "Nama-Reservase",
  },
  {
    label: "Kontak",
  },
  {
    label: "Status",
  },
  {
    label: "Dokument",
  },
  {
    label: "Tool",
  },
];
