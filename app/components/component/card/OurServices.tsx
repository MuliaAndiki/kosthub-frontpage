import { ourServicesTypeProps } from "../props";
import Image from "next/image";

const OurServices: React.FC<ourServicesTypeProps> = ({ data }) => {
  return (
    <div className=" shadow-xl bg-[#EBEBEB] h-[25vh] w-[20vw] rounded-md flex items-center hover:scale-[103%] duration-[0.5s] p-2">
      <div className="flex justify-center items-center flex-col">
        <Image src={data.image} alt="" width={40} height={10} />
        <h1 className="font-bold">{data.title}</h1> <br />
        <p className="font-light text-center">{data.deskripsi}</p>
      </div>
    </div>
  );
};

export default OurServices;
