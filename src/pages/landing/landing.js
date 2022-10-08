import React from "react";
import "./landing.css";
import logo from "../../assets/Logo Horizontal Crop.png";
import ilust1 from "../../assets/ilust1.svg";
import ilust2 from "../../assets/ilust2.svg";
import ilust3 from "../../assets/ilust3.svg";
import { faker } from "@faker-js/faker";
import { Button, CssBaseline, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import Platform from "../../components/platformCard";
import { BiRightArrowAlt } from "react-icons/bi";

export default function Landing() {
  const judul1 = "Selamat datang di 3DVT";
  const judul2 = "Kenapa 3DVT dibuat?";
  const judul3 = "Bagaimana 3DVT Bekerja?";
  const judul4 = "Platform yang tersedia";
  const judul5 = "Publikasi";
  const paragraph1 = faker.lorem.paragraph(5);
  const paragraph2 = faker.lorem.paragraph(5);
  const paragraph3 = faker.lorem.paragraph(5);
  const paragraph4 = faker.lorem.paragraph(5);
  const paragraph5 = faker.lorem.paragraph(5);
  const navigate = useNavigate();

  return (
    <Box className="landing" paddingX={24} sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <section className="section">
        <Grid
          container
          spacing={12}
          rowSpacing={4}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <img className="app-logo" src={logo} loading="lazy" />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              fontFamily="montserrat"
              fontWeight={"bold"}
              align="center"
              paddingY={2}
            >
              {judul1}
            </Typography>
            <Typography
              fontFamily="montserrat"
              fontSize={"1.2rem"}
              align="center"
              paddingY={2}
            >
              {paragraph1}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Button
              variant="contained"
              onClick={() => navigate("../masuk")}
              sx={{
                width: "content",
                backgroundColor: "#0148A9",
                paddingX: 3,
                align: "center",
              }}
            >
              Coba Sekarang
            </Button>
          </Grid>
        </Grid>
      </section>
      <section className="section">
        <Grid
          container
          spacing={12}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12} md={4}>
            <img src={ilust1} className="ilustration" loading="lazy" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              fontFamily="montserrat"
              fontWeight={"bold"}
              align="justify"
              paddingY={2}
            >
              {judul2}
            </Typography>
            <Typography
              fontFamily="inherit"
              fontSize={"1.2rem"}
              align="justify"
              paddingY={2}
            >
              {paragraph2}
            </Typography>
          </Grid>
        </Grid>
      </section>
      <section className="section">
        <Grid
          container
          spacing={12}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              fontFamily="montserrat"
              fontWeight={"bold"}
              align="justify"
              padding={2}
            >
              {judul3}
            </Typography>
            <Typography
              fontFamily="montserrat"
              fontSize={"1.2rem"}
              align="justify"
              padding={2}
            >
              {paragraph3}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src={ilust2} className="ilustration" loading="lazy" />
          </Grid>
        </Grid>
      </section>
      <section className="section">
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              fontFamily="montserrat"
              fontWeight={"bold"}
              align="center"
              padding={2}
            >
              {judul4}
            </Typography>
            <Typography
              fontFamily="montserrat"
              fontSize={"1.2rem"}
              align="center"
              padding={2}
            >
              {paragraph4}
            </Typography>
            <Grid
              container
              spacing={12}
              alignItems="center"
              justifyContent="center"
              padding={2}
            >
              <Grid item xs={12} md={5}>
                <Platform variant={"Android"} />
              </Grid>
              <Grid item xs={12} md={5}>
                <Platform variant={"Website"} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </section>
      <section className="section">
        <Grid
          container
          spacing={12}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              fontFamily="montserrat"
              fontWeight={"bold"}
              align="justify"
              paddingY={2}
            >
              {judul5}
            </Typography>
            <Typography
              fontFamily="inherit"
              fontSize={"1.2rem"}
              align="justify"
              paddingY={2}
            >
              {paragraph5}
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "content",
                backgroundColor: "#0148A9",
                paddingX: 3,
                align: "center",
              }}
            >
              Kunjungi Jurnal Publikasi <BiRightArrowAlt fontSize={"large"} />
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src={ilust3} className="ilustration" loading="lazy" />
          </Grid>
        </Grid>
      </section>
    </Box>
  );
}
