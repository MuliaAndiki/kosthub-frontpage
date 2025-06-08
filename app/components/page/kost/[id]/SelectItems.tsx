"use client";
import Image from "next/image";
import facebook from "@/public/asset/facebook.svg";
import twiter from "@/public/asset/twiter.svg";
import instagram from "@/public/asset/instagram.svg";
import NavbarItem from "@/app/components/component/navbar/NavbarItem";
import { usePathname } from "next/navigation";
import Reviews from "@/app/components/component/card/Reviews";
import { useState, useEffect } from "react";
import { Hotel, Star, Phone, Mail, Forward, Bookmark } from "lucide-react";
import API from "@/app/components/util/API";
import { itemsType } from "@/app/components/types/API";
import { useHook } from "@/app/components/component/hooks/auth";
import { getFasilitas } from "@/app/components/helper/faslitasHelper";
import Link from "next/link";
import { useParams } from "next/navigation";
import DataKost from "@/app/(pages)/profile/data-kost/page";
import Modal from "@/app/components/component/modal/Modal";
import { ModalProps } from "@/app/components/types/API";

const SelectItemsComponent: React.FC = () => {
  const { currentUser } = useHook();
  const [kostId, setKostId] = useState<string>("");
  const [kostData, setKostData] = useState<itemsType | null>(null);
  const [ratingStar] = useState<number>(0);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<ModalProps | null>(null);
  const { id } = useParams();

  const handleGetData = async () => {
    if (id) {
      setIsLoading(true);
      try {
        const res = await API.get(`/api/kos/${id}`, {
          headers: {
            Authorization: `Bearer ${id}`,
          },
        });
        setKostData(res.data);
        console.log("Data Berhasil Diterima:", res.data);
        setIsLoading(false);
      } catch (err) {
        console.log("Gagal Mengambil Data", err);
        setIsLoading(false);
      }
    }
  };

  const handleSaveKost = async () => {
    try {
      await API.post(
        `/api/auth/save-kos/${kostData?.id_kos}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
    } catch (err) {
      console.log("Gagal Simpan Kost", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetData();
    console.log("Id Kost", kostData?.id_kos);
  }, [pathname, kostId]);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {isLoading ? (
        <div className="flex-col">
          <div className="fixed inset-x-0 top-0 h-16 z-10">
            <NavbarItem />
          </div>
          <div className="flex justify-center items-center h-screen">
            <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-blue-500 mr-2"></div>
            <p className="text-xl">Loading...</p>
          </div>
        </div>
      ) : kostData ? (
        <div className="pt-20">
          <div className="fixed inset-x-0 top-0 h-16 z-10">
            <NavbarItem />
          </div>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {modal && <Modal {...modal} />}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative w-full h-[50vh] md:h-[60vh]">
                    {/* {kostData.image.gallery.slice(0, 1).map((item, key) => (
                      <Image
                        key={key}
                        src={`http://localhost:5000/${item}`}
                        alt="Main gallery image"
                        fill
                        className="object-cover rounded-lg"
                        priority
                      />
                    ))} */}
                  </div>
                  <div className="grid grid-cols-2 gap-2 h-[50vh] md:h-[60vh]">
                    {/* {kostData.image.gallery.slice(1, 5).map((item, key) => (
                      <div key={key} className="relative w-full h-full">
                        <Image
                          src={`http://localhost:5000/${item}`}
                          alt="Gallery image"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ))} */}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">{kostData.nama_kos}</h1>
                  <div className="flex gap-4">
                    <Forward className="w-6 h-6 cursor-pointer hover:text-blue-500 transition" />
                    <button
                      onClick={() => {
                        handleSaveKost();
                        setModal({
                          title: "Berhasil Menyimpan Kost",
                          deskripsi: "",
                          icon: "success",
                          confirmButtonColor: "#3572EF",
                          onClose: () => {
                            setModal(null);
                          },
                        });
                      }}
                    >
                      <Bookmark className="w-6 h-6 cursor-pointer hover:text-yellow-300 transition" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">{kostData.alamat}</p>

                <div className="bg-blue-600 p-6 rounded-lg shadow-lg">
                  <div className="flex flex-wrap gap-4">
                    {kostData.fasilitas.map((item, key) => (
                      <div
                        key={key}
                        className="flex flex-col bg-white rounded-lg p-3 min-w-[120px]"
                      >
                        <div className="flex items-center">
                          {getFasilitas(item.nama)}
                          <p className="ml-2">{item.jumlah}</p>
                        </div>
                        <span className="font-bold">{item.nama}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-600 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold text-white mb-2">
                    Description
                  </h2>
                  <div className="bg-white p-4 rounded-md">
                    <p>{kostData.deskripsi}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-blue-600 p-6 rounded-lg shadow-lg">
                  <div className="bg-white p-6 rounded-md space-y-4">
                    <h1 className="text-3xl font-bold">{kostData.nama_kos}</h1>
                    <p className="text-gray-600">{kostData.alamat}</p>
                    <p className="font-bold text-lg">
                      IDR {kostData.harga_pertahun}/Year
                    </p>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          color={
                            ratingStar || kostData.avgBintang >= star
                              ? "#FFFF00"
                              : "#000000"
                          }
                          className="w-5 h-5 transition"
                        />
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">
                        Are you interested? Please contact us!
                      </p>
                      <div className="flex items-center gap-2">
                        <Hotel className="w-5 h-5" />
                        <p>{kostData.alamat}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        <p>{kostData.kontak.nomor}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        <p>{kostData.kontak.email}</p>
                      </div>
                      <p className="font-semibold">Social Media</p>
                      <div className="flex items-center gap-2">
                        <Image
                          src={facebook}
                          alt="Facebook"
                          width={24}
                          height={24}
                        />
                        <Image
                          src={twiter}
                          alt="Twitter"
                          width={24}
                          height={24}
                        />
                        <Image
                          src={instagram}
                          alt="Instagram"
                          width={24}
                          height={24}
                        />
                        <p>{kostData.nama_kos}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href={`/kost/reservase/${kostData.id_kos}`}>
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md transition">
                    Reserve
                  </button>
                </Link>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">
                {kostData.ulasan?.length || 0} Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kostData.ulasan?.length ? (
                  kostData.ulasan.map((items, index) => (
                    <Reviews key={index} data={items} />
                  ))
                ) : (
                  <p className="text-gray-600">
                    Belum ada ulasan untuk kost ini.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-col">
          <div className="fixed inset-x-0 top-0 h-16 z-10">
            <NavbarItem />
          </div>
          <div className="flex justify-center items-center h-screen">
            <p className="text-xl">Data tidak ditemukan</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectItemsComponent;
