import Image from "next/image";
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import responsive from "/src/components/layout/base/sections/carousel/oneItem.json";

import { SliderPictures } from "/src/static/image";

export default function CarouselBanner() {
  return (
    <Carousel
      ssr={true}
      infinite={true}
      showDots={false}
      responsive={responsive}
      keyBoardControl={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      customTransition="all 1.5s linear"
      // containerClass="carousel-container"
    >
      {SliderPictures.map((item, i) => (
        <Image
          src={item.image}
          key={i}
          alt="adv. Banner Slider"
          loading="lazy"
          className="form"
          width={905}
          height={452}
        />
      ))}
    </Carousel>
  );
}
