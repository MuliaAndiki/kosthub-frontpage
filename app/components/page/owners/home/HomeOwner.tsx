import Container from "@/app/components/component/ui/Container";

const HomeOwnerChildren: React.FC = () => {
  return (
    <Container as="main" className="w-full h-full">
      <Container className="flex justify-center items-center">
        <h1 className="text-sm text-[clamp(1rem,4vw,2.5rem)] font-bold ">
          Daftar Kan Kost Anda Di sini
        </h1>
      </Container>
    </Container>
  );
};

export default HomeOwnerChildren;
