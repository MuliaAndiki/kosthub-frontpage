import { reservasiTypeProps } from "../../types/props";
import Container from "../ui/Container";
const DescriptionPartical: React.FC<reservasiTypeProps> = ({ data }) => {
  return (
    <Container className="bg-[#3572EF] w-[25vw] px-6 py-4 rounded-lg">
      <h1 className="font-bold text-white">Deskripsi</h1>
      <Container className="bg-white w-full p-2 rounded-md drop-shadow-xl/50 mt-6 ">
        <span>{data.id_kos.deskripsi}</span>
      </Container>
    </Container>
  );
};
export default DescriptionPartical;
