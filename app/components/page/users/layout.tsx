import Container from "../../component/ui/Container";
import { useHook } from "../../core/hooks/auth/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function UserChildrenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useHook();
  const router = useRouter();
  useEffect(() => {
    if (!currentUser?.token) {
      alert("Kamu Tidak Memiliki Akses Masuk Mohon Untuk Login Kembali");
      router.push("/auth/login");
    }
  });
  return <Container>{children}</Container>;
}
