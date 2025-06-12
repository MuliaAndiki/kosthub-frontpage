"use client";
import iconHItam from "@/public/asset/IconHitam.png";
import Image from "next/image";
import Profile from "@/public/asset/porfil.png";
import { Search } from "lucide-react";
import Link from "next/link";
import { useHook } from "../../core/hooks/auth/auth";
import { useState, useEffect } from "react";
import { ProfileType } from "../../types/API";
import API from "../../core/util/API";

const NavbarHome: React.FC = () => {
  const { currentUser } = useHook();

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
  return (
    <div className="flex justify-around pt-[1rem] pb-[1rem] border-b-1">
      <Link href="/users/home">
        <div className="flex">
          <Image src={iconHItam} alt="iconHitam" className="w-[3vw] h-[5vh]" />
          <h1 className="font-bold text-black text-[2rem]">Kosthub</h1>
        </div>
      </Link>
      <div className="flex border-2 border-gray-300 rounded-full items-center w-[25vw] justify-between p-5">
        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full "
        />

        <Search />
      </div>
      <Link href="/users/profile">
        <div className="flex gap-2 items-center">
          <Image
            src={profileData?.fotoProfil ? profileData?.fotoProfil : Profile}
            alt="profil"
            className="rounded-full"
            width={40}
            height={35}
          />
          <h1 className="font-bold">{currentUser?.user.username}</h1>
        </div>
      </Link>
    </div>
  );
};
export default NavbarHome;
