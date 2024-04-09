import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { getMethodApi, postMethodApi } from "../../Utils/Methods";
import { GET_INDIVISUAL_INDEX, POST_CONTACT_US } from "../../Apis/EndPoints";
import { useState } from "react";
import Loader from "../../Components/Loader/Loader";
import useStyles from "../../Assets/Styles/Common/Common";
import { Button, FormControl, Checkbox } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

export default function GraphPdf() {
  const { f22text } = useStyles();
  const [data, setdata] = useState();
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [OnClicked, setOnClicked] = useState("black");
  const [showContactForm, setShowContactForm] = useState("none");
  const [loader, setLoader] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    Company: "",
    Email: "",
    Phone: "",
    checkboxCookie: false,
  });

  const handleChange = (event) => {
    setContactInfo({
      ...contactInfo,
      [event.target.name]:
        event.target.name !== "checkboxCookie"
          ? event.target.value
          : event.target.checked,
    });
  };

  const createContactInfo = () => {
    if (contactInfo.name.trim() === "") {
      toast.error("Name is required !!");
      return;
    }

    if (contactInfo.Company.trim() === "") {
      toast.error("Company name is required !!");
      return;
    }

    if (contactInfo.Email.trim() === "") {
      toast.error("Email is required !!");
      return;
    }

    if (
      !contactInfo.Email.split("").includes("@") ||
      !contactInfo.Email.split("").includes(".")
    ) {
      toast.error("Enter proper email !!");
      return;
    }

    if (contactInfo.Phone.trim() === "") {
      toast.error("Phone number is required !!");
      return;
    }
    debugger;

    if (
      contactInfo.checkboxCookie === "" ||
      contactInfo.checkboxCookie === undefined ||
      contactInfo.checkboxCookie === false
    ) {
      toast.error("Please accept cookie policy !!");
      return;
    }

    postMethodApi(POST_CONTACT_US, contactInfo)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Contact Information is sent !!");
          setContactInfo({
            name: "",
            Company: "",
            Email: "",
            Phone: "",
            checkboxCookie: false,
          });
        }
      })
      .catch((error) => {
        toast.error("Some error occur !!");
        return;
      });
  };

  useEffect(() => {
    postMethodApi(GET_INDIVISUAL_INDEX, { Name: "Indxx 500 Index" }).then(
      (response) => {
        if (response.status === 200) {
          setdata(response.data);
          setLoader(false);
        }
      }
    );
    
    setTimeout(() => {
      setSetTimeOutLoader(false);
    }, 2000);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {/* ///// ////////////////// INDEX CONTAINER /////////// */}

      <Box className="container IndexContainer">
        <Typography variant="h1" component={"h1"} className="IndexText">
          {data ? data.Name : "Indxx 500 Index"}
        </Typography>
        <Typography variant="p" component={"p"} className="IndexTextPara">
          {data ? data.Description : "Descritption"}
        </Typography>
      </Box>

      {/* ////////////////////// CHARACTERSTICS TABLE ///////////// */}
      <Box className="container StatisticsTableBox">
        <Typography variant="h2" className="IndivisualStatisticsHeading">
          Index Characteristics
        </Typography>

        <Box className="StatisticsTable">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
              <TableBody>
                {data
                  ? data.INDEX_CHARACTERISTICS !== null
                    ? Object.keys(data.INDEX_CHARACTERISTICS).map(
                        (item, ind) => {
                          let values = Object.values(
                            data.INDEX_CHARACTERISTICS
                          );
                          return (
                            <StyledTableRow key={ind}>
                              <StyledTableCell component="th" scope="row">
                                {item}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {values[ind]}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        }
                      )
                    : null
                  : null}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography
            variant="p"
            className="StatisticsbaseText MT1"
            component={"p"}
          >
            * Trailing 12 months data for current year portfolio
          </Typography>

          <Typography
            variant="p"
            className="StatisticsbaseText"
            component={"p"}
          >
            ** Trailing 12 months
          </Typography>
        </Box>
      </Box>

      {/* ////////////////////// Statistics TABLE ///////////// */}
      <Box className="container StatisticsTableBox">
        <Typography variant="h3" className="IndivisualStatisticsHeading">
          Index Risk & Return Statistics
        </Typography>

        <Box className="StatisticsTable">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {data
                    ? data["INDEX_RISK_AND_RETURN_STATISTICS"] !== null
                      ? Object.keys(
                          data["INDEX_RISK_AND_RETURN_STATISTICS"][0]
                        ).map((item, ind) => {
                          if (ind == 0) {
                            return <StyledTableCell key={ind}>{item}</StyledTableCell>;
                          } else {
                            return (
                              <StyledTableCell key={ind} align="right">
                                {item}
                              </StyledTableCell>
                            );
                          }
                        })
                      : null
                    : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ? data["INDEX_RISK_AND_RETURN_STATISTICS"] !== null
                    ? data["INDEX_RISK_AND_RETURN_STATISTICS"].map(
                        (item, ind) => (
                          <StyledTableRow key={ind}>
                            {Object.values(item).map((x, i) => {
                              if (i == 0) {
                                return (
                                  <StyledTableCell key={ind} component="th" scope="row">
                                    {x}
                                  </StyledTableCell>
                                );
                              } else {
                                return (
                                  <StyledTableCell key={ind} align="right">
                                    {x}
                                  </StyledTableCell>
                                );
                              }
                            })}
                          </StyledTableRow>
                        )
                      )
                    : null
                  : null}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography
            variant="p"
            className="StatisticsbaseText MT1"
            component={"p"}
          >
            1. W.R.T.:
          </Typography>

          <Typography
            variant="p"
            className="StatisticsbaseText"
            component={"p"}
          >
            2. As of last trading day.
          </Typography>
        </Box>
      </Box>

      {/* loader */}
      {setTimeOutLoader || loader ? <Loader /> : ""}
    </>
  );
}
