"use client";
import iconHItam from "@/public/asset/IconHitam.png";
import Image from "next/image";
import Profile from "@/public/asset/porfil.png";
import { Search } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "../../hooks/dispatch/dispatch";
import { useState, useEffect } from "react";
import { ProfileType } from "../../types/API";
import API from "../../util/API";
import Container from "../ui/Container";
import { Info } from "lucide-react";
import Pulse from "../ui/pulse";

const NavbarHome: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [profileData, setProfileData] = useState<ProfileType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleRoleRedirect = () => {
    const baseUrl = "/information";
    let redirect = "/";
    if (currentUser?.user.role === "user") {
      redirect = `/users${baseUrl}`;
    } else if (currentUser?.user.role === "owner") {
      redirect = `/owners${baseUrl}`;
    } else if (currentUser?.user.role === "admin") {
      redirect = `/admin${baseUrl}`;
    }
    return redirect;
  };

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
    }, 2000);
    return () => clearTimeout(time);
  }, []);
  return (
    <Container className="flex justify-around items-center pt-[1rem] pb-[1rem] border-b-1">
      {isLoading ? (
        <Pulse className="w-32 h-6  rounded mt-4 " />
      ) : (
        <Link href="/users/home">
          <Container className="flex gap-2 justify-center items-center ">
            <Image
              src={iconHItam}
              alt="iconHitam"
              className="w-[3vw] h-[5vh]"
            />
            <h1 className="font-bold text-black text-[2rem]">Kosthub</h1>
          </Container>
        </Link>
      )}
      {isLoading ? (
        <Pulse className="w-32 h-6  rounded mt-4 " />
      ) : (
        <Container className="flex border-2 border-gray-300 rounded-full items-center w-[25vw] justify-between p-5">
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full "
          />

          <Search />
        </Container>
      )}
      {isLoading ? (
        <Pulse className="w-32 h-6  rounded mt-4 " />
      ) : (
        <Container className="flex gap-6 justify-center items-center">
          <Link href={handleRoleRedirect()}>
            <Info />
          </Link>

          <Link href="/profile">
            <Container className="flex gap-2 items-center">
              <Image
                src={
                  profileData?.fotoProfil ? profileData?.fotoProfil : Profile
                }
                alt="profil"
                className="rounded-full"
                width={40}
                height={35}
              />
              <h1 className="font-bold">{currentUser?.user.username}</h1>
            </Container>
          </Link>
        </Container>
      )}
    </Container>
  );
};
export default NavbarHome;
