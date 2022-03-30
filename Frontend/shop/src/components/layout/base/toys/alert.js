import { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import StyledSnackbar from "/src/theme/styled/styledSnackbar";

export default function Alert({ code, color }) {
  const { t } = useTranslation(["public"]);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (code !== "") {
      setOpen(true);
    }
  }, [code]);

  return (
    <StyledSnackbar
      open={open}
      code={code}
      text={t(code)}
      color={color}
    ></StyledSnackbar>
  );
}
