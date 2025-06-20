"use client";
import { useState, useEffect } from "react";
import Items from "@/app/components/card/user/Items";
import { Funnel } from "lucide-react";
import API from "@/app/util/API";
import { itemsType } from "@/app/types/API/index";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";
import Container from "../../../../components/ui/Container";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";
import CustomSelect from "@/app/components/ui/Select";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Filter } from "@/app/core/data/constants/filter";

const HomeUserChildren: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useState<itemsType[]>([]);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [formFilter, setFormFilter] = useState<FilterType>({
  //   fasilitas: [""],
  //   harga: "",
  //   maxHarga: "",
  //   minHarga: "",
  //   rating: "",
  //   tipeHarga: "",
  // });

  // const handleFilter = (e: SelectChangeEvent) => {
  //   setFormFilter((prev) => )
  // };

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

  // const handleFilterChange = async () => {
  //   try {
  //     const res = await API.post(`/api/kos/filter`, formFilter, {
  //       headers: {
  //         Authorization: `Bearer ${currentUser?.token}`,
  //       },
  //     });

  //     console.log("Berhail NgeFilter", res);
  //   } catch (error) {
  //     console.log("Gagal Melakukan Filtering", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
          <Container className="flex justify-around">
            <Container className="flex w-full justify-around gap-[60rem]">
              <Container className="flex space-x-4 ">
                <ButtonPrimary>All</ButtonPrimary>
                <ButtonPrimary>Top Kost</ButtonPrimary>
              </Container>
              <Container className="flex space-x-4">
                <Container className=" border-gray-300 rounded-sm flex items-center space-x-2 p-1">
                  <Funnel />
                  <h1 className="">Filter</h1>
                  {/* <CustomSelect name="" onChange={} >
                    <MenuItem value="" className="text-black font-bold">
                      Pilih Filter
                    </MenuItem>
                    {Filter.map((e) => (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    ))}
                  </CustomSelect> */}
                </Container>
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
