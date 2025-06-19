"use client";
import Container from "@/app/components/component/ui/Container";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/components/core/hooks/dispatch/dispatch";
import TextFieldInput from "@/app/components/component/ui/InputField";
import { formCreateKos } from "@/app/components/types/form";
import API from "@/app/components/core/util/API";
import Button from "@/app/components/component/ui/Button";

const BikinKosChildren: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [formCreateKos, setFormCreateKos] = useState<formCreateKos>({
    alamat: "",
    id_kos: 0,
    tipe_kos: "",
    fasilitas: [
      {
        nama: "",
        jumlah: "",
      },
    ],
    gallery: null,
    harga_perbulan: 0,
    harga_pertahun: 0,
    kontak: {
      email: "",
      nomor: "",
    },
    nama_kos: "",
    thumbnail: null,
  });

  const handleCreateKos = async () => {
    try {
    } catch (error) {}
  };

  return (
    <Container className="w-full h-screen" as="main">
      <Container className="flex justify-center items-center w-full h-full">
        <h1 className="font-bold ">Ini Page Bikin Kost</h1>
      </Container>
    </Container>
  );
};

export default BikinKosChildren;
