"use client";
import Container from "@/app/components/component/ui/Container";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";
import API from "@/app/util/API";
import { useRouter } from "next/navigation";
import { formLengkapiData } from "@/app/types/form";
import TextFieldInput from "@/app/components/component/ui/InputField";
import Image from "next/image";
import Icon from "@/public/asset/IconHitam.png";
import Profile from "@/public/asset/prfilhd.png";
import ButtonUploads from "@/app/components/component/ui/ButtonUploads";
import CustomSelect from "@/app/components/component/ui/Select";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Provensi } from "@/app/core/data/constants/Provensi";
import Button from "@/app/components/component/ui/Button";
import { ModalProps } from "@/app/types/API";
import Modal from "@/app/components/component/modal/Modal";

const LengkapiDataChildren: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [modalData, setModalData] = useState<ModalProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formLengkapiData, setFormLengkapiData] = useState<formLengkapiData>({
    role: "",
    alamat: "",
    bio: "",
    fotoProfil: null,
    gender: null,
    tanggal_lahir: "",
  });
  const router = useRouter();

  const handleRedirect = () => {
    let redirect = "/";
    if (currentUser?.user.role === "user") {
      redirect = "/users/home";
    } else if (currentUser?.user.role === "admin") {
      redirect = "/admin/home";
    } else if (currentUser?.user.role === "owner") {
      redirect = "/owners/home";
    }
    return redirect;
  };

  const handleLengkapiData = async () => {
    const formData = new FormData();

    formData.append("username", currentUser?.user.username || "");

    Object.entries(formLengkapiData).forEach(([key, value]) => {
      if (key === "fotoProfil" && value instanceof File) {
        formData.append("fotoProfil", value);
      } else if (value !== null && value !== undefined && value !== "") {
        formData.append(key, String(value));
      }
    });
    try {
      setIsLoading(true);
      const res = await API.put(`/api/auth/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      console.log("Berhasil", res);
      setModalData({
        icon: "success",
        title: "Berhasil Melakukan Melengkapi Data",
        deskripsi: "Selamat Datang Di KOSTHUB",
        onClose: () => {
          setModalData(null);
          router.push(handleRedirect());
        },
      });
    } catch (error) {
      console.log("Gagal Melengkapi Data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenderChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    const booleanValue =
      value === "true" ? true : value === "false" ? false : null;

    setFormLengkapiData((prev) => ({
      ...prev,
      gender: booleanValue,
    }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormLengkapiData((prev) => ({
        ...prev,
        fotoProfil: file,
      }));
    }
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setFormLengkapiData((Prev) => ({
      ...Prev,
      role: e.target.value,
    }));
  };

  const handleAlamatChange = (e: SelectChangeEvent) => {
    setFormLengkapiData((prev) => ({
      ...prev,
      alamat: e.target.value,
    }));
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(time);
  }, []);
  return (
    <Container className="w-full h-full">
      {isLoading ? (
        <Container className="flex-col ">
          <Container className="flex justify-center items-center h-screen w-full gap-2">
            <Container className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105">
              -
            </Container>
            <p className="text-[2rem] font-light">Loading...</p>
          </Container>
        </Container>
      ) : (
        <Container as="main" className="w-full h-full">
          {modalData && <Modal {...modalData} />}
          <Container className="flex justify-center items-center w-full h-full flex-col">
            <Container className="bg-sky-700 w-full h-full flex justify-center items-center flex-col">
              <h1 className="font-bold text-[2rem] text-white">
                Lengkap Data Diri Anda Terlebih Dahulu
              </h1>
              <Container className="flex justify-center items-center p-2 gap-2">
                <Image
                  src={Icon}
                  alt="Icon"
                  width={100}
                  height={100}
                  className=" text-white "
                />
                <p className="font-bold text-[2rem]">KOSTHUB</p>
              </Container>
            </Container>
            <Container className="flex flex-col p-4 justify-center items-center w-full">
              <Container className=" flex justify-center items-center flex-col gap-4">
                <Image
                  alt="Profile"
                  src={Profile}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <ButtonUploads
                  multiple={false}
                  accept="image/*"
                  onChange={(e) => handleFotoChange(e)}
                >
                  Unggah Foto
                </ButtonUploads>
              </Container>

              <Container className="grid grid-cols-2 grid-rows-1 gap-4 w-full my-2">
                <Container className="flex justify-center items-center">
                  <TextFieldInput
                    className="w-full"
                    name={formLengkapiData.alamat}
                    type="date"
                    value={formLengkapiData.alamat}
                    onChange={(e) =>
                      setFormLengkapiData((prev) => {
                        const newObj = { ...prev, alamat: e.target.value };
                        return newObj;
                      })
                    }
                  />
                </Container>
                <Container className="flex justify-center items-center">
                  <CustomSelect
                    name="Gender"
                    value={
                      formLengkapiData.gender === null
                        ? ""
                        : formLengkapiData.gender === true
                        ? "true"
                        : "false"
                    }
                    onChange={(e) => handleGenderChange(e)}
                  >
                    <MenuItem value="true">Pria</MenuItem>
                    <MenuItem value="false">Wanita</MenuItem>
                  </CustomSelect>
                </Container>
                <Container className="flex justify-center items-center">
                  <CustomSelect
                    name="Role"
                    value={formLengkapiData.role}
                    onChange={(e) => handleRoleChange(e)}
                  >
                    <MenuItem value="user">Pengguna</MenuItem>
                    <MenuItem value="owner">Pemilik Kos</MenuItem>
                  </CustomSelect>
                </Container>
                <Container className="flex justify-center items-center">
                  <CustomSelect
                    name="Alamat"
                    value={formLengkapiData.alamat}
                    onChange={(e) => handleAlamatChange(e)}
                  >
                    {Provensi.map((key) => (
                      <MenuItem key={key} value={key}>
                        {key}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Container>
              </Container>
              <Container className="flex justify-center items-center">
                <Button onClick={() => handleLengkapiData()}>Simpan</Button>
              </Container>
            </Container>
            <Container className="flex justify-start items-start w-full p-4">
              <p className="text-[#fffff]/40">Note:</p>
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default LengkapiDataChildren;
