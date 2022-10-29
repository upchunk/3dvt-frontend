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
  deleteRekonstruksi,
  deleteSegmentasi,
  listRekonstruksi,
  listSegmentasi,
} from "../utils/api";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
  setModel,
  setRecData,
  setResultImages,
  setSegData,
  setShowGalery,
  setShowModel,
  setSourceImages,
} from "../redux/runnerConfig";
import { Button, Skeleton, Stack, Typography } from "@mui/material";

function DataTable({ title }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const userid = useSelector((state) => state.userConfig.userid);
  const userData = useSelector((state) => state.userConfig.userData);
  const segData = useSelector((state) => state.runnerConfig.segData);
  const recData = useSelector((state) => state.runnerConfig.recData);
  const dispatch = useDispatch();

  const skeletonArray = Array(5).fill("");
  const skeletonRows = (num) => {
    Array(num).fill(
      <TableCell key- component="th" scope="row" align="center">
        <Skeleton />
      </TableCell>
    );
  };

  const loadSegData = (userid, institution, status) => {
    if (loading)
      listSegmentasi(userid, institution, status).then((res) => {
        dispatch(setSegData(res?.data));
        setLoading(false);
      });
  };

  const deleteSegData = (id) => {
    deleteSegmentasi(id).then((res) => {
      if (res.status === 204) {
        dispatch(setErrSeverity("success"));
        dispatch(setErrMessage(`Segmentasi dengan ID ${id} berhasil di Hapus`));
        dispatch(setErrCatch(true));
        setLoading(true);
      }
    });
  };

  const loadRecData = (userid, institution) => {
    if (loading)
      listRekonstruksi(userid, institution).then((res) => {
        dispatch(setRecData(res?.data));
        setLoading(false);
      });
  };

  const deleteRecData = (id) => {
    deleteRekonstruksi(id).then((res) => {
      if (res.status === 204) {
        dispatch(setErrSeverity("success"));
        dispatch(
          setErrMessage(`Rekonstruksi dengan ID ${id} berhasil di Hapus`)
        );
        dispatch(setErrCatch(true));
        setLoading(true);
      }
    });
  };

  React.useEffect(() => {
    if (userid !== "" && userData !== {}) {
      {
        title === "Segmentasi"
          ? loadSegData(userid, userData?.institution, "SUCCESS")
          : loadRecData(userid, userData?.institution);
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
    dispatch(setModel(files[0].files));
    dispatch(setShowModel(true));
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
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => handleShow(row.images)}
          >
            Lihat
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => deleteSegData(row.id)}
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
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => handleRender(row.files)}
          >
            Lihat
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => deleteRecData(row.id)}
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
              : ReconstructionTableHead}
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
                ) : (
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
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!loading ? (
        <>
          {title === "Segmentasi" ? (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={segData.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={recData.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </>
      ) : null}
    </Paper>
  );
}

export default DataTable;
