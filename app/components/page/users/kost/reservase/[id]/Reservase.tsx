"use client";
import Image from "next/image";
import NavbarItem from "@/app/components/component/navbar/NavbarItem";
import Reviews from "@/app/components/component/card/user/Reviews";
import { useState, useEffect } from "react";
import { Star, Phone, Mail } from "lucide-react";
import API from "@/app/components/core/util/API";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/app/components/core/hooks/dispatch/dispatch";
import { itemsType } from "@/app/components/types/API";
import { getFasilitas } from "@/app/components/core/helper/faslitasHelper";
import PopUp from "@/app/components/component/modal/PopUp";
import Modal from "@/app/components/component/modal/Modal";
import { ModalProps } from "@/app/components/types/API";
import { useRouter } from "next/navigation";
import { Bank } from "@/app/components/core/data/constants/bank";
import { formReservase } from "@/app/components/types/form";
import Container from "@/app/components/component/ui/Container";
import TextFieldInput from "@/app/components/component/ui/InputField";
import Select from "@/app/components/component/ui/Select";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import ButtonUploads from "@/app/components/component/ui/ButtonUploads";
import ButtonPopUp from "@/app/components/component/ui/ButtonPopup";

const ReservaseChildren: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedField, setSelectedField] = useState<any>();
  const [kostData, setKostData] = useState<itemsType | null>(null);
  const [ratingStar] = useState<number>(0);

  const [formReservase, setFormReservase] = useState<formReservase>({
    nama: "",
    bukti_pembayaran: null,
    email: "",
    gender: null,
    kontrak: null,
    metode_pembayaran: "",
    nomor_hp: "",
    tanggal_lahir: "",
  });

  const [openPopUp, setOpenPopUp] = useState<"Reservase" | null>(null);
  const [modal, setModal] = useState<ModalProps | null>(null);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const router = useRouter();

  const handleGetDataKos = async () => {
    if (id) {
      setIsLoading(true);
      try {
        const res = await API.get(`/api/kos/${id}`, {
          headers: {
            Authorization: `Bearer ${id}`,
          },
        });
        setKostData(res.data);
        console.log("Data kos berhasil diterima", res.data);
        setIsLoading(false);
      } catch (err) {
        console.log("Data kos gagal diambil", err);
        setIsLoading(false);
      }
    }
  };

  const handleReservase = async () => {
    try {
      const res = await API.post(
        `/api/reservase/${currentUser?.user._id}/${kostData?.id_kos}`,
        formReservase,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      console.log("Berhasil Melakukan Reservase", res);
    } catch (err) {
      console.log("Gagal Melakukan Reservase", err);
    }
  };

  const handleGenderChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    const booleanValue =
      value === "true" ? true : value === "false" ? false : null;

    setFormReservase((prev) => ({
      ...prev,
      gender: booleanValue,
    }));
  };

  const handleKontrakChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Triger");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("file:", file);
      setFormReservase((prev) => ({
        ...prev,
        kontrak: file,
      }));
    }
  };

  const handleMetodePembayaranChange = (e: SelectChangeEvent) => {
    setFormReservase((prev) => ({
      ...prev,
      metode_pembayaran: e.target.value,
    }));
  };

  const handleBuktiPembayaran = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Triger");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("file:", file);
      setFormReservase((prev) => ({
        ...prev,
        bukti_pembayaran: file,
      }));
    }
  };

  useEffect(() => {
    handleGetDataKos();
  }, []);

  return (
    <Container className="min-h-screen w-full bg-gray-100">
      <Container className="fixed inset-x-0 top-0 h-16 z-10">
        <NavbarItem />
      </Container>

      <Container className="container mx-auto pt-20 px-4 lg:px-8">
        {isLoading ? (
          <Container className="flex justify-center items-center h-[80vh]">
            <p className="text-xl">Loading...</p>
          </Container>
        ) : (
          <Container className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Container className="lg:col-span-2 space-y-6">
              {modal && <Modal {...modal} />}
              <Container className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative w-full h-[50vh] md:h-[60vh]">
                  {/* {kostData?.image.gallery.slice(0, 1).map((item, key) => (
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
                <Container className="grid grid-cols-2 gap-2 h-[50vh] md:h-[60vh]">
                  {kostData?.image.gallery.slice(1, 5).map((item, key) => (
                    <div key={key} className="relative w-full h-full">
                      {/* <Image
                        src={`http://localhost:5000/${item}`}
                        alt="Gallery image"
                        fill
                        className="object-cover rounded-lg"
                      /> */}
                    </div>
                  ))}
                </Container>
              </Container>

              <Container className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Container className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                  <Container className="bg-white text-black p-6 rounded-md">
                    <h1 className="text-3xl font-bold">{kostData?.nama_kos}</h1>
                    <p className="text-gray-600 mt-2">{kostData?.alamat}</p>
                    <Container className="mt-4">
                      <p className="text-lg">{kostData?.harga_pertahun}</p>
                      <Container className="flex mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            color={
                              ratingStar || kostData?.avgBintang >= star
                                ? "#FFFF00"
                                : "#000000"
                            }
                            className="w-5 h-5"
                          />
                        ))}
                      </Container>
                    </Container>
                    <Container className="mt-4 space-y-2">
                      <Container className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        <p>{kostData?.kontak.nomor}</p>
                      </Container>
                      <Container className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        <p>{kostData?.kontak.email}</p>
                      </Container>
                    </Container>
                  </Container>
                </Container>

                <Container className="bg-blue-600 p-6 rounded-lg shadow-lg">
                  <Container className="space-y-4">
                    {kostData?.fasilitas.map((item, key) => (
                      <Container
                        key={key}
                        className="flex items-center bg-white p-3 rounded-lg"
                      >
                        {getFasilitas(item.nama)}
                        <p className="ml-2">{item.jumlah}</p>
                        <p className="ml-2">{item.nama}</p>
                      </Container>
                    ))}
                  </Container>
                </Container>
              </Container>
            </Container>

            <Container className="bg-white p-6 rounded-lg shadow-lg h-fit">
              <h2 className="text-2xl font-bold text-center mb-6">
                Formulir Reservasi
              </h2>
              <Container className="space-y-4">
                <Container className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Container>
                    <TextFieldInput
                      label="Nama"
                      name={formReservase.nama}
                      type="text"
                      className="w-full border-2 rounded-md p-2"
                      value={formReservase.nama}
                      onChange={(e) =>
                        setFormReservase((prev) => {
                          const newObj = { ...prev, nama: e.target.value };
                          return newObj;
                        })
                      }
                    />
                  </Container>
                  <Container>
                    <TextFieldInput
                      type="date"
                      name={formReservase.tanggal_lahir}
                      className="w-full border-2 rounded-md p-2"
                      value={formReservase.tanggal_lahir}
                      onChange={(e) =>
                        setFormReservase((prev) => {
                          const newObj = {
                            ...prev,
                            tanggal_lahir: e.target.value,
                          };
                          return newObj;
                        })
                      }
                    />
                  </Container>
                </Container>

                <Container className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Container>
                    <TextFieldInput
                      label="Nomor HandPhone"
                      name={formReservase.nomor_hp}
                      type="text"
                      className="w-full border-2 rounded-md p-2"
                      value={formReservase.nomor_hp}
                      onChange={(e) =>
                        setFormReservase((prev) => {
                          const newObj = { ...prev, nomor_hp: e.target.value };
                          return newObj;
                        })
                      }
                    />
                  </Container>

                  <Container>
                    <Select
                      name="Gender"
                      value={
                        formReservase.gender === null
                          ? ""
                          : formReservase.gender === true
                          ? "true"
                          : "false"
                      }
                      onChange={(e) => handleGenderChange(e)}
                    >
                      <MenuItem value="true">Pria</MenuItem>
                      <MenuItem value="false">Wanita</MenuItem>
                    </Select>
                  </Container>
                </Container>

                <Container>
                  <TextFieldInput
                    label="Email"
                    type="email"
                    name={formReservase.email}
                    className="w-full border-2 rounded-md p-2"
                    value={formReservase.email}
                    onChange={(e) =>
                      setFormReservase((prev) => {
                        const newObj = { ...prev, email: e.target.value };
                        return newObj;
                      })
                    }
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Silakan unduh terlebih dahulu kontrak kos, tandatangani,
                    lalu unggah kembali.
                    <a href="/asset/Kontrak kos.png" download>
                      <span className="text-blue-500 cursor-pointer">
                        Unduh disini
                      </span>
                    </a>
                  </p>
                </Container>

                <Container>
                  <ButtonUploads
                    multiple={false}
                    accept="image/*"
                    onChange={(e) => handleKontrakChange(e)}
                  >
                    Unggah Kontrak Disini!
                  </ButtonUploads>
                </Container>

                <Container>
                  <Select
                    value={formReservase.metode_pembayaran}
                    name="Metode Pembayaran"
                    onChange={(e) => handleMetodePembayaranChange(e)}
                  >
                    <MenuItem value="">Pilih Metode Pembayaran</MenuItem>
                    {Bank.map((e) => (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    ))}
                  </Select>
                </Container>

                <Container>
                  <ButtonUploads
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => handleBuktiPembayaran(e)}
                  >
                    Unggah Bukti Pembayaran Disini
                  </ButtonUploads>
                </Container>

                <Container className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md transition duration-300"
                    onClick={() => setOpenPopUp("Reservase")}
                  >
                    <PopUp
                      isOpen={openPopUp === "Reservase"}
                      onClose={() => setOpenPopUp(null)}
                    >
                      <Container className="flex justify-center items-center flex-col">
                        <h1 className="text-black text-center w-80 text-[1.3rem]">
                          Apakah anda yakin ingin mengajukan Reservasi?
                        </h1>
                        <Container className="flex w-full justify-center my-2 gap-2">
                          <ButtonPopUp
                            message="error"
                            onClick={() => setOpenPopUp(null)}
                          >
                            Tidak
                          </ButtonPopUp>
                          <ButtonPopUp
                            message="success"
                            onClick={() => {
                              handleReservase();
                              setModal({
                                title: "Pengajuan reservasi anda berhasil",
                                deskripsi:
                                  "Kamu telah berhasil melakukan transaksi sewa kost, silahkan ke halaman Data Kost untuk melihat rincian dengan menekan tombol di bawah ini",
                                icon: "success",
                                confirmButtonText: "Click This",
                                confirmButtonColor: "#58CC41",
                                onClose: () => {
                                  setModal(null);
                                  router.push("/home");
                                  setOpenPopUp(null);
                                },
                              });
                            }}
                          >
                            Yakin
                          </ButtonPopUp>
                        </Container>
                      </Container>
                    </PopUp>
                    Reserve
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md transition duration-300"
                  >
                    Cancel
                  </button>
                </Container>
              </Container>
            </Container>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default ReservaseChildren;
