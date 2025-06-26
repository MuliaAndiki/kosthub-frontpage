"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { reservasiType } from "@/app/types/API";
import API from "@/app/util/API";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";
import Container from "@/app/components/ui/Container";
import Table from "@/app/components/ui/Table";
import { PenyewaanConfigDatas } from "@/app/core/data/appConfig";

const PenyewaanChildren: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handlegetReservaseData = async () => {
    try {
      const res = await API.get(
        `/api/reservase/user/${currentUser?.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
    } catch (error) {
      console.log("Gagal Melakukan Fetch Reservase Data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const colums = PenyewaanConfigDatas.map((item) => {
    return {
      field: item.field,
      headerName: item.label,
      width: 150,
      ...(item.value && {
        valueGetter: (params: any) => item.value!(params.row),
      }),
    };
  });
  useEffect(() => {
    const time = setTimeout(() => {
      handlegetReservaseData();
    }, 2000);
    return () => clearTimeout(time);
  }, []);

  return (
    <Container className="w-full h-full">
      {isLoading ? (
        <Container className="flex-col ">
          <Container className="flex justify-center items-center h-screen w-full gap-2">
            <Container className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105"></Container>
            <p className="text-[2rem] font-light">Loading...</p>
          </Container>
        </Container>
      ) : (
        <Container className="h-full w-full">
          <Table
            fetchRows={handlegetReservaseData}
            columns={colums}
            height={600}
          />
        </Container>
      )}
    </Container>
  );
};

export default PenyewaanChildren;
