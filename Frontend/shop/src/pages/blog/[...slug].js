import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Divider,
  Typography,
  CardMedia,
  CardContent,
  Breadcrumbs,
  CardActions,
} from "@mui/material";
import Link from "next/link";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import { Local_Number } from "/src/functions/Convert";
import { getArticles, getArticle } from "/src/network/fetchData/blog";

export default function ArticleScreen({ article }) {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["public"]);

  const [dynamicArticle, setDynamicArticle] = useState(article);
  useEffect(() => {
    async function getDynamic() {
      const data = await getArticle(article.id);
      setDynamicArticle(data);
    }
    if (article.id) {
      getDynamic();
    }
  }, [globalContext.culture.language]);

  return (
    <>
      {article && (
        <>
          <div
            style={{
              maxWidth: "1366px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
              paddingX: "5%",
              paddingBottom: "4%",
              paddingTop: "1%",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "15px" }}>
              <Link underline="hover" color="inherit" href="/blog" passHref>
                {t("articlesList")}
              </Link>

              <Typography color="text.primary">
                {Local_Number(dynamicArticle.title)}
              </Typography>
            </Breadcrumbs>

            <Card>
              <CardHeader
                title={Local_Number(dynamicArticle.title)}
                subheader={Local_Number(dynamicArticle.created_at)}
              />
              <Divider />
              <CardMedia
                component="img"
                image={article.image}
                alt={dynamicArticle.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "30vh",
                  borderRadius: "5px",
                  objectFit: "contain",
                }}
              />
              <Divider />
              <CardContent>
                <div
                  key={article.id}
                  dangerouslySetInnerHTML={{
                    __html: dynamicArticle.content.replace(
                      /#\S+/g,
                      "<a style='color: lightblue'>$&</a>"
                    ),
                  }}
                ></div>
              </CardContent>
              <CardActions>
                {dynamicArticle.tags.map((tag, index) => (
                  // <Link
                  //   key={tag.id}
                  //   href={`/blog/tag/${tag.id}`}
                  //   passHref
                  // >
                  //   <a>#{tag.title}</a>
                  // </Link>
                  <p key={index}>#{tag.title}</p>
                ))}
              </CardActions>
            </Card>
          </div>
        </>
      )}
    </>
  );
}

export async function getStaticProps({ params }) {
  let id = params.slug[0];
  try {
    const _article = await getArticle(id);

    return {
      props: {
        article: _article,
      },
    };
  } catch (err) {}
}

export async function getStaticPaths() {
  const data = await getArticles();
  let articles = data;

  const path1 = articles.map(
    (article) => `/blog/${article.id}/${article.slug}`
  );
  const path2 = articles.map((article) => `/blog/${article.id}`);
  const paths = path1.concat(path2);

  return {
    paths,
    fallback: "blocking",
  };
}
