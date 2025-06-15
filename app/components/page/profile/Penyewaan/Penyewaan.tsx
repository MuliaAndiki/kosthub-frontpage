"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { reservasiType } from "@/app/components/types/API";
import API from "@/app/components/core/util/API";
import { useAppSelector } from "@/app/components/core/hooks/dispatch/dispatch";
import Container from "@/app/components/component/ui/Container";

const PenyewaanChildren: React.FC = () => {
  const [month, setMonth] = useState<string>();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [dataReservase, setDataReservase] = useState<reservasiType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handlegetReservaseData = async () => {
    try {
      const res = await API.get(
        `/api/reservase/user/${currentUser?.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      console.log("Respon Api Reservase", res.data.data);
      setDataReservase(res.data.data[0]);
    } catch (error) {
      console.log("Gagal Melakukan Fetch Reservase Data", error);
    } finally {
      setIsLoading(false);
    }
  };
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  useEffect(() => {
    const time = setTimeout(() => {
      handlegetReservaseData();
    }, 1000);
    return () => clearTimeout(time);
  }, []);

  return (
    <Container className="w-full h-full">
      {isLoading ? (
        <Container className="flex-col ">
          <Container className="flex justify-center items-center h-screen w-full gap-2">
            <Container className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105">
              -
            </Container>
            <p className="text-[2rem] font-light">Loading...</p>
          </Container>
        </Container>
      ) : (
        <Container className="h-full w-full">
          <Container className=" h-full ">
            <Container className="bg-[#F4F4F4] h-full p-4 rounded-md">
              <h1 className="font-light text-[1rem]">Invoice</h1>
              <Container className="flex justify-start items-start gap-4 my-4">
                <select
                  value={month}
                  className="border-2 rounded-md p-2"
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Pilih Bulan</option>

                  {bulan.map((e) => (
                    <option key={e} value={e} className="text-black">
                      {e}
                    </option>
                  ))}
                </select>
                <Container className="border-2 rounded-lg flex justify-around p-2">
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="Search Here..."
                  />
                  <Search />
                </Container>
              </Container>
              <Container className="grid grid-cols-5 gap-4 border-y-2 p-3 font-semibold text-center">
                <h1>Mitra</h1>
                <h1>Tanggal</h1>
                <h1>Metode Pembayaran</h1>
                <h1>Status</h1>
                <h1>Nomor Kos</h1>
              </Container>

              <Container className="grid grid-cols-5 gap-4 p-3 text-center">
                <h1 title="Mitra">{dataReservase?.id_kos.nama_kos}</h1>
                <h1 title="Tanggal">{dataReservase?.createdAt}</h1>
                <h1 title="Metode Pembayaran">
                  {dataReservase?.metode_pembayaran}
                </h1>
                <Container className="border-2 rounded-md p-1 bg-[#00985B]">
                  <h1 title="Status" className="text-white  ">
                    {dataReservase?.kontrak}
                  </h1>
                </Container>

                <h1 title="Nomor Kos">{dataReservase?.id_kos.id_kos}</h1>
              </Container>
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default PenyewaanChildren;
