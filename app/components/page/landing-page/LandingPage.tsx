"use client";
import IconLanding from "@/app/components/component/svg/IconLanding";
import NavbarLanding from "@/app/components/component/navbar/NavbarLanding";
import OurServices from "@/app/components/component/card/OurServices";
import {
  ourServicesData,
  bestReviewData,
  bestProperyData,
} from "@/app/components/data/card";
import FooterLanding from "@/app/components/component/footer/FooterLanding";
import BestProperty from "@/app/components/component/card/BestProperty";
import BestRewiew from "@/app/components/component/card/BestReview";
import Marquee from "react-fast-marquee";

const LandingPageChildren: React.FC = () => {
  return (
    <>
      <div className="sticky top-0 z-50 bg-white p-2">
        <NavbarLanding />
      </div>

      <div
        data-aos="fade-up"
        className="h-screen w-full flex justify-center items-center"
      >
        <div className="flex w-full justify-around gap-6">
          <div className="flex justify-center flex-col">
            <h1 className="font-bold text-[4rem]">Mari Temukan Rumah </h1>
            <h1 className="font-bold text-[4rem]">Terbaik & Ternyaman Anda</h1>
            <p className="font-light text-[1rem] mb-2">
              Cari Tempat Yang Sempurna Untukmu dengan tepat, cepat, dan aman!
            </p>

            <div className="grid grid-cols-3 grid-rows-1  h-[10vh]">
              <div className=" flex justify-center items-center flex-col bg-[#D9D9D9]">
                <h1 className="text-sky-500 font-bold text-[2rem]">7K+</h1>
                <p className="font-semibold">Pengguna</p>
              </div>
              <div className="  flex justify-center items-center flex-col bg-[#A7E6FF]">
                <h1 className="text-sky-500 font-bold text-[2rem]">40+</h1>
                <p className="font-semibold">Properti</p>
              </div>
              <div className="  flex justify-center items-center flex-col bg-[#D9D9D9]">
                <h1 className="text-sky-500 font-bold text-[2rem]">200+</h1>
                <p className="font-semibold">Ulasan</p>
              </div>
            </div>
          </div>

          <div className="">
            <IconLanding />
          </div>
        </div>
      </div>

      <div title="Services" id="service">
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <div data-aos="fade-left" className="flex items-center flex-col">
            <h1 className="font-bold text-[3rem]">Layanan Kami</h1>
            <p className="font-light text-[1rem]">
              Mari Temukan Rumah Ternyamanmu Dengan Layanan Yang Kami Sediakan
              Untuk Anda
            </p>
            <p className="font-light text-[1rem]">
              Kami Dapat Memenuhi Kebutuhanmu Dengan Tepat!
            </p>
          </div>
          <div
            data-aos="fade-right"
            className="flex justify-center gap-4 pl-[2rem] pt-[6rem]"
          >
            {ourServicesData.map((item, index) => (
              <OurServices key={index} data={item} />
            ))}
          </div>
        </div>

        <div
          className="h-screen w-screen flex flex-col justify-center items-center"
          id="best"
        >
          <div
            data-aos="fade-right"
            className="flex justify-center flex-col text-center"
          >
            <h1 className="font-bold text-[3rem]">Produk Terbaik Kami</h1>
            <p className="font-light">
              Temukan pilihan properti terbaik dengan fasilitas unggulan dan
              lokasi strategis sesuai dengan kebutuhan dan gaya hidup anda.
            </p>
          </div>
          <Marquee
            direction="right"
            data-aos="zoom-out-up"
            className="grid grid-cols-4 grid-rows-1 pl-[2rem] pt-[6rem] pb-[3rem]"
          >
            {bestProperyData.map((item, key) => (
              <BestProperty key={key} data={item} />
            ))}
          </Marquee>
        </div>

        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <div
            data-aos="fade-left"
            className="flex justify-center flex-col text-center"
          >
            <h1 className="font-bold text-[4rem]">Ulasan Terbaik</h1>
            <p className="font-light">Properti dengan review terbaik!</p>
          </div>
          <Marquee
            direction="left"
            className="flex justify-between pt-[2rem] pb-[3rem] pl-[1rem]"
            data-aos="zoom-out-up"
          >
            {bestReviewData.map((item, index) => (
              <BestRewiew key={index} data={item} />
            ))}
          </Marquee>
        </div>

        {/* Section 4: Footer */}
        <div className=" w-screen flex justify-center items-center" id="about">
          <FooterLanding />
        </div>
      </div>
    </>
  );
};

export default LandingPageChildren;
