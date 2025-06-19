"use client";
import { useState, useEffect } from "react";
import Items from "@/app/components/component/card/user/Items";
import { Funnel } from "lucide-react";
import API from "@/app/core/util/API";
import { itemsType } from "@/app/types/API/index";
import { useAppSelector } from "@/app/core/hooks/dispatch/dispatch";
import Container from "../../../component/ui/Container";
import { useRouter } from "next/navigation";

const HomeUserChildren: React.FC = () => {
  const [filter, setFilter] = useState<any>({
    fasilitas: [],
    minHarga: "",
    maxHarga: "",
    rating: "",
    tipeHarga: "",
    harga: "",
  });
  const router = useRouter();
  const [items, setItems] = useState<itemsType[]>([]);
  const { currentUser } = useAppSelector((state) => state.auth);
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
            <Container className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105">
              -
            </Container>
            <p className="text-[2rem] font-light">Loading...</p>
          </Container>
        </Container>
      ) : (
        <Container className="w-screen h-full my-4">
          <Container className="flex justify-around">
            <Container className="flex w-full justify-around gap-[60rem]">
              <Container className="flex space-x-4 ">
                <button className="border-2 border-gray-300 rounded-md w-[5vw]  duration-[1s]">
                  All
                </button>
                <button className="border-2 border-gray-300 rounded-md w-[5vw]  duration-[1s]">
                  Top Kost
                </button>
              </Container>
              <Container className="flex space-x-4">
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
              </Container>
            </Container>
          </Container>
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
