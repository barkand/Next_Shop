import { useState, useEffect } from "react";
import {
  Divider,
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Stack,
  Alert,
  Button,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { GetValueLocalStorage } from "/src/localStorage";
import { getProductReviews } from "/src/network/fetchData/shop";
import RatingIcon from "/src/components/layout/base/toys/RatingIcon";
import WriteReview from "/src/components/shop/form/writeReview";
import DialogLogin from "/src/components/user/form/dialogLogin";

export default function ReviewsPanel({ productId }) {
  const { t } = useTranslation(["public", "product"]);

  const [openDialog, setOpenDialog] = useState(false);

  let userStorage = GetValueLocalStorage("token");
  const [user, setUSer] = useState(userStorage);
  useEffect(() => {
    setUSer(userStorage);
  }, [userStorage]);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductReviews(productId);
        setReviews(data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [productId]);

  const [modalState, setModalState] = useState(false);

  return (
    <>
      {loading && <p>{t("loading")}</p>}
      {error && <p>{t("loadingError")}</p>}
      {!loading && !error && (
        <>
          <Stack alignItems="flex-end" mb={2}>
            {user ? (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => setModalState(true)}
              >
                {t("writeReview", { ns: "product" })}
              </Button>
            ) : (
              <>
                <Button variant="outlined" onClick={() => setOpenDialog(true)}>
                  {t("loginToWriteReview", { ns: "product" })}
                </Button>
                <DialogLogin
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                  setMode={setModalState}
                />
              </>
            )}
          </Stack>
          <WriteReview
            modalState={modalState}
            setModalState={setModalState}
            productId={productId}
          />

          {reviews.length > 0 ? (
            reviews.map((review) => (
              <span key={review.id}>
                <Card sx={{ display: "flex" }}>
                  <CardContent>
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <Avatar
                        alt={review.user}
                        src={review.image}
                        sx={{ width: 56, height: 56 }}
                      />
                      <p>{review.user}</p>
                      <RatingIcon
                        rating={review.rating}
                        readOnly={true}
                        size={"small"}
                      />
                    </Stack>
                  </CardContent>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {review.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {review.description}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
                <Divider />
              </span>
            ))
          ) : (
            <Alert severity="info">{t("noReviews")}</Alert>
          )}
        </>
      )}
    </>
  );
}
