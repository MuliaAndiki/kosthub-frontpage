"use client";
import Image from "next/image";
import profile from "@/public/asset/prfilhd.png";
import { useState } from "react";
import Modal from "@/app/components/component/modal/Modal";
import { ModalProps } from "@/app/types/API";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/core/hooks/dispatch/dispatch";
import API from "@/app/core/util/API";
import PopUp from "@/app/components/component/modal/PopUp";
import Container from "@/app/components/component/ui/Container";
import TextFieldInput from "@/app/components/component/ui/InputField";
import { formEditProfile } from "@/app/types/form";
import Select from "@/app/components/component/ui/Select";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Provensi } from "@/app/core/data/constants/Provensi";
import ButtonUploads from "@/app/components/component/ui/ButtonUploads";
import ButtonPopUp from "@/app/components/component/ui/ButtonPopup";
import Button from "@/app/components/component/ui/Button";
import TextArea from "@/app/components/component/ui/TextArea";
import Link from "next/link";
import ButtonPrimary from "@/app/components/component/ui/ButtonPrimary";

const EditProfileChildren: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [formEditProfile, setFormEditProfile] = useState<formEditProfile>({
    alamat: "",
    bio: "",
    email: "",
    fotoProfil: null,
    fullname: "",
    gender: null,
    nomor: "",
    tanggal_lahir: "",
  });
  const [modalData, setModalData] = useState<ModalProps | null>(null);
  const [openPopUp, setOpenPopUp] = useState<"Edit" | null>(null);
  const router = useRouter();

  const handleAlamatChange = (e: SelectChangeEvent) => {
    setFormEditProfile((prev) => ({
      ...prev,
      alamat: e.target.value,
    }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Triger");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("file:", file);
      setFormEditProfile((prev) => ({
        ...prev,
        fotoProfil: file,
      }));
    }
  };

  const handleGenderChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    const booleanValue =
      value === "true" ? true : value === "false" ? false : null;

    setFormEditProfile((prev) => ({
      ...prev,
      gender: booleanValue,
    }));
  };

  const handleEditProfile = () => {
    const formData = new FormData();

    formData.append("username", currentUser?.user.username || "");

    Object.entries(formEditProfile).forEach(([key, value]) => {
      if (key === "fotoProfil" && value instanceof File) {
        formData.append("fotoProfil", value);
      } else if (value !== null && value !== undefined && value !== "") {
        formData.append(key, String(value));
      }
    });

    API.put("/api/auth/update-profile", formData, {
      headers: {
        Authorization: `Bearer ${currentUser?.token}`,
      },
    })
      .then((res) => {
        console.log("Berhasil Update", res);
      })
      .catch((err) => {
        console.log("Gagal Update", err.response?.data || err.message);
      });
  };
  return (
    <Container className="h-full w-full">
      <Container className="flex w-full justify-center items-center h-full gap-4">
        <Container className="flex flex-col justify-center items-center gap-8">
          <Image
            src={
              currentUser?.user.fotoProfil
                ? currentUser?.user.fotoProfil
                : profile
            }
            alt="profil"
            width={300}
            height={300}
            className="rounded-full"
          />
          <ButtonUploads
            onChange={(e) => handleFotoChange(e)}
            multiple={false}
            accept="image/*"
          >
            Unggah Foto
          </ButtonUploads>
        </Container>
        <Container className=" flex justify-center items-center">
          <Container>
            <Container className="grid grid-cols-1 grid-rows-2 gap-2">
              <Container className="flex items-center">
                <Container className="mx-2 w-[55%]">
                  <TextFieldInput
                    name={formEditProfile.fullname}
                    type="text"
                    className=" rounded-md w-full py-2 px-4"
                    value={formEditProfile.fullname}
                    label="Fullname"
                    onChange={(e) =>
                      setFormEditProfile((prev) => {
                        const newObj = { ...prev, fullname: e.target.value };
                        return newObj;
                      })
                    }
                  />
                </Container>
                <Container className="mx-2 my-1">
                  <Container className="flex rounded-md py-2 w-[15vw]">
                    <TextFieldInput
                      name={formEditProfile.tanggal_lahir}
                      value={formEditProfile.tanggal_lahir}
                      type="date"
                      className="px-4 w-full"
                      onChange={(e) =>
                        setFormEditProfile((prev) => {
                          const newObj = {
                            ...prev,
                            tanggal_lahir: e.target.value,
                          };
                          return newObj;
                        })
                      }
                    />
                  </Container>
                </Container>
              </Container>
              <Container className="flex items-center">
                <Container className="mx-2 my-1 w-[55%]">
                  <TextFieldInput
                    value={formEditProfile.nomor}
                    name={formEditProfile.nomor}
                    type="text"
                    label="Nomor Hp"
                    className=" rounded-md w-full py-2 px-4"
                    onChange={(e) =>
                      setFormEditProfile((prev) => {
                        const newObj = { ...prev, nomor: e.target.value };
                        return newObj;
                      })
                    }
                  />
                </Container>
                <Container className="mx-2 my-1 w-[17vw]">
                  <Select
                    name="Jenis Kelamin "
                    value={
                      formEditProfile.gender === null
                        ? ""
                        : formEditProfile.gender === true
                        ? "true"
                        : "false"
                    }
                    onChange={(e) => handleGenderChange(e)}
                  >
                    <MenuItem value="true">Pria</MenuItem>
                    <MenuItem value="false">Wanita</MenuItem>
                  </Select>
                </Container>
              </Container>

              <Container className="mx-2 my-1">
                <TextFieldInput
                  name={formEditProfile.email}
                  value={formEditProfile.email}
                  className=" rounded-md w-full py-2 px-4"
                  label="Email"
                  type="text"
                  onChange={(e) =>
                    setFormEditProfile((prev) => {
                      const newObj = { ...prev, email: e.target.value };
                      return newObj;
                    })
                  }
                />
              </Container>

              <Container className="mx-2 my-1">
                <Select
                  name="Alamat"
                  value={formEditProfile.alamat}
                  onChange={(e) => handleAlamatChange(e)}
                >
                  {Provensi.map((key) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </Container>

              <Container className="mx-2 my-1">
                <TextArea
                  name={formEditProfile.bio}
                  placeholder="Isi Bio Data Kamu"
                  label="Bio"
                  value={formEditProfile.bio}
                  onChange={(e) =>
                    setFormEditProfile((prev) => {
                      const newObj = { ...prev, bio: e.target.value };
                      return newObj;
                    })
                  }
                />
              </Container>

              <Container className="mx-2">
                <Button onClick={() => setOpenPopUp("Edit")}>Done</Button>
                <PopUp
                  isOpen={openPopUp === "Edit"}
                  onClose={() => setOpenPopUp(null)}
                >
                  <Container className="w-full flex justify-center items-center flex-col">
                    <h1 className="text-center w-[20vw] font-bold text-[1.8rem]">
                      Apakah anda yakin ingin mengubah profile?
                    </h1>
                    <Container className="flex justify-center items-center gap-4 my-2">
                      <ButtonPopUp
                        message="error"
                        onClick={() => setOpenPopUp(null)}
                      >
                        Tidak
                      </ButtonPopUp>
                      <ButtonPopUp
                        message="success"
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
                      </ButtonPopUp>
                    </Container>
                  </Container>
                </PopUp>
              </Container>
              <Container className="mx-2">
                <Link href="/profile">
                  <ButtonPrimary>Batal</ButtonPrimary>
                </Link>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>

      {modalData && <Modal {...modalData} />}
    </Container>
  );
};

export default EditProfileChildren;
