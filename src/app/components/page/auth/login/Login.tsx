"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "../../../../../../public/asset/icon.png";
import GogleIcon from "../../../../../../public/asset/GogleIcon.png";
import FacebookIcon from "../../../../../../public/asset/Facebook.png";
import LinkIn from "../../../../../../public/asset/Linkin.png";
import Github from "../../../../../../public/asset/GitHub.png";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/app/components/component/modal/Modal";
import { ModalProps, userType } from "@/app/components/type/API";
import API from "@/app/components/util/API";
import { useHook } from "@/app/components/component/hooks/Kontex";
import { formLogin } from "@/app/components/type/form";

const LoginComponent: React.FC = () => {
  const { setCurrentUser } = useHook();
  const [formLogin, setFormLogin] = useState<formLogin>({
    username: "",
    password: "",
  });
  const [modalData, setModalData] = useState<ModalProps | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [animasi, setAnimasi] = useState<boolean>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formLogin.username || !formLogin.password) {
        setModalData({
          title: " Mohon Isi Semu",
          icon: "warning",
          deskripsi: "Mohon Cek Kembali Kembali Seluruh Kolom",
          confirmButtonColor: "#3572EF",
          confirmButtonText: "Coba Lagi",
          onClose: () => {
            setModalData(null);
          },
        });
      }
      const res = await API.post(`/api/auth/login`, formLogin);
      console.log("Berhasil Login", res);
      setModalData({
        title: "Behasil Login",
        deskripsi: "Selamat Datang Di KostHub",
        icon: "success",
        confirmButtonColor: "#3572EF",
        confirmButtonText: "Lanjut",
        onClose: () => {
          setModalData(null);
          router.push(`/home`);
        },
      });
      const userPaylod: userType = {
        token: res.data.token,
        user: res.data.user,
      };
      setCurrentUser(userPaylod);
    } catch (error) {
      console.log("Gagal Login", error);
      setModalData({
        title: "Gagal Melakukan Login",
        deskripsi: "Mohon Cek Kembali",
        icon: "error",
        confirmButtonColor: "#3572EF",
        confirmButtonText: "Coba Lagi",
        onClose: () => {
          setModalData(null);
        },
      });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center rounded-tl-lg">
      <div className="grid grid-cols-[2fr_1fr] grid-rows-1 gap-4">
        <div className="flex justify-center items-center" id="kiri">
          <div id="side-kiri" className="w-full max-w-lg mx-auto p-6">
            <div className="flex justify-center py-4">
              <h1 className="text-4xl font-bold text-[4rem]">Masuk</h1>
            </div>

            <div className="grid grid-cols-4 gap-4 py-4" id="icon-login">
              <button
                className="flex justify-center"
                aria-label="Sign in with Google"
              >
                <Image src={GogleIcon} alt="Google" width={40} height={40} />
              </button>
              <button
                className="flex justify-center"
                aria-label="Sign in with Facebook"
              >
                <Image
                  src={FacebookIcon}
                  alt="Facebook"
                  width={40}
                  height={40}
                />
              </button>
              <button
                className="flex justify-center"
                aria-label="Sign in with LinkedIn"
              >
                <Image src={LinkIn} alt="LinkedIn" width={40} height={40} />
              </button>
              <button
                className="flex justify-center"
                aria-label="Sign in with Github"
              >
                <Image src={Github} alt="Github" width={40} height={40} />
              </button>
            </div>

            <div className="text-center py-2">
              <p className="text-gray-600">
                Masukkan Username dan Password Untuk Masuk
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                  placeholder="Masukan username"
                  value={formLogin.username}
                  onChange={(e) =>
                    setFormLogin((prev) => {
                      const newObj = { ...prev, username: e.target.value };
                      return newObj;
                    })
                  }
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={isLoading ? "text" : "password"}
                    className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                    placeholder="Masukan password"
                    value={formLogin.password}
                    onChange={(e) =>
                      setFormLogin((prev) => {
                        const newObj = { ...prev, password: e.target.value };
                        return newObj;
                      })
                    }
                    required
                    aria-required="true"
                  />
                  <button
                    type="button"
                    onClick={() => setIsLoading((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                    aria-label={isLoading ? "Hide password" : "Show password"}
                  >
                    {isLoading ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h1 className="">Lupa Password?</h1>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-full py-2 hover:bg-blue-700 transition duration-300 shadow-md disabled:bg-blue-400 flex justify-center items-center"
                aria-label="Masuk"
              >
                {animasi ? (
                  <div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                  ></div>
                ) : (
                  "Masuk"
                )}
              </button>
            </form>
          </div>
        </div>
        <div
          className="bg-[#3572EF] flex justify-center items-center rounded-l-[10rem] h-[100vh] p-2"
          id="kanan"
        >
          <div className="" id="sidebar Container">
            <div className="flex justify-center" id="icon">
              <Image
                className="h-[15vh] w-[8vw]"
                src={Icon}
                alt="Logo"
                height="10"
                width="100"
              />
            </div>

            <div className="flex justify-center pt-[2rem]" id="text">
              <h1 className="text-[3rem] font-extrabold text-white">
                Halo, Teman!
              </h1>
            </div>

            <div className="flex justify-center py-[2rem]" id="Paragraf">
              <p className="text-[2rem] font-light text-white text-center">
                Daftarkan Dirimu Untuk Menikmati Layanan Kami
              </p>
            </div>

            <div className="flex justify-center" id="sign Up">
              <Link href="/auth/register">
                <button className="border-2 rounded-full text-[1rem] text-white hover:bg-sky-800 duration-[1s] w-[8vw] h-[4vh] shadow-lg">
                  Daftar
                </button>
              </Link>
            </div>
            {modalData && <Modal {...modalData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
