import { useState, useEffect } from "react";

import UseGlobalContext from "/src/context/global";
import Product from "/src/components/shop/Product";
import { getSuggestProducts } from "/src/network/fetchData/shop";
import CarouselItems from "/src/components/layout/base/sections/CarouselItems";

export default function SuggestProducts({ subcategoryId }) {
  const globalContext = UseGlobalContext();

  const [Products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const data = await getSuggestProducts(subcategoryId);
      setProducts(data);
    }
    getProducts();
  }, [subcategoryId, globalContext.culture.language]);

  return (
    <CarouselItems
      title={"suggestProducts"}
      backgrundColor={"#ef394e"}
      color={"#650606"}
    >
      {Products.map((item, index) => (
        <Product key={index} item={item} />
      ))}
    </CarouselItems>
  );
}
