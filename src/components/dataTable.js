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

// const columns = [
//   { id: "name", label: "Name", minWidth: 170 },
//   { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
//   {
//     id: "population",
//     label: "Population",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "size",
//     label: "Size\u00a0(km\u00b2)",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "density",
//     label: "Density",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toFixed(2),
//   },
// ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

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

  const handleShow = (source, result) => {
    dispatch(setSourceImages(source));
    dispatch(setResultImages(result));
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
              <TableCell align="center">Weight</TableCell>
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
                  No Data Found, Start Crawling Now
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
                    {row.sources.length}
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
                      onClick={() => handleShow(row.sources, row.results)}
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={segData.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DataTable;
