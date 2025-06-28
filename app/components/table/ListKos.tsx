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

const ListKosChildren: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [kostDatas, setKostDatas] = useState<itemsType[]>();

  const handleApprove = async () => {};

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
      <Container className="flex justify-center w-full items-center ">
        <Container className=" w-full flex flex-col ">
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
                    onClick={() => handleApprove()}
                    message="success"
                  >
                    Approved
                  </ButtonPopUp>
                )}
                {isLoading ? (
                  <Pulse className="w-26 rounded-md my-2" />
                ) : (
                  <ButtonPopUp onClick={() => handleApprove()} message="error">
                    Rejected
                  </ButtonPopUp>
                )}
              </Container>
            </Container>
          ))}
        </Container>
      </Container>
    </Container>
  );
};

export default ListKosChildren;
