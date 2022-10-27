import { Box, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const StaffOnly = () => {
  const userData = useSelector((state) => state.userConfig.userData);
  const navigate = useNavigate();

  return userData.is_staff ? (
    <>
      <Outlet />
    </>
  ) : (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"70vh"}
    >
      <h1>Staff Only</h1>
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        size="small"
        sx={{
          backgroundColor: "#0148A9",
          align: "center",
          mt: 2,
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default StaffOnly;
