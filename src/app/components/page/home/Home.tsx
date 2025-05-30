"use client";
import { useState, useEffect } from "react";
import NavbarHome from "@/app/components/component/navbar/NavbarHome";
import Items from "@/app/components/component/card/Items";
import FooterLanding from "@/app/components/component/footer/FooterLanding";
import { Funnel, Home } from "lucide-react";
import API from "@/app/components/util/API";
import { itemsType } from "@/app/components/type/API";
import { useHook } from "../../component/hooks/Kontex";

const HomeComponent: React.FC = () => {
  const [filter, setFilter] = useState<any>({
    fasilitas: [],
    minHarga: "",
    maxHarga: "",
    rating: "",
    tipeHarga: "",
    harga: "",
  });
  const [items, setItems] = useState<itemsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedField, setSelectedField] = useState<any>();

  const FilterOption = ["rating"];
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

  const handleFilterFetch = async () => {
    try {
      const res = await API.get("/api/kos/filter", {
        params: filter,
      });
      setItems(res.data);
      console.log("ini data filter", filter);
    } catch (err) {
      console.log("data filter gagal", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonFilter = () => {
    handleFilterFetch();
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex-col">
          <NavbarHome />
          <div className="flex justify-center items-center h-screen w-screen gap-2">
            <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105"></div>
            <p className="text-[2rem] font-light">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="w-screen h-full pb-[1rem] ">
            <div className="m-2">
              <NavbarHome />
            </div>
            <div className="flex justify-around">
              <div className="flex w-full justify-around gap-[60rem]">
                <div title="side-kana" className="flex space-x-4 ">
                  <button className="border-2 border-gray-300 rounded-md w-[5vw]  duration-[1s]">
                    All
                  </button>
                  <button className="border-2 border-gray-300 rounded-md w-[5vw]  duration-[1s]">
                    Top Kost
                  </button>
                </div>
                <div title="side-kiri" className="flex space-x-4">
                  <form
                    action={handleButtonFilter}
                    className="border-2  border-gray-300 rounded-sm flex items-center space-x-2 p-1"
                  >
                    <Funnel />
                    <h1 className="">Filter</h1>
                    <select
                      name=""
                      value={selectedField}
                      className="outline-none"
                      onChange={(e) => {
                        const field = e.target.value;
                        setSelectedField(field);
                      }}
                    >
                      <option value="" className="text-black font-bold">
                        Pilih Filter
                      </option>
                      {FilterOption.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>

                    {selectedField && (
                      <input
                        type="text"
                        placeholder="Saya ingin:"
                        className="border-2 border-gray-300 p-2 rounded-lg "
                        onChange={(e) => {
                          const value = e.target.value;
                          setFilter((prev: any) => ({
                            ...prev,
                            [selectedField]: value,
                          }));
                        }}
                      />
                    )}

                    {selectedField && (
                      <button
                        type="submit"
                        className="border-2 border-gray-300 p-2 rounded-lg"
                      >
                        Filter
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
            <div className="w-full h-full ">
              <div className=" flex justify-center items-center my-8">
                <h1 className="font-bold text-[3rem]">
                  Pilihan Teratas Untuk Anda
                </h1>
              </div>
              <div className="w-full justify-center gap-8 flex p-[1rem]">
                {items.slice(0, 4).map((item, index) => (
                  <Items key={index} data={item} />
                ))}
              </div>
              <div className="flex justify-center items-center my-10">
                <h1 className="font-bold text-[3rem]">Rekomendasi Lainnya</h1>
              </div>
              <div className="w-full justify-center flex flex-wrap overflow-x-hidden gap-8 p-[1rem] mb-[8vh]">
                {items.slice(4, 40).map((item, index) => (
                  <Items key={index} data={item} />
                ))}
              </div>
            </div>
          </div>
          <FooterLanding />
        </>
      )}
    </div>
  );
};

export default HomeComponent;
