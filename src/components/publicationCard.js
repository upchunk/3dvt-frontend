import React from "react";
import { Button, Card, CardActions, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { Box } from "@mui/system";

export default function Publication({ title, link }) {
  const openInNewTab = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <Card sx={{ maxWidth: "100%", position: "relative" }}>
      <CardActions>
        <Box padding="0.5vh 0.5vw">
          <Button onClick={openInNewTab}>
            <Typography
              variant="p"
              color="black"
              maxWidth="300px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              textAlign={"center"}
            >
              {title}
            </Typography>
            <LaunchIcon />
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
