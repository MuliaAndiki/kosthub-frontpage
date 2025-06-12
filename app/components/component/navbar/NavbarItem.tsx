"use client";
import icon from "@/public/asset/icon.png";
import profile from "@/public/asset/prfilhd.png";
import Image from "next/image";
import Link from "next/link";
import { useHook } from "../../core/hooks/auth/auth";
import Container from "../ui/Container";

const NabvarItem: React.FC = () => {
  const { currentUser } = useHook();
  return (
    <Container className="flex justify-center mt-2">
      <Container className="w-[90vw] bg-[#0C106B] rounded-md h-[7vh] flex justify-around items-center">
        <Container className="flex">
          <Image src={icon} alt="icon" width={36} height={63} />
          <h1 className="font-bold text-[2rem] text-white">KOSTHUB</h1>
        </Container>
        <Container className="flex justify-center items-center gap-x-4">
          <Link href="/users/home">
            <Container className="p-2 border-1 rounded-md">
              <h1 className="font-bold text-white">Beranda</h1>
            </Container>
          </Link>
          <Link href="/profile">
            <Container className="">
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
            </Container>
          </Link>
          <Container className="text-white font-bold">
            {currentUser?.user?.username}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
export default NabvarItem;
