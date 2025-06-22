"use client";
import Container from "@/app/components/ui/Container";
import { useState, useEffect } from "react";
import ProfileCardOwners from "@/app/components/card/owner/ProfileOwnerCard";
import SideHomeOwners from "@/app/components/card/owner/SideHome";

const HomeOwnerChildren: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(time);
  }, []);
  return (
    <Container as="main" className="w-full h-screen">
      {isLoading ? (
        <Container className="flex-col ">
          <Container className="flex justify-center items-center h-screen w-full gap-2">
            <Container className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105"></Container>
            <p className="text-[2rem] font-light">Loading...</p>
          </Container>
        </Container>
      ) : (
        <Container className="w-full h-full relative">
          <Container className="w-full flex justify-start items-start p-4">
            <h1 className="text-lg font-bold text-[clamp(1rem,4vw,2rem)]">
              Dasboard
            </h1>
          </Container>
          <Container className="flex w-full">
            <Container className="flex-[1] flex justify-center items-center m-2 w-full">
              <Container className="flex w-full">
                <ProfileCardOwners />
              </Container>
            </Container>
            <Container className="flex-[2] items-center justify-center flex m-2">
              <SideHomeOwners />
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default HomeOwnerChildren;
