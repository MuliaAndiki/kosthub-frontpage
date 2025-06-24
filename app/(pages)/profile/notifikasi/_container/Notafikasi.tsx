"use client";
import Container from "@/app/components/ui/Container";
import API from "@/app/util/API";
import { useAppSelector } from "@/app/hooks/dispatch/dispatch";
import Pulse from "@/app/components/ui/pulse";
import { useState } from "react";
import { itemsType } from "@/app/types/API";
import { NotifikasiConfigDatas } from "@/app/core/data/appConfig";
import Table from "@/app/components/ui/Table";
import Button from "@/app/components/ui/Button";

const NotafikasiChildren: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [activePage, setActivePage] = useState<"pending" | "approved">(
    "pending"
  );

  const columns = NotifikasiConfigDatas.map((item) => ({
    field: item.field,
    headerName: item.label,
    width: 150,
    ...(item.value && {
      valueGetter: (params: any) => item.value!(params.row),
    }),
  }));

  const handleGetStatusPending = async (queryOption: any) => {
    try {
      const res = await API.get(`/api/kos/pending`, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });

      const newDataKos = res.data.map((item: itemsType, key: number) => ({
        ...item,
        id: key + 1,
      }));
      return { rows: newDataKos };
    } catch (error) {
      console.log(`Gagal Melakukan Fetch ${error}`);
      return { rows: [] };
    }
  };

  const handleGetStatusApproved = async () => {
    try {
      const res = await API.get(`/api/kos/approve`, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      const newDataKos = res.data.map((item: itemsType, key: number) => ({
        ...item,
        id: key + 1,
      }));
      return { rows: newDataKos };
    } catch (error) {
      console.log(`Gagal Melakukan Fetch ${error}`);
      return { rows: [] };
    }
  };

  return (
    <Container as="main" className="w-full h-full">
      <Container className="flex justify-center items-center w-full flex-col p-4 rounded-md ">
        <Container className="flex justify-center items-center gap-6">
          <Button onClick={() => setActivePage("pending")}>
            Pending Status
          </Button>
          <Button onClick={() => setActivePage("approved")}>
            Approved Status
          </Button>
        </Container>

        {activePage === "pending" && (
          <Container className="w-full max-w-6xl mx-auto">
            <Table
              fetchRows={handleGetStatusPending}
              columns={columns}
              height={600}
            />
          </Container>
        )}

        {activePage === "approved" && (
          <Container className="w-full max-w-6xl mx-auto">
            <Table
              fetchRows={handleGetStatusApproved}
              columns={columns}
              height={600}
            />
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default NotafikasiChildren;
