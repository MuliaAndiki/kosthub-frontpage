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
  const [isActive, setIsActive] = useState<"approved" | "rejected" | null>(
    null
  );

  const approve = ["approved", "rejected"];

  const handleApprove = async () => {
    try {
      const res = await API.patch(`/api/kos/${idKos?._id}/approve`, {});
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
        <Container className="w-full flex flex-col ">
          {kostDatas?.map((items, key) => (
            <Container key={key} className="grid grid-cols-6 grid-rows-1 px-4">
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
                <Button onClick={() => handleRedirect()}>Selanjutnya</Button>
              )}

              <Container className="flex flex-col justify-center items-center">
                {isLoading ? (
                  <Pulse className="w-26 rounded-md my-2" />
                ) : (
                  <ButtonPopUp
                    onClick={() => setIsActive("approved")}
                    message="success"
                  >
                    Approved
                  </ButtonPopUp>
                )}
                {isLoading ? (
                  <Pulse className="w-26 rounded-md my-2" />
                ) : (
                  <ButtonPopUp
                    onClick={() => setIsActive("rejected")}
                    message="error"
                  >
                    Rejected
                  </ButtonPopUp>
                )}
              </Container>
              <PopUp
                isOpen={isActive === "approved"}
                onClose={() => setIsActive(null)}
              >
                <Container className="w-full flex justify-center flex-col gap-4">
                  <h1>Approved</h1>
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
              {isActive === "rejected" && (
                <Container>
                  <h1>ini PopUp Reject</h1>
                </Container>
              )}
            </Container>
          ))}
        </Container>
      </Container>
    </Container>
  );
};

export default ListKosChildren;
