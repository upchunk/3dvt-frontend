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
import { listRekonstruksi, listSegmentasi } from "../utils/api";
import {
  setModel,
  setRecData,
  setResultImages,
  setSegData,
  setShowGalery,
  setShowModel,
  setSourceImages,
} from "../redux/runnerConfig";
import { Button, Skeleton, Typography } from "@mui/material";

function DataTable({ title }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
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

  React.useEffect(() => {
    if (userid !== "" && userData !== {}) {
      {
        title === "Segmentasi"
          ? loadSegData(userid, userData?.institution, "SUCCESS")
          : loadRecData(userid, userData?.institution);
      }
    }
  }, [userid]);

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
            {loading &&
              skeletonArray.map((_, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" align="center">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton />
                  </TableCell>

                  {title === "Segmentasi" ? (
                    <>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                    </>
                  ) : null}
                </TableRow>
              ))}
            {title === "Segmentasi" ? (
              <>
                {segData?.count === 0 ? (
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      Belum ada data yang dapat ditampilkan, silahkan melakukan
                      Segmentasi
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
                      Belum ada data yang dapat ditampilkan, silahkan melakukan
                      Rekonstruksi
                    </TableCell>
                  </TableRow>
                ) : (
                  ReconstructionTableBody
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
      ) : (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={recData?.count}
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
