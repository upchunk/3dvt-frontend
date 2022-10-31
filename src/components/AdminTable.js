import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch } from "react-redux";
import {
  deleteSuggestionData,
  getSuggestionList,
  getUserList,
} from "../utils/api";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
  setPopUpHeader,
  setPopUpMsg,
  setUserDetail,
  setViewUserDetail,
} from "../redux/runnerConfig";
import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { setPopUp } from "../redux/userConfig";

function AdminTable({ type }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [suggestions, setSuggestions] = React.useState(10);
  const [userList, setUserList] = React.useState([]);
  const dispatch = useDispatch();

  const skeletonArray = Array(5).fill("");
  const skeletonRows = (num) => {
    Array(num).fill(
      <TableCell component="th" scope="row" align="center">
        <Skeleton />
      </TableCell>
    );
  };

  const loadSuggestions = () => {
    getSuggestionList().then((res) => {
      setSuggestions(res);
      setLoading(false);
    });
  };

  const deleteSugestion = (id) => {
    deleteSuggestionData(id).then((res) => {
      if (res.status === 204) {
        dispatch(setErrSeverity("success"));
        dispatch(setErrMessage(`Data Berhasil di Hapus`));
        dispatch(setErrCatch(true));
        setLoading(true);
      }
    });
  };

  const loadUserList = () => {
    getUserList().then((res) => {
      setUserList(res.data);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    if (loading) type === "Saran" ? loadSuggestions() : loadUserList();
  }, [loading]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const showSugestion = (header, text) => {
    dispatch(setPopUpHeader(header));
    dispatch(setPopUpMsg(text));
    dispatch(setPopUp(true));
  };

  const showUserDetail = (row) => {
    dispatch(setViewUserDetail(true));
    dispatch(setUserDetail(row));
  };

  const SuggestionTableHead = ["No.", "User", "Subjek", "Opsi"];

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

  const UserTableHead = ["No.", "Username", "Email", "Login", "Staff", "Opsi"];

  const UserTableBody = userList?.results?.map((row, index) => (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" align="center">
        {index + 1}
      </TableCell>
      <TableCell align="center" className="textContainer">
        {row.username}
      </TableCell>
      <TableCell align="center">{row.email}</TableCell>
      <TableCell align="center">
        {String(row.last_login).split(".")[0].replace("T", " ")}
      </TableCell>
      <TableCell align="center">{String(row.is_staff)}</TableCell>
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
            onClick={() => showUserDetail(row)}
          >
            Lihat
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
        Data {type}
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {type === "Saran"
                ? SuggestionTableHead.map((each, index) => (
                    <TableCell key={index} align="center">
                      {each}
                    </TableCell>
                  ))
                : UserTableHead.map((each, index) => (
                    <TableCell key={index} align="center">
                      {each}
                    </TableCell>
                  ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <>
                {skeletonArray.map((_, index) => (
                  <TableRow key={index}>
                    {type === "Saran" ? skeletonRows(4) : skeletonRows(5)}
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                {type === "Saran" ? (
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
                ) : (
                  <>
                    {userList?.count === 0 ? (
                      <TableRow>
                        <TableCell align="center" colSpan={4}>
                          Belum ada data yang dapat ditampilkan, silahkan
                          mengisi Kritik dan Saran
                        </TableCell>
                      </TableRow>
                    ) : (
                      UserTableBody
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
          {type === "Saran" ? (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={suggestions.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={userList.count}
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

export default AdminTable;
