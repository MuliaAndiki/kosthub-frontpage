"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { useState } from "react";
import { bestReviewTypeProps } from "../props";

const BestRewiew: React.FC<bestReviewTypeProps> = ({ data }) => {
  const [ratingStar] = useState<number>(0);

  return (
    <div className="shadow-lg h-[25vh] w-[30vw] rounded-md p-[1rem]">
      <div className="grid grid-cols-2 grid-rows-1 ">
        <div className="flex items-center gap-x-2">
          <Image src={data.image} width={36} alt="Accont" height={16} />
          <h1 className="">{data.title}</h1>
        </div>
        <h1 className="font-light">{data.date}</h1>
      </div>
      <div className=" flex gap-x-4" title="Rating">
        {[1, 2, 3, 4, 5].map((key) => (
          <div key={key}>
            <Star
              color={
                ratingStar || data.avgBintang >= key ? "#FFFF00" : "#000000"
              }
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-4 ">
        <Image
          src={`http://localhost:5000/${data.gambar}`}
          alt=""
          width={200}
          height={100}
          className=" h-28 object-center rounded-md"
        />
        <div>
          <p className="font-medium text-left">{data.deskripsi}</p>
        </div>
      </div>
    </div>
  );
};
export default BestRewiew;
