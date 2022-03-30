import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import responsive from "/src/components/layout/base/sections/carousel/multiItems.json";
import { useTranslation } from "react-i18next";

export default function CarouselItems({
  children,
  title,
  backgrundColor,
  color,
}) {
  const { t } = useTranslation(["public"]);

  return (
    <div
      style={{
        backgroundColor: backgrundColor,
        minHeight: "450px",
        paddingTop: "1%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "5%",
      }}
    >
      <div>
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            color: color,
            marginTop: "1%",
            marginBottom: "2%",
          }}
        >
          {t(title)}
        </h3>
      </div>

      <div style={{ direction: "ltr" }}>
        <Carousel
          ssr
          draggable={true}
          infinite={true}
          responsive={responsive}
          slidesToSlide={2}
          customTransition="all 1s linear"
        >
          {children}
        </Carousel>
      </div>
    </div>
  );
}
