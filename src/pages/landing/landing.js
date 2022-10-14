import React from "react";
import "./landing.css";
import logo from "../../assets/Logo Horizontal Crop.png";
import ilust1 from "../../assets/ilust1.svg";
import ilust2 from "../../assets/ilust2.svg";
import ilust3 from "../../assets/ilust3.svg";
import researcher from "../../assets/researcher.svg";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import Platform from "../../components/platformCard";
import { BiRightArrowAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { getSectionList } from "../../utils/api";

export default function Landing() {
  const loading = useSelector((state) => state.userConfig.loading);
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
          ) : each.section === "section2" ? (
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2, md: 4 }}
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "100vh" }}
            >
              <img src={ilust1} className="ilustration" loading="lazy" />
              <Stack direction={{ xs: "column" }}>
                <Typography
                  variant="h4"
                  fontFamily="montserrat"
                  fontWeight={"bold"}
                  align="justify"
                >
                  {each.title}
                </Typography>
                <Typography
                  fontFamily="inherit"
                  fontSize={"1.2rem"}
                  align="justify"
                >
                  {each.content}
                </Typography>
              </Stack>
            </Stack>
          ) : each.section === "section3" ? (
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
                  {each.title}
                </Typography>
                <Typography
                  fontFamily="montserrat"
                  fontSize={"1.2rem"}
                  align="justify"
                >
                  {each.content}
                </Typography>
              </Stack>
              <img src={ilust2} className="ilustration" loading="lazy" />
            </Stack>
          ) : each.section === "section4" ? (
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
                {each.title}
              </Typography>
              <Typography
                fontFamily="montserrat"
                fontSize={"1.2rem"}
                align="center"
                padding={2}
              >
                {each.content}
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
          ) : each.section === "section6" ? (
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
                  {each.title}
                </Typography>
                <Typography
                  fontFamily="inherit"
                  fontSize={"1.2rem"}
                  align="justify"
                >
                  {each.content}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    width: "fit-content",
                    backgroundColor: "#0148A9",
                    align: "center",
                  }}
                >
                  Kunjungi Jurnal Publikasi{" "}
                  <BiRightArrowAlt fontSize={"large"} />
                </Button>
              </Stack>
              <img src={ilust3} className="ilustration" loading="lazy" />
            </Stack>
          ) : each.section === "section7" ? (
            <Stack
              direction={{ xs: "column" }}
              alignItems="center"
              justifyContent="center"
              spacing={{ xs: 2, md: 4 }}
              sx={{ minHeight: "100vh" }}
            >
              <Typography
                variant="h4"
                fontFamily="montserrat"
                fontWeight={"bold"}
                align="center"
              >
                {each.title}
              </Typography>
              <Typography
                fontFamily="inherit"
                fontSize={"1.2rem"}
                align="justify"
              >
                {each.content}
              </Typography>
              <Stack width={"100%"} spacing={{ xs: 2, md: 4 }}>
                <Stack
                  direction={{ xs: "row" }}
                  alignItems="center"
                  justifyContent="space-around"
                  spacing={{ xs: 2, md: 4 }}
                >
                  <Stack
                    direction={{ xs: "column" }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      src={researcher}
                      className="researcher"
                      loading="lazy"
                    />
                    <Typography
                      variant="h6"
                      fontFamily="montserrat"
                      fontWeight={"bold"}
                      align="center"
                    >
                      Nama Kang Riset
                    </Typography>
                  </Stack>
                  <Stack
                    direction={{ xs: "column" }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      src={researcher}
                      className="researcher"
                      loading="lazy"
                    />
                    <Typography
                      variant="h6"
                      fontFamily="montserrat"
                      fontWeight={"bold"}
                      align="center"
                    >
                      Nama Kang Riset
                    </Typography>
                  </Stack>
                  <Stack
                    direction={{ xs: "column" }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      src={researcher}
                      className="researcher"
                      loading="lazy"
                    />
                    <Typography
                      variant="h6"
                      fontFamily="montserrat"
                      fontWeight={"bold"}
                      align="center"
                    >
                      Nama Kang Riset
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction={{ xs: "row" }}
                  alignItems="center"
                  justifyContent="space-around"
                  spacing={{ xs: 2, md: 4 }}
                >
                  <Stack
                    direction={{ xs: "column" }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      src={researcher}
                      className="researcher"
                      loading="lazy"
                    />
                    <Typography
                      variant="h6"
                      fontFamily="montserrat"
                      fontWeight={"bold"}
                      align="center"
                    >
                      Nama Kang Riset
                    </Typography>
                  </Stack>
                  <Stack
                    direction={{ xs: "column" }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      src={researcher}
                      className="researcher"
                      loading="lazy"
                    />
                    <Typography
                      variant="h6"
                      fontFamily="montserrat"
                      fontWeight={"bold"}
                      align="center"
                    >
                      Nama Kang Riset
                    </Typography>
                  </Stack>
                  <Stack
                    direction={{ xs: "column" }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      src={researcher}
                      className="researcher"
                      loading="lazy"
                    />
                    <Typography
                      variant="h6"
                      fontFamily="montserrat"
                      fontWeight={"bold"}
                      align="center"
                    >
                      Nama Kang Riset
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          ) : null}
        </section>
      ))}
      <section></section>
    </Stack>
  );
}
