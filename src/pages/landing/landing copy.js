/* eslint-disable no-unused-vars */
import React from "react";
import "./landing.css";
import logo from "../../assets/Logo Horizontal Crop.png";
import ilust1 from "../../assets/ilust1.svg";
import ilust2 from "../../assets/ilust2.svg";
import ilust3 from "../../assets/ilust3.svg";
import { faker } from "@faker-js/faker";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import Platform from "../../components/platformCard";
import { BiRightArrowAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { getSectionList } from "../../utils/api";

export default function Landing() {
  const loading = useSelector((state) => state.userConfig.loading);
  const judul2 = "Kenapa 3DVT dibuat?";
  const judul3 = "Bagaimana 3DVT Bekerja?";
  const judul4 = "Platform yang tersedia";
  const judul5 = "Publikasi";
  const paragraph2 = faker.lorem.paragraph(5);
  const paragraph3 = faker.lorem.paragraph(5);
  const paragraph4 = faker.lorem.paragraph(5);
  const paragraph5 = faker.lorem.paragraph(5);

  const navigate = useNavigate();

  const [sectionData, setSectionData] = React.useState([]);

  React.useState(() => {
    if (loading) {
      getSectionList().then((res) => {
        if (res.count > 0) {
          setSectionData(res.results);
        }
      });
    }
  }, [loading]);

  return (
    <Stack className="landing" paddingX={"10vw"} sx={{ flexGrow: 1 }}>
      {sectionData.map((each, index) => (
        <section key={index}>
          {each.section === "section1" ? (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={{ xs: 3 }}
              sx={{ minHeight: "100vh" }}
            >
              <img className="app-logo" src={logo} loading="lazy" />
              <Typography
                variant="h4"
                fontFamily="montserrat"
                fontWeight={"bold"}
                align="center"
              >
                {each.title}
              </Typography>
              <Typography
                fontFamily="montserrat"
                fontSize={"1.2rem"}
                align="center"
              >
                {each.content}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("../masuk")}
                sx={{
                  width: "200px",
                  backgroundColor: "#0148A9",
                  align: "center",
                }}
              >
                Coba Sekarang
              </Button>
            </Stack>
          ) : (
            <></>
          )}
        </section>
      ))}
      <section></section>
      <section></section>
      <section>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 4 }}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Stack direction={{ xs: "column" }}>
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
          </Stack>
          <img src={ilust2} className="ilustration" loading="lazy" />
        </Stack>
      </section>
      <section>
        <Stack
          direction={{ xs: "column" }}
          spacing={{ xs: 2 }}
          alignItems="center"
          justifyContent="center"
          padding={2}
          style={{ minHeight: "100vh" }}
        >
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
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, md: 4 }}
            alignItems="center"
            justifyContent="center"
            padding={2}
          >
            <Platform variant={"Android"} />
            <Platform variant={"Website"} />
          </Stack>
        </Stack>
      </section>
      <section>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 4 }}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Stack direction={{ xs: "column" }} spacing={{ xs: 2, md: 4 }}>
            <Typography
              variant="h4"
              fontFamily="montserrat"
              fontWeight={"bold"}
              align="justify"
            >
              {judul5}
            </Typography>
            <Typography
              fontFamily="inherit"
              fontSize={"1.2rem"}
              align="justify"
            >
              {paragraph5}
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
                backgroundColor: "#0148A9",
                align: "center",
              }}
            >
              Kunjungi Jurnal Publikasi <BiRightArrowAlt fontSize={"large"} />
            </Button>
          </Stack>
          <img src={ilust3} className="ilustration" loading="lazy" />
        </Stack>
      </section>
    </Stack>
  );
}
