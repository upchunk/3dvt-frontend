import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, Environment, OrbitControls } from "@react-three/drei";
import { Box, Button, Card, CircularProgress } from "@mui/material";
import Model from "./model";

import { Html, useProgress } from "@react-three/drei";
import { useDispatch } from "react-redux";
import { setModel, setShowModel } from "../../redux/runnerConfig";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <CircularProgress size={50} thickness={5} value={progress} />
    </Html>
  );
}

export default function ModelRederer() {
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(setShowModel(false));
    dispatch(setModel(""));
  }
  return (
    <Card sx={{ p: 3 }}>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button variant="contained" size="small" onClick={() => handleClose()}>
          Tutup
        </Button>
      </Box>
      <Canvas style={{ height: "100vh" }}>
        <Suspense fallback={<Loader />}>
          <Center>
            <Model />
          </Center>
          <OrbitControls />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </Card>
  );
}
