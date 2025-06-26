"use client";
import Link from "next/link";
import { DoorClosed } from "lucide-react";
import PopUp from "../modal/PopUp";
import Modal from "../modal/Modal";
import { ModalProps } from "../../types/API";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../ui/Container";
import ButtonPopUp from "../ui/ButtonPopup";
import Button from "../ui/Button";
import { RouteStaticProfileData } from "../../core/data/appConfig";
import { useAppSelector } from "../../hooks/dispatch/dispatch";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [openPopUp, setOpenPopUp] = useState<"Keluar" | null>(null);
  const [modal, setModal] = useState<ModalProps | null>(null);
  const router = useRouter();

  const RoleSideHiden = [
    "/profile/data-kost",
    "/profile/simpan-kost",
    "/profile/penyewaan",
    "/information",
    "/profile/ubah-password",
  ];

  const handleFilterMenu = RouteStaticProfileData.filter((item) => {
    if (
      currentUser?.user.role === "owner" &&
      RoleSideHiden.includes(item.href)
    ) {
      return false;
    } else if (
      currentUser?.user.role === "admin" &&
      RoleSideHiden.includes(item.href)
    ) {
      return false;
    }
    return true;
  });
  return (
    <Container as="main" className="h-full w-full p-4">
      {modal && <Modal {...modal} />}

      <Container className="flex flex-col justify-between h-full  rounded-lg p-4">
        <Container className="">
          {handleFilterMenu.map((items, key) => (
            <Link key={key} href={items.href} className="flex gap-4">
              <motion.div
                whileHover={{
                  x: [0, -1, 1, -1, 1, 0],
                  y: [0, -1, 1, -1, 1, 0],
                }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 cursor-pointer "
              >
                <items.icon />
              </motion.div>

              <span className="font-bold text-lg hover:text-blue-400 duration-[0.3s]">
                {items.label}
              </span>
            </Link>
          ))}
        </Container>

        <Container className="mt-8">
          <Button onClick={() => setOpenPopUp("Keluar")}>
            <DoorClosed size={24} className="" />
            <span className="font-semibold">Keluar</span>
          </Button>

          <PopUp
            isOpen={openPopUp === "Keluar"}
            onClose={() => setOpenPopUp(null)}
          >
            <Container className="flex flex-col items-center text-center space-y-4 p-4">
              <h1 className="font-bold text-2xl">
                Apakah anda yakin ingin keluar?
              </h1>
              <p className="text-sm font-light">
                Anda perlu masuk akun ulang jika ingin melanjutkan aktifitas
                sebelumnya.
              </p>
              <Container className="flex gap-4">
                <ButtonPopUp message="error" onClick={() => setOpenPopUp(null)}>
                  Tidak
                </ButtonPopUp>
                <ButtonPopUp
                  message="success"
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
                </ButtonPopUp>
              </Container>
            </Container>
          </PopUp>
        </Container>
      </Container>
    </Container>
  );
};

export default Sidebar;
