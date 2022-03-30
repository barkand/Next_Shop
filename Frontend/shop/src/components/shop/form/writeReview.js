import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Modal,
  Stack,
  Button,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import UseGlobalContext from "/src/context/global";

import StyledModal from "/src/theme/styled/styledModal";
import RatingIcon from "/src/components/layout/base/toys/RatingIcon";

import { addProductReview } from "/src/network/fetchData/shop";

export default function WriteReview({ modalState, setModalState, productId }) {
  const globalContext = UseGlobalContext();
  const { t } = useTranslation(["public", "product"]);

  const [review, setReview] = useState({
    title: "",
    description: "",
    rating: 0,
  });

  const rateChange = (newValue) => {
    setReview({ ...review, rating: newValue });
  };

  const submitChange = () => {
    async function submitReview() {
      await addProductReview(
        productId,
        review.rating,
        review.title,
        review.description
      );
    }
    submitReview();
    closeModal();
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <Modal
      open={modalState}
      onClose={() => setModalState(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={globalContext.culture.language}
      sx={{ direction: globalContext.culture.direction }}
    >
      <Stack sx={StyledModal}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            {t("writeReview", { ns: "product" })}:
          </Typography>
          <Box sx={{ display: "flex" }}>
            <RatingIcon
              rating={review.rating}
              rateChange={rateChange}
              precision={1}
            />
          </Box>
        </Box>
        <Stack sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
          <TextField
            id="review-title"
            label={t("title")}
            variant="standard"
            required
            autoComplete="off"
            onChange={(e) => setReview({ ...review, title: e.target.value })}
          />
          <TextField
            id="customer-review"
            label={t("description")}
            multiline
            rows={4}
            sx={{ mt: 2 }}
            required
            autoComplete="off"
            onChange={(e) =>
              setReview({ ...review, description: e.target.value })
            }
          />
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: "flex-end", mx: 1, mt: 1 }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={closeModal}
            sx={{ mr: 1, ml: 1 }}
          >
            {t("cancel")}
          </Button>
          <Button variant="contained" color="primary" onClick={submitChange}>
            {t("submit")}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
