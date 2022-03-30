import Image from "next/image";
import { Grid } from "@mui/material";

import { TopGroupsPictures } from "/src/static/image";

export default function TopGroups() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      mb={2}
      spacing={2}
      sx={{
        minHeight: "200px",
        paddingTop: "45px",
        paddingLeft: "15%",
        paddingRight: "15%",
        paddingBottom: "30px",
      }}
    >
      <Grid item md={6} sm={12} alignItems="center">
        <Image
          src={TopGroupsPictures["left"]}
          alt="adv. Banner Left"
          className="form"
          width={800}
          height={320}
        />
      </Grid>
      <Grid item md={6} sm={12} alignItems="center">
        <Image
          src={TopGroupsPictures["right"]}
          alt="adv. Banner Right"
          className="form"
          width={800}
          height={320}
        />
      </Grid>
    </Grid>
  );
}
