import NavbarHome from "@/app/components/component/navbar/NavbarHome";
import Container from "@/app/components/component/ui/Container";
import FooterLanding from "@/app/components/component/footer/FooterLanding";
export default function HomeUserLayoutChildren({
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
