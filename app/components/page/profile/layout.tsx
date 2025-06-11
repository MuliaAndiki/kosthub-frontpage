"use client";
import { useEffect } from "react";
import NavbarProfil from "../../component/navbar/NavbarProfil";
import Container from "../../component/ui/Container";
import Sidebar from "../../component/sidebar/Sidebar";
import { useHook } from "../../component/hooks/auth";
import { useRouter } from "next/navigation";
import API from "../../util/API";

export default function ProfileChildrenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useHook();
  const router = useRouter();
  useEffect(() => {
    if (!currentUser?.token) {
      alert("Kamu Tidak Memiliki Akses, Mohon Login Terlebih Dahulu");
      router.push(`/auth/login`);
    }
  }, []);

  return (
    <Container className="flex flex-col min-h-screen w-full relative">
      <Container className="absolute top-0 z-50 w-full">
        <NavbarProfil />
      </Container>

      <Container className="flex flex-1 pt-[6rem] w-full">
        <Container className="hidden md:block w-64 border-r min-h-[90%]">
          <Sidebar />
        </Container>

        <Container className="flex-1 p-4">{children}</Container>
      </Container>
    </Container>
  );
}
