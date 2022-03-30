import { useState, useEffect } from "react";

import UseGlobalContext from "/src/context/global";
import Product from "/src/components/shop/Product";
import { getNewProducts } from "/src/network/fetchData/shop";
import CarouselItems from "/src/components/layout/base/sections/CarouselItems";

export default function TopProducts() {
  const globalContext = UseGlobalContext();

  const [Products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const data = await getNewProducts();
      setProducts(data);
    }
    getProducts();
  }, [globalContext.culture.language]);

  return (
    <CarouselItems
      title={"topProducts"}
      backgrundColor={"#ef394e"}
      color={"#650606"}
    >
      {Products.map((item, index) => (
        <Product key={index} item={item} />
      ))}
    </CarouselItems>
  );
}
