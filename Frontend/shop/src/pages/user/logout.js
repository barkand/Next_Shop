import { useEffect } from "react";
import { Alert } from "@mui/material";
import { useRouter } from "next/router";

import { useTranslation } from "react-i18next";

export default function logout() {
  const { t } = useTranslation(["public"]);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    router.push("/");
  }, []);

  return (
    <>
      <Alert severity="info">{t("logout...")}</Alert>
    </>
  );
}
