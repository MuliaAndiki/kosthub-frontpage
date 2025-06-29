"use client";
import { useState, useEffect } from "react";
import Items from "@/app/components/card/user/Items";
import { Funnel } from "lucide-react";
import API from "@/app/util/API";
import { itemsType } from "@/app/types/API/index";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";
import Container from "../../../../components/ui/Container";
import { useRouter } from "next/navigation";

const HomeUserChildren: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useState<itemsType[]>([]);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleFetch = async () => {
    try {
      const res = await API.get("/api/kos/", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setItems(res.data);
    } catch (err) {
      console.log("gagal fetch", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
    if (!currentUser?.token) {
      alert("Kamu Tidak Memiliki Akses, Mohon Login Terlebih Dahulu");
      router.push(`/auth/login`);
    }
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Container className="flex-col">
          <Container className="flex justify-center items-center h-screen w-screen gap-2">
            <Container className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105"></Container>
            <p className="text-[2rem] font-light">Loading...</p>
          </Container>
        </Container>
      ) : (
        <Container className="w-screen h-full my-4">
          <Container className="flex justify-around"></Container>
          <Container className="w-full h-full ">
            <Container className=" flex justify-center items-center my-8">
              <h1 className="font-bold text-[3rem]">
                Pilihan Teratas Untuk Anda
              </h1>
            </Container>
            <Container className="w-full justify-center gap-8 flex p-[1rem]">
              {items.slice(0, 4).map((item, index) => (
                <Items key={index} data={item} />
              ))}
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default HomeUserChildren;
