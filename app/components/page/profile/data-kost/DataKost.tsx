"use client";
import { useHook } from "@/app/components/component/hooks/auth";

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
import Container from "@/app/components/component/ui/Container";
import Button from "@/app/components/component/ui/Button";
import ButtonPopUp from "@/app/components/component/ui/ButtonPopup";

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
          <Container className="h-full w-full">
            <Container className="flex justify-center w-full items-center">
              {modal && <Modal {...modal} />}
              <Container className="grid grid-cols-[1fr_0.7fr] grid-rows-1 gap-4">
                {dataReservase?.map((item, key) => (
                  <DataKostUser key={key} data={item} />
                ))}

                <Container className="flex justify-center">
                  <Container className="grid grid-cols-1 grid-rows-3 gap-4">
                    {dataReservase?.map((item, key) => (
                      <DescriptionPartical key={key} data={item} />
                    ))}
                    <Container>
                      {dataReservase?.map((item, key) => (
                        <FasilitasParticial key={key} data={item} />
                      ))}
                    </Container>
                    <Container className="flex items-center  ">
                      <Container className="flex justify-center items-center gap-2 w-full flex-col">
                        {dataReservase?.map((item, key) => (
                          <ProfileParticial key={key} data={item} />
                        ))}

                        <Container>
                          <Button onClick={() => setOpenPopUp("Pengaduan")}>
                            Pengaduan
                          </Button>
                        </Container>

                        <Container>
                          <Button onClick={() => setOpenPopUp("Review")}>
                            Review
                          </Button>
                        </Container>

                        <PopUp
                          isOpen={openPopUp === "Hapus"}
                          onClose={() => setOpenPopUp(null)}
                        >
                          <Container className="flex justify-center items-center">
                            <h1>
                              Apakah anda yakin ingin Menghapus Reservasi Ini ?
                            </h1>
                          </Container>
                        </PopUp>

                        <PopUp
                          isOpen={openPopUp === "Review"}
                          onClose={() => setOpenPopUp(null)}
                        >
                          <Container className="flex justify-center w-full flex-col ">
                            <Container className="border-b-2 p-2">
                              <Container className="flex justify-center ">
                                <h1 className=" text-[1.3rem] font-bold">
                                  Ulasan & Review
                                </h1>
                              </Container>

                              <p className="font-light">
                                Jika kamu memiliki ulasan atau pengalaman selama
                                masa sewa, silakan dibagikan di halaman ini.
                              </p>
                            </Container>

                            <Container className="mt-2">
                              <h1 className="text-[1.3rem]">Rating</h1>
                              <Container className="flex space-x-1">
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
                              </Container>

                              <Container className="mt-2 ">
                                <h1 className="text-[1.3rem]">Review</h1>
                                <input
                                  type="text"
                                  className="w-full bg-[#979797] outline-none rounded-md p-2"
                                  onChange={(e) => setKomentar(e.target.value)}
                                />
                                <Container className="flex gap-2 mt-2">
                                  <input type="checkbox" />
                                  <h1>Submit as anonymous</h1>
                                </Container>
                                <Container className="mt-2">
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
                                </Container>
                                <Container className="mt-4 ">
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
                                </Container>
                              </Container>
                            </Container>
                          </Container>
                        </PopUp>

                        <PopUp
                          isOpen={openPopUp === "Hapus"}
                          onClose={() => setOpenPopUp(null)}
                        >
                          <Container className="flex justify-center items-center flex-col">
                            <h1 className="font-bold w-60 text-center text-[1.2rem]">
                              Apakah anda yakin ingin Menghapus Reservasi Ini ?
                            </h1>
                            <Container className="flex justify-center items-center gap-4">
                              <ButtonPopUp
                                message="error"
                                onClick={() => setOpenPopUp(null)}
                              >
                                Tidak
                              </ButtonPopUp>
                              <ButtonPopUp
                                message="success"
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
                              </ButtonPopUp>
                            </Container>
                          </Container>
                        </PopUp>

                        <Container>
                          <Button onClick={() => setOpenPopUp("Hapus")}>
                            Hapus Reservasi
                          </Button>
                        </Container>
                      </Container>
                    </Container>
                  </Container>
                </Container>
              </Container>
            </Container>
          </Container>
        )}
      </Container>
    </>
  );
};

export default DataKostChildren;
