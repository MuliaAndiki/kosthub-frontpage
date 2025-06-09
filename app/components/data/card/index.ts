import {
  ourServicesType,
  bestPropertyType,
  bestReviewType,
} from "@/app/components/types/components";
import HomeSecure from "@/public/asset/Home Secure.png";
import Secure from "@/public/asset/Secured.png";
import MoneyDolar from "@/public/asset/Money Dollar.png";
import TimeTwenty from "@/public/asset/Time Twenty Four.png";
import Kost1 from "@/public/asset/kost1.png";
import kost3 from "@/public/asset/kost3.png";
import account from "@/public/asset/account.png";

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

export const bestProperyData: bestPropertyType[] = [
  {
    image: "images/kos12/gambar1.jpg",
  },
  {
    image: "images/kos12/gambar2.jpg",
  },
  {
    image: "images/kos12/gambar3.jpg",
  },
  {
    image: "images/kos12/gambar4.jpg",
  },
  {
    image: "images/kos12/gambar1.jpg",
  },
  {
    image: "images/kos12/gambar2.jpg",
  },
  {
    image: "images/kos12/gambar3.jpg",
  },
  {
    image: "images/kos12/gambar4.jpg",
  },
  {
    image: "images/kos12/gambar4.jpg",
  },
  {
    image: "images/kos12/gambar4.jpg",
  },
];

export const bestReviewData: bestReviewType[] = [
  {
    image: account.src,
    title: "Sinta Lestari",
    date: "11 Februari 2025",
    gambar: "images/kos34/gambar5.jpg",
    deskripsi:
      "Kosnya bersih dan fasilitas lengkap. Dapurnya nyaman buat masak bareng teman.",
    avgBintang: 5,
  },
  {
    image: account.src,
    title: "Rizky Pratama",
    date: "3 Maret 2025",
    gambar: "images/kos34/gambar3.jpg",
    deskripsi:
      "Lokasi strategis dekat kampus. Sayangnya, suara jalan agak berisik malam hari.",
    avgBintang: 3,
  },
  {
    image: account.src,
    title: "Dewi Anjani",
    date: "27 Januari 2025",
    gambar: "images/kos34/gambar4.jpg",
    deskripsi:
      "Tempatnya cozy dan tenang. Owner-nya juga sangat baik dan responsif.",
    avgBintang: 4,
  },
  {
    image: account.src,
    title: "Bima Sakti",
    date: "15 Februari 2025",
    gambar: "images/kos34/gambar5.jpg",
    deskripsi:
      "Kamar luas dan dapat sinar matahari pagi. Tapi, kadang air mati saat malam.",
    avgBintang: 2,
  },
];
