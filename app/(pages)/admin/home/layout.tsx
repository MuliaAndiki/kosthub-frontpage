import Container from "@/app/components/ui/Container";
import NavbarHome from "@/app/components/navbar/NavbarHome";

export default function HomeAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <NavbarHome />
      {children}
    </Container>
  );
}
