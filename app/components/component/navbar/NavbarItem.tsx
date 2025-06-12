"use client";
import icon from "@/public/asset/icon.png";
import profile from "@/public/asset/prfilhd.png";
import Image from "next/image";
import Link from "next/link";
import { useHook } from "../../core/hooks/auth/auth";

const NabvarItem: React.FC = () => {
  const { currentUser } = useHook();
  return (
    <div className="flex justify-center mt-2">
      <div className="w-[90vw] bg-[#0C106B] rounded-md h-[7vh] flex justify-around items-center">
        <div className="flex">
          <Image src={icon} alt="icon" width={36} height={63} />
          <h1 className="font-bold text-[2rem] text-white">KOSTHUB</h1>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          <Link href="/users/home">
            <div className="p-2 border-1 rounded-md">
              <h1 className="font-bold text-white">Beranda</h1>
            </div>
          </Link>
          <Link href="/profile">
            <div className="">
              <Image
                src={
                  currentUser?.user.fotoProfil
                    ? currentUser?.user.fotoProfil
                    : profile
                }
                alt="profil"
                className="rounded-full"
                width={40}
                height={35}
              />
            </div>
          </Link>
          <div className="text-white font-bold">
            {currentUser?.user?.username}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NabvarItem;
