"use client";

import NavbarProfil from "@/app/components/navbar/NavbarProfil";
import Container from "@/app/components/ui/Container";
import Sidebar from "@/app/components/sidebar/SidebarProfile";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex flex-col min-h-screen w-full relative">
      <Container className="absolute top-0 z-50 w-full">
        <NavbarProfil />
      </Container>

      <Container className="flex flex-1 pt-[6rem] w-full">
        <Container className="hidden md:block w-64  border-r min-h-[90%]">
          <Sidebar />
        </Container>

        <Container className="flex-1 p-4">{children}</Container>
      </Container>
    </Container>
  );
}
