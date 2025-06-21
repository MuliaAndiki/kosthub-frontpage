"use client";
import Container from "@/app/components/ui/Container";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";
import TextFieldInput from "@/app/components/ui/InputField";
import { formCreateKos } from "@/app/types/form";
import API from "@/app/util/API";
import Button from "@/app/components/ui/Button";
import ButtonUploads from "@/app/components/ui/ButtonUploads";
import CustomSelect from "@/app/components/ui/Select";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Provensi } from "@/app/core/data/constants/Provensi";
import Icon from "@/public/asset/IconHitam.png";
import Image from "next/image";
import { TipeKos } from "@/app/core/data/constants/tipeKos";
import { Plus, Trash2 } from "lucide-react";

const BikinKosChildren: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [formCreateKos, setFormCreateKos] = useState<formCreateKos>({
    alamat: "",
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
    } catch (error) {
    } finally {
    }
  };

  const handleCreateColumFalitas = () => {
    setFormCreateKos((prev) => ({
      ...prev,
      fasilitas: [...prev.fasilitas, { nama: "", jumlah: "" }],
    }));
  };

  const handleHapusColumFasilitas = (key: Number) => {
    setFormCreateKos((prev) => ({
      ...prev,
      fasilitas: prev.fasilitas.filter((_, i) => i !== key),
    }));
  };

  const handleAlamatChange = (e: SelectChangeEvent) => {
    setFormCreateKos((prev) => ({
      ...prev,
      alamat: e.target.value,
    }));
  };

  const handleTipeKosChange = (e: SelectChangeEvent) => {
    setFormCreateKos((prev) => ({
      ...prev,
      tipe_kos: e.target.value,
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Triger");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormCreateKos((prev) => ({
        ...prev,
        thumbnail: file,
      }));
    }
  };
  return (
    <Container className="w-full h-screen" as="main">
      <Container className="flex justify-center items-center w-full h-full flex-col">
        <Container className="flex justify-center items-center flex-col gap-4">
          <Image alt="Icon" src={Icon} width={150} height={150} />

          <h1 className="text-[clamp(1rem,4vw,2rem)] font-bold">
            Mulai Daftarkan Kost Kamu Di KOSTHUB!
          </h1>
        </Container>
        <Container className=" w-full">
          <Container className="grid grid-cols-2 grid-rows-1 gap-20 mt-6 ">
            <Container className="flex justify-center items-center flex-col gap-4">
              <TextFieldInput
                name={formCreateKos.nama_kos}
                label="Nama Kos"
                value={formCreateKos.nama_kos}
                onChange={(e) =>
                  setFormCreateKos((prev) => {
                    const newObj = { ...prev, nama_kos: e.target.value };
                    return newObj;
                  })
                }
              />

              <TextFieldInput
                type="number"
                name="Harga Perbulan"
                label="Harga Perbulan"
                value={formCreateKos.harga_perbulan}
                onChange={(e) =>
                  setFormCreateKos((prev) => {
                    const newObj = {
                      ...prev,
                      harga_perbulan: Number(e.target.value),
                    };
                    return newObj;
                  })
                }
              />
              <Container className="w-[32.5%] flex justify-center items-center">
                <CustomSelect
                  name="Tipe Kos"
                  value={formCreateKos.tipe_kos}
                  onChange={(e) => handleTipeKosChange(e)}
                >
                  <MenuItem value="-"></MenuItem>
                  {TipeKos.map((items) => (
                    <MenuItem key={items} value={items}>
                      {items}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Container>
            </Container>
            <Container className="flex justify-center items-center flex-col gap-4">
              <Container className="w-[32.5%] flex justify-center items-center">
                <CustomSelect
                  name="Alamat"
                  value={formCreateKos.alamat}
                  onChange={(e) => handleAlamatChange(e)}
                >
                  <MenuItem value="-"></MenuItem>
                  {Provensi.map((items) => (
                    <MenuItem key={items} value={items}>
                      {items}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Container>

              <TextFieldInput
                name="Harga Pertahun"
                label="Harga Pertahun"
                type="number"
                value={formCreateKos.harga_pertahun}
                onChange={(e) =>
                  setFormCreateKos((prev) => {
                    const newObj = {
                      ...prev,
                      harga_pertahun: Number(e.target.value),
                    };
                    return newObj;
                  })
                }
              />
              <TextFieldInput
                name="Kontak"
                label="Email"
                type="email"
                value={formCreateKos.kontak.email}
                onChange={(e) =>
                  setFormCreateKos((prev) => {
                    const newObj = {
                      ...prev,
                      email: e.target.value,
                    };
                    return newObj;
                  })
                }
              />
            </Container>
          </Container>
        </Container>

        <Container className=" w-full m-2">
          <Container className="flex justify-center items-center flex-col gap-4">
            <TextFieldInput
              type="text"
              name="NomorHp"
              className="w-full max-w-lg"
              label="NomorHp"
              value={formCreateKos.kontak.nomor}
              onChange={(e) =>
                setFormCreateKos((prev) => {
                  const newObj = {
                    ...prev,
                    kontak: { ...prev.kontak, nomor: e.target.value },
                  };
                  return newObj;
                })
              }
            />
            <Container className="w-full max-w-lg flex gap-8 justify-center items-center">
              <ButtonUploads
                onChange={(e) => handleThumbnailChange(e)}
                multiple={false}
                accept="image/*"
              >
                Foto Depan Kost
              </ButtonUploads>

              <ButtonUploads
                onChange={(e) => handleThumbnailChange(e)}
                multiple={false}
                accept="image/*"
              >
                Foto Foto Kost
              </ButtonUploads>
            </Container>
          </Container>
        </Container>
        <Container className=" mt-4 w-full items-center justify-center flex flex-col gap-6 ">
          {formCreateKos.fasilitas.map((item, key) => (
            <Container
              className=" flex justify-center items-center w-full flex-col "
              key={key}
            >
              <Container className="flex w-full gap-6 flex-col">
                <Container className="flex justify-center items-center w-full gap-6">
                  <TextFieldInput
                    name={`fasilitas-${key}-nama`}
                    value={item.nama}
                    label="Nama Fasilitas"
                    className="w-full max-w-lg"
                    type="text"
                    onChange={(e) => {
                      const newObj = [...formCreateKos.fasilitas];
                      newObj[key].nama = e.target.value;
                      setFormCreateKos((prev) => ({
                        ...prev,
                        fasilitas: newObj,
                      }));
                    }}
                  />

                  <TextFieldInput
                    name={`fasilitas-${key}-jumlah`}
                    value={item.jumlah}
                    label="Jumlah Fasilitas"
                    className="w-full max-w-lg"
                    type="text"
                    onChange={(e) => {
                      const newObj = [...formCreateKos.fasilitas];
                      newObj[key].jumlah = e.target.value;
                      setFormCreateKos((prev) => ({
                        ...prev,
                        fasilitas: newObj,
                      }));
                    }}
                  />
                </Container>
              </Container>
              <Button onClick={() => handleHapusColumFasilitas(key)}>
                <Trash2 />
              </Button>
            </Container>
          ))}
        </Container>
        <Container className="flex gap-6">
          <Button onClick={() => handleCreateColumFalitas()}>
            <Plus />
          </Button>
        </Container>
        <Container>
          <Button onClick={() => handleCreateKos()}>Buat Kost</Button>
        </Container>
      </Container>
    </Container>
  );
};

export default BikinKosChildren;
