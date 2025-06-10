import NavbarProfil from "../../component/navbar/NavbarProfil";
import Container from "../../component/ui/Container";
import Sidebar from "../../component/sidebar/Sidebar";
export default function ProfileChildrenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="relative h-full w-full ">
      <Container className="absolute inset-x-0 top-0">
        <NavbarProfil />
      </Container>
      <Container className="flex w-full h-full">
        <Container className="flex-[1] h-full">
          <Container className="absolute inset-y-20 left-0">
            <Sidebar />
          </Container>
        </Container>
        <div className="flex-[2]"> {children}</div>
      </Container>
    </Container>
  );
}
