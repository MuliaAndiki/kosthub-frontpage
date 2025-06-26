"use client";

import Container from "../../ui/Container";
import Image from "next/image";
import profileDummy from "@/public/asset/prfilhd.png";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";
import { useOwnerProfileConfigData } from "@/app/core/data/card/owners";
import { useEffect, useState } from "react";
import Link from "next/link";
import Pulse from "../../ui/pulse";

const ProfileCardOwners: React.FC = () => {
  const ownerProfileConfigData = useOwnerProfileConfigData();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(time);
  }, []);

  return (
    <Container className="rounded-lg flex w-full gap-4 shadow-xl/30 p-4">
      <Container className="flex-[1.2] p-2 flex">
        <Container className="flex flex-col w-full justify-center items-center gap-4">
          {ownerProfileConfigData.map((items, key) => (
            <Container
              key={key}
              className="flex flex-col w-full justify-center items-center"
            >
              {isLoading ? (
                <Pulse className="w-[155px] h-[155px] rounded-full" />
              ) : (
                <Image
                  src={items?.foto.image ? items.foto.image : profileDummy}
                  alt="profile"
                  width={155}
                  height={155}
                  className="rounded-full object-cover"
                />
              )}
            </Container>
          ))}

          <Link href="/profile">
            <ButtonPrimary>Lihat Detail</ButtonPrimary>
          </Link>
        </Container>
      </Container>

      <Container className="flex-[2] flex flex-col justify-center items-start p-2 w-full">
        {ownerProfileConfigData.map((items, key) => (
          <Container
            key={key}
            className="gap-6 w-full flex justify-center items-start flex-col"
          >
            {items.detail.map((items, key) => (
              <Container key={key} className="w-full">
                {isLoading ? (
                  <Container className="w-3/4 h-5 bg-gray-300 rounded animate-pulse mb-2" />
                ) : (
                  <h1 className="italic font-semibold text-2xl">
                    {items.label} {items.datas}
                  </h1>
                )}
              </Container>
            ))}
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default ProfileCardOwners;
