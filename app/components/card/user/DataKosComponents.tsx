import Image from "next/image";
import { reservasiTypeProps } from "../../../types/props";
import Container from "../../ui/Container";
const DataKostUser: React.FC<reservasiTypeProps> = ({ data }) => {
  return (
    <Container as="main" className="">
      <div className="rounded-md w-full p-2 flex justify-center items-center flex-col">
        <Image
          src={`${data.id_kos.image.thumbnail}`}
          alt="Kost"
          width={600}
          height={600}
          className="w-full h-100 object-cover rounded-lg "
        />
        <div className="flex justify-between mt-2 gap-4">
          {data.id_kos.image.gallery.map((item, key) => (
            <Image
              key={key}
              src={`${item}`}
              alt="Kost"
              width={600}
              height={600}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>

        <div className="flex justify-start flex-col w-full mt-2">
          <h1 className="text-[3rem] font-bold">{data.id_kos.nama_kos}</h1>
          <span className="font-semibold">{data.id_kos.alamat}</span>
        </div>
      </div>
    </Container>
  );
};
export default DataKostUser;
