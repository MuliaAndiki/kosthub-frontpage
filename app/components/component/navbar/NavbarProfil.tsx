"use client";
import iconHItam from "@/public/asset/IconHitam.png";
import Image from "next/image";
import profil from "@/public/asset/porfil.png";
import Link from "next/link";
import { useAppSelector } from "../../core/hooks/dispatch/dispatch";
import Container from "../ui/Container";
import API from "../../core/util/API";
import { useState, useEffect } from "react";
import { ProfileType } from "../../types/API";

const NavbarProfil: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [profileData, setProfileData] = useState<ProfileType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGetProfile = async () => {
    try {
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
  useEffect(() => {
    const time = setTimeout(() => {
      handleGetProfile();
    }, 1000);
    return () => clearTimeout(time);
  }, []);

  const baseUrlHome = "/home";
  const handleRedirect = () => {
    let redirectPath = "";
    if (currentUser?.user.role === "users") {
      redirectPath = `/users${baseUrlHome}`;
    } else if (currentUser?.user.role === "owner") {
      redirectPath = `/owners${baseUrlHome}`;
    } else if (currentUser?.user.role === "admin") {
      redirectPath = `/admin${baseUrlHome}`;
    }
    return redirectPath;
  };

  return (
    <Container className="flex justify-between p-6 pt-[1rem] pb-[1rem] my-2 border-b-1 ">
      <Link href={handleRedirect()}>
        <Container className="flex gap-2 justify-center items-center">
          <Image src={iconHItam} alt="iconHitam" className="w-[3vw] h-[5vh]" />
          <h1 className="font-bold text-black text-[2rem]">Kosthub</h1>
        </Container>
      </Link>
      <Link href={handleRedirect()}>
        <Container className="flex gap-8 items-center">
          <Container className="rounded-full p-1">
            <h1 className="font-bold">Beranda</h1>
          </Container>
          <Container className="flex justify-center items-center gap-4">
            <Image
              src={profileData?.fotoProfil ? profileData?.fotoProfil : profil}
              alt="profil"
              className="rounded-full"
              width={40}
              height={35}
            />
            <h1 className="font-bold">{currentUser?.user.username}</h1>
          </Container>
        </Container>
      </Link>
    </Container>
  );
};
export default NavbarProfil;
