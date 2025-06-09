"use client";
import NavbarProfil from "@/app/components/component/navbar/NavbarProfil";
import Sidebar from "@/app/components/component/sidebar/Sidebar";
import Image from "next/image";
import profile from "@/public/asset/prfilhd.png";
import { useState } from "react";
import API from "@/app/components/util/API";
import { ModalProps } from "@/app/components/types/API";
import Modal from "@/app/components/component/modal/Modal";
import { useHook } from "@/app/components/component/hooks/auth";
import { useRouter } from "next/navigation";
import PopUp from "@/app/components/component/modal/PopUp";
import { formUbahPassword } from "@/app/components/types/form";
import Container from "@/app/components/component/ui/Container";
import TextFieldInput from "@/app/components/component/ui/InputField";
import Button from "@/app/components/component/ui/Button";
import ButtonPopUp from "@/app/components/component/ui/ButtonPopup";

const UbahPasswordChildren: React.FC = () => {
  const { currentUser } = useHook();
  const [formUbahPassword, setFormUbahPassword] = useState<formUbahPassword>({
    oldPassword: "",
    newPassword: "",
  });

  const [modalData, setModalData] = useState<ModalProps | null>(null);
  const [openPopUp, setOpenPopUp] = useState<"NewPassword" | null>(null);
  const router = useRouter();

  const handlePassword = () => {
    API.put("/api/auth/change-password", formUbahPassword, {
      headers: {
        Authorization: `Bearer ${currentUser?.token}`,
      },
    })
      .then((res) => {
        console.log("Berhasil", res);
      })
      .catch((err) => {
        setModalData({
          title: "Gagal ganti password",
          deskripsi: "Gagal mohon coba lagi",
          icon: "error",
          confirmButtonColor: "#3572EF",
          confirmButtonText: "Try again ",
          onClose: () => {
            setModalData(null);
            console.log("Gagal Ubah password", err);
          },
        });
      });
  };

  return (
    <Container as="main" className="h-screen w-screen overflow-hidden">
      <Container className="inset-x-0 top-0 h-16">
        <NavbarProfil />
      </Container>

      <Container className="flex flex-col md:grid md:grid-cols-[0.4fr_2fr] md:grid-rows-1 gap-1 pt-[3vh] h-[93vh]">
        <Sidebar />
        <Container className="flex justify-center items-center overflow-y-auto p-4">
          <Container className="flex flex-col md:flex-row justify-around items-center w-full gap-6">
            <Container className="flex justify-center items-center">
              <Image
                src={profile}
                alt="profil"
                width={300}
                height={100}
                className="w-40 h-40 md:w-72 md:h-72 object-cover rounded-full"
              />
            </Container>

            <Container className="w-full max-w-md">
              <Container className="rounded-md flex flex-col justify-center items-center gap-4">
                <TextFieldInput
                  name={formUbahPassword.oldPassword}
                  value={formUbahPassword.oldPassword}
                  label="Kata Sandi Lama"
                  className="w-full"
                  onChange={(e) =>
                    setFormUbahPassword((prev) => ({
                      ...prev,
                      oldPassword: e.target.value,
                    }))
                  }
                />
                <TextFieldInput
                  name={formUbahPassword.newPassword}
                  value={formUbahPassword.newPassword}
                  label="Kata Sandi Baru"
                  className="w-full"
                  onChange={(e) =>
                    setFormUbahPassword((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                />
                <Button onClick={() => setOpenPopUp("NewPassword")}>
                  Ubah
                </Button>
              </Container>
            </Container>

            <PopUp
              isOpen={openPopUp === "NewPassword"}
              onClose={() => setOpenPopUp(null)}
            >
              <Container className="flex justify-center items-center flex-col">
                <h1 className="text-[1.3rem] font-bold w-60 text-center mb-4">
                  Apakah Anda Yakin Ingin Merubah Password
                </h1>
                <Container className="flex justify-center items-center gap-4">
                  <ButtonPopUp
                    message="error"
                    onClick={() => setOpenPopUp(null)}
                  >
                    Tidak
                  </ButtonPopUp>
                  <ButtonPopUp
                    message="success"
                    onClick={() => {
                      handlePassword();
                      setModalData({
                        title: "Berhasil ganti password",
                        deskripsi: "Selamat Password Anda Berubah",
                        icon: "success",
                        confirmButtonColor: "#3572EF",
                        confirmButtonText: "lanjut",
                        onClose: () => {
                          setModalData(null);
                          setOpenPopUp(null);
                          router.push("/profile");
                        },
                      });
                    }}
                  >
                    Yakin
                  </ButtonPopUp>
                </Container>
              </Container>
            </PopUp>

            {modalData && <Modal {...modalData} />}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default UbahPasswordChildren;
