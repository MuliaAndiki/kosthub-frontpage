"use client";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";
import { itemsType } from "@/app/types/API";
import Items from "@/app/components/card/user/Items";
import API from "@/app/util/API";
import { useEffect, useState } from "react";
import Container from "@/app/components/ui/Container";

const SimpanKostChildren: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [dataKost, setDataKost] = useState<itemsType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleFetch = async () => {
    try {
      const res = await API.get("/api/auth/getSaveKost", {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      setDataKost(res.data.savedKos);
    } catch (error) {
      console.log("Gagal MengAmbil Data Save Kos", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Container className="w-full h-full">
      {isLoading ? (
        <Container className="flex-col">
          <Container className="flex justify-center items-center h-screen w-full gap-2">
            <Container className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105">
              -
            </Container>
            <p className="text-[2rem] font-light">Loading...</p>
          </Container>
        </Container>
      ) : (
        <Container className="h-full w-full">
          <Container className="w-full h-full justify-center items-center ">
            {dataKost?.map((item, key) => (
              <Items key={key} data={item} />
            ))}
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default SimpanKostChildren;
