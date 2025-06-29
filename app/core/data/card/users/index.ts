import {
  ourServicesType,
  bestReviewType,
  Product,
} from "@/app/types/components";
import HomeSecure from "@/public/asset/Home Secure.png";
import Secure from "@/public/asset/Secured.png";
import MoneyDolar from "@/public/asset/Money Dollar.png";
import TimeTwenty from "@/public/asset/Time Twenty Four.png";
import account from "@/public/asset/account.png";
import Kos1 from "@/public/asset/kost1.png";
import Kos2 from "@/public/asset/kost2.png";
import Kos3 from "@/public/asset/kost3.png";
import Kos4 from "@/public/asset/kos4.jpg";
import Kos5 from "@/public/asset/kos5.jpg";

export const ProductDatas: Product[] = [
  {
    image: Kos1,
  },
  {
    image: Kos2,
  },
  {
    image: Kos3,
  },
  {
    image: Kos4,
  },
  {
    image: Kos5,
  },
];

export const ourServicesData: ourServicesType[] = [
  {
    image: HomeSecure.src,
    title: "Sewa Mudah & Aman",
    deskripsi:
      "Pesan kamar kos dengan mudah dan aman hanya dalam beberapa klik.",
  },

  {
    image: Secure.src,
    title: "Product Terpercaya",
    deskripsi:
      "Semua kos yang terdaftar telah diverifikasi untuk memastikan kenyamanan dan keamanan Anda.",
  },

  {
    image: MoneyDolar.src,
    title: "Nyaman Di Dompet",
    deskripsi:
      "Tersedia berbagai pilihan kos dengan harga terjangkau dan fleksibilitas pembayaran.",
  },

  {
    image: TimeTwenty.src,
    title: "24/7 Customer Support",
    deskripsi:
      "Tim kami siap membantu kapan saja untuk memastikan pengalaman menyewa yang bebas hambatan.",
  },
];

export const bestReviewData: bestReviewType[] = [
  {
    image: account.src,
    title: "Sinta Lestari",
    date: "11 Februari 2025",
    gambar: Kos1,
    deskripsi:
      "Kosnya bersih dan fasilitas lengkap. Dapurnya nyaman buat masak bareng teman.",
    avgBintang: 5,
  },
  {
    image: account.src,
    title: "Rizky Pratama",
    date: "3 Maret 2025",
    gambar: Kos2,
    deskripsi:
      "Lokasi strategis dekat kampus. Sayangnya, suara jalan agak berisik malam hari.",
    avgBintang: 3,
  },
  {
    image: account.src,
    title: "Dewi Anjani",
    date: "27 Januari 2025",
    gambar: Kos3,
    deskripsi:
      "Tempatnya cozy dan tenang. Owner-nya juga sangat baik dan responsif.",
    avgBintang: 4,
  },
  {
    image: account.src,
    title: "Bima Sakti",
    date: "15 Februari 2025",
    gambar: Kos4,
    deskripsi:
      "Kamar luas dan dapat sinar matahari pagi. Tapi, kadang air mati saat malam.",
    avgBintang: 2,
  },
];
