"use client";
import IconLanding from "@/app/components/component/svg/IconLanding";
import NavbarLanding from "@/app/components/component/navbar/NavbarLanding";
import OurServices from "@/app/components/component/card/OurServices";
import {
  ourServicesData,
  bestReviewData,
  bestProperyData,
} from "@/app/components/core/data/card";
import FooterLanding from "@/app/components/component/footer/FooterLanding";
import BestProperty from "@/app/components/component/card/BestProperty";
import BestRewiew from "@/app/components/component/card/BestReview";
import Marquee from "react-fast-marquee";
import Container from "../../component/ui/Container";

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
        <Container className="flex w-full justify-around gap-6">
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
          <Marquee
            direction="right"
            data-aos="zoom-out-up"
            className="grid grid-cols-4 grid-rows-1 pl-[2rem] pt-[6rem] pb-[3rem]"
          >
            {bestProperyData.map((item, key) => (
              <BestProperty key={key} data={item} />
            ))}
          </Marquee>
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
