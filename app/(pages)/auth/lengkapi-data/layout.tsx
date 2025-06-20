import NabvarItem from "@/app/components/navbar/NavbarItem";
import Container from "@/app/components/ui/Container";

export default function LengkapiData({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Container className="absolute inset-0">
        <NabvarItem />
      </Container>
      {children}
    </Container>
  );
}
