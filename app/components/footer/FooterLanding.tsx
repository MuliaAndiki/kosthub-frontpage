"use client";
import Image from "next/image";
import Link from "next/link";
import { appFooterDatas } from "@/app/core/data/appConfig";
import Container from "../ui/Container";
import { useState, useEffect } from "react";
import Pulse from "../ui/pulse";

const FooterLanding: React.FC = () => {
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    const time = setTimeout(() => {
      setIsloading(false);
    }, 1000);
    return () => clearTimeout(time);
  }, []);
  return (
    <Container className="w-full h-[50vh] bg-[#0C106B] gap-3">
      <Container className="grid grid-cols-4 grid-rows-1 gap-4">
        <Container className="flex flex-col pt-[10vh] pl-[5vw]">
          {appFooterDatas.map((item, key) => (
            <Container
              key={key}
              className="flex flex-col items-center gap-[1rem]"
            >
              <Container className="flex items-center justify-center gap-4">
                {isLoading ? (
                  <Pulse className="w-29 h-20 rounded-md mt-2" />
                ) : (
                  <Image
                    src={item.footerLeft.image}
                    alt="Icon"
                    width={100}
                    height={100}
                    className=""
                  />
                )}
                {isLoading ? (
                  <Pulse className="w-49 h-10 rounded-md mt-2" />
                ) : (
                  <h1 className="font-bold text-white text-[3rem]">
                    {item.footerLeft.title}
                  </h1>
                )}
              </Container>

              <Container>
                {isLoading ? (
                  <Pulse className="w-49 h-50 rounded-md mt-2" />
                ) : (
                  <h1 className="font-light text-white">
                    {item.footerLeft.desc}
                  </h1>
                )}
              </Container>
            </Container>
          ))}
        </Container>

        <Container className="w-[70vw] mt-[20vh]">
          <Container className="grid grid-cols-3 grid-rows-1 gap-4">
            <Container className="w-full flex justify-center items-center">
              {appFooterDatas.map((item, key) => (
                <Container key={key} className="px-[vw]">
                  {item.footerRight.slice(0, 4).map((item, key) => (
                    <Container key={key} className="">
                      {isLoading ? (
                        <Pulse className="w-32 h-10.5 rounded-md mt-2" />
                      ) : (
                        <Link href={item.href}>
                          <h1 className="hover:underline duration-[1s] text-white pb-[3vh]">
                            {item.title}
                          </h1>
                        </Link>
                      )}
                    </Container>
                  ))}
                </Container>
              ))}
            </Container>
            <Container className="flex justify-center items-center">
              {appFooterDatas.map((item, key) => (
                <Container key={key}>
                  {item.footerRight.slice(4, 8).map((item, key) => (
                    <Container key={key}>
                      {isLoading ? (
                        <Pulse className="w-32 h-10.5 rounded-md mt-2" />
                      ) : (
                        <Link href={item.href}>
                          <h1 className="hover:underline duration-[1s] text-white pb-[3vh]">
                            {item.title}
                          </h1>
                        </Link>
                      )}
                    </Container>
                  ))}
                </Container>
              ))}
            </Container>
            <Container className="flex justify-center items-center">
              {appFooterDatas.map((item, key) => (
                <Container key={key}>
                  {item.footerRight.slice(8, 12).map((item, key) => (
                    <Container key={key}>
                      {isLoading ? (
                        <Pulse className="w-32 h-10.5 rounded-md mt-2" />
                      ) : (
                        <Link href={item.href}>
                          <h1 className="hover:underline duration-[1s] text-white pb-[3vh]">
                            {item.title}
                          </h1>
                        </Link>
                      )}
                    </Container>
                  ))}
                </Container>
              ))}
            </Container>
          </Container>
          <Container className="flex justify-center items-center border-t-2 border-white mt-2">
            {isLoading ? (
              <Pulse className="w-32 h-5 rounded-md mt-2" />
            ) : (
              <h1 className="font-light text-white mt-2 ">
                Koshub(Kelompok 7)
              </h1>
            )}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default FooterLanding;
