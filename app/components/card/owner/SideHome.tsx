"use client";
import Container from "../../ui/Container";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";
import { MedsosData } from "@/app/core/data/appConfig";
import Image from "next/image";
import Link from "next/link";
import Pulse from "../../ui/pulse";

const SideHomeOwners = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleRedirect = () => {
    if (!currentUser?.user.nomor || !currentUser.user.alamat) {
      router.push("/profile/edit-profile");
    } else {
      router.push("/owners/bikin-kos");
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(time);
  }, []);

  return (
    <Container as="main" className="w-full h-full">
      <Container className="shadow-lg/30 w-full h-full flex justify-start items-start rounded-lg p-4 flex-col">
        {isLoading ? (
          <Pulse className="w-32 h-6 rounded mt-4 " />
        ) : (
          <h1 className="font-bold">Mulai Daftarkan Kost Anda Di Kosthub:</h1>
        )}

        {isLoading ? (
          <Pulse className="w-full h-6 rounded mt-4 " />
        ) : (
          <Container className="flex gap-4 justify-center items-center">
            <Button onClick={() => handleRedirect()}>Daftarkan</Button>
            <p className="font-light p-2 text-sm italic">
              Note: Mohon Siapkan Dokumen - Dokumen Yang Di Perlukan Untuk
              Mendaftarkan Kost Anda!
            </p>
          </Container>
        )}
        {isLoading ? (
          <Pulse className="w-full h-6 rounded mt-4 " />
        ) : (
          <Container className="gap-2 w-full h-full ">
            {MedsosData.map((items, key) => (
              <Container className="flex">
                <Link
                  href={items.href}
                  className="gap-4 items-center justify-center flex py-3"
                  key={key}
                >
                  <Image
                    alt="Medsos"
                    src={items.image}
                    width={25}
                    height={25}
                  />
                  <span className="">{items.label}</span>
                </Link>
              </Container>
            ))}
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default SideHomeOwners;
