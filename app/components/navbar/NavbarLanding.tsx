import Link from "next/link";
import IconHitam from "@/public/asset/IconHitam.png";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import { RouteStaticLandingData } from "../../core/data/appConfig";
import Container from "../ui/Container";

const NavbarLanding: React.FC = () => {
  return (
    <Container className="flex justify-around items-center w-full gap-170 pt-[1rem]">
      <Container className="flex gap-x-6 items-center">
        <Image src={IconHitam} alt="Icon" width={30} height={30}></Image>

        {RouteStaticLandingData.slice(0, 4).map((items, key) => (
          <Link key={key} href={items.href}>
            <h1 className="font-bold text-[1.5rem] hover:underline duration-[2ms]">
              {items.label}
            </h1>
          </Link>
        ))}
      </Container>

      <Container title="Login">
        {RouteStaticLandingData.slice(4).map((items, key) => (
          <Link key={key} href={items.href} className="flex">
            <CircleUserRound className="text-blue-500 w-[2vw] h-[3.3vh]" />
            <h1 className="font-bold text-blue-500 text-[1.5rem]">
              {items.label}
            </h1>
          </Link>
        ))}
      </Container>
    </Container>
  );
};

export default NavbarLanding;
