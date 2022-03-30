import { useEffect, useState } from "react";
import { Rating } from "@mui/material";

import { useTranslation } from "react-i18next";
import { Local_Number } from "/src/functions/Convert";

export default function RatingIcon(props) {
  const { t } = useTranslation(["product"]);
  const [rate, setRate] = useState({
    rating: 0.0,
    ratingCount: 0,
  });
  useEffect(() => {
    setRate({
      rating: props.rating,
      ratingCount: props.ratingCount,
    });
  }, [props]);

  return (
    <>
      <Rating
        name="product-rating"
        sx={{ direction: "ltr" }}
        value={rate.rating}
        readOnly={props.readOnly || false}
        size={props.size || ""}
        precision={props.precision || 0.5}
        onChange={(event, newValue) => {
          props.rateChange(newValue);
        }}
      />
      <div
        style={{
          marginTop: "-5px",
          paddingLeft: "5px",
          paddingRight: "5px",
          fontSize: "11px",
          color: "grey",
        }}
      >
        {rate.ratingCount > 0 &&
          `${Local_Number(rate.rating)} (${Local_Number(rate.ratingCount)} ${t(
            "vots"
          )})`}
      </div>
    </>
  );
}
