import NavbarHome from "../../component/navbar/NavbarHome";
import Container from "../../component/ui/Container";
import FooterLanding from "../../component/footer/FooterLanding";
export default function HomeOwnerLayoutChildren({
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
