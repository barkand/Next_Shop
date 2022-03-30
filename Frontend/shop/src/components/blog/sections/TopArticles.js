import { useState, useEffect } from "react";
import Link from "next/link";
import { Paper } from "@mui/material";

import { getNewArticles } from "/src/network/fetchData/blog";
import CarouselItems from "/src/components/layout/base/sections/CarouselItems";

export default function TopArticles() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    async function getArticles() {
      const data = await getNewArticles();
      setArticles(data);
    }
    getArticles();
  }, []);

  return (
    <CarouselItems
      title={"topArticles"}
      backgrundColor={"#DAECFF"}
      color={"#003366"}
    >
      {articles.map((article) => (
        <div
          key={article.id}
          style={{ paddingLeft: "4px", paddingRight: "5px" }}
        >
          <Link href={`/blog/${article.id}/${article.slug}`} passHref>
            <a>
              <div className="img-wrapper">
                <img
                  src={article.image}
                  alt={article.title}
                  height="250"
                  loading="lazy"
                  className="hover-zoom"
                  style={{
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    display: "block",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </div>
              <center>
                <Paper
                  sx={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    padding: "5px",
                  }}
                >
                  {article.title}
                </Paper>
              </center>
            </a>
          </Link>
        </div>
      ))}
    </CarouselItems>
  );
}
