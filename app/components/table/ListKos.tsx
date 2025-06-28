"use client";
import Container from "../ui/Container";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";
import { useState, useEffect } from "react";
import { itemsType } from "@/app/types/API";
import API from "@/app/util/API";
import Pulse from "../ui/pulse";
import { ListConfigKos } from "@/app/core/data/appConfig";
import Button from "../ui/Button";
import ButtonPopUp from "../ui/ButtonPopup";
import { formApprove } from "@/app/types/form";
import PopUp from "../modal/PopUp";
import TextFieldInput from "../ui/InputField";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import CustomSelect from "../ui/Select";

const ListKosChildren: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [idKos, setIdKos] = useState<itemsType>();
  const [kostDatas, setKostDatas] = useState<itemsType[]>();
  const [formApprove, setFormApprove] = useState<formApprove>({
    alasan: "",
    status: "",
  });
  const [isActive, setIsActive] = useState<"PopUp" | null>(null);

  const approve = ["approved", "rejected"];

  const handleRejected = () => {};

  const handleApprove = async () => {
    try {
      const res = await API.patch(
        `/api/kos/${idKos?._id}/approve`,
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

  const handleStatusChange = (e: SelectChangeEvent) => {
    setFormApprove((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const handleRedirect = () => {};

  const handelPending = async () => {
    try {
      setIsLoading(true);
      const res = await API.get(`/api/kos/pending`, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      setKostDatas(res.data);
      setIdKos(res.data);
    } catch (error) {
      console.log("Gagal Melakukan Fetch", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      handelPending();
    }, 2000);
    return () => clearTimeout(time);
  }, []);

  return (
    <Container className="w-full ">
      <Container className="flex justify-center w-full items-center flex-col ">
        {isLoading ? (
          <Container className="flex-col ">
            <Container className="flex justify-center items-center h-full w-full gap-2">
              <Container className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105"></Container>
              <p className="text-[2rem] font-light">Loading...</p>
            </Container>
          </Container>
        ) : (
          <Container className="w-full flex flex-col ">
            {kostDatas?.map((items, key) => (
              <Container
                key={key}
                className="grid grid-cols-6 grid-rows-1 px-4 "
              >
                {isLoading ? (
                  <Pulse className="w-26 rounded-md my-2 " />
                ) : (
                  <span className="">{items.nama_kos}</span>
                )}
                {isLoading ? (
                  <Pulse className="w-26 rounded-md my-2 " />
                ) : (
                  <span>{items.alamat}</span>
                )}
                {isLoading ? (
                  <Pulse className="w-26 rounded-md my-2" />
                ) : (
                  <span>{items.kontak.nomor}</span>
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
                    <Button onClick={() => handleRedirect()}>
                      Selanjutnya
                    </Button>
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
        )}
      </Container>
    </Container>
  );
};

export default ListKosChildren;
