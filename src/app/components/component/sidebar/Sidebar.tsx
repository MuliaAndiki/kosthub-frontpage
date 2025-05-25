"use client";
import Link from "next/link";
import {
  User,
  File,
  HandCoins,
  Bookmark,
  KeyRound,
  DoorClosed,
} from "lucide-react";
import PopUp from "../modal/PopUp";
import Modal from "../modal/Modal";
import { ModalProps } from "../../type/API";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const [openPopUp, setOpenPopUp] = useState<"Keluar" | null>(null);
  const [modal, setModal] = useState<ModalProps | null>(null);
  const router = useRouter();

  return (
    <div
      className="border-1 rounded-lg flex flex-col justify-between p-2"
      title="side-kiri"
    >
      {modal && <Modal {...modal} />}
      <div title="side-top ">
        <Link href="/profile">
          <div className="flex gap-x-2 hover:text-sky-600 duration-[0.5s] text-[1.8rem] items-center">
            <User width="16" hanging="16" className="w-[3vw] h-[3vh]" />
            <h1 className="font-bold">Profile</h1>
          </div>
        </Link>
        <Link href="/profile/data-kost">
          <div className="flex gap-x-2 hover:text-sky-600 duration-[0.5s] items-center text-[1.8rem]">
            <File width="16" hanging="16" className="w-[3vw] h-[3vh]" />
            <h1 className="font-bold">Data Kost</h1>
          </div>
        </Link>

        <Link href="/profile/simpan-kost">
          <div className="flex gap-x-2 hover:text-sky-600 duration-[0.5s] items-center text-[1.8rem]">
            <Bookmark width="16" hanging="16" className="w-[3vw] h-[3vh]" />
            <h1 className="font-bold">Simpan Kost</h1>
          </div>
        </Link>
        <Link href="/profile/riwayat-transaksi">
          <div className="flex gap-x-2 hover:text-sky-600 duration-[0.5s] items-center text-[1.8rem]">
            <HandCoins width="16" hanging="16" className="w-[3vw] h-[3vh]" />
            <h1 className="font-bold">Penyewaan</h1>
          </div>
        </Link>
      </div>

      <div title="side-bot ">
        <Link href="/profile/ubah-password">
          <div className="flex gap-x-2 hover:text-sky-600 duration-[0.5s] items-center text-[1.8rem]">
            <KeyRound width="16" hanging="16" className="w-[3vw] h-[3vh]" />
            <h1 className="font-bold">Ubah Password</h1>
          </div>
        </Link>

        <div className="flex gap-x-2 items-center text-[1.8rem]">
          <DoorClosed width="16" hanging="16" className="w-[3vw] h-[3vh] " />
          <button
            className="font-bold text-red-600 cursor-pointer "
            onClick={() => setOpenPopUp("Keluar")}
          >
            Keluar
          </button>

          <PopUp
            isOpen={openPopUp === "Keluar"}
            onClose={() => setOpenPopUp(null)}
          >
            <div className="flex justify-center items-center flex-col ">
              <h1 className="font-bold text-[2rem] text-center">
                Apakah anda yakin ingin keluar?
              </h1>
              <p className="font-light text-center w-100 text-[1rem] mt-2">
                Anda perlu masuk akun ulang jika ingin melanjutkan aktifitas
                sebelumnya
              </p>
              <div className="flex justify-center items-center gap-4 my-4">
                <button
                  className="font-bold bg-red-600 p-2 rounded-md text-white cursor-pointer"
                  onClick={() => setOpenPopUp(null)}
                >
                  Tidak
                </button>
                <button
                  className="font-bold bg-[#06BE37] p-2 rounded-md text-white cursor-pointer"
                  onClick={() => {
                    setModal({
                      title: "Keluar",
                      deskripsi: "",
                      icon: "success",
                      onClose: () => {
                        setModal(null);
                        setOpenPopUp(null);
                        router.push("/landing-page");
                      },
                    });
                  }}
                >
                  Yakin
                </button>
              </div>
            </div>
          </PopUp>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
