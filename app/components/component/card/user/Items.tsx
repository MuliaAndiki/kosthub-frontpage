"use client";
import { Star, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { itemsTypeProps } from "@/app/types/props";
import Image from "next/image";
import { getFasilitas } from "@/app/core/helper/faslitasHelper";
import Container from "../../ui/Container";

const Items: React.FC<itemsTypeProps> = ({ data }) => {
  return (
    <Link
      href={`/users/kost/${data.id_kos}`}
      className="block w-full max-w-sm bg-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300 border border-gray-200"
    >
      <Image
        src={data.image.thumbnail}
        alt="Thumbnail"
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded-lg"
      />

      <Container className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
        <Container className="bg-blue-100 rounded-md px-3 py-1 text-center">
          <h1 className="font-bold text-sm sm:text-base">
            Rp. {data.harga_pertahun}/Bulan
          </h1>
        </Container>
        <Container className="bg-blue-100 rounded-md px-3 py-1 text-center">
          <h1 className="font-bold text-sm sm:text-base">
            Rp. {data.harga_pertahun}/Tahun
            <span className="bg-green-500 text-white text-xs px-2 py-1 ml-2 rounded-md">
              Best Deal
            </span>
          </h1>
        </Container>
      </Container>

      <Container className="mt-3">
        <p className="text-gray-600 text-sm line-clamp-2">{data.deskripsi}</p>
      </Container>

      <Container className="flex items-center gap-2 mt-2">
        <MapPin className="w-5 h-5 text-gray-500" />
        <p className="text-gray-600 text-sm">{data.alamat}</p>
      </Container>

      <Container className="flex items-center justify-between mt-3">
        <Container className="flex flex-wrap gap-2">
          {data.fasilitas.slice(0, 4).map((item: any, key: any) => (
            <Container
              key={key}
              className="flex items-center bg-gray-100 rounded-md px-2 py-1 text-sm"
            >
              {getFasilitas(item.nama)}
              <span className="ml-1 font-medium">{item.jumlah}</span>
            </Container>
          ))}
        </Container>
        <Container className="flex items-center gap-1">
          <Star className="w-5 h-5 text-yellow-400" />
          <p className="text-sm font-medium">{data.avgBintang}</p>
        </Container>
      </Container>

      <Container className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <h1 className="font-bold text-lg">{data.nama_kos}</h1>
        <Container className="flex items-center gap-2 border-2 border-green-500 rounded-md px-2 py-1">
          <Phone className="w-5 h-5 text-gray-500" />
          <p className="text-sm text-gray-600">{data.kontak?.nomor}</p>
        </Container>
      </Container>
    </Link>
  );
};

export default Items;
