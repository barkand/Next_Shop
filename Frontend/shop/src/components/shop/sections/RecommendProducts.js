import { useState, useEffect } from "react";

import UseGlobalContext from "/src/context/global";
import Product from "/src/components/shop/Product";
import { getRecommendProducts } from "/src/network/fetchData/shop";
import CarouselItems from "/src/components/layout/base/sections/CarouselItems";

export default function RecommendProducts({ productIds }) {
  const globalContext = UseGlobalContext();
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      if (productIds && productIds.length > 0) {
        const data = await getRecommendProducts(productIds);
        if (data) {
          setProducts(data);
        }
      }
    }
    getProducts();
  }, [productIds, globalContext.culture.language]);

  return (
    <>
      <CarouselItems
        title={"suggestProducts"}
        backgrundColor={
          globalContext.theme.color === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.03)"
        }
        color={"darkgray"}
      >
        {Products &&
          Products.map((item, index) => <Product key={index} item={item} />)}
      </CarouselItems>
    </>
  );
}
