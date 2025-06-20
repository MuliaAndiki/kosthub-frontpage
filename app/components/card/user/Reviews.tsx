import profile from "@/public/asset/profile1.svg";
import Image from "next/image";
import { Star } from "lucide-react";
import { reviewTypeProps } from "@/app/types/props";
import { useState } from "react";
import Container from "../../ui/Container";

const Reviews: React.FC<reviewTypeProps> = ({ data }) => {
  const [ratingStar] = useState<number>(0);

  return (
    <Container className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 my-4 border border-gray-200">
      <Container className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Container className="flex items-center gap-4">
          <Image
            src={profile}
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full"
          />
          <Container className="flex flex-col">
            <h1 className="font-semibold text-lg">{data.nama}</h1>
            <Container className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  color={
                    ratingStar || data.bintang >= star ? "#FFFF00" : "#000000"
                  }
                  className="w-5 h-5 transition duration-200"
                />
              ))}
            </Container>
          </Container>
        </Container>
        <span className="text-sm text-gray-500">{data.tanggal}</span>
      </Container>

      <Container className="mt-4">
        <p className="text-gray-600 text-sm sm:text-base">{data.komentar}</p>
        {data.imageUlasan && (
          <div className="mt-4">
            {/* <Image
              src={`http://localhost:5000/${data.imageUlasan}`}
              alt="Review image"
              width={120}
              height={80}
              className="rounded-md object-cover"
            /> */}
          </div>
        )}
      </Container>
    </Container>
  );
};

export default Reviews;
