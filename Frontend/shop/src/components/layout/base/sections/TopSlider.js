import Image from "next/image";
import { Grid } from "@mui/material";

import CarouselBanner from "/src/components/layout/base/sections/CarouselBanner";
import { TopSliderPictures } from "/src/static/image";

function TopSlider() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      mb={2}
      sx={{
        maxWidth: "1366px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        style={{
          marginBottom: "15px",
          marginTop: "0",
        }}
      >
        <Image
          src={TopSliderPictures["header"]}
          alt="adv. Header"
          className="form"
          width={1366}
          height={136}
        />
      </div>

      <Grid container direction="row" justifyContent="space-evenly" spacing={2}>
        <Grid
          item
          sm={12}
          md={8}
          sx={{ grow: 1, direction: "ltr" }}
          display={{ xs: "none", sm: "block" }}
        >
          <CarouselBanner />
        </Grid>

        <Grid item sm={0} md={4}>
          <Grid container direction="column">
            <Grid item xs={12} sm={6} md={4}>
              <Image
                src={TopSliderPictures["leftTop"]}
                alt="adv. Top"
                className="form"
                width={444}
                height={222}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Image
                src={TopSliderPictures["leftBottom"]}
                alt="adv. Bottom"
                className="form"
                width={444}
                height={222}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TopSlider;
