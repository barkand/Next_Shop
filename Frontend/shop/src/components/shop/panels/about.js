import { useState, useEffect } from "react";
import { Alert } from "@mui/material";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";
import { getProductAbout } from "/src/network/fetchData/shop";

export default function AboutPanel({ text, productId }) {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["public"]);

  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setAbout(text);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [text]);

  useEffect(() => {
    async function getDynamic() {
      const data = await getProductAbout(productId);
      setAbout(data);
    }
    getDynamic();
  }, [globalContext.culture.language]);

  return (
    <>
      {loading && <p>{t("loading")}</p>}
      {error && <p>{t("loadingError")}</p>}
      {!loading && !error && (
        <>
          {about.length > 0 ? (
            <>
              {about.map((about, i) => (
                <div
                  key={about.id}
                  dangerouslySetInnerHTML={{ __html: about.content }}
                ></div>
              ))}
            </>
          ) : (
            <Alert severity="info">{t("noAbout")}</Alert>
          )}
        </>
      )}
    </>
  );
}
