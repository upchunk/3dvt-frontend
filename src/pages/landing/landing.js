import React from "react";
import "./landing.css";
import logo from "../../assets/Logo Horizontal Crop.png";
import ilust1 from "../../assets/ilust1.svg";
import ilust2 from "../../assets/ilust2.svg";
import { faker } from "@faker-js/faker";
import { Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

export default function Landing() {
  const judul1 = "Selamat datang di 3DVT";
  const judul2 = "Kenapa 3DVT dibuat?";
  const judul3 = "Bagaimana 3DVT Bekerja?";
  const judul4 = "Platform yang tersedia";
  const paragraph1 = faker.lorem.paragraph(5);
  const paragraph2 = faker.lorem.paragraph(5);
  const paragraph3 = faker.lorem.paragraph(5);
  const paragraph4 = faker.lorem.paragraph(5);
  const navigate = useNavigate();

  return (
    <Box className="landing" paddingX={12}>
      <section className="section1">
        <Grid
          container
          spacing={12}
          rowSpacing={4}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={10}>
            <img className="app-logo" src={logo} width={"300"}></img>
          </Grid>
          <Grid item xs={10}>
            <Typography
              variant="h4"
              fontFamily="montserrat"
              fontWeight={"bold"}
              align="center"
            >
              {judul1}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography
              fontFamily="montserrat"
              fontSize={"1.2rem"}
              align="center"
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
      <section className="section2">
        <Grid
          container
          spacing={12}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item md={4}>
            <img src={ilust1} width={"350"}></img>
          </Grid>
          <Grid item md={8}>
            <Typography
              variant="h4"
              fontFamily="montserrat"
              fontWeight={"bold"}
              align="justify"
            >
              {judul2}
            </Typography>
            <Typography
              fontFamily="inherit"
              fontSize={"1.2rem"}
              align="justify"
            >
              {paragraph2}
            </Typography>
          </Grid>
        </Grid>
      </section>
      <section className="section3">
        <Grid
          container
          spacing={12}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item md={8}>
            <Typography
              variant="h4"
              fontFamily="montserrat"
              fontWeight={"bold"}
              align="justify"
            >
              {judul3}
            </Typography>
            <Typography
              fontFamily="montserrat"
              fontSize={"1.2rem"}
              align="justify"
            >
              {paragraph3}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <img src={ilust2} width={"350"}></img>
          </Grid>
        </Grid>
      </section>
      <section className="section4">
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={10}>
            <Typography
              variant="h4"
              fontFamily="montserrat"
              fontWeight={"bold"}
              align="center"
            >
              {judul4}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography
              fontFamily="montserrat"
              fontSize={"1.2rem"}
              align="center"
            >
              {paragraph4}
            </Typography>
          </Grid>
          <Grid item md={5}>
            <Card sx={{ height: 300, width: 400 }}></Card>
          </Grid>
          <Grid item md={5}>
            <Card sx={{ height: 300, width: 400 }}></Card>
          </Grid>
        </Grid>
      </section>
    </Box>
  );
}
