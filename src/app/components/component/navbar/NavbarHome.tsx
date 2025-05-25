import iconHItam from "../../../../../public/asset/IconHitam.png";
import Image from "next/image";
import profil from "../../../../../public/asset/porfil.png";
import { Search } from "lucide-react";
import Link from "next/link";
import { useHook } from "../hooks/Kontex";

const NavbarHome: React.FC = () => {
  const { currentUser } = useHook();

  // const [search, setSearch] = useState<itemsTypeProps[]>();
  // const [typing, setTyping] = useState<string>("");

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setTyping(value);

  //   const result = items.filter((item) => {
  //     item.name.toLowerCase().includes(value);
  //   });
  //   setSearch(result);
  // };

  return (
    <div className="flex justify-around pt-[1rem] pb-[1rem] border-b-1">
      <Link href="#">
        <div className="flex">
          <Image
            src={iconHItam}
            alt="iconHitam"
            className="w-[3vw] h-[5vh]"
          ></Image>
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
      <Link href="/profile">
        <div className="flex gap-2 items-center">
          <Image
            src={profil}
            alt="profil"
            className="w-[2vw] h-[3.8vh]"
          ></Image>
          <h1 className="font-bold">{currentUser?.user.username}</h1>
        </div>
      </Link>
    </div>
  );
};
export default NavbarHome;
