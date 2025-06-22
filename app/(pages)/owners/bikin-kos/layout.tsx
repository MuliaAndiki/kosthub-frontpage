import Container from "@/app/components/ui/Container";
import NabvarItem from "@/app/components/navbar/NavbarItem";

export default function BikinKosLayoutChildren({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex min-h-full w-full relative">
      <Container className="absolute top-0 w-full">
        <NabvarItem />
      </Container>

      {children}
    </Container>
  );
}
