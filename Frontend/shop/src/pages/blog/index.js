import Link from "next/link";
import { Masonry } from "@mui/lab";
import { Box, Card, Alert } from "@mui/material";

import { useTranslation } from "react-i18next";
import StyledPaper from "/src/theme/styled/styledPaper";
import { getArticles } from "/src/network/fetchData/blog";
import UseGlobalContext from "/src/context/global";

export default function index({ articles }) {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["public"]);

  return (
    <>
      <center>
        <h1>{t("articlesList")}</h1>
      </center>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1366px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "2%",
          paddingLeft: "1%",
          paddingRight: "1%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {articles.length > 0 ? (
            <Masonry columns={{ sm: 2, md: 4 }} spacing={2} mb={6}>
              {articles.map((article) => (
                <div key={article.id}>
                  <Link href={`/blog/${article.id}/${article.slug}`} passHref>
                    <a>
                      <StyledPaper>{article.title}</StyledPaper>
                      <div className="img-wrapper">
                        <img
                          src={article.image}
                          alt={article.title}
                          loading="lazy"
                          className="hover-zoom"
                          style={{
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 8,
                            display: "block",
                            width: "100%",
                            border: `1px dashed ${
                              globalContext.theme.color === "dark"
                                ? "#1A2027"
                                : "rgba(0, 0, 0, 0.1)"
                            }`,
                          }}
                        />
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </Masonry>
          ) : (
            <center>
              <Card sx={{ width: "80%" }}>
                <Alert severity="info">{t("emptyArticles")}</Alert>
              </Card>
            </center>
          )}
        </div>
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const data = await getArticles();
  return {
    props: {
      articles: data,
    },
  };
}
