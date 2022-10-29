import React from "react";
import "./landing.css";
import logo from "../../assets/Logo Horizontal Crop.png";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Platform from "../../components/platformCard";
import { BiRightArrowAlt } from "react-icons/bi";
import {
  getPublicationList,
  getResearcherList,
  getSectionList,
} from "../../utils/api";
import Publication from "../../components/publicationCard";

export default function Landing() {
  const navigate = useNavigate();
  const [sectionData, setSectionData] = React.useState([]);
  const [researchers, setResearchers] = React.useState([]);
  const [publicationList, setPublicationList] = React.useState([]);
  // const vid_width = "100%";
  // const vid_height = "100vh";

  const loadSection = () => {
    getSectionList().then((res) => {
      if (res.count > 0) {
        setSectionData(res.results);
      }
    });
  };

  const loadResearcher = () => {
    getResearcherList().then((res) => {
      if (res.count > 0) {
        setResearchers(res.results);
      }
    });
  };

  const loadPublication = () => {
    getPublicationList().then((res) => {
      if (res.count > 0) {
        setPublicationList(res.results);
      }
    });
  };

  React.useState(() => {
    loadSection();
    loadResearcher();
    loadPublication();
  }, []);

  return (
    <Stack className="landing" paddingX={"10vw"} sx={{ flexGrow: 1 }}>
      {sectionData.map((each) => (
        <section key={each.section}>
          {each.section === "section1" ? (
            <Stack
              direction="column"
              alignItems="center"
              columnGap={{ xs: 6 }}
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
              columnGap={{ xs: 6 }}
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "100vh" }}
            >
              <img src={each.image} className="ilustration" loading="lazy" />
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
              columnGap={{ xs: 6 }}
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
              <img src={each.image} className="ilustration" loading="lazy" />
            </Stack>
          ) : each.section === "section4" ? (
            <Stack
              direction={{ xs: "column" }}
              spacing={{ xs: 2 }}
              columnGap={{ xs: 6 }}
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
                columnGap={{ xs: 6 }}
                justifyContent="center"
                padding={2}
              >
                <Platform variant={"Android"} />
                <Platform variant={"Website"} />
              </Stack>
            </Stack>
          ) : each.section === "section5" ? (
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2, md: -10 }}
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "100vh" }}
            >
              <div className="video-responsive">
                <iframe
                  src={`https://www.youtube.com/embed/${each.kwargs.embedid}`}
                  title={each.kwargs.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <Card sx={{ maxWidth: 400, position: "relative" }}>
                <CardContent>
                  <Box padding="1vh 0.5vw">
                    <Typography
                      variant="h4"
                      fontFamily="montserrat"
                      fontWeight={"bold"}
                      align="justify"
                    >
                      {each.title}
                    </Typography>
                  </Box>
                  <Box padding="1vh 0.5vw">
                    <Typography
                      fontFamily="inherit"
                      fontSize={"1.2rem"}
                      align="justify"
                    >
                      {each.content}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Box padding="1vh 0.5vw">
                    <a href={`https://youtu.be/${each.kwargs.embedid}`}>
                      <Button
                        variant="contained"
                        sx={{
                          width: "fit-content",
                          backgroundColor: "#0148A9",
                          align: "center",
                        }}
                      >
                        Lihat Sekarang <BiRightArrowAlt fontSize={"large"} />
                      </Button>
                    </a>
                  </Box>
                </CardActions>
              </Card>
            </Stack>
          ) : each.section === "section6" ? (
            <Stack
              direction={{ xs: "column" }}
              spacing={{ xs: 2 }}
              columnGap={{ xs: 6 }}
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
              <Grid container spacing={2} justifyContent={"center"}>
                {publicationList.map((each) => (
                  <Grid
                    item
                    key={each.id}
                    xs={6}
                    sm={4}
                    md={3}
                    className="publication"
                    display={"flex"}
                    flexDirection={{ xs: "row", sm: "column" }}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Publication title={each.name} link={each.link} />
                  </Grid>
                ))}
              </Grid>
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
              <Grid container spacing={2} justifyContent={"center"}>
                {researchers.map((each) => (
                  <Grid
                    item
                    key={each.id}
                    xs={12}
                    sm={6}
                    md={4}
                    className="researcher"
                    display={"flex"}
                    flexDirection={{ xs: "row", sm: "column" }}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <a href={each.link} target="_blank" rel="noreferrer">
                      <Avatar
                        alt={`${each.name}`}
                        src={each.avatar}
                        sx={{ width: 150, height: 150, margin: 2 }}
                      />
                    </a>
                    <Typography
                      variant="h5"
                      fontFamily="montserrat"
                      fontWeight={"bold"}
                      align="center"
                    >
                      {each.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          ) : null}
        </section>
      ))}
      <section></section>
    </Stack>
  );
}
