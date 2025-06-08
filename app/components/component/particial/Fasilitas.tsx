import { reservasiTypeProps } from "../props";
import { getFasilitas } from "../../helper/faslitasHelper";
const FasilitasParticial: React.FC<reservasiTypeProps> = ({ data }) => {
  return (
    <div className="bg-[#3572EF] w-[25vw] px-6 py-4 rounded-lg">
      <h1 className="font-bold text-white">Fasilitas</h1>
      <div className="bg-white w-full p-2 rounded-md drop-shadow-xl/50 mt-6 ">
        <div className="grid grid-cols-2 grid-rows-3 gap-4">
          {data.id_kos.fasilitas.map((item, key) => (
            <div key={key} className="flex justify-center items-center gap-2">
              {getFasilitas(item.nama)}
              <span>{item.jumlah}</span>
              <h1>{item.nama}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FasilitasParticial;
