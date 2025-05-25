"use client";
import Link from "next/link";
import Icon from "../../../../../../public/asset/icon.png";
import GogleIcon from "../../../../../../public/asset/GogleIcon.png";
import FacebookIcon from "../../../../../../public/asset/Facebook.png";
import LinkIn from "../../../../../../public/asset/Linkin.png";
import Github from "../../../../../../public/asset/GitHub.png";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/app/components/component/modal/Modal";
import { useRouter } from "next/navigation";
import { ModalProps } from "@/app/components/type/API";
import API from "@/app/components/util/API";
import { useHook } from "@/app/components/component/hooks/Kontex";
import { formRegister } from "@/app/components/type/form";

const RegisterComponent: React.FC = () => {
  const { setCurrentUser } = useHook();
  const [formRegister, setFormRegister] = useState<formRegister>({
    username: "",
    email: "",
    fullname: "",
    gender: null,
    nomor: "",
    password: "",
    tanggal_lahir: "",
    alamat: "",
  });

  const [modalData, setModalData] = useState<ModalProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !formRegister.username ||
        !formRegister.email ||
        !formRegister.fullname ||
        !formRegister.gender ||
        !formRegister.nomor ||
        !formRegister.password ||
        !formRegister.tanggal_lahir
      ) {
        setModalData({
          title: "Mohon Isi Semua Kolom",
          icon: "warning",
          deskripsi: "",
          confirmButtonColor: "#3572EF",
          confirmButtonText: "Try Again!",
          onClose: () => {
            setModalData(null);
          },
        });
        return;
      }
      const res = await API.post(`/api/auth/register`, formRegister);
      console.log("Berhasil Register", res);
      setModalData({
        title: "Selamar Anda Berhasil Melakukan Register Register",
        deskripsi: "Ayo Mulai Mencari KOSTMU",
        icon: "success",
        confirmButtonColor: "#3572EF",
        confirmButtonText: "Lanjut",
        onClose: () => {
          setModalData(null);
          router.push("/");
        },
      });
    } catch (error) {
      console.log("Gagal Melalukan Register", error);
      setModalData({
        title: "Gagal Melakukan Register",
        deskripsi: "Mohon Cek Kelengkapan Anda",
        icon: "error",
        confirmButtonColor: "#3572EF",
        confirmButtonText: "Mohon Coba Lagi",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center rounded-tl-lg">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] w-full h-full">
        <div className="bg-[#3572EF] flex justify-center items-center rounded-r-[10rem] p-4">
          <div className="flex flex-col items-center w-full">
            <div className="flex justify-center mb-4">
              <img className="h-[15vh] w-[8vw]" src={Icon.src} alt="Logo" />
            </div>

            <h1 className="text-[2rem] md:text-[3rem] font-bold text-white text-center mb-4">
              Selamat Datang Kembali!
            </h1>
            <p className="text-lg md:text-2xl font-light text-center text-white mb-6 px-4">
              Masukkan Data Personalmu Dengan Lengkap
            </p>

            <Link href="/auth/login">
              <button className="border-2 rounded-full text-[1rem] text-white hover:bg-sky-800 transition duration-300 w-32 h-10 shadow-lg">
                Masuk
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-white px-6 py-8 md:px-12 md:py-10 overflow-y-auto">
          <h1 className=" md:text-[3rem] font-bold mb-6 text-[4rem]">
            Daftar Akun
          </h1>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <Image
              src={GogleIcon}
              alt="Google"
              width={40}
              height={40}
              className="cursor-pointer"
            />
            <Image
              src={FacebookIcon}
              alt="Facebook"
              width={40}
              height={40}
              className="cursor-pointer"
            />
            <Image
              src={LinkIn}
              alt="LinkedIn"
              width={40}
              height={40}
              className="cursor-pointer"
            />
            <Image
              src={Github}
              alt="GitHub"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </div>

          <p className="text-gray-600 text-sm mb-6 text-center">
            Masukkan Data Lengkapmu
          </p>

          {modalData && <Modal {...modalData} />}

          <form onSubmit={handleRegister} className="w-full max-w-md space-y-4">
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
              placeholder="Nama Lengkap"
              value={formRegister.fullname}
              onChange={(e) =>
                setFormRegister((prev) => {
                  const newObj = { ...prev, fullname: e.target.value };
                  return newObj;
                })
              }
            />
            <input
              type="email"
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
              placeholder="kostHub@example.com"
              value={formRegister.email}
              onChange={(e) =>
                setFormRegister((prev) => {
                  const newObj = { ...prev, email: e.target.value };
                  return newObj;
                })
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                placeholder="Username"
                value={formRegister.username}
                onChange={(e) =>
                  setFormRegister((prev) => {
                    const newObj = { ...prev, username: e.target.value };
                    return newObj;
                  })
                }
              />
              <input
                type="date"
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                value={formRegister.tanggal_lahir}
                onChange={(e) =>
                  setFormRegister((prev) => {
                    const newObj = { ...prev, tanggal_lahir: e.target.value };
                    return newObj;
                  })
                }
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="password"
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                placeholder="Password"
                value={formRegister.password}
                onChange={(e) =>
                  setFormRegister((prev) => {
                    const newObj = { ...prev, password: e.target.value };
                    return newObj;
                  })
                }
              />
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                placeholder="Nomor Telepon (+62)"
                value={formRegister.nomor}
                onChange={(e) =>
                  setFormRegister((prev) => {
                    const newObj = { ...prev, nomor: e.target.value };
                    return newObj;
                  })
                }
              />
            </div>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
              placeholder="Alamat"
              value={formRegister.alamat}
              onChange={(e) =>
                setFormRegister((prev) => {
                  const newObj = { ...prev, alamat: e.target.value };
                  return newObj;
                })
              }
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Kelamin
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="Laki"
                    checked={formRegister.gender === "Laki"}
                    onChange={(e) =>
                      setFormRegister((prev) => {
                        const newObj = { ...prev, gender: e.target.value };
                        return newObj;
                      })
                    }
                    className="w-4 h-4"
                  />
                  Laki-Laki
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="Perempuan"
                    checked={formRegister.gender === "Perempuan"}
                    onChange={(e) =>
                      setFormRegister((prev) => {
                        const newObj = { ...prev, gender: e.target.value };
                        return newObj;
                      })
                    }
                    className="w-4 h-4"
                  />
                  Perempuan
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-full py-2 hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Daftar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
