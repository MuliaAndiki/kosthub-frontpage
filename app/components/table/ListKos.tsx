"use client";
import Container from "../ui/Container";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";
import { useState, useEffect } from "react";
import { itemsType } from "@/app/types/API";
import API from "@/app/util/API";
import Pulse from "../ui/pulse";
import { ListConfigKos } from "@/app/core/data/appConfig";

const ListKosChildren: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [kostDatas, setKostDatas] = useState<itemsType>();

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
    <Container className="grid grid-cols-6 grid-rows-1 ">
      {ListConfigKos.map((items, key) => (
        <Container key={key} className="flex justify-center items-center">
          {isLoading ? (
            <Pulse className="w-32 h-6 rounded-md my-2" />
          ) : (
            <span>{items.label}</span>
          )}
        </Container>
      ))}
    </Container>
  );
};

export default ListKosChildren;
