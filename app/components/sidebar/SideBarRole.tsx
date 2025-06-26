"use client";
import Container from "../ui/Container";
import API from "@/app/util/API";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";
import { useState, useEffect } from "react";
import { ModalProps, ProfileType } from "@/app/types/API";
import Image from "next/image";
import Profile from "@/public/asset/prfilhd.png";
import { RouteStaticProfileData } from "@/app/core/data/appConfig";
import Link from "next/link";
import Button from "../ui/Button";
import { DoorClosed } from "lucide-react";
import PopUp from "../modal/PopUp";
import ButtonPopUp from "../ui/ButtonPopup";
import { useRouter } from "next/navigation";
import icon from "@/public/asset/IconHitam.png";
import Modal from "../modal/Modal";

const SideBarRole: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [profileData, setProfileData] = useState<ProfileType>();
  const [openPopUp, setOpenPopUp] = useState<"Keluar" | null>(null);
  const [modalData, setModalData] = useState<ModalProps | null>(null);

  const RoleSideHiden = [
    "/profile/data-kost",
    "/profile/simpan-kost",
    "/profile/penyewaan",
  ];

  const handleFilter = RouteStaticProfileData.filter((items) => {
    if (
      currentUser?.user.role === "owner" &&
      RoleSideHiden.includes(items.href)
    ) {
      return false;
    } else if (
      currentUser?.user.role === "admin" &&
      RoleSideHiden.includes(items.href)
    ) {
      return false;
    }
    return true;
  });

  const handleGetProfile = async () => {
    try {
      setIsLoading(true);
      const res = await API.get(
        `/api/auth/getProfile/${currentUser?.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      setProfileData(res.data.data);
    } catch (error) {
      console.log(`Gagal fetch Data User ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    const baseUrl = "/landing-page";
    return baseUrl;
  };

  useEffect(() => {
    const time = setTimeout(() => {
      handleGetProfile();
    }, 2000);
    return () => clearTimeout(time);
  }, []);

  return (
    <Container as="main" className="w-full h-full">
      <Container className="flex justify-center items-center w-full  bg-[#0C106B]">
        <Container className="w-full flex justify-center items-center p-2 flex-col">
          <h1 className="text-lg font-bold text-[clamp(1rem,4vw,2rem)] text-white">
            Dasboard
          </h1>

          <Image
            src={profileData?.fotoProfil ? profileData?.fotoProfil : Profile}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full"
          />
          <p className="text-lg text-white font-semibold">
            {profileData?.username}
          </p>
          <Container className="h-full flex flex-col justify-start w-full">
            {modalData && <Modal {...modalData} />}
            <Container className="flex flex-col justify-between h-full items-start w-full ">
              {handleFilter.map((items, key) => (
                <Link href={items.href} key={key} className="w-full">
                  <Container className="cursor-pointer  text-white w-full gap-4 flex my-2">
                    <Container className="scale-105">
                      <items.icon />
                    </Container>

                    <span className="text-1xl">{items.label}</span>
                  </Container>
                </Link>
              ))}
            </Container>
            <Container className="w-full flex justify-center items-center">
              <Button onClick={() => setOpenPopUp("Keluar")}>
                <DoorClosed size={24} />
                <span className="font-bold text-2xl">Keluar</span>
              </Button>

              <PopUp
                isOpen={openPopUp === "Keluar"}
                onClose={() => setOpenPopUp(null)}
              >
                <Container className="flex justify-center items-center flex-col">
                  <Container className="flex justify-center items-center">
                    <Image alt="icon" src={icon} width={70} height={70} />
                    <Container className="flex justify-center items-center flex-col">
                      <p className="text-2xl font-bold">KOST</p>
                      <p className="text-2xl font-bold">HUB</p>
                    </Container>
                  </Container>

                  <h1 className="my-2">Apakah Anda Yakin Ingin Keluar?</h1>
                  <Container className="flex gap-4">
                    <ButtonPopUp
                      message="success"
                      onClick={() =>
                        setModalData({
                          icon: "success",
                          deskripsi: "Berhasil Keluar",
                          title: "Keluar",
                          confirmButtonColor: "#3572EF",
                          confirmButtonText: "Oke",
                          onClose: () => {
                            setModalData(null);
                            router.push(handleRedirect());
                          },
                        })
                      }
                    >
                      Yakin
                    </ButtonPopUp>
                    <ButtonPopUp
                      message="error"
                      onClick={() => setOpenPopUp(null)}
                    >
                      Tidak
                    </ButtonPopUp>
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

export default SideBarRole;
