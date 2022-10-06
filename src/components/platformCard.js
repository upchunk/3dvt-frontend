import React from "react";
import { Button, Card } from "@mui/material";
import smartphone from "../assets/smartphone.svg";
import tv from "../assets/tv.svg";
import { BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Platform({ variant }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 400,
        height: 300,
        border: 1,
        borderColor: "#4999DB",
      }}
    >
      {variant === "Android" ? (
        <img src={smartphone} alt="Smartphone" width="72" />
      ) : (
        <img src={tv} alt="tv" width="72" />
      )}
      <h4>{variant}</h4>
      {variant === "Android" ? (
        <Button
          variant="contained"
          size="small"
          sx={{ m: 2, backgroundColor: "#0148A9" }}
        >
          Buka di PlayStore <BiRightArrowAlt fontSize={"large"} />
        </Button>
      ) : (
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("../daftar")}
          sx={{ m: 2, backgroundColor: "#0148A9" }}
        >
          Daftar Sekarang <BiRightArrowAlt fontSize={"large"} />
        </Button>
      )}
    </Card>
  );
}
