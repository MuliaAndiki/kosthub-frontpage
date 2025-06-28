"use client";
import Container from "../ui/Container";
import { useState, useEffect } from "react";
import { reservasiType } from "@/app/types/API";
import { ListConfigReservase } from "@/app/core/data/appConfig";
const ListReservaseChildren: React.FC = () => {
  const [reservaseDatas, setReservaseDatas] = useState<reservasiType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <Container className="w-full">
      <Container className="grid grid-cols-6 grid-rows-1">
        {ListConfigReservase.map((items, key) => (
          <Container key={key} className="flex justify-center items-center">
            <span>{items.label}</span>
          </Container>
        ))}
      </Container>
      <Container className="grid grid-cols-6 grid-rows-1">{}</Container>
    </Container>
  );
};

export default ListReservaseChildren;
