"use client";
import Container from "../../ui/Container";
import Image from "next/image";
import profileDummy from "@/public/asset/prfilhd.png";
import { useAppSelector } from "@/app/components/core/hooks/dispatch/dispatch";
import ButtonPrimary from "@/app/components/component/ui/ButtonPrimary";
import { useOwnerProfileConfigData } from "@/app/components/core/data/card/owners";
import { useEffect, useState } from "react";
import API from "@/app/components/core/util/API";
import { ProfileType } from "@/app/components/types/API";

const ProfileCardOwners: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const ownerProfileConfigData = useOwnerProfileConfigData();
  const [profileData, setProfileData] = useState<ProfileType>();

  const handleGetProfile = async () => {
    try {
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
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      handleGetProfile();
    }, 1000);
    return () => clearTimeout(time);
  }, []);

  return (
    <Container className="rounded-lg flex w-full gap-4 shadow-xl/30 ">
      <Container className="flex-[1.2] p-2 flex">
        <Container className="flex flex-col w-full justify-center items-center ">
          {ownerProfileConfigData.map((items, key) => (
            <Container
              key={key}
              className="flex flex-col w-full justify-center items-center"
            >
              <Image
                src={items?.foto.image ? items.foto.image : profileDummy}
                alt="profile"
                width={155}
                height={155}
                className="rounded-full"
              />
              <p className="font-bold text-[clamp(1rem,4vw,2rem)]">
                {items.foto.username}
              </p>
            </Container>
          ))}
          <ButtonPrimary>Lihat Detail</ButtonPrimary>
        </Container>
      </Container>
      <Container className="flex-[2] flex flex-col justify-center items-start p-2 gap-4 w-full">
        {ownerProfileConfigData.map((items, key) => (
          <Container key={key}>
            {items.detail.map((items, key) => (
              <h1 className="font-bold text-lg" key={key}>
                {items.label} {items.datas}
              </h1>
            ))}
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default ProfileCardOwners;
