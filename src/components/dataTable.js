import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSuggestionData,
  getSuggestionList,
  listRekonstruksi,
  listSegmentasi,
} from "../utils/api";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
  setModel,
  setPopUpHeader,
  setPopUpMsg,
  setRecData,
  setResultImages,
  setSegData,
  setShowGalery,
  setShowModel,
  setSourceImages,
} from "../redux/runnerConfig";
import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { setPopUp } from "../redux/userConfig";

function DataTable({ title }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [suggestions, setSuggestions] = React.useState(10);
  const userid = useSelector((state) => state.userConfig.userid);
  const userData = useSelector((state) => state.userConfig.userData);
  const segData = useSelector((state) => state.runnerConfig.segData);
  const recData = useSelector((state) => state.runnerConfig.recData);
  const skeletonArray = Array(5).fill("");
  const dispatch = useDispatch();

  const loadSegData = (userid, institution, status) => {
    if (loading)
      listSegmentasi(userid, institution, status).then((res) => {
        dispatch(setSegData(res?.data));
        setLoading(false);
      });
  };

  const loadRecData = (userid, institution) => {
    if (loading)
      listRekonstruksi(userid, institution).then((res) => {
        dispatch(setRecData(res?.data));
        setLoading(false);
      });
  };

  const loadSuggestions = () => {
    if (loading)
      getSuggestionList().then((res) => {
        setSuggestions(res);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (userid !== "" && userData !== {}) {
      {
        title === "Segmentasi"
          ? loadSegData(userid, userData?.institution, "SUCCESS")
          : title === "Rekonstruksi"
          ? loadRecData(userid, userData?.institution)
          : loadSuggestions();
      }
    }
  }, [loading]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleShow = (images) => {
    const soureList = [];
    const resultList = [];
    images.forEach((image) => {
      soureList.push({
        original: image.images,
        originalHeight: 448,
        originalWidth: 448,
      });
      resultList.push({
        original: image.result,
        originalHeight: 448,
        originalWidth: 448,
      });
    });
    dispatch(setSourceImages(soureList));
    dispatch(setResultImages(resultList));
    dispatch(setShowGalery(true));
  };

  const handleRender = (files) => {
    console.log(files[0].files);
    dispatch(setModel(files[0].files));
    dispatch(setShowModel(true));
  };

  const showSugestion = (header, text) => {
    dispatch(setPopUpHeader(header));
    dispatch(setPopUpMsg(text));
    dispatch(setPopUp(true));
  };

  const deleteSugestion = (id) => {
    deleteSuggestionData(id).then((res) => {
      if (res.status === 204) {
        dispatch(setErrSeverity("success"));
        dispatch(setErrMessage(`Data Berhasil di Hapus`));
        dispatch(setErrCatch(true));
        setLoading(true);
        loadSuggestions();
      }
    });
  };

  const SegmentationTableHead = (
    <TableRow>
      <TableCell align="center">No.</TableCell>
      <TableCell align="center">Project {title} ID</TableCell>
      <TableCell align="center">Jumlah Citra</TableCell>
      <TableCell align="center">Status</TableCell>
      <TableCell align="center">Waktu</TableCell>
      <TableCell align="center">Hasil</TableCell>
    </TableRow>
  );

  const SegmentationTableBody = segData?.results?.map((row, index) => (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" align="center">
        {index + 1}
      </TableCell>
      <TableCell align="center" className="textContainer">
        {row.id}
      </TableCell>
      <TableCell align="center" className="textContainer">
        {String(row.images).split(",").length}
      </TableCell>
      <TableCell align="center">{row.status}</TableCell>
      <TableCell align="center">
        {row.createdate.split(".")[0].replace("T", " ")}
      </TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          size="small"
          onClick={() => handleShow(row.images)}
        >
          Lihat
        </Button>
      </TableCell>
    </TableRow>
  ));

  const ReconstructionTableHead = (
    <TableRow>
      <TableCell align="center">No.</TableCell>
      <TableCell align="center">Project {title} ID</TableCell>
      <TableCell align="center">Waktu</TableCell>
      <TableCell align="center">Hasil</TableCell>
    </TableRow>
  );

  const ReconstructionTableBody = recData?.results?.map((row, index) => (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" align="center">
        {index + 1}
      </TableCell>
      <TableCell align="center" className="textContainer">
        {row.id}
      </TableCell>
      <TableCell align="center">
        {row.createdate.split(".")[0].replace("T", " ")}
      </TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          size="small"
          onClick={() => handleRender(row.files)}
        >
          Lihat
        </Button>
      </TableCell>
    </TableRow>
  ));

  const SuggestionTableHead = (
    <TableRow>
      <TableCell align="center">No.</TableCell>
      <TableCell align="center">User</TableCell>
      <TableCell align="center">Subjek</TableCell>
      <TableCell align="center">Opsi</TableCell>
    </TableRow>
  );

  const SuggestionTableBody = suggestions?.results?.map((row, index) => (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" align="center">
        {index + 1}
      </TableCell>
      <TableCell align="center" className="textContainer">
        {row.user.username}
      </TableCell>
      <TableCell align="center">{row.subject}</TableCell>
      <TableCell align="center" width={"20%"}>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => showSugestion(row.subject, row.text)}
          >
            Lihat
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => deleteSugestion(row.id)}
            sx={{
              color: "white",
              backgroundColor: "orange",
              "&:hover": {
                color: "white",
                backgroundColor: "red",
              },
            }}
          >
            Hapus
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  ));

  const skeletonRows = (num) => {
    return Array(num).fill(
      <TableCell component="th" scope="row" align="center">
        <Skeleton />
      </TableCell>
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ maxWidth: "100%", overflow: "hidden", p: 1 }}>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        fontFamily={"montserrat"}
        p={1}
      >
        Data {title}
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {title === "Segmentasi"
              ? SegmentationTableHead
              : title === "Rekonstruksi"
              ? ReconstructionTableHead
              : SuggestionTableHead}
          </TableHead>
          <TableBody>
            {loading ? (
              <>
                {skeletonArray.map((_, index) => (
                  <TableRow key={index}>
                    {title === "Segmentasi" ? skeletonRows(6) : skeletonRows(4)}
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                {title === "Segmentasi" ? (
                  <>
                    {segData?.count === 0 ? (
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          Belum ada data yang dapat ditampilkan, silahkan
                          melakukan Segmentasi
                        </TableCell>
                      </TableRow>
                    ) : (
                      SegmentationTableBody
                    )}
                  </>
                ) : title === "Rekonstruksi" ? (
                  <>
                    {recData?.count === 0 ? (
                      <TableRow>
                        <TableCell align="center" colSpan={4}>
                          Belum ada data yang dapat ditampilkan, silahkan
                          melakukan Rekonstruksi
                        </TableCell>
                      </TableRow>
                    ) : (
                      ReconstructionTableBody
                    )}
                  </>
                ) : (
                  <>
                    {suggestions?.count === 0 ? (
                      <TableRow>
                        <TableCell align="center" colSpan={4}>
                          Belum ada data yang dapat ditampilkan, silahkan
                          mengisi Kritik dan Saran
                        </TableCell>
                      </TableRow>
                    ) : (
                      SuggestionTableBody
                    )}
                  </>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {title === "Segmentasi" ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={segData?.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : title === "Rekonstruksi" ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={recData?.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={suggestions?.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}

export default DataTable;
