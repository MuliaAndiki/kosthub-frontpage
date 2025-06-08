import Image from "next/image";

import { bestPropertyTypeProps } from "../props";

const BestProperty: React.FC<bestPropertyTypeProps> = ({ data }) => {
  return (
    <main className="w-full">
      <div className="flex justify-between items-center">
        {/* <Image
          src={`http://localhost:5000/${data.image}`}
          alt="Best Propersties"
          width={600}
          height={200}
          className="w-100 h-80 object-center "
        /> */}
      </div>
    </main>
  );
};

export default BestProperty;
