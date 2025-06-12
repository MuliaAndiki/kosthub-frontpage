"use client";
import Image from "next/image";
import Link from "next/link";
import { appFooterDatas } from "@/app/components/core/data/appConfig";
import Container from "../ui/Container";

const FooterLanding: React.FC = () => {
  return (
    <Container className="w-full h-[50vh] bg-[#0C106B] gap-3 ">
      <Container className="grid grid-cols-4 grid-rows-1 gap-4">
        <Container className="flex flex-col pt-[10vh] pl-[5vw]">
          {appFooterDatas.map((item, key) => (
            <Container
              key={key}
              className="flex flex-col items-center gap-[1rem]"
            >
              <Container className="flex items-center justify-center gap-4">
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
              </Container>

              <Container>
                <h1 className="font-light text-white">
                  {item.footerLeft.desc}
                </h1>
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
                      <Link href={item.href}>
                        <h1 className="hover:underline duration-[1s] text-white pb-[3vh]">
                          {item.title}
                        </h1>
                      </Link>
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
                      <Link href={item.href}>
                        <h1 className="hover:underline duration-[1s] text-white pb-[3vh]">
                          {item.title}
                        </h1>
                      </Link>
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
                      <Link href={item.href}>
                        <h1 className="hover:underline duration-[1s] text-white pb-[3vh]">
                          {item.title}
                        </h1>
                      </Link>
                    </Container>
                  ))}
                </Container>
              ))}
            </Container>
          </Container>
          <Container className="flex justify-center items-center border-t-2 border-white mt-2">
            <h1 className="font-light text-white mt-2 ">Koshub(Kelompok 7)</h1>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default FooterLanding;
