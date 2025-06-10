"use client";
import Link from "next/link";
import Profile from "@/public/asset/prfilhd.png";
import Sidebar from "@/app/components/component/sidebar/Sidebar";
import { useHook } from "@/app/components/component/hooks/auth";
import { getGenderString } from "@/app/components/helper/helper";
import Image from "next/image";
import Container from "../../component/ui/Container";

const ProfilChildren: React.FC = () => {
  const { currentUser } = useHook();

  return (
    <Container className="h-screen w-screen">
      <Container className="flex w-full justify-center items-center h-full gap-4">
        <Container className="flex-col flex justify-center items-center">
          <Image
            src={
              currentUser?.user.fotoProfile
                ? currentUser?.user.fotoProfile
                : Profile
            }
            alt="profile"
            width={300}
            height={100}
          />
          <Link href="/profile/edit-profile">
            <h1 className="border-1 p-2 mt-5 rounded-md bg-sky-400 hover:bg-sky-600 duration-[0.3s] hover:scale-105 ">
              Edit Foto
            </h1>
          </Link>
        </Container>
        <Container className=" flex justify-center items-center">
          <form className="">
            <Container className="grid grid-cols-1 grid-rows-2 gap-2">
              <Container className="flex items-center">
                <Container className="mx-2">
                  <label htmlFor="Username">Nama :</label> <br />
                  <h1 className="border-2 rounded-md py-2 w-[15vw] px-2">
                    {currentUser?.user.fullname}
                  </h1>
                </Container>
                <Container className="mx-2">
                  <label htmlFor="Tanggal Lahir"> Tanggal Lahir :</label> <br />
                  <h1 className="border-2 rounded-md py-2 w-[15vw] px-2">
                    {currentUser?.user.tanggal_lahir}
                  </h1>
                </Container>
              </Container>
              <Container className="flex items-center">
                <Container className="mx-2">
                  <label htmlFor="Username">Nomor HP:</label> <br />
                  <h1 className="border-2 rounded-md py-2 w-[15vw] px-2">
                    {currentUser?.user.nomor}
                  </h1>
                </Container>
                <Container className="mx-2">
                  <label htmlFor="Gender"> Gender :</label> <br />
                  <h1 className="border-2 rounded-md py-2 w-[15vw] px-2">
                    {getGenderString(currentUser?.user.gender)}
                  </h1>
                </Container>
              </Container>

              <Container className="mx-2">
                <label htmlFor="Email">Email :</label> <br />
                <h1 className="border-2 rounded-md py-2 w-[31vw] px-2">
                  {currentUser?.user.email}
                </h1>
              </Container>

              <Container className="mx-2">
                <label htmlFor="Alamat">Alamat :</label> <br />
                <h1 className="border-2 rounded-md py-2 w-[31vw] px-2">
                  {currentUser?.user.alamat}
                </h1>
              </Container>

              <Container className="mx-2">
                <label htmlFor="">Bio :</label>
                <br />
                <h1 className="border-2 rounded-md py-2 w-[31vw] h-[10vh] px-2">
                  {currentUser?.user.bio ?? "Ayo Isi Biodata Kamu Disini!"}
                </h1>
              </Container>
              <Container className="mx-2">
                <Link href="/profile/edit-profile">
                  <button
                    className="border-2 rounded-md p-1 w-[31vw] hover:bg-sky-500 duration-[0.3s]"
                    type="submit"
                  >
                    Edit Porfile
                  </button>
                </Link>
              </Container>
            </Container>
          </form>
        </Container>
      </Container>
    </Container>
  );
};

export default ProfilChildren;
