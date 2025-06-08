import Image from "next/image";
import { reservasiTypeProps } from "../props";
import ProfileDumy from "../../../../../public/asset/prfilhd.png";
import { Phone } from "lucide-react";
const ProfileParticial: React.FC<reservasiTypeProps> = ({ data }) => {
  return (
    <div className="justify-around w-full flex">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Image src={ProfileDumy} alt="Profile" width={50} height={50} />
          <h1>{data.id_kos.nama_kos}</h1>
        </div>

        <div className="flex items-center p-2 border-1 rounded-md">
          <Phone />
          <h1>{data.id_kos.kontak.nomor}</h1>
        </div>
      </div>
    </div>
  );
};
export default ProfileParticial;
