"use client";
import Container from "../ui/Container";
import { useState, useEffect } from "react";
import { reservasiType } from "@/app/types/API";
import { ListConfigReservase } from "@/app/core/data/appConfig";
import Pulse from "../ui/pulse";
import Button from "../ui/Button";
import ButtonPopUp from "../ui/ButtonPopup";
import CustomSelect from "../ui/Select";
import PopUp from "../modal/PopUp";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import TextFieldInput from "../ui/InputField";
import { formApprove } from "@/app/types/form";
import API from "@/app/util/API";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";

const ListReservaseChildren: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [reservaseDatas, setReservaseDatas] = useState<reservasiType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<"PopUp" | null>(null);
  const [idReservase, setIdReservase] = useState<reservasiType>();
  const [formApprove, setFormApprove] = useState<formApprove>({
    alasan: "",
    status: "",
  });

  const handleRedirect = () => {};

  const handleStatusChange = (e: SelectChangeEvent) => {
    setFormApprove((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const approve = ["approved", "rejected"];

  const handleGetReservase = async () => {
    try {
      setIsLoading(true);
      const res = await API.get(`/api/reservase/status`, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      setReservaseDatas(res.data.datas);
      setIdReservase(res.data.datas);
    } catch (error) {
      console.log(`Gagal Melakuakan Fetch ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      const res = await API.patch(
        `/api/kos/${idReservase?._id}/approve`,
        formApprove,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      console.log(`Berhasil Approve ${res}`);
    } catch (error) {
      console.log(`Gagal Melakukan Approve ${error}`);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      handleGetReservase();
    }, 2000);
    return () => clearTimeout(time);
  }, []);
  return (
    <Container className="w-full">
      <Container className="w-full flex flex-col ">
        {reservaseDatas?.map((items, key) => (
          <Container key={key} className="grid grid-cols-6 grid-rows-1 px-4 ">
            {isLoading ? (
              <Pulse className="w-26 rounded-md my-2 " />
            ) : (
              <span className="">{items.nama}</span>
            )}
            {isLoading ? (
              <Pulse className="w-26 rounded-md my-2 " />
            ) : (
              <span>{items.email}</span>
            )}
            {isLoading ? (
              <Pulse className="w-26 rounded-md my-2" />
            ) : (
              <span>{items.metode_pembayaran}</span>
            )}
            {isLoading ? (
              <Pulse className="w-26 rounded-md my-2" />
            ) : (
              <span>{items.status}</span>
            )}
            {isLoading ? (
              <Pulse className="w-26 rounded-md my-2" />
            ) : (
              <Container className="w-full  ">
                <Button onClick={() => handleRedirect()}>Selanjutnya</Button>
              </Container>
            )}

            <Container className="flex  justify-center items-center">
              {isLoading ? (
                <Pulse className="w-26 rounded-md my-2" />
              ) : (
                <ButtonPopUp
                  onClick={() => setIsActive("PopUp")}
                  message="secondary"
                >
                  Ambil Tindakan
                </ButtonPopUp>
              )}
            </Container>
            <PopUp
              isOpen={isActive === "PopUp"}
              onClose={() => setIsActive(null)}
            >
              <Container className="w-full flex justify-center flex-col gap-4">
                <h1 className="text-center md:text-2xl font-bold">
                  Mohon Lengkapi
                </h1>

                <CustomSelect
                  name="Status"
                  value={formApprove.status}
                  onChange={(e) => handleStatusChange(e)}
                >
                  {approve.map((key) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </CustomSelect>
                <TextFieldInput
                  name={formApprove.alasan}
                  value={formApprove.alasan}
                  label="Alasan"
                  onChange={(e) =>
                    setFormApprove((prev) => {
                      const newObj = { ...prev, alasan: e.target.value };
                      return newObj;
                    })
                  }
                />
                <Container className="flex justify-center items-center gap-4">
                  <ButtonPopUp
                    message="success"
                    onClick={() => handleApprove()}
                  >
                    Yakin
                  </ButtonPopUp>
                  <ButtonPopUp
                    message="error"
                    onClick={() => setIsActive(null)}
                  >
                    Tidak
                  </ButtonPopUp>
                </Container>
              </Container>
            </PopUp>
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default ListReservaseChildren;
