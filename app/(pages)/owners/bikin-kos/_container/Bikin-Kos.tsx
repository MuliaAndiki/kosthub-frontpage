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
import { Files, Plus, Trash2 } from "lucide-react";
import Modal from "@/app/components/modal/Modal";
import { ModalProps } from "@/app/types/API";

const BikinKosChildren: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalData, setModalData] = useState<ModalProps | null>(null);
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
    image: {
      gallery: null,
      thumbnail: null,
    },
    harga_perbulan: null,
    harga_pertahun: null,
    kontak: {
      email: "",
      nomor: "",
    },
    nama_kos: "",
  });

  const handleCreateKos = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("nama_kos", formCreateKos.nama_kos);
      formData.append("alamat", formCreateKos.alamat);
      formData.append("tipe_kos", formCreateKos.tipe_kos);
      formData.append(
        "harga_perbulan",
        String(formCreateKos.harga_perbulan ?? "")
      );
      formData.append(
        "harga_pertahun",
        String(formCreateKos.harga_pertahun ?? "")
      );
      formData.append("kontak[email]", formCreateKos.kontak.email);
      formData.append("kontak[nomor]", formCreateKos.kontak.nomor);

      formCreateKos.fasilitas.map((item, key) => {
        formData.append(`fasilitas[${key}][nama]`, item.nama);
        formData.append(`fasilitas[${key}][jumlah]`, item.jumlah);
      });

      if (formCreateKos.image.thumbnail) {
        formData.append("thumbnail", formCreateKos.image.thumbnail);
      }

      if (formCreateKos.image.gallery) {
        formCreateKos.image.gallery.forEach((file) => {
          formData.append("gallery", file);
        });
      }

      const res = await API.post(`/api/kos/create`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(`Berhasil Membuat Kost ${res}`);
      setModalData({
        icon: "success",
        deskripsi: "Mohon Tunggu Konfirmasi Dari Admin",
        title: "Kos Berhasil Ditambahkan",
        confirmButtonColor: "#3572EF",
        confirmButtonText: "Oke",
        onClose: () => {
          setModalData(null);
        },
      });
    } catch (error) {
      console.log(error);
      setModalData({
        icon: "error",
        title: "Gagal Membuat Kost",
        deskripsi: "Mohon Coba Lagi",
        confirmButtonColor: "#3572EF",
        confirmButtonText: "Oke",
        onClose: () => {
          setModalData(null);
        },
      });
    } finally {
      setIsLoading(false);
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
    setFormCreateKos((prev) => {
      const updated = { ...prev, alamat: e.target.value };
      console.log("✅ Alamat updated:", updated); // 🔍 Log hasil update
      return updated;
    });
  };

  const handleTipeKosChange = (e: SelectChangeEvent) => {
    setFormCreateKos((prev) => {
      const updated = { ...prev, tipe_kos: e.target.value };
      console.log("✅ Tipe Kos updated:", updated); // 🔍 Log hasil update
      return updated;
    });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Triger Thumbnail");
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files[0];
      console.log("Thumnail", files);
      setFormCreateKos((prev) => ({
        ...prev,
        image: { ...prev.image, thumbnail: files },
      }));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Trigger Gallery");
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      console.log("Gallery Files", files);

      setFormCreateKos((prev) => ({
        ...prev,
        image: {
          ...prev.image,
          gallery: files,
        },
      }));
    }
  };

  return (
    <Container className="w-full h-screen" as="main">
      {modalData && <Modal {...modalData} />}
      <Container className="flex justify-center items-center w-full h-full flex-col relative">
        <Container className="absolute top-50 inset-0 left-170">
          <Image alt="Icon" src={Icon} width={150} height={150} className="" />
        </Container>
        <Container className="flex justify-center items-center gap-4">
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
                    console.log(e.target.value);
                    const newObj = { ...prev, nama_kos: e.target.value };
                    return newObj;
                  })
                }
              />

              <TextFieldInput
                type="number"
                name="Harga Perbulan"
                label="Harga Perbulan"
                value={formCreateKos.harga_perbulan ?? ""}
                onChange={(e) =>
                  setFormCreateKos((prev) => {
                    console.log(e.target.value);
                    const newObj = {
                      ...prev,
                      harga_perbulan:
                        e.target.value === "" ? null : Number(e.target.value),
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
                value={formCreateKos.harga_pertahun ?? ""}
                onChange={(e) =>
                  setFormCreateKos((prev) => {
                    console.log(e.target.value);
                    const newObj = {
                      ...prev,
                      harga_pertahun:
                        e.target.value === "" ? null : Number(e.target.value),
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
                    console.log(e.target.value);
                    const newObj = {
                      ...prev,
                      kontak: { ...prev.kontak, email: e.target.value },
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
                  console.log(e.target.value);
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
                onChange={(e) => handleGalleryChange(e)}
                multiple={true}
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
              <Container className="flex w-full gap-6 flex-col translate-x-15">
                <Container className="flex justify-center items-center w-full gap-6 ">
                  <TextFieldInput
                    name={`fasilitas-${key}-nama`}
                    value={item.nama}
                    label="Nama Fasilitas"
                    className="w-full max-w-lg"
                    type="text"
                    onChange={(e) => {
                      const newObj = [...formCreateKos.fasilitas];
                      newObj[key].nama = e.target.value;
                      console.log(e.target.value);
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
                      console.log(e.target.value);
                      setFormCreateKos((prev) => ({
                        ...prev,
                        fasilitas: newObj,
                      }));
                    }}
                  />

                  <Button onClick={() => handleHapusColumFasilitas(key)}>
                    <Trash2 />
                  </Button>
                </Container>
              </Container>
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
