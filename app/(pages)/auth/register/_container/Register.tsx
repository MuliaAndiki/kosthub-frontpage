"use client";
import Link from "next/link";
import Icon from "@/public/asset/icon.png";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import { useRouter } from "next/navigation";
import { ModalProps } from "@/app/types/API";
import API from "@/app/util/API";
import { formRegister } from "@/app/types/form";
import Container from "@/app/components/ui/Container";
import TextFieldInput from "@/app/components/ui/InputField";
import { SelectRole } from "@/app/types/components/index";
import Button from "@/app/components/ui/Button";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";
import { RouteStatiData } from "@/app/core/data/appConfig";
import Select from "@/app/components/ui/Select";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Provensi } from "@/app/core/data/constants/Provensi";
import { userType } from "@/app/types/API";

import {
  GoogleLogin,
  CredentialResponse,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useAppDispatch } from "@/app/hooks/dispatch/dispatch";
import { setCurrentUser } from "@/app/store/reduser/authSlice";

const RegisterChildren: React.FC = () => {
  const dispatch = useAppDispatch();
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
  const [isLoading, setIsloading] = useState<boolean>(true);

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

  const handleLoginGoogle = async (e: CredentialResponse) => {
    try {
      setIsloading(true);
      const googleToken = e.credential;
      const res = await API.post("/api/auth/google", { token: googleToken });
      const userPayload: userType = {
        token: res.data.token,
        user: res.data.user,
      };
      dispatch(setCurrentUser(userPayload));

      const role = res.data.user.role;
      const baseUrl = "/home";
      let redirectPatch = "/";
      if (role === "default") {
        redirectPatch = "/auth/lengkapi-data";
      } else if (role === "user") {
        redirectPatch = `/users/${baseUrl}`;
      } else if (role === "admin") {
        redirectPatch = `/admin${baseUrl}`;
      } else if (role === "owner") {
        redirectPatch === `/owners${baseUrl}`;
      }

      setModalData({
        icon: "success",
        title: "Selamat Datang DiKostHub",
        deskripsi: "Cari KOST Teryamanmu Disini",
        confirmButtonText: "Lanjut",
        confirmButtonColor: "#3572EF",
        onClose: () => {
          setModalData(null);
          router.push(redirectPatch);
        },
      });
    } catch (error) {
      console.log("Gagal Melakukan Login Menggunakan Goggle", error);
    } finally {
      setIsloading(false);
    }
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

  useEffect(() => {
    const time = setTimeout(() => {
      setIsloading(false);
    }, 1000);
    return () => clearTimeout(time);
  }, []);

  return (
    <Container className="w-screen h-screen flex justify-center items-center rounded-tl-lg">
      {isLoading ? (
        <Container className="flex-col ">
          <Container className="flex justify-center items-center h-screen w-full gap-2">
            <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105"></div>
            <p className="text-[2rem] font-light">Loading...</p>
          </Container>
        </Container>
      ) : (
        <Container className="grid grid-cols-1 md:grid-cols-[1fr_2fr] w-full h-full">
          <Container className="bg-[#3572EF] flex justify-center items-center rounded-r-[10rem] p-4">
            <Container className="flex flex-col items-center w-full">
              <Container className="flex justify-center mb-4">
                <Image
                  className="h-[15vh] w-[8vw]"
                  src={Icon.src}
                  alt="Logo"
                  width={1100}
                  height={110}
                />
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

            <Container className="rounded-lg w-150 py-1">
              <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
              >
                <GoogleLogin
                  onSuccess={(e) => handleLoginGoogle(e)}
                  onError={() =>
                    console.log("Gagal Melakukan Login Menggunakan Goggle")
                  }
                />
              </GoogleOAuthProvider>
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
      )}
    </Container>
  );
};

export default RegisterChildren;
