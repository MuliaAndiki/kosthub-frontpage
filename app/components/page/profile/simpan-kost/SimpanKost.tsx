"use client";
import NavbarProfil from "@/app/components/component/navbar/NavbarProfil";
import Sidebar from "@/app/components/component/sidebar/Sidebar";
import { useHook } from "@/app/components/component/hooks/auth";
import { itemsType } from "@/app/components/types/API";
import Items from "@/app/components/component/card/Items";
import API from "@/app/components/util/API";
import { useEffect, useState } from "react";

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
    <div>
      {isLoading ? (
        <div className="flex-col">
          <div className="flex justify-center items-center h-screen w-screen gap-2">
            <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105"></div>
            <p className="text-[2rem] font-light">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="h-full w-screen">
          <div className="inset-x-0 top-0 h-16">
            <NavbarProfil />
          </div>

          <div className="grid grid-cols-[0.4fr_2fr] grid-rows-1 gap-1 pt-[3vh] h-[93vh]">
            <Sidebar />
            <div className="">
              <div className="w-full justify-center flex flex-wrap overflow-x-hidden gap-8 ">
                {dataKost?.map((item, key) => (
                  <Items key={key} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpanKostChildren;
