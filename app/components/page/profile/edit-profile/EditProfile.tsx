"use client";
import NavbarProfil from "@/app/components/component/navbar/NavbarProfil";
import Sidebar from "@/app/components/component/sidebar/Sidebar";
import Image from "next/image";
import profilehd from "@/public/asset/prfilhd.png";
import { useState } from "react";
import Modal from "@/app/components/component/modal/Modal";
import { ModalProps } from "@/app/components/types/API";
import { useRouter } from "next/navigation";
import { useHook } from "@/app/components/component/hooks/auth";
import API from "@/app/components/util/API";
import PopUp from "@/app/components/component/modal/PopUp";

const EditProfileChildren: React.FC = () => {
  const { setCurrentUser, currentUser } = useHook();
  const [fullname, setFullName] = useState<string>("");
  const [tanggal_lahir, setTanggal_Lahir] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nomor, setNomor] = useState<string>("");
  const [gender, setGender] = useState<boolean | undefined>(undefined);
  const [bio, setBio] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [modalData, setModalData] = useState<ModalProps | null>(null);
  const [fotoProfile, setFotoProfile] = useState<File | null>(null);
  const [openPopUp, setOpenPopUp] = useState<"Edit" | null>(null);
  const router = useRouter();

  const data = {
    fotoProfile,
    fullname,
    tanggal_lahir,
    nomor,
    email,
    gender,
    bio,
    alamat,
  };

  const filter = Object.fromEntries(
    Object.entries(data).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );

  const handleEditProfile = () => {
    API.put(
      "/api/auth/update-profile",
      {
        username: currentUser?.user.username,
        ...filter,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      }
    )
      .then((res) => {
        setCurrentUser(res.data);
        setAlamat("");
        setBio("");
        setEmail("");
        setFullName("");
        setNomor("");
      })
      .catch((err) => {
        console.log("gagal Update", err);
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
          <div className="">
            <div
              className="grid grid-cols-[1fr_2fr] grid-rows-1 gap-1 h-full w-full"
              title="side-kanan"
            >
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={profilehd}
                  alt="profil"
                  width={300}
                  height={300}
                  className=""
                />
                <input
                  type="file"
                  className="border-2 p-2 mt-2 rounded-md bg-gray-400 w-[11vw] hover:bg-gray-600 duration-[0.3s]"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFotoProfile(file);
                    }
                  }}
                />
              </div>

              <div className=" flex justify-center items-center">
                <div>
                  <div className="grid grid-cols-1 grid-rows-2 gap-2">
                    <div className="flex items-center">
                      <div className="mx-2">
                        <label htmlFor="Username">Nama :</label> <br />
                        <input
                          type="text"
                          className="border-2 rounded-md py-2 w-[15vw] px-4"
                          onChange={(e) => setFullName(e.target.value)}
                          value={fullname}
                        />
                      </div>
                      <div className="mx-2">
                        <label htmlFor="Tanggal Lahir"> Tanggal Lahir:</label>{" "}
                        <br />
                        <div className="flex border-2 rounded-md py-2 w-[15vw]">
                          <input
                            type="date"
                            className=" px-4 w-[15vw]"
                            onChange={(e) => setTanggal_Lahir(e.target.value)}
                            value={tanggal_lahir}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mx-2">
                        <label htmlFor="NomorHp">NomorHP :</label> <br />
                        <input
                          type="text"
                          className="border-2 rounded-md py-2 w-[15vw] px-4"
                          onChange={(e) => setNomor(e.target.value)}
                          value={nomor}
                        />
                      </div>
                      <div className="mx-2">
                        <label htmlFor="Gender">Gender:</label> <br />
                        <select
                          value={
                            gender === undefined
                              ? "-"
                              : gender
                              ? "true"
                              : "false"
                          }
                          className="border-2 rounded-md py-2 w-[15vw] px-2"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "-") {
                              setGender(undefined);
                            } else {
                              setGender(value === "true");
                            }
                          }}
                        >
                          <option value="-" className="text-black">
                            -
                          </option>
                          <option value="true" className="text-black">
                            Laki-Laki
                          </option>
                          <option value="false" className="text-black">
                            Perempuan
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="mx-2">
                      <label htmlFor="Email">Email :</label>
                      <br />
                      <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 rounded-md w-[31vw] py-2 px-4"
                        value={email}
                      />
                    </div>

                    <div className="mx-2">
                      <label htmlFor="Alamat">Alamat :</label>
                      <br />
                      <input
                        type="text"
                        onChange={(e) => setAlamat(e.target.value)}
                        className="border-2 rounded-md w-[31vw] py-2 px-4"
                        value={alamat}
                      />
                    </div>

                    <div className="mx-2">
                      <label htmlFor="Bio">Bio :</label>
                      <br />
                      <textarea
                        className="border-2 rounded-md w-[31vw] h-[10vh] py-2 px-4  "
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                      />
                    </div>

                    <div className="mx-2">
                      <button
                        className="border-2 rounded-md p-1 w-[31vw] hover:bg-sky-500 duration-[0.3s]"
                        onClick={() => setOpenPopUp("Edit")}
                      >
                        Done
                      </button>
                      <PopUp
                        isOpen={openPopUp === "Edit"}
                        onClose={() => setOpenPopUp(null)}
                      >
                        <div className="w-full flex justify-center items-center flex-col">
                          <h1 className="text-center w-[20vw] font-bold text-[1.8rem]">
                            Apakah anda yakin ingin mengubah profile?
                          </h1>
                          <div className="flex justify-center items-center gap-4 my-2">
                            <button
                              className="border-1 p-3 rounded-lg text-white font-bold bg-red-600"
                              onClick={() => setOpenPopUp(null)}
                            >
                              Tidak
                            </button>
                            <button
                              className="border-1 p-3 rounded-lg text-white font-bold bg-[#58CC41]"
                              onClick={() => {
                                handleEditProfile();
                                setModalData({
                                  title: "Selamat Kamu Berhasil Update Profile",
                                  icon: "success",
                                  deskripsi: "",
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
                    </div>
                  </div>
                </div>
              </div>
              {modalData && <Modal {...modalData} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileChildren;
