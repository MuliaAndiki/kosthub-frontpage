"use client";
import Container from "@/app/components/component/ui/Container";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/core/hooks/dispatch/dispatch";
import ProfileCardOwners from "@/app/components/component/card/owner/ProfileOwnerCard";
import SideHomeOwners from "@/app/components/component/card/owner/SideHome";

const HomeOwnerChildren: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
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
            <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-sky-500 size-105"></div>
            <p className="text-[2rem] font-light">Loading...</p>
          </Container>
        </Container>
      ) : (
        <Container className="w-full h-full">
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
