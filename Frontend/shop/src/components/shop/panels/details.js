import { useState, useEffect } from "react";
import { Paper, Table, TableBody, TableContainer, Alert } from "@mui/material";

import { useTranslation } from "react-i18next";
import { StyledTableCell, StyledTableRow } from "/src/theme/styled/styledTable";

export default function DetailsPanel({ productDetails }) {
  const { t } = useTranslation(["public"]);

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setDetails(productDetails);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [productDetails]);

  return (
    <>
      {loading && <p>{t("loading")}</p>}
      {error && <p>{t("loadingError")}</p>}
      {!loading && !error && (
        <>
          {details.length > 0 ? (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 400, Width: 700 }}
                aria-label="customized table"
              >
                <TableBody>
                  {details.map((detail, i) => (
                    <StyledTableRow key={detail.id}>
                      <StyledTableCell align="center">
                        {detail.code}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {detail.value}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="info">{t("noDetails")}</Alert>
          )}
        </>
      )}
    </>
  );
}
