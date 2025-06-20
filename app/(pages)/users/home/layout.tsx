import NavbarHome from "@/app/components/navbar/NavbarHome";
import Container from "@/app/components/ui/Container";
import FooterLanding from "@/app/components/footer/FooterLanding";
export default function HomeUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <NavbarHome />
      {children}
      <FooterLanding />
    </Container>
  );
}
