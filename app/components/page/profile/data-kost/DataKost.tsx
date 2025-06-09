"use client";
import { useHook } from "@/app/components/component/hooks/auth";
import NavbarProfil from "@/app/components/component/navbar/NavbarProfil";
import Sidebar from "@/app/components/component/sidebar/Sidebar";
import API from "@/app/components/util/API";
import { useEffect, useState } from "react";
import { reservasiType } from "@/app/components/types/API";
import DescriptionPartical from "@/app/components/component/particial/Description";
import FasilitasParticial from "@/app/components/component/particial/Fasilitas";
import DataKostUser from "@/app/components/component/card/DataKosComponents";
import ProfileParticial from "@/app/components/component/particial/Profile";
import PopUp from "@/app/components/component/modal/PopUp";
import { Star } from "lucide-react";
import Modal from "@/app/components/component/modal/Modal";
import { ModalProps } from "@/app/components/types/API";
import { useRouter } from "next/navigation";

const DataKostChildren: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentUser } = useHook();
  const [dataReservase, setDataReservase] = useState<reservasiType[]>();
  const [idReservase, setIdReservase] = useState<reservasiType>();
  const [openPopUp, setOpenPopUp] = useState<
    "Pengaduan" | "Review" | "Submit" | "Hapus" | null
  >(null);
  const [ratingStar, setRatingStar] = useState<number>(0);
  const [hoverStar, setHoverStar] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [komentar, setKomentar] = useState<string>("");
  const [modal, setModal] = useState<ModalProps | null>();
  const router = useRouter();

  const handleDeleteReservase = async () => {
    try {
      const res = await API.delete(
        `/api/reservase/user/${currentUser?.user._id}/${idReservase?._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      console.log("Reservase Kos Berhasil Dihapus", res);
    } catch (error) {
      console.log("gagal Mengapus Reservase Kost", error);
    }
  };
  const handleFetchResevase = async () => {
    try {
      const res = await API.get(
        `/api/reservase/user/${currentUser?.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      console.log("Respon Api Reservase", res.data);
      setDataReservase(res.data.data);
      setIdReservase(res.data.data[0]);
    } catch (error) {
      console.log("Gagal Melakukan Fetch Reservase Data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReview = async () => {
    if (!ratingStar || !komentar || !image) {
      console.log("Harap lengkapi semua field!");
      return;
    }
    const formData = new FormData();
    formData.append("bintang", ratingStar.toString()),
      formData.append("komentar", komentar),
      formData.append("imageUlasan", image);

    try {
      const res = await API.post(
        `/api/reservase/review/${currentUser?.user._id}/${idReservase?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      console.log("Berhasil Tambah Ulasan", res);
    } catch (error) {
      console.log("Gagal Menambah Ulasan", error);
    }
  };

  useEffect(() => {
    handleFetchResevase();
  }, []);

  // Debugg ambil id reservase
  // useEffect(() => {
  //   console.log("idReservase:", idReservase?._id);
  // }, [idReservase]);

  // useEffect(() => {
  //   console.log("idUser:", currentUser?.user._id);
  // }, [currentUser]);
  return (
    <>
      <div>
        {isLoading ? (
          <div className="flex-col">
            <div className="flex justify-center items-center h-screen w-screen gap-2">
              <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105"></div>

              <p className="text-[2rem] font-light">Loading...</p>
            </div>
          </div>
        ) : (
          <div className="h-screen w-screen">
            <div className=" inset-x-0 top-0 h-16">
              <NavbarProfil />
            </div>
            <div className="grid grid-cols-[0.4fr_2fr] grid-rows-1 gap-1 pt-[3vh]  h-[93vh]">
              <Sidebar />
              <div className="flex justify-center items-center">
                {modal && <Modal {...modal} />}
                <div className="grid grid-cols-[1fr_0.7fr] grid-rows-1 gap-4">
                  {dataReservase?.map((item, key) => (
                    <DataKostUser key={key} data={item} />
                  ))}

                  <div className="flex justify-center">
                    <div className="grid grid-cols-1 grid-rows-3 gap-4">
                      {dataReservase?.map((item, key) => (
                        <DescriptionPartical key={key} data={item} />
                      ))}
                      <div>
                        {dataReservase?.map((item, key) => (
                          <FasilitasParticial key={key} data={item} />
                        ))}
                      </div>
                      <div className="flex items-center  ">
                        <div className="flex justify-center items-center gap-2 w-full flex-col">
                          {dataReservase?.map((item, key) => (
                            <ProfileParticial key={key} data={item} />
                          ))}

                          <div className="border-2 bg-[#3572EF] rounded-lg p-2 w-full flex justify-center hover:scale-103 duration-[0.3s] mt-8">
                            <button
                              onClick={() => setOpenPopUp("Pengaduan")}
                              className="text-white font-bold"
                            >
                              Pengaduan
                            </button>
                          </div>

                          <div className="border-2 bg-[#3572EF] rounded-lg p-2 w-full flex justify-center hover:scale-103 duration-[0.3s]">
                            <button
                              onClick={() => setOpenPopUp("Review")}
                              className="text-white font-bold"
                            >
                              Review
                            </button>
                          </div>

                          <PopUp
                            isOpen={openPopUp === "Hapus"}
                            onClose={() => setOpenPopUp(null)}
                          >
                            <div className="flex justify-center items-center">
                              <h1>
                                Apakah anda yakin ingin Menghapus Reservasi Ini
                                ?
                              </h1>
                            </div>
                          </PopUp>

                          <PopUp
                            isOpen={openPopUp === "Review"}
                            onClose={() => setOpenPopUp(null)}
                          >
                            <div className="flex justify-center w-full flex-col ">
                              <div className="border-b-2 p-2" title="header">
                                <div className="flex justify-center ">
                                  <h1 className=" text-[1.3rem] font-bold">
                                    Ulasan & Review
                                  </h1>
                                </div>

                                <p className="font-light">
                                  Jika kamu memiliki ulasan atau pengalaman
                                  selama masa sewa, silakan dibagikan di halaman
                                  ini.
                                </p>
                              </div>

                              <div className="mt-2">
                                <h1 className="text-[1.3rem]">Rating</h1>
                                <div className="flex space-x-1">
                                  {[1, 2, 3, 4, 5].map((key) => (
                                    <div
                                      key={key}
                                      onMouseEnter={() => setHoverStar(key)}
                                      onMouseLeave={() => setHoverStar(0)}
                                      onClick={() => setRatingStar(key)}
                                      className="cursor-pointer transition-transform duration-200 hover:scale-110"
                                    >
                                      <Star
                                        size={24}
                                        color={
                                          key <= (hoverStar || ratingStar)
                                            ? "#FFD700"
                                            : "#D1D5DB"
                                        }
                                        fill={
                                          key <= (hoverStar || ratingStar)
                                            ? "#FFD700"
                                            : "none"
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>

                                <div className="mt-2 ">
                                  <h1 className="text-[1.3rem]">Review</h1>
                                  <input
                                    type="text"
                                    className="w-full bg-[#979797] outline-none rounded-md p-2"
                                    onChange={(e) =>
                                      setKomentar(e.target.value)
                                    }
                                  />
                                  <div className="flex gap-2 mt-2">
                                    <input type="checkbox" />
                                    <h1>Submit as anonymous</h1>
                                  </div>
                                  <div className="mt-2">
                                    <h1 className="text-[1.3rem]">
                                      Foto Pendukung
                                    </h1>
                                    <input
                                      type="file"
                                      placeholder=""
                                      className="w-full bg-[#979797] p-2 rounded-md"
                                      onChange={(e) => {
                                        if (
                                          e.target.files &&
                                          e.target.files.length > 0
                                        ) {
                                          setImage(e.target.files[0]);
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="mt-4 ">
                                    <button
                                      onClick={() => {
                                        handleAddReview();
                                        setModal({
                                          title: "Berhasil Menambahakan Review",
                                          icon: "success",
                                          deskripsi: "",
                                          onClose: () => {
                                            setModal(null);
                                            setOpenPopUp(null);
                                          },
                                        });
                                      }}
                                      className="font-bold rounded-md bg-[#06BE37] p-2 text-white hover:scale-[103%] duration-[0.3s]"
                                    >
                                      Submit Review
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </PopUp>

                          <PopUp
                            isOpen={openPopUp === "Hapus"}
                            onClose={() => setOpenPopUp(null)}
                          >
                            <div className="flex justify-center items-center flex-col">
                              <h1 className="font-bold w-60 text-center text-[1.2rem]">
                                Apakah anda yakin ingin Menghapus Reservasi Ini
                                ?
                              </h1>
                              <div className="flex justify-center items-center gap-4">
                                <button
                                  className="p-2 bg-red-600 rounded-md font-bold text-white"
                                  onClick={() => setOpenPopUp(null)}
                                >
                                  Tidak
                                </button>
                                <button
                                  className="p-2 bg-[#06BE37] rounded-md font-bold text-white"
                                  onClick={() => {
                                    handleDeleteReservase();
                                    setModal({
                                      title: "Berhasil Delete",
                                      deskripsi: "",
                                      icon: "success",
                                      onClose: () => {
                                        setModal(null);
                                        setOpenPopUp(null);
                                        router.push("/profile");
                                      },
                                    });
                                  }}
                                >
                                  Yakin
                                </button>
                              </div>
                            </div>
                          </PopUp>

                          <div className="border-2 bg-[#3572EF] rounded-lg p-2 w-full flex justify-center hover:scale-103 duration-[0.3s]">
                            <button
                              onClick={() => setOpenPopUp("Hapus")}
                              className="text-white font-bold"
                            >
                              Hapus Reservasi
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DataKostChildren;
