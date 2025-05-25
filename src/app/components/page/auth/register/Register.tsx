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

const RegisterComponent: React.FC = () => {
  const { setCurrentUser } = useHook();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tanggal_lahir, setTanggal_lahir] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [nomor, setNomor] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [modalData, setModalData] = useState<ModalProps | null>(null);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !username ||
      !password ||
      !email ||
      !fullname ||
      !tanggal_lahir ||
      !gender ||
      !nomor ||
      !alamat
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
    API.post("/api/auth/register", {
      username,
      password,
      email,
      tanggal_lahir,
      fullname,
      gender,
      nomor,
      alamat,
    })
      .then((res) => {
        setCurrentUser(res.data.user);
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

  const handleChange = (value: string) => {
    setGender((prev) => (prev === value ? "" : value));
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

          <form onSubmit={handleRegister} className="w-full max-w-md space-y-4">
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
              placeholder="Nama Lengkap"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <input
              type="email"
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
              placeholder="kostHub@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="date"
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                value={tanggal_lahir}
                onChange={(e) => setTanggal_lahir(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="password"
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
                placeholder="Nomor Telepon (+62)"
                value={nomor}
                onChange={(e) => setNomor(e.target.value)}
              />
            </div>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-600"
              placeholder="Alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
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
                    checked={gender === "Laki"}
                    onChange={() => handleChange("Laki")}
                    className="w-4 h-4"
                  />
                  Laki-Laki
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value="Perempuan"
                    checked={gender === "Perempuan"}
                    onChange={() => handleChange("Perempuan")}
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

          {modalData && <Modal {...modalData} />}
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
