"use client";
import { useAppSelector } from "@/app/components/core/hooks/dispatch/dispatch";
import API from "@/app/components/core/util/API";
import { useEffect, useState } from "react";
import { reservasiType } from "@/app/components/types/API";
import DescriptionPartical from "@/app/components/component/particial/Description";
import FasilitasParticial from "@/app/components/component/particial/Fasilitas";
import DataKostUser from "@/app/components/component/card/user/DataKosComponents";
import ProfileParticial from "@/app/components/component/particial/Profile";
import PopUp from "@/app/components/component/modal/PopUp";
import Modal from "@/app/components/component/modal/Modal";
import { ModalProps } from "@/app/components/types/API";
import { useRouter } from "next/navigation";
import Container from "@/app/components/component/ui/Container";
import Button from "@/app/components/component/ui/Button";
import ButtonPopUp from "@/app/components/component/ui/ButtonPopup";
import TextFieldInput from "@/app/components/component/ui/InputField";
import RatingPrimary from "@/app/components/component/ui/RatingPrimary";
import { formAddReview } from "@/app/components/types/form";
import ButtonUploads from "@/app/components/component/ui/ButtonUploads";

const DataKostChildren: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentUser } = useAppSelector((state) => state.auth);
  const [dataReservase, setDataReservase] = useState<reservasiType[]>();
  const [idReservase, setIdReservase] = useState<reservasiType>();
  const [openPopUp, setOpenPopUp] = useState<
    "Pengaduan" | "Review" | "Submit" | "Hapus" | null
  >(null);
  const [ratingStar, setRatingStar] = useState<number | null>(null);

  const [formAddReview, setFormAddRevie] = useState<formAddReview>({
    image: null,
    komentar: "",
  });
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
    if (!ratingStar || !formAddReview.komentar || !formAddReview.image) {
      console.log("Harap lengkapi semua field!");
      return;
    }

    try {
      const res = await API.post(
        `/api/reservase/review/${currentUser?.user._id}/${idReservase?._id}`,
        formAddReview,
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

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Triger");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("file:", file);
      setFormAddRevie((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  useEffect(() => {
    handleFetchResevase();
  }, []);

  return (
    <Container className="w-full h-full">
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
                  <Container className="flex items-center">
                    {dataReservase && dataReservase.length > 0 ? (
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
                                <RatingPrimary
                                  name="Rating"
                                  onChange={(event, value) => {
                                    console.log("Rating dipilih:", value);
                                    setRatingStar(value);
                                  }}
                                  onChangeActive={(event, value) => {
                                    console.log("Hover rating:", value);
                                  }}
                                />
                              </Container>

                              <Container className="mt-2 ">
                                <TextFieldInput
                                  name={formAddReview.komentar}
                                  value={formAddReview.komentar}
                                  label="Komentar"
                                  type="text"
                                  className="w-full  outline-none rounded-md p-2"
                                  onChange={(e) =>
                                    setFormAddRevie((prev) => {
                                      const newObj = {
                                        ...prev,
                                        komentar: e.target.value,
                                      };
                                      return newObj;
                                    })
                                  }
                                />
                                <Container className="flex gap-2 mt-2">
                                  <input type="checkbox" />
                                  <h1>Submit as anonymous</h1>
                                </Container>
                                <Container className="mt-2">
                                  <ButtonUploads
                                    multiple={true}
                                    accept="image/*"
                                    onChange={(e) => handleFotoChange(e)}
                                  >
                                    <h1 className="font-bold">
                                      Foto Pendukung
                                    </h1>
                                  </ButtonUploads>
                                </Container>
                                <Container className="mt-4  flex  gap-8">
                                  <ButtonPopUp
                                    message="success"
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
                                  >
                                    Submit Review
                                  </ButtonPopUp>

                                  <ButtonPopUp
                                    message="error"
                                    onClick={() => setOpenPopUp(null)}
                                  >
                                    Batal Review
                                  </ButtonPopUp>
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
                    ) : (
                      <Container className="w-full h-full">
                        <Container className="flex justify-center items-center w-full h-full">
                          <p className="text-center">
                            Tidak Ada Reservasi Untuk Akun Ini!!
                          </p>
                        </Container>
                      </Container>
                    )}
                  </Container>
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default DataKostChildren;
