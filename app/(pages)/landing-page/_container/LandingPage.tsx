"use client";
import IconLanding from "@/app/components/svg/IconLanding";
import NavbarLanding from "@/app/components/navbar/NavbarLanding";
import OurServices from "@/app/components/card/OurServices";
import {
  ourServicesData,
  bestReviewData,
  ProductDatas,
} from "@/app/core/data/card/users";
import FooterLanding from "@/app/components/footer/FooterLanding";
import BestRewiew from "@/app/components/card/BestReview";
import Marquee from "react-fast-marquee";
import Container from "@/app/components/ui/Container";
import Image from "next/image";

const LandingPageChildren: React.FC = () => {
  return (
    <Container className="w-full h-full ">
      <Container className="sticky top-0 z-50 bg-white p-2">
        <NavbarLanding />
      </Container>

      <Container
        data-aos="fade-up"
        className="h-screen w-full flex justify-center items-center"
      >
        <Container className="flex w-full justify-around p-4">
          <Container className="flex justify-center flex-col">
            <h1 className="font-bold text-[4rem]">Mari Temukan Rumah </h1>
            <h1 className="font-bold text-[4rem]">Terbaik & Ternyaman Anda</h1>
            <p className="font-light text-[1rem] mb-2">
              Cari Tempat Yang Sempurna Untukmu dengan tepat, cepat, dan aman!
            </p>

            <Container className="grid grid-cols-3 grid-rows-1  h-[10vh]">
              <Container className=" flex justify-center items-center flex-col bg-[#D9D9D9]">
                <h1 className="text-sky-500 font-bold text-[2rem]">7K+</h1>
                <p className="font-semibold">Pengguna</p>
              </Container>
              <Container className="  flex justify-center items-center flex-col bg-[#A7E6FF]">
                <h1 className="text-sky-500 font-bold text-[2rem]">40+</h1>
                <p className="font-semibold">Properti</p>
              </Container>
              <Container className="  flex justify-center items-center flex-col bg-[#D9D9D9]">
                <h1 className="text-sky-500 font-bold text-[2rem]">200+</h1>
                <p className="font-semibold">Ulasan</p>
              </Container>
            </Container>
          </Container>

          <Container className="">
            <IconLanding />
          </Container>
        </Container>
      </Container>

      <Container>
        <Container className="h-screen w-screen flex flex-col justify-center items-center">
          <Container
            data-aos="fade-left"
            className="flex items-center flex-col"
          >
            <h1 className="font-bold text-[3rem]">Layanan Kami</h1>
            <p className="font-light text-[1rem]">
              Mari Temukan Rumah Ternyamanmu Dengan Layanan Yang Kami Sediakan
              Untuk Anda
            </p>
            <p className="font-light text-[1rem]">
              Kami Dapat Memenuhi Kebutuhanmu Dengan Tepat!
            </p>
          </Container>
          <Container
            data-aos="fade-right"
            className="flex justify-center gap-4 pl-[2rem] pt-[6rem]"
          >
            {ourServicesData.map((item, index) => (
              <OurServices key={index} data={item} />
            ))}
          </Container>
        </Container>

        <Container className="h-screen w-screen flex flex-col justify-center items-center">
          <Container
            data-aos="fade-right"
            className="flex justify-center flex-col text-center"
          >
            <h1 className="font-bold text-[3rem]">Produk Terbaik Kami</h1>
            <p className="font-light">
              Temukan pilihan properti terbaik dengan fasilitas unggulan dan
              lokasi strategis sesuai dengan kebutuhan dan gaya hidup anda.
            </p>
          </Container>
          <Container className="w-full flex justify-between items-center">
            <Marquee
              direction="right"
              data-aos="zoom-out-up"
              className="my-2 flex w-full justify-between items-center"
            >
              {ProductDatas.map((items, key) => (
                <Image
                  alt="Product"
                  src={items.image}
                  key={key}
                  width={200}
                  height={200}
                  className="w-full py-2 h-48 object-cover rounded-lg"
                />
              ))}
            </Marquee>
          </Container>
        </Container>

        <Container className="h-screen w-screen flex flex-col justify-center items-center">
          <Container
            data-aos="fade-left"
            className="flex justify-center flex-col text-center"
          >
            <h1 className="font-bold text-[4rem]">Ulasan Terbaik</h1>
            <p className="font-light">Properti dengan review terbaik!</p>
          </Container>
          <Marquee
            direction="left"
            className="flex justify-between pt-[2rem] pb-[3rem] pl-[1rem]"
            data-aos="zoom-out-up"
          >
            {bestReviewData.map((item, index) => (
              <BestRewiew key={index} data={item} />
            ))}
          </Marquee>
        </Container>

        <Container className=" w-screen flex justify-center items-center">
          <FooterLanding />
        </Container>
      </Container>
    </Container>
  );
};

export default LandingPageChildren;
