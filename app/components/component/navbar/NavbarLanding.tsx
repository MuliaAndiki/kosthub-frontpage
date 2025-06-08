import Link from "next/link";
import IconHitam from "@/public/asset/IconHitam.png";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

const NavbarLanding: React.FC = () => {
  return (
    <div className="flex justify-around items-center w-full gap-170 pt-[1rem]">
      <div className="flex gap-x-6 items-center">
        <Link href="#">
          <Image src={IconHitam} alt="Icon" width={30} height={30}></Image>
        </Link>

        <Link href="#">
          <h1 className="font-bold text-[1.5rem] hover:underline duration-[2ms]">
            Home
          </h1>
        </Link>

        <Link href="#service">
          <h1 className="font-bold text-[1.5rem] hover:underline duration-[2ms] ">
            Layanan
          </h1>
        </Link>

        <Link href="#best">
          <h1 className="font-bold text-[1.5rem] hover:underline duration-[2ms] ">
            Produk
          </h1>
        </Link>

        <Link href="#about">
          <h1 className="font-bold text-[1.5rem] hover:underline duration-[2ms]">
            Tentang Kami
          </h1>
        </Link>
      </div>

      <div title="Login">
        <Link href="/auth/login" className="flex gap-x-1 items-center">
          <CircleUserRound className="text-blue-500 w-[2vw] h-[3.3vh]" />
          <h1 className="font-bold text-blue-500 text-[1.5rem]">Masuk</h1>
        </Link>
      </div>
    </div>
  );
};

export default NavbarLanding;
