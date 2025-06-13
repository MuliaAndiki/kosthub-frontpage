"use client";
import Link from "next/link";
import Icon from "@/public/asset/icon.png";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/app/components/component/modal/Modal";
import { useRouter } from "next/navigation";
import { ModalProps } from "@/app/components/types/API";
import API from "@/app/components/core/util/API";

import { formRegister } from "@/app/components/types/form";
import Container from "@/app/components/component/ui/Container";
import TextFieldInput from "@/app/components/component/ui/InputField";
import { SelectRole } from "@/app/components/types/components/index";
import Button from "@/app/components/component/ui/Button";
import { MedsosData } from "@/app/components/core/data/appConfig";
import ButtonPrimary from "@/app/components/component/ui/ButtonPrimary";
import { RouteStatiData } from "@/app/components/core/data/appConfig";
import Select from "@/app/components/component/ui/Select";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Provensi } from "@/app/components/core/data/constants/Provensi";

const RegisterChildren: React.FC = () => {
  const [formRegister, setFormRegister] = useState<formRegister>({
    username: "",
    alamat: "",
    email: "",
    fullname: "",
    gender: null,
    nomor: "",
    password: "",
    role: "",
    tanggal_lahir: "",
  });
  const [modalData, setModalData] = useState<ModalProps | null>(null);
  const router = useRouter();
  const [selectRole] = useState<SelectRole>({
    owner: "",
    user: "",
  });

  const handleRegister = () => {
    if (
      !formRegister.username ||
      !formRegister.password ||
      !formRegister.email ||
      !formRegister.fullname ||
      !formRegister.tanggal_lahir ||
      !formRegister.gender === null ||
      !formRegister.nomor ||
      !formRegister.alamat ||
      !formRegister.role
    ) {
      setModalData({
        title: "Registrasi Gagal",
        icon: "warning",
        deskripsi: "Semua field harus diisi!",
        confirmButtonColor: "#3572EF",
        confirmButtonText: "Coba Lagi",
        onClose: () => setModalData(null),
      });
      return;
    }

    API.post("/api/auth/register", formRegister)
      .then((res) => {
        setModalData({
          title: "Berhasil Daftar",
          icon: "success",
          deskripsi: "Selamat Datang di KostHub",
          confirmButtonText: "Lanjut",
          confirmButtonColor: "#3572EF",
          onClose: () => {
            setModalData(null);
            router.push("/auth/login");
          },
        });
      })
      .catch((err) => {
        console.log("Gagal register akun:", err);
        setModalData({
          title: "Gagal Daftar",
          icon: "error",
          deskripsi:
            err.response?.data?.message || "Terjadi kesalahan saat registrasi",
          confirmButtonColor: "#3572EF",
          confirmButtonText: "Coba Lagi",
          onClose: () => setModalData(null),
        });
      });
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setFormRegister((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  const handleAlamatChange = (e: SelectChangeEvent) => {
    setFormRegister((prev) => ({
      ...prev,
      alamat: e.target.value,
    }));
  };

  const handleGenderChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    const booleanValue =
      value === "true" ? true : value === "false" ? false : null;

    setFormRegister((prev) => ({
      ...prev,
      gender: booleanValue,
    }));
  };

  return (
    <Container className="w-screen h-screen flex justify-center items-center rounded-tl-lg">
      <Container className="grid grid-cols-1 md:grid-cols-[1fr_2fr] w-full h-full">
        <Container className="bg-[#3572EF] flex justify-center items-center rounded-r-[10rem] p-4">
          <Container className="flex flex-col items-center w-full">
            <Container className="flex justify-center mb-4">
              <img className="h-[15vh] w-[8vw]" src={Icon.src} alt="Logo" />
            </Container>

            <h1 className="text-[2rem] md:text-[3rem] font-bold text-white text-center mb-4">
              Selamat Datang Kembali!
            </h1>
            <p className="text-lg md:text-2xl font-light text-center text-white mb-6 px-4">
              Masukkan Data Personalmu Dengan Lengkap
            </p>
            {RouteStatiData.map((items, key) => (
              <Link key={key} href={items.login.href}>
                <ButtonPrimary>{items.login.title}</ButtonPrimary>
              </Link>
            ))}
          </Container>
        </Container>

        <Container className="flex flex-col justify-center items-center bg-white px-6 py-8 md:px-12 md:py-10 overflow-y-auto">
          <h1 className=" md:text-[3rem] font-bold mb-6 text-[4rem]">
            Daftar Akun
          </h1>

          <Container className="grid grid-cols-4 gap-4 mb-4">
            {MedsosData.map((items, key) => (
              <Link key={key} href={items.href}>
                <Image src={items.image} alt="Medsos" />
              </Link>
            ))}
          </Container>

          <p className="text-gray-600 text-sm mb-6 text-center">
            Masukkan Data Lengkapmu-
          </p>

          <Container className="flex w-150 flex-col gap-4">
            <TextFieldInput
              label="Fullname"
              name={formRegister.fullname}
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600 my-2 "
              onChange={(e) =>
                setFormRegister((prev) => {
                  const newObj = { ...prev, fullname: e.target.value };

                  return newObj;
                })
              }
              value={formRegister.fullname}
            />
            <TextFieldInput
              label="Email"
              type="email"
              name={formRegister.email}
              value={formRegister.email}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600 "
              onChange={(e) =>
                setFormRegister((prev) => {
                  const newObj = { ...prev, email: e.target.value };

                  return newObj;
                })
              }
            />
            <Container className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextFieldInput
                label="Username"
                type="text"
                name={formRegister.username}
                value={formRegister.username}
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                onChange={(e) =>
                  setFormRegister((prev) => {
                    const newObj = { ...prev, username: e.target.value };

                    return newObj;
                  })
                }
              />

              <TextFieldInput
                type="date"
                name={formRegister.tanggal_lahir}
                value={formRegister.tanggal_lahir}
                onChange={(e) =>
                  setFormRegister((prev) => {
                    const newObj = { ...prev, tanggal_lahir: e.target.value };

                    return newObj;
                  })
                }
              />
            </Container>

            <Container className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextFieldInput
                label="Password"
                type="password"
                name={formRegister.password}
                value={formRegister.password}
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                onChange={(e) =>
                  setFormRegister((prev) => {
                    const newObj = { ...prev, password: e.target.value };

                    return newObj;
                  })
                }
              />

              <TextFieldInput
                label="NomorHp"
                type="text"
                name={formRegister.nomor}
                value={formRegister.nomor}
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                onChange={(e) =>
                  setFormRegister((prev) => {
                    const newObj = { ...prev, nomor: e.target.value };

                    return newObj;
                  })
                }
              />
            </Container>
            <Select
              name="Alamat"
              value={formRegister.alamat}
              onChange={(e) => handleAlamatChange(e)}
            >
              {Provensi.map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </Container>

          <Container className="my-2 grid grid-cols-1 sm:grid-cols-2 gap-14  w-[40%]">
            <Select
              name="Pilih Role Anda"
              value={formRegister.role}
              onChange={(e) => handleRoleChange(e)}
            >
              {Object.entries(selectRole).map(([key]) => (
                <MenuItem key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </MenuItem>
              ))}
            </Select>

            <Select
              name="Jenis Kelamin "
              value={
                formRegister.gender === null
                  ? ""
                  : formRegister.gender === true
                  ? "true"
                  : "false"
              }
              onChange={(e) => handleGenderChange(e)}
            >
              <MenuItem value="true">Pria</MenuItem>
              <MenuItem value="false">Wanita</MenuItem>
            </Select>
          </Container>
          <Container className="w-[20%]">
            <Button onClick={() => handleRegister()}>Daftar</Button>
          </Container>

          {modalData && <Modal {...modalData} />}
        </Container>
      </Container>
    </Container>
  );
};

export default RegisterChildren;
