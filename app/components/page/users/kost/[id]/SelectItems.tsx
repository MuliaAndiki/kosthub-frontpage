"use client";
import Image from "next/image";
import facebook from "@/public/asset/facebook.svg";
import twiter from "@/public/asset/twiter.svg";
import instagram from "@/public/asset/instagram.svg";
import NavbarItem from "@/app/components/component/navbar/NavbarItem";
import { usePathname } from "next/navigation";
import Reviews from "@/app/components/component/card/user/Reviews";
import { useState, useEffect } from "react";
import { Hotel, Star, Phone, Mail, Forward, Bookmark } from "lucide-react";
import API from "@/app/components/core/util/API";
import { itemsType } from "@/app/components/types/API";
import { useHook } from "@/app/components/core/hooks/auth/auth";
import { getFasilitas } from "@/app/components/core/helper/faslitasHelper";
import Link from "next/link";
import { useParams } from "next/navigation";
import Modal from "@/app/components/component/modal/Modal";
import { ModalProps } from "@/app/components/types/API";
import Container from "@/app/components/component/ui/Container";

const SelectItemsChildren: React.FC = () => {
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
    <Container className="min-h-screen w-full bg-gray-100">
      {isLoading ? (
        <Container className="flex-col">
          <Container className="fixed inset-x-0 top-0 h-16 z-10">
            <NavbarItem />
          </Container>
          <Container className="flex justify-center items-center h-screen">
            <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-blue-500 mr-2"></div>
            <p className="text-xl">Loading...</p>
          </Container>
        </Container>
      ) : kostData ? (
        <Container className="pt-20">
          <Container className="fixed inset-x-0 top-0 h-16 z-10">
            <NavbarItem />
          </Container>
          <Container className="container mx-auto px-4 lg:px-8">
            <Container className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {modal && <Modal {...modal} />}
              <Container className="lg:col-span-2 space-y-6">
                <Container className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Container className="relative w-full h-[50vh] md:h-[60vh]">
                    {kostData.image.gallery.slice(0, 1).map((items, key) => (
                      <Image
                        key={key}
                        src={`${items}`}
                        alt="Main gallery image"
                        fill
                        className="object-cover rounded-lg"
                        priority
                      />
                    ))}
                  </Container>
                  <Container className="grid grid-cols-2 gap-2 h-[50vh] md:h-[60vh]">
                    {kostData.image.gallery.slice(1, 5).map((item, key) => (
                      <Container key={key} className="relative w-full h-full">
                        <Image
                          src={`${item}`}
                          alt="Gallery image"
                          fill
                          className="object-cover rounded-lg"
                          priority
                        />
                      </Container>
                    ))}
                  </Container>
                </Container>

                <Container className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">{kostData.nama_kos}</h1>
                  <Container className="flex gap-4">
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
                  </Container>
                </Container>
                <p className="text-gray-600">{kostData.alamat}</p>

                <Container className="bg-blue-600 p-6 rounded-lg shadow-lg">
                  <Container className="flex flex-wrap gap-4">
                    {kostData.fasilitas.map((item, key) => (
                      <Container
                        key={key}
                        className="flex flex-col bg-white rounded-lg p-3 min-w-[120px]"
                      >
                        <Container className="flex items-center">
                          {getFasilitas(item.nama)}
                          <p className="ml-2">{item.jumlah}</p>
                        </Container>
                        <span className="font-bold">{item.nama}</span>
                      </Container>
                    ))}
                  </Container>
                </Container>

                <Container className="bg-blue-600 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold text-white mb-2">
                    Description
                  </h2>
                  <Container className="bg-white p-4 rounded-md">
                    <p>{kostData.deskripsi}</p>
                  </Container>
                </Container>
              </Container>
              <Container className="space-y-6">
                <Container className="bg-blue-600 p-6 rounded-lg shadow-lg">
                  <Container className="bg-white p-6 rounded-md space-y-4">
                    <h1 className="text-3xl font-bold">{kostData.nama_kos}</h1>
                    <p className="text-gray-600">{kostData.alamat}</p>
                    <p className="font-bold text-lg">
                      IDR {kostData.harga_pertahun}/Year
                    </p>
                    <Container className="flex items-center gap-2">
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
                    </Container>
                    <Container className="space-y-2">
                      <p className="font-semibold">
                        Are you interested? Please contact us!
                      </p>
                      <Container className="flex items-center gap-2">
                        <Hotel className="w-5 h-5" />
                        <p>{kostData.alamat}</p>
                      </Container>
                      <Container className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        <p>{kostData.kontak.nomor}</p>
                      </Container>
                      <Container className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        <p>{kostData.kontak.email}</p>
                      </Container>
                      <p className="font-semibold">Social Media</p>
                      <Container className="flex items-center gap-2">
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
                      </Container>
                    </Container>
                  </Container>
                </Container>
                <Link href={`/users/kost/reservase/${kostData.id_kos}`}>
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md transition">
                    Reserve
                  </button>
                </Link>
              </Container>
            </Container>

            <Container className="mt-8">
              <h2 className="text-2xl font-bold mb-4">
                {kostData.ulasan?.length || 0} Reviews
              </h2>
              <Container className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kostData.ulasan?.length ? (
                  kostData.ulasan.map((items, index) => (
                    <Reviews key={index} data={items} />
                  ))
                ) : (
                  <p className="text-gray-600">
                    Belum ada ulasan untuk kost ini.
                  </p>
                )}
              </Container>
            </Container>
          </Container>
        </Container>
      ) : (
        <Container className="flex-col">
          <Container className="fixed inset-x-0 top-0 h-16 z-10">
            <NavbarItem />
          </Container>
          <Container className="flex justify-center items-center h-screen">
            <p className="text-xl">Data tidak ditemukan</p>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default SelectItemsChildren;
