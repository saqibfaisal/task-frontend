import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, TextField, Typography } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function UserTable() {
  const [data, setData] = React.useState();
  const [id, setId] = React.useState();
  const [editingId, setEditingId] = React.useState(null); 
  const [editedName, setEditedName] = React.useState("");
  const [editedEmail, setEditedEmail] = React.useState("");
  React.useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://192.168.0.107:3000/api/admin/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  let Delete = (e) => {
    setId(e);
    console.log(e);
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://192.168.0.107:3000/api/admin/users/${e}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        window.location.reload(); // Reload the page after successful delete
      })
      .catch((error) => console.log("error", error));
  };

  let edit = (e) => {
    setEditingId(e);
    const userToEdit = data.find((user) => user._id === e);
    if (userToEdit) {
      setEditedName(userToEdit.username);
      setEditedEmail(userToEdit.email);
    }
  };

  const handleEditSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: editedName,
      email: editedEmail,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://192.168.0.107:3000/api/admin/users/${editingId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Box
      style={{
        display: "flex",
        alignItem: "center",
        justifyContent: "center",
        marginTop: 40,
      }}
    >
      {!data ? (
        <Typography variant="h1">Loading</Typography>
      ) : (
        <TableContainer component={Paper} style={{ width: "80%" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>id</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">UserType</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((e) => (
                <>
                  <StyledTableRow key={e.email}>
                    <StyledTableCell component="th" scope="row">
                      {e._id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{e.email}</StyledTableCell>
                    <StyledTableCell align="left">{e.username}</StyledTableCell>
                    <StyledTableCell align="left">{e.userType}</StyledTableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => Delete(e._id)}
                      style={{ marginTop: 5 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => edit(e._id)}
                      style={{ marginTop: 5, marginLeft: 20 }}
                    >
                      Edit
                    </Button>
                  </StyledTableRow>
                  {editingId === e._id && (
                    <StyledTableRow>
                      <StyledTableCell colSpan={4}>
                        <TextField
                          label="Name"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                        <TextField
                          label="Email"
                          value={editedEmail}
                          onChange={(e) => setEditedEmail(e.target.value)}
                        />
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleEditSubmit}
                        >
                          Save
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
