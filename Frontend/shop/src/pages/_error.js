import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";

const Error = () => {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["public"]);

  return (
    <center>
      <p
        style={
          globalContext.culture.language === "en"
            ? {
                fontSize: "30vw",
                color: "#cacaca",
                marginBottom: "-13vw",
                marginTop: "-5vw",
              }
            : {
                fontSize: "30vw",
                color: "#cacaca",
                marginBottom: "-14vw",
                marginTop: "-3vw",
              }
        }
      >
        500
      </p>
      <div style={{ backgroundColor: "#cacaca", height: "18vw" }}>
        <p
          style={
            globalContext.culture.language === "en"
              ? { fontSize: "2vw" }
              : { fontSize: "1.3vw", paddingTop: "1vw" }
          }
        >
          {t("Error500")}
        </p>
      </div>
    </center>
  );
};

export default Error;
