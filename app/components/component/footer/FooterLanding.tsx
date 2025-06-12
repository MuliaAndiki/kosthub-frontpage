"use client";
import Image from "next/image";
import Link from "next/link";
import { appFooterDatas } from "@/app/components/core/data/appConfig";

const FooterLanding: React.FC = () => {
  return (
    <div className="w-full h-[50vh] bg-[#0C106B] gap-3 " title="Footer">
      <div className="grid grid-cols-4 grid-rows-1 gap-4">
        <div className="flex flex-col pt-[10vh] pl-[5vw]">
          {appFooterDatas.map((item, key) => (
            <div key={key} className="flex flex-col items-center gap-[1rem]">
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={item.footerLeft.image}
                  alt="Icon"
                  width={100}
                  height={100}
                  className=""
                />
                <h1 className="font-bold text-white text-[3rem]">
                  {item.footerLeft.title}
                </h1>
              </div>

              <div>
                <h1 className="font-light text-white">
                  {item.footerLeft.desc}
                </h1>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[70vw] mt-[20vh]">
          <div className="grid grid-cols-3 grid-rows-1 gap-4">
            <div className="w-full flex justify-center items-center">
              {appFooterDatas.map((item, key) => (
                <div key={key} className="px-[vw]">
                  {item.footerRight.slice(0, 4).map((item, key) => (
                    <div key={key} className="">
                      <Link href={item.href}>
                        <h1 className="hover:underline duration-[1s] text-white pb-[3vh]">
                          {item.title}
                        </h1>
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center">
              {appFooterDatas.map((item, key) => (
                <div key={key}>
                  {item.footerRight.slice(4, 8).map((item, key) => (
                    <div key={key}>
                      <Link href={item.href}>
                        <h1 className="hover:underline duration-[1s] text-white pb-[3vh]">
                          {item.title}
                        </h1>
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center">
              {appFooterDatas.map((item, key) => (
                <div key={key}>
                  {item.footerRight.slice(8, 12).map((item, key) => (
                    <div key={key}>
                      <Link href={item.href}>
                        <h1 className="hover:underline duration-[1s] text-white pb-[3vh]">
                          {item.title}
                        </h1>
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center border-t-2 border-white mt-2">
            <h1 className="font-light text-white mt-2 ">Koshub(Kelompok 7)</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLanding;
