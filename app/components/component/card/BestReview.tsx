"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { useState } from "react";
import { bestReviewTypeProps } from "../../../types/props";
import Container from "../ui/Container";

const BestRewiew: React.FC<bestReviewTypeProps> = ({ data }) => {
  const [ratingStar] = useState<number>(0);

  return (
    <Container className="shadow-lg h-[25vh] w-[30vw] rounded-md p-[1rem]">
      <Container className="grid grid-cols-2 grid-rows-1 ">
        <Container className="flex items-center gap-x-2">
          <Image src={data.image} width={36} alt="Accont" height={16} />
          <h1 className="">{data.title}</h1>
        </Container>
        <h1 className="font-light">{data.date}</h1>
      </Container>
      <Container className=" flex gap-x-4">
        {[1, 2, 3, 4, 5].map((key) => (
          <Container key={key}>
            <Star
              color={
                ratingStar || data.avgBintang >= key ? "#FFFF00" : "#000000"
              }
            />
          </Container>
        ))}
      </Container>
      <Container className="mt-2 flex gap-4 ">
        {/* <Image
          src={`http://localhost:5000/${data.gambar}`}
          alt=""
          width={200}
          height={100}
          className=" h-28 object-center rounded-md"
        /> */}
        <Container>
          <p className="font-medium text-left">{data.deskripsi}</p>
        </Container>
      </Container>
    </Container>
  );
};
export default BestRewiew;
