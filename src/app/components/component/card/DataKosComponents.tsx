import KostDumy from "../../../../../public/kost2.png";
import Image from "next/image";
import { reservasiTypeProps } from "../props";
const DataKostUser: React.FC<reservasiTypeProps> = ({ data }) => {
  return (
    <main className="">
      <div className="rounded-md w-full p-2 flex justify-center items-center flex-col">
        {/* <Image
          src={`http://localhost:5000/${data.id_kos.image.thumbnail}`}
          alt="Kost"
          width={200}
          height={300}
          className="w-full h-100 object-cover rounded-lg "
        /> */}
        <div className="flex justify-between mt-2 gap-4">
          {/* {data.id_kos.image.gallery.map((item, key) => (
            <Image
              key={key}
              src={`http://localhost:5000/${item}`}
              alt="Kost"
              width={213}
              height={50}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))} */}
        </div>

        <div className="flex justify-start flex-col w-full mt-2">
          <h1 className="text-[3rem] font-bold">{data.id_kos.nama_kos}</h1>
          <span className="font-semibold">{data.id_kos.alamat}</span>
        </div>
      </div>
    </main>
  );
};
export default DataKostUser;
