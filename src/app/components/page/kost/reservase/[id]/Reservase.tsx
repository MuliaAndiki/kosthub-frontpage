"use client";
import Image from "next/image";
import NavbarItem from "@/app/components/component/navbar/NavbarItem";
import Reviews from "@/app/components/component/card/Reviews";
import { useState, useEffect } from "react";
import { Star, Phone, Mail } from "lucide-react";
import API from "@/app/components/util/API";
import { useParams } from "next/navigation";
import { useHook } from "@/app/components/component/hooks/Kontex";
import { itemsType } from "@/app/components/type/API";
import { getFasilitas } from "@/app/components/helper/faslitasHelper";
import PopUp from "@/app/components/component/modal/PopUp";
import Modal from "@/app/components/component/modal/Modal";
import { ModalProps } from "@/app/components/type/API";
import { useRouter } from "next/navigation";

const ReservaseComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedField, setSelectedField] = useState<any>();
  const [kostData, setKostData] = useState<itemsType | null>(null);
  const [ratingStar] = useState<number>(0);
  const [nama, setNama] = useState<string>("");
  const [tanggal_lahir, setTanggal_Lahir] = useState<string>("");
  const [nomor_hp, setNomor_Hp] = useState<string>();
  const [gender, setGender] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");
  const [metode_pembayaran, setMetode_pembayaran] = useState<string>("");
  const [kontrak, setKontrak] = useState<string>("");
  const [bukti_pembayaran, setBukti_Pembayaran] = useState<string>("");
  const [openPopUp, setOpenPopUp] = useState<"Reservase" | null>(null);
  const [modal, setModal] = useState<ModalProps | null>(null);
  const { currentUser } = useHook();
  const { id } = useParams();
  const router = useRouter();

  const MetodePembayaran = [
    "Bank Syariah Indonesia",
    "Bank Mandiri",
    "Bank Negara Indonesia",
    "Bank Tabungan Negara",
    "Bank Central Asia",
    "Bank Aceh Syariah",
  ];

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
        {
          nama,
          tanggal_lahir,
          nomor_hp,
          gender,
          email,
          metode_pembayaran: selectedField,
          kontrak,
          bukti_pembayaran,
        },
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

  const handleChange = (value: any) => {
    setGender((prev) => (prev === value ? null : value));
  };

  useEffect(() => {
    handleGetDataKos();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="fixed inset-x-0 top-0 h-16 z-10">
        <NavbarItem />
      </div>

      <div className="container mx-auto pt-20 px-4 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <p className="text-xl">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {modal && <Modal {...modal} />}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative w-full h-[50vh] md:h-[60vh]">
                  {kostData?.image.gallery.slice(0, 1).map((item, key) => (
                    <Image
                      key={key}
                      src={`http://localhost:5000/${item}`}
                      alt="Main gallery image"
                      fill
                      className="object-cover rounded-lg"
                      priority
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 h-[50vh] md:h-[60vh]">
                  {kostData?.image.gallery.slice(1, 5).map((item, key) => (
                    <div key={key} className="relative w-full h-full">
                      <Image
                        src={`http://localhost:5000/${item}`}
                        alt="Gallery image"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                  <div className="bg-white text-black p-6 rounded-md">
                    <h1 className="text-3xl font-bold">{kostData?.nama_kos}</h1>
                    <p className="text-gray-600 mt-2">{kostData?.alamat}</p>
                    <div className="mt-4">
                      <p className="text-lg">{kostData?.harga_pertahun}</p>
                      <div className="flex mt-2">
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
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        <p>{kostData?.kontak.nomor}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        <p>{kostData?.kontak.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600 p-6 rounded-lg shadow-lg">
                  <div className="space-y-4">
                    {kostData?.fasilitas.map((item, key) => (
                      <div
                        key={key}
                        className="flex items-center bg-white p-3 rounded-lg"
                      >
                        {getFasilitas(item.nama)}
                        <p className="ml-2">{item.jumlah}</p>
                        <p className="ml-2">{item.nama}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
              <h2 className="text-2xl font-bold text-center mb-6">
                Formulir Reservasi
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nama" className="block font-medium">
                      Nama
                    </label>
                    <input
                      id="nama"
                      type="text"
                      className="w-full border-2 rounded-md p-2"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="tanggal_lahir"
                      className="block font-medium"
                    >
                      Tanggal Lahir
                    </label>
                    <input
                      id="tanggal_lahir"
                      type="date"
                      className="w-full border-2 rounded-md p-2"
                      value={tanggal_lahir}
                      onChange={(e) => setTanggal_Lahir(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nomor_hp" className="block font-medium">
                      Nomor Handphone
                    </label>
                    <input
                      id="nomor_hp"
                      type="text"
                      className="w-full border-2 rounded-md p-2"
                      value={nomor_hp}
                      onChange={(e) => setNomor_Hp(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Gender</label>
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="Laki"
                          name="gender"
                          value="true"
                          checked={gender === true}
                          onChange={() => setGender(true)}
                          className="w-4 h-4"
                        />
                        <label htmlFor="Laki" className="ml-2">
                          Laki-Laki
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="Perempuan"
                          name="gender"
                          value="false"
                          checked={gender === false}
                          onChange={() => setGender(false)}
                          className="w-4 h-4"
                        />
                        <label htmlFor="Perempuan" className="ml-2">
                          Perempuan
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border-2 rounded-md p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                </div>

                <div>
                  <label htmlFor="kontrak" className="block font-medium">
                    Unggah Kontrak
                  </label>
                  <input
                    type="file"
                    className="w-full border-2 rounded-md p-2"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setKontrak(file.name);
                      }
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="pembayaran" className="block font-medium">
                    Metode Pembayaran
                  </label>
                  <select
                    value={selectedField}
                    className="w-full border-2 rounded-md p-2"
                    onChange={(e) => setSelectedField(e.target.value)}
                  >
                    <option value="">Pilih Metode Pembayaran</option>
                    {MetodePembayaran.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="bukti_pembayaran"
                    className="block font-medium"
                  >
                    Unggah Bukti Pembayaran
                  </label>
                  <input
                    type="file"
                    className="w-full border-2 rounded-md p-2"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setBukti_Pembayaran(file.name);
                      }
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md transition duration-300"
                    onClick={() => setOpenPopUp("Reservase")}
                  >
                    <PopUp
                      isOpen={openPopUp === "Reservase"}
                      onClose={() => setOpenPopUp(null)}
                    >
                      <div className="flex justify-center items-center flex-col">
                        <h1 className="text-black text-center w-80 text-[1.3rem]">
                          Apakah anda yakin ingin mengajukan Reservasi?
                        </h1>
                        <div className="flex w-full justify-center my-2 gap-2">
                          <button
                            className="bg-red-600 border-2 p-3 rounded-md hover:scale-[105%] duration-[0.3s] "
                            onClick={() => setOpenPopUp(null)}
                          >
                            Tidak
                          </button>
                          <button
                            className="bg-[#58CC41] border-2 p-3 rounded-md hover:scale-[105%] duration-[0.3s]"
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
                          </button>
                        </div>
                      </div>
                    </PopUp>
                    Reserve
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservaseComponent;
