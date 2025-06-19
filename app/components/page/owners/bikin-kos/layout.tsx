import Container from "@/app/components/component/ui/Container";
import NabvarItem from "@/app/components/component/navbar/NavbarItem";

export default function BikinKosLayoutChildren({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex min-h-screen w-full relative">
      <Container className="absolute top-0 w-full">
        <NabvarItem />
      </Container>

      {children}
    </Container>
  );
}
