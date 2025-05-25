"use client";
import NavbarProfil from "@/app/components/component/navbar/NavbarProfil";
import Link from "next/link";
import Profile from "../../../../../public/asset/prfilhd.png";
import Sidebar from "@/app/components/component/sidebar/Sidebar";
import { useHook } from "@/app/components/component/hooks/Kontex";
import { getGenderString } from "@/app/components/helper/helper";
import { useState, useEffect } from "react";
import Image from "next/image";

const ProfilComponent: React.FC = () => {
  const { currentUser } = useHook();

  return (
    <div className="h-screen w-screen">
      <div className=" inset-x-0 top-0 h-16">
        <NavbarProfil />
      </div>

      <div className="grid grid-cols-[0.4fr_2fr] grid-rows-1 gap-1 pt-[3vh] h-[93vh]">
        <Sidebar />
        <div className="">
          <div
            className="grid grid-cols-[1fr_2fr] grid-rows-1 gap-1 h-full w-full"
            title="side-kanan"
          >
            <div className="flex-col flex justify-center items-center">
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
            </div>
            <div className=" flex justify-center items-center">
              <form className="">
                <div className="grid grid-cols-1 grid-rows-2 gap-2">
                  <div className="flex items-center">
                    <div className="mx-2">
                      <label htmlFor="Username">Nama :</label> <br />
                      <h1 className="border-2 rounded-md py-2 w-[15vw] px-2">
                        {currentUser?.user.fullname}
                      </h1>
                    </div>
                    <div className="mx-2">
                      <label htmlFor="Tanggal Lahir"> Tanggal Lahir :</label>{" "}
                      <br />
                      <h1 className="border-2 rounded-md py-2 w-[15vw] px-2">
                        {currentUser?.user.tanggal_lahir}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mx-2">
                      <label htmlFor="Username">Nomor HP:</label> <br />
                      <h1 className="border-2 rounded-md py-2 w-[15vw] px-2">
                        {currentUser?.user.nomor}
                      </h1>
                    </div>
                    <div className="mx-2">
                      <label htmlFor="Gender"> Gender :</label> <br />
                      <h1 className="border-2 rounded-md py-2 w-[15vw] px-2">
                        {getGenderString(currentUser?.user.gender)}
                      </h1>
                    </div>
                  </div>

                  <div className="mx-2">
                    <label htmlFor="Email">Email :</label> <br />
                    <h1 className="border-2 rounded-md py-2 w-[31vw] px-2">
                      {currentUser?.user.email}
                    </h1>
                  </div>

                  <div className="mx-2">
                    <label htmlFor="Alamat">Alamat :</label> <br />
                    <h1 className="border-2 rounded-md py-2 w-[31vw] px-2">
                      {currentUser?.user.alamat}
                    </h1>
                  </div>

                  <div className="mx-2">
                    <label htmlFor="">Bio :</label>
                    <br />
                    <h1 className="border-2 rounded-md py-2 w-[31vw] h-[10vh] px-2">
                      {currentUser?.user.bio ?? "Ayo Isi Biodata Kamu Disini!"}
                    </h1>
                  </div>
                  <div className="mx-2">
                    <Link href="/profile/edit-profile">
                      <button
                        className="border-2 rounded-md p-1 w-[31vw] hover:bg-sky-500 duration-[0.3s]"
                        type="submit"
                      >
                        Edit Porfile
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilComponent;
