"use client";
import NavbarProfil from "@/app/components/component/navbar/NavbarProfil";
import Sidebar from "@/app/components/component/sidebar/Sidebar";
import { Target, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { reservasiType } from "@/app/components/types/API";
import API from "@/app/components/util/API";
import { getStatusString } from "@/app/components/helper/helper";
import { useHook } from "@/app/components/component/hooks/auth";

const RiwayatTransaksiChildren: React.FC = () => {
  const [month, setMonth] = useState<string>();
  const { currentUser } = useHook();
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
    handlegetReservaseData();
  }, []);

  return (
    <>
      <div className="h-screen w-screen">
        <div className=" inset-x-0 top-0 h-16">
          <NavbarProfil />
        </div>

        <div className="grid grid-cols-[0.4fr_2fr] grid-rows-1 gap-1 pt-[3vh]  h-[93vh]">
          <Sidebar />
          <div className=" p-4">
            <div className="bg-[#F4F4F4] h-full p-4 rounded-md">
              <h1 className="font-light text-[1rem]">Invoice</h1>
              <div className="flex justify-start items-start gap-4 my-4">
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
                <div className="border-2 rounded-lg flex justify-around p-2">
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="Search Here..."
                  />
                  <Search />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4 border-y-2 p-3 font-semibold text-center">
                <h1>Mitra</h1>
                <h1>Tanggal</h1>
                <h1>Metode Pembayaran</h1>
                <h1>Status</h1>
                <h1>Nomor Kos</h1>
              </div>

              <div className="grid grid-cols-5 gap-4 p-3 text-center">
                <h1 title="Mitra">{dataReservase?.id_kos.nama_kos}</h1>
                <h1 title="Tanggal">{dataReservase?.createdAt}</h1>
                <h1 title="Metode Pembayaran">
                  {dataReservase?.metode_pembayaran}
                </h1>
                <div className="border-2 rounded-md p-1 bg-[#00985B]">
                  <h1 title="Status" className="text-white  ">
                    {getStatusString(dataReservase?.kontrak)}
                  </h1>
                </div>

                <h1 title="Nomor Kos">{dataReservase?.id_kos.id_kos}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RiwayatTransaksiChildren;
