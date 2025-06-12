import Container from "@/app/components/component/ui/Container";
import NavbarHome from "@/app/components/component/navbar/NavbarHome";

export default function HomeAdminLayoutChildren({
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
