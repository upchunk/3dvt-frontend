import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { postSuggestionData } from "../../utils/api";
import { useDispatch } from "react-redux";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
} from "../../redux/runnerConfig";
import { Stack } from "@mui/system";
export default function SuggestionForm() {
  const dispatch = useDispatch();
  const cardTitle = (
    <Typography variant="h6" fontFamily={"Montserrat"} fontWeight={"bold"}>
      Kritik dan Saran
    </Typography>
  );

  const defaultBody = {
    subject: "",
    text: "",
  };

  const [requestBody, setRequestBody] = React.useState(defaultBody);

  async function handleCreate() {
    await postSuggestionData(requestBody).then((res) => {
      if (res.status === 201) {
        dispatch(setErrSeverity("success"));
        dispatch(
          setErrMessage(
            `Terima Kasih, Kritik dan Saran anda sangat berarti bagi kami`
          )
        );
        dispatch(setErrCatch(true));
      }
    });
  }

  return (
    <Card sx={{ p: 3 }}>
      <CardHeader
        sx={{
          color: "black",
          size: "small",
          height: 0,
        }}
        title={cardTitle}
      ></CardHeader>
      <CardContent>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid item xs={2}>
            <Typography fontFamily={"montserrat"}>Subjek</Typography>
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <TextField
                className="white soften"
                size="small"
                type="string"
                variant="outlined"
                value={requestBody.subject}
                sx={{ marginBottom: 1 }}
                onChange={(e) =>
                  setRequestBody({ ...requestBody, subject: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Typography fontFamily={"montserrat"}>Pesan</Typography>
          </Grid>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <TextField
                className="white soften"
                size="small"
                multiline
                minRows={5}
                type="string"
                variant="outlined"
                value={requestBody.text}
                sx={{ marginBottom: 1 }}
                onChange={(e) =>
                  setRequestBody({
                    ...requestBody,
                    text: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Stack spacing={2} direction={"row"}>
          <Button variant="contained" onClick={handleCreate}>
            Kirim
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
