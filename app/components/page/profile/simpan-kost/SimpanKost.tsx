"use client";
import { useHook } from "@/app/components/component/hooks/auth";
import { itemsType } from "@/app/components/types/API";
import Items from "@/app/components/component/card/Items";
import API from "@/app/components/util/API";
import { useEffect, useState } from "react";
import Container from "@/app/components/component/ui/Container";

const SimpanKostChildren: React.FC = () => {
  const { currentUser } = useHook();
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
    <Container>
      {isLoading ? (
        <Container className="flex-col">
          <Container className="flex justify-center items-center h-screen w-screen gap-2">
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
