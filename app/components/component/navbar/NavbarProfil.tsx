"use client";
import iconHItam from "@/public/asset/IconHitam.png";
import Image from "next/image";
import profil from "@/public/asset/porfil.png";
import Link from "next/link";
import { useHook } from "../hooks/auth";
import Container from "../ui/Container";

const NavbarProfil: React.FC = () => {
  const { currentUser } = useHook();

  return (
    <Container className="flex justify-between p-6 pt-[1rem] pb-[1rem] my-2 border-b-1 ">
      <Link href="/home">
        <Container className="flex">
          <Image src={iconHItam} alt="iconHitam" className="w-[3vw] h-[5vh]" />
          <h1 className="font-bold text-black text-[2rem]">Kosthub</h1>
        </Container>
      </Link>
      <Link href="/home">
        <Container className="flex gap-8 items-center">
          <Container className="rounded-full p-1">
            <h1 className="font-bold">Beranda</h1>
          </Container>
          <Container className="flex justify-center items-center gap-4">
            <Image src={profil} alt="profil" className="w-[2vw] h-[3.8vh]" />
            <h1 className="font-bold">{currentUser?.user.username}</h1>
          </Container>
        </Container>
      </Link>
    </Container>
  );
};
export default NavbarProfil;
