import { appFooterType } from "@/app/components/types/components/index";
import icon from "@/public/asset/icon.png";
import GogleIcon from "@/public/asset/GogleIcon.png";
import FacebookIcon from "@/public/asset/Facebook.png";
import LinkIn from "@/public/asset/Linkin.png";
import Github from "@/public/asset/GitHub.png";
import { MedsosConfig } from "@/app/components/types/components/index";
import { RouteStatic } from "../../types/appConfig";

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
  },
  {
    image: Github,
    href: "/",
  },
  {
    image: GogleIcon,
    href: "/",
  },
  {
    image: LinkIn,
    href: "/",
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
