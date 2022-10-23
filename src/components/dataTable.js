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
import { listSegmentasi } from "../utils/api";
import {
  setResultImages,
  setSegData,
  setShowGalery,
  setSourceImages,
} from "../redux/runnerConfig";
import { setLoading, setReload } from "../redux/userConfig";
import { Button, Skeleton, Typography } from "@mui/material";

function DataTable({ title }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const userid = useSelector((state) => state.userConfig.userid);
  const reload = useSelector((state) => state.userConfig.reload);
  const loading = useSelector((state) => state.userConfig.loading);
  const userData = useSelector((state) => state.userConfig.userData);
  const segData = useSelector((state) => state.runnerConfig.segData);
  const skeletonArray = Array(5).fill("");
  const dispatch = useDispatch();

  const loadSegData = (userid, institution, status) => {
    listSegmentasi(userid, institution, status).then((res) => {
      dispatch(setSegData(res?.data));
      dispatch(setLoading(false));
    });
  };

  React.useEffect(() => {
    dispatch(setLoading(true));
    loadSegData(userid, userData?.institution, "SUCCESS");
    dispatch(setReload(false));
  }, [reload]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleShow = (images) => {
    console.log(images);
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 1 }}>
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
            <TableRow>
              <TableCell align="center">No.</TableCell>
              <TableCell align="center">Project {title} ID</TableCell>
              <TableCell align="center">Jumlah Citra</TableCell>
              <TableCell align="center">Model / Weight</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Waktu</TableCell>
              <TableCell align="center">Hasil</TableCell>
            </TableRow>
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
                  <TableCell align="center">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}
            {segData?.count === 0 ? (
              <TableRow>
                <TableCell align="center" rowSpan={7}>
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              segData?.results?.map((row, index) => (
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
                  <TableCell align="center">{row.model}</TableCell>
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {segData.count ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={segData?.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </Paper>
  );
}

export default DataTable;
