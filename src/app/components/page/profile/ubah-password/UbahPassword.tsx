"use client";
import NavbarProfil from "@/app/components/component/navbar/NavbarProfil";
import Sidebar from "@/app/components/component/sidebar/Sidebar";
import Image from "next/image";
import profile from "../../../../../../public/asset/prfilhd.png";
import { useState } from "react";
import API from "@/app/components/util/API";
import { ModalProps } from "@/app/components/type/API";
import Modal from "@/app/components/component/modal/Modal";
import { useHook } from "@/app/components/component/hooks/Kontex";
import { useRouter } from "next/navigation";
import PopUp from "@/app/components/component/modal/PopUp";

const UbahPasswordComponent: React.FC = () => {
  const { currentUser } = useHook();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [modalData, setModalData] = useState<ModalProps | null>(null);
  const [openPopUp, setOpenPopUp] = useState<"NewPassword" | null>(null);
  const router = useRouter();

  const handlePassword = () => {
    API.put(
      "/api/auth/change-password",
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      }
    )
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
    <>
      <div className="h-screen w-screen">
        <div className=" inset-x-0 top-0 h-16">
          <NavbarProfil />
        </div>

        <div className="grid grid-cols-[0.4fr_2fr] grid-rows-1 gap-1 pt-[3vh]  h-[93vh]">
          <Sidebar />
          <div className="flex justify-center items-center">
            <div className="flex justify-around items-center w-full">
              <div className=" rounded-md flex justify-center  items-center ">
                <div className="">
                  <Image
                    src={profile}
                    alt="profil"
                    width={300}
                    height={100}
                    className=""
                  />
                </div>
              </div>
              <div className=" rounded-md h-full flex justify-center items-center">
                <div className="">
                  <div className="flex-col">
                    <div>
                      <label htmlFor="">Password Lama :</label>
                      <br />
                      <input
                        type="password"
                        value={oldPassword}
                        className="border-2 w-[30vw] rounded-md p-2"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="">Password Baru:</label>
                      <br />
                      <input
                        type="password"
                        className="border-2 w-[30vw] rounded-md p-2"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    <button
                      className="border-2 w-[30vw] rounded-md p-2 bg-sky-600 mt-4 cursor-pointer"
                      onClick={() => setOpenPopUp("NewPassword")}
                    >
                      Ubah
                    </button>
                  </div>
                  <PopUp
                    isOpen={openPopUp === "NewPassword"}
                    onClose={() => setOpenPopUp(null)}
                  >
                    <div className="flex justify-center items-center flex-col">
                      <h1 className="text-[1.3rem] font-bold w-60 text-center">
                        Apakah Anda Yakin Ingin Merubah Password
                      </h1>
                      <div className="flex justify-center items-center gap-4 ">
                        <button
                          className="p-2 bg-red-600 rounded-md text-white font-bold cursor-pointer"
                          onClick={() => setOpenPopUp(null)}
                        >
                          Tidak
                        </button>
                        <button
                          className="p-2 bg-[#58CC41] rounded-md text-white font-bold cursor-pointer"
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
                        </button>
                      </div>
                    </div>
                  </PopUp>

                  {modalData && <Modal {...modalData} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UbahPasswordComponent;
