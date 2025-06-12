import Image from "next/image";
import { reservasiTypeProps } from "../../types/props";
import ProfileDumy from "@/public/asset/prfilhd.png";
import { Phone } from "lucide-react";
import Container from "../ui/Container";
const ProfileParticial: React.FC<reservasiTypeProps> = ({ data }) => {
  return (
    <Container className="justify-around w-full flex">
      <Container className="flex items-center justify-between w-full">
        <Container className="flex items-center gap-2">
          <Image src={ProfileDumy} alt="Profile" width={50} height={50} />
          <h1>{data.id_kos.nama_kos}</h1>
        </Container>

        <Container className="flex items-center p-2 border-1 rounded-md">
          <Phone />
          <h1>{data.id_kos.kontak.nomor}</h1>
        </Container>
      </Container>
    </Container>
  );
};
export default ProfileParticial;
