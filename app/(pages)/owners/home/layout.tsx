import SideBarRole from "@/app/components/sidebar/SideBarRole";
import Container from "@/app/components/ui/Container";
import FooterLanding from "@/app/components/footer/FooterLanding";
export default function HomeOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="w-full flex flex-col">
      <Container className="flex w-full gap-2">
        <Container className="flex-[0.5] ">
          <SideBarRole />
        </Container>
        <Container className="flex-2">
          <Container>{children}</Container>
        </Container>
      </Container>

      <FooterLanding />
    </Container>
  );
}
