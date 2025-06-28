"use client";
import Container from "@/app/components/ui/Container";
import { useState } from "react";
import Button from "@/app/components/ui/Button";
import Pulse from "@/app/components/ui/pulse";
import ListKosChildren from "@/app/components/table/ListKos";
import ListReservaseChildren from "@/app/components/table/ListReservase";

const ApprovedChildren: React.FC = () => {
  const [isActive, setIsActive] = useState<"kost" | "reservase">("kost");

  const handleApproveReservaseByOwners = async () => {};

  return (
    <Container className="w-full min-h-full">
      <Container className="flex justify-center items-center border bg-gray-300/50  rounded-md">
        <Container className="flex flex-col w-full">
          <Container className="flex justify-center items-center">
            <Container className="flex gap-4">
              <Button onClick={() => setIsActive("kost")}>Kost</Button>
              <Button onClick={() => setIsActive("reservase")}>
                Reservase
              </Button>
            </Container>
          </Container>

          {isActive === "kost" && <ListKosChildren />}
          {isActive === "reservase" && <ListReservaseChildren />}
        </Container>
      </Container>
    </Container>
  );
};

export default ApprovedChildren;
