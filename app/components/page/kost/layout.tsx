"use client";
import { useHook } from "../../component/hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Container from "../../component/ui/Container";
export default function DynamicRouteChildrenLayout({
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
  return <Container>{children}</Container>;
}
