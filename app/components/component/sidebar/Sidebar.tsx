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
import { ModalProps } from "../../types/API";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../ui/Container";

const Sidebar: React.FC = () => {
  const [openPopUp, setOpenPopUp] = useState<"Keluar" | null>(null);
  const [modal, setModal] = useState<ModalProps | null>(null);
  const router = useRouter();

  return (
    <Container as="main" className="h-full">
      <Container className="h-full flex justify-center items-center">
        <Container className="border-1 rounded-lg flex flex-col justify-between p-4 h-[90%]">
          {modal && <Modal {...modal} />}

          <Container className="space-y-4">
            <Link href="/profile">
              <Container className="flex gap-x-2 hover:text-sky-600 duration-500 text-[1.8rem] items-center cursor-pointer">
                <User width="16" height="16" className="w-[3vw] h-[3vh]" />
                <h1 className="font-bold">Profile</h1>
              </Container>
            </Link>

            <Link href="/profile/data-kost">
              <Container className="flex gap-x-2 hover:text-sky-600 duration-500 text-[1.8rem] items-center cursor-pointer">
                <File width="16" height="16" className="w-[3vw] h-[3vh]" />
                <h1 className="font-bold">Data Kost</h1>
              </Container>
            </Link>

            <Link href="/profile/simpan-kost">
              <Container className="flex gap-x-2 hover:text-sky-600 duration-500 text-[1.8rem] items-center cursor-pointer">
                <Bookmark width="16" height="16" className="w-[3vw] h-[3vh]" />
                <h1 className="font-bold">Simpan Kost</h1>
              </Container>
            </Link>

            <Link href="/profile/penyewaan">
              <Container className="flex gap-x-2 hover:text-sky-600 duration-500 text-[1.8rem] items-center cursor-pointer">
                <HandCoins width="16" height="16" className="w-[3vw] h-[3vh]" />
                <h1 className="font-bold">Penyewaan</h1>
              </Container>
            </Link>
          </Container>

          <Container className="space-y-4">
            <Link href="/profile/ubah-password">
              <Container className="flex gap-x-2 hover:text-sky-600 duration-500 text-[1.8rem] items-center cursor-pointer">
                <KeyRound width="16" height="16" className="w-[3vw] h-[3vh]" />
                <h1 className="font-bold">Ubah Password</h1>
              </Container>
            </Link>

            <Container className="flex gap-x-2 items-center text-[1.8rem] cursor-pointer">
              <DoorClosed width="16" height="16" className="w-[3vw] h-[3vh]" />
              <button
                className="font-bold text-red-600 cursor-pointer"
                onClick={() => setOpenPopUp("Keluar")}
              >
                Keluar
              </button>

              <PopUp
                isOpen={openPopUp === "Keluar"}
                onClose={() => setOpenPopUp(null)}
              >
                <Container className="flex justify-center items-center flex-col">
                  <h1 className="font-bold text-[2rem] text-center">
                    Apakah anda yakin ingin keluar?
                  </h1>
                  <p className="font-light text-center w-full text-[1rem] mt-2">
                    Anda perlu masuk akun ulang jika ingin melanjutkan aktifitas
                    sebelumnya.
                  </p>
                  <Container className="flex justify-center items-center gap-4 my-4">
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
                  </Container>
                </Container>
              </PopUp>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
export default Sidebar;
