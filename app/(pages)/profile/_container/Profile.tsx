"use client";
import Link from "next/link";
import Profile from "@/public/asset/prfilhd.png";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";
import { getGenderString } from "@/app/core/helper/helper";
import Image from "next/image";
import Container from "../../../components/ui/Container";
import ButtonPrimary from "../../../components/ui/ButtonPrimary";
import { useState, useEffect } from "react";
import API from "../../../util/API";
import { ProfileType } from "../../../types/API";
import Pulse from "@/app/components/ui/pulse";

const ProfilChildren: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<ProfileType>();

  const handleGetProfile = async () => {
    try {
      setIsLoading(true);
      const res = await API.get(
        `/api/auth/getProfile/${currentUser?.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      setProfileData(res.data.data);
    } catch (error) {
      console.log(`Gagal fetch Data User ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const time = setTimeout(() => {
      handleGetProfile();
    }, 2000);
    return () => clearTimeout(time);
  }, []);

  return (
    <Container className="h-full w-full">
      <Container className="flex w-full justify-center items-center h-full gap-4">
        <Container className="flex-col flex justify-center items-center gap-4">
          {isLoading ? (
            <Pulse className="w-48 h-48 rounded mt-4" />
          ) : (
            <Image
              src={profileData?.fotoProfil ? profileData?.fotoProfil : Profile}
              alt="profile"
              width={300}
              height={100}
              className="rounded-full"
            />
          )}
          {isLoading ? (
            <Pulse className="w-48 h-8 rounded mt-4" />
          ) : (
            <Link href="/profile/edit-profile">
              <ButtonPrimary>Edit Photo</ButtonPrimary>
            </Link>
          )}
        </Container>

        <Container className=" flex justify-center items-center">
          <Container className="grid grid-cols-1 grid-rows-2 gap-2">
            <Container className="flex items-center">
              <Container className="mx-2">
                {isLoading ? (
                  <Pulse className="w-38 h-8 rounded mt-4" />
                ) : (
                  <Container>
                    <label htmlFor="Username">Nama :</label> <br />
                    <h1 className="border-2 rounded-md py-2 w-[15vw] px-2">
                      {profileData?.fullname}
                    </h1>
                  </Container>
                )}
              </Container>
              <Container className="mx-2">
                {isLoading ? (
                  <Pulse className="w-38 h-8 rounded mt-4" />
                ) : (
                  <Container>
                    <label htmlFor="Tanggal Lahir"> Tanggal Lahir :</label>
                    <br />
                    <h1 className="border-2 rounded-md py-2 w-[15vw] px-2">
                      {profileData?.tanggal_lahir}
                    </h1>
                  </Container>
                )}
              </Container>
            </Container>

            <Container className="flex items-center">
              <Container className="mx-2">
                {isLoading ? (
                  <Pulse className="w-38 h-8 rounded mt-4" />
                ) : (
                  <Container>
                    <label htmlFor="Username">Nomor HP:</label> <br />
                    <h1 className="border-2 rounded-md py-2 w-[15vw] px-2">
                      {profileData?.nomor}
                    </h1>
                  </Container>
                )}
              </Container>
              <Container className="mx-2">
                {isLoading ? (
                  <Pulse className="w-38 h-8 rounded mt-4" />
                ) : (
                  <Container>
                    <label htmlFor="Gender"> Gender :</label> <br />
                    <h1 className="border-2 rounded-md py-2 w-[15vw] px-2">
                      {getGenderString(profileData?.gender)}
                    </h1>
                  </Container>
                )}
              </Container>
            </Container>

            <Container className="mx-2">
              {isLoading ? (
                <Pulse className="w-80 h-8 rounded mt-4" />
              ) : (
                <Container>
                  <label htmlFor="Email">Email :</label> <br />
                  <h1 className="border-2 rounded-md py-2 w-[31vw] px-2">
                    {profileData?.email}
                  </h1>
                </Container>
              )}
            </Container>

            <Container className="mx-2">
              {isLoading ? (
                <Pulse className="w-80 h-8 rounded mt-4" />
              ) : (
                <Container>
                  <label htmlFor="Alamat">Alamat :</label> <br />
                  <h1 className="border-2 rounded-md py-2 w-[31vw] px-2">
                    {profileData?.alamat}
                  </h1>
                </Container>
              )}
            </Container>

            <Container className="mx-2">
              {isLoading ? (
                <Pulse className="w-80 h-8 rounded mt-4" />
              ) : (
                <Container>
                  <label htmlFor="Alamat">Role :</label> <br />
                  <h1 className="border-2 rounded-md py-2 w-[31vw] px-2">
                    {profileData?.role}
                  </h1>
                </Container>
              )}
            </Container>

            <Container className="mx-2">
              {isLoading ? (
                <Pulse className="w-80 h-25 rounded mt-4" />
              ) : (
                <Container>
                  <label htmlFor="">Bio :</label>
                  <br />
                  <h1 className="border-2 rounded-md py-2 w-[31vw] h-[10vh] px-2">
                    {profileData?.bio ?? "Ayo Isi Biodata Kamu Disini!"}
                  </h1>
                </Container>
              )}
            </Container>

            <Container className="mx-2">
              {isLoading ? (
                <Pulse className="w-80 h-8 rounded mt-4" />
              ) : (
                <Link href="/profile/edit-profile">
                  <ButtonPrimary>Edit Porfile</ButtonPrimary>
                </Link>
              )}
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default ProfilChildren;
