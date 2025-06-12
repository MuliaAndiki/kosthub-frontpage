import { ourServicesTypeProps } from "../../types/props";
import Image from "next/image";
import Container from "../ui/Container";

const OurServices: React.FC<ourServicesTypeProps> = ({ data }) => {
  return (
    <Container className=" shadow-xl bg-[#EBEBEB] h-[25vh] w-[20vw] rounded-md flex items-center hover:scale-[103%] duration-[0.5s] p-2">
      <Container className="flex justify-center items-center flex-col">
        <Image src={data.image} alt="" width={40} height={10} />
        <h1 className="font-bold">{data.title}</h1> <br />
        <p className="font-light text-center">{data.deskripsi}</p>
      </Container>
    </Container>
  );
};

export default OurServices;
