"use client"
import "../../Assets/Styles/IndivisualIndexName/IndivisualIndexName.scss";
import { Box, Tab, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { postMethodApi } from "../../Utils/Methods";
import {
  GET_INDIVISUAL_INDEX,
  POST_CONTACT_US,
  POST_INDEX_VALUE_DOWNLOAD,
} from "../../Apis/EndPoints";
import { useState } from "react";
import Loader from "../../Components/Loader/Loader";
import FactSheet from "../../Assets/Svgs/FactSheet.svg";
import Methodology from "../../Assets/Svgs/Methodology.svg";
import IndexValue from "../../Assets/Svgs/IndexValue.svg";
import { Button, Checkbox } from "@mui/material";
import ReCaptchaV2 from "react-google-recaptcha";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// import Graph from "../Graph";
import IndxxLogo from "../../Assets/Svgs/indxxLogo.svg";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
// import { useNavigate, useLocation } from "react-router";
import Graph2 from "../Graph2";
import DOMPurify from "dompurify";
import Graph from "../Graph";
// import { Helmet } from "react-helmet";
import { Interweave } from "interweave";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
// import dynamic from "next/dynamic";

// const Graph = dynamic(() => import("../Graph"), {
//   ssr: false,
// });

// const Graph2 = dynamic(() => import("../Graph2"), {
//   ssr: false,
// });

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

export default function IndivisualIndexName(props) {
  // const navigate = useNavigate();
  // const location = useLocation();
  const searchParam = useSearchParams();
  const router = useRouter();
  const [data, setdata] = useState();
  const [OnClicked, setOnClicked] = useState("black");
  const [showContactForm, setShowContactForm] = useState("none");
  const [loader, setLoader] = useState(false);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [portuguesebtn, setportuguesebtn] = useState("none");
  const [defaultindexname, setdefaultindexname] = useState("");
  // const[defaultheading,setdefaultheading] = useState("");
  const [showgraph, setshowGraph] = useState(false);
  const [secondGraphTitle, setSecondGraphTitle] = useState("");
  const [availabletypestabs, setAvailableTypesTabs] = useState([]);
  const pathname = usePathname()

  // const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    Company: "",
    Email: "",
    Phone: "",
    ip_address: "",
    checkboxCookie: false,
    page_name: pathname?.split("/").slice(-1)[0],
  });

  const [Gvalue, setGValue] = useState(1);
  const [indexType, setIndexType] = useState("TR");
  const [activeBtn, setActiveBtn] = useState("Eng");
  const [activeTabBtn, setActiveTabBtn] = useState(0);

  

  function getslug(){
    let a = pathname?.split("/").slice(-1)[0];
    // .split("%20").join("");
    let b = a.toLowerCase().slice(-3);
    if((b === '-pr') || (b === '-tr') ){
      a = a.slice(0, a.length-3);
    }

    let c = a.toLocaleLowerCase().slice(-4);
    if((c === '-ntr') ){
      a = a.slice(0, a.length-4);
    }

    a = decodeURIComponent(a);
    return a;
    // if(a.includes("%C2%AE")){
    //   a = a.replace(/%C2%AE/g, "®");
    //   return a;
    // }
    // else if(a.includes("%C2%A0")){
    //   a = a.replace(/%C2%A0/g, " ");
    //   return a;
    // }
    // else{
    //   return a;
    // }
  }

  function getStepContent(step) {
    if (activeBtn === "Eng") {
      return (
        <Graph2
          graphName={searchParam?.get('slug') ? searchParam?.get('slug') : defaultindexname}
          graphType={indexType}
          graphlanguage={activeBtn}
        />
      );
    } else {
      return (
        <Graph
          graphName={searchParam?.get('slug') ? searchParam?.get('slug') : defaultindexname}
          graphType={indexType}
          graphlanguage={activeBtn}
        />
      );
    }
    // switch (step) {
    //   case 1:
    //     return <Graph2 graphName={searchParam?.get('slug') ? searchParam?.get('slug') : defaultindexname} graphType={indexType} graphlanguage={activeBtn}/>;
    //   case 2:
    //     return <Graph2 graphName={searchParam?.get('slug') ? searchParam?.get('slug') : defaultindexname} graphType={indexType} graphlanguage={activeBtn} />;
    //   case 3:
    //     return <Graph2 graphName={searchParam?.get('slug') ? searchParam?.get('slug') : defaultindexname } graphType={indexType} graphlanguage={activeBtn}/>;
    //   default:
    //     return "Unknown step";
    // }
  }

  const handleChange = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setContactInfo({
      ...contactInfo,
      [event.target.name]:
        event.target.name !== "checkboxCookie"
          ? sanitizedValue
          : event.target.checked,
    });
  };

  const indexvaluebtnclicked = () => {
    postMethodApi(POST_INDEX_VALUE_DOWNLOAD, {
      slug: searchParam?.get('slug')
        ? searchParam?.get('slug')
        : getslug(),
      Type: indexType,
    }).then((response) => {
      if (response.status === 200) {
        if (response.data === false) {
          if (OnClicked === "black") {
            setOnClicked("red");
            setShowContactForm("block");
          } else {
            setOnClicked("black");
            setShowContactForm("none");
          }
        } else {
          toast.success("Downloading...");

          let filename = data.Graph_values.graph1.title
            .split("(")[1]
            .slice(0, -1);
          const date = new Date();
          const formattedDate = date.toISOString().slice(0, 10);

          const download_csv = function (data) {
            const blob = new Blob([data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute("download", `${formattedDate + "_" + filename}.csv`);
            a.click();
          };

          download_csv(response.data);
        }
      }
    });
  };

  const createContactInfo = () => {
    contactInfo.ip_address = localStorage.getItem("IPAddress");

    // if(latitude === "" && longitude === ""){
    //   toast.error("Kindly allow Location !!");
    //   return;
    // }

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

    // if(isCaptchaVerified == false){
    //   toast.error("Please verify Captcha");
    //   return;
    // }

    if (
      contactInfo.checkboxCookie === "" ||
      contactInfo.checkboxCookie === undefined ||
      contactInfo.checkboxCookie === false
    ) {
      toast.error("Please accept Terms of Usage !!");
      return;
    }

    postMethodApi(POST_CONTACT_US, contactInfo)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Contact Information is sent !!");
          router.push("/thank-you");
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
    setdefaultindexname(
      // pathname?
      //   .split("/")
      //   .slice(-1)[0]
      //   .split("%20")
      //   .join(" ")
      //   .split("-")[0]
      getslug()
    );
    setLoader(true);
    postMethodApi(GET_INDIVISUAL_INDEX, {
      slug: searchParam?.get('slug')
        ? searchParam?.get('slug')
        : getslug(),
      Type: indexType,
      language: activeBtn === "Eng" ? "English" : "Portuguese",
    }).then((response) => {
      if (response.status === 200) {
        setdata(response.data);
        const aArr = response.data.Available_types.filter((str) =>
          str.startsWith("P")
        );
        const nonAArr = response.data.Available_types.filter(
          (str) => !str.startsWith("P")
        );
        const resultArr = aArr.concat(nonAArr);
        const aArr1 = resultArr.filter((str) => str.startsWith("T"));
        const nonAArr1 = resultArr.filter((str) => !str.startsWith("T"));
        const resultArr1 = aArr1.concat(nonAArr1);
        setAvailableTypesTabs(resultArr1);
        setIndexType(response.data.Type);
        if (response.data.Show_Portuguese === true) {
          setportuguesebtn("block");
        }
        setLoader(false);
        if (response.data.Graph_values !== null) {
          setshowGraph(true);
          setSecondGraphTitle(response.data.Graph_values.graph2.title);
        }
      }
      else{
        // router.replace('/not-found');
      }
    });

    setTimeout(() => {
      setSetTimeOutLoader(false);
    }, 2000);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
      // eslint-disable-next-line
  }, [indexType, searchParam, activeBtn]);

  function changeconstituentsdisplay(display, value) {
    if (value !== null) {
      document.getElementById("constituentsstable").style.display = display;
    }
  }

  function generatePDF() {
    toast.success("Downloading...");
    setOnClicked("black");
    setShowContactForm("none");
    setTimeout(() => {
      document.getElementById("IndexBlueBox").style.display = "none";
      changeconstituentsdisplay("none", data["constituents"]);
      const elementHTML = document.getElementById("my-component");
      html2canvas(elementHTML).then(function (canvas) {
        const imgData = canvas.toDataURL("image/png");
        const doc = new jsPDF({ compress: true });
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        const topMargin = 10; // Add 20 units of spacing from the top
        doc.addImage(imgData, "PNG", 0, topMargin, pdfWidth, pdfHeight);
        let date = new Date();
        let ddate =
          date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        doc.save(
          `${data.Graph_values.graph1.title
            .split(" (")[1]
            .slice(0, -1)}_${ddate}.pdf`
        );
      });
      document.getElementById("IndexBlueBox").style.display = "inline-block";
      changeconstituentsdisplay("block", data["constituents"]);
    }, 1000);
  }

  const handleChange2 = (event, newValue) => {
    setGValue(newValue);
  };

  // const changelanguage = (lang) => {
  //   setLoader(true);
  //   setActiveBtn(`${lang}`);

  //   postMethodApi(GET_INDIVISUAL_INDEX, {
  //     slug: searchParam?.get('slug'),
  //     Type: indexType,
  //     language: lang === "Eng" ? "English" : "Portuguese"
  //   }).then((response) => {
  //     if (response.status === 200) {
  //       setdata(response.data);
  //       if(response.data.Show_Portuguese === true){
  //         setportuguesebtn("block");
  //       }
  //       setLoader(false);
  //     }
  //   });
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }

  function capitalizeFirstLetterOfEveryWord(str) {
    return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return (
    <>
      {/* <Helmet> */}
        <title>{data?.meta_title ? data.meta_title : "Indices page"}</title>
        <link
          rel="canonical"
          href={`https://www.indxx.com${pathname}`}
          key="canonical"
        />
        <meta
          name="description"
          content={
            data?.meta_description ? data.meta_description : "description"
          }
        />
        <meta
          name="keywords"
          content={data?.meta_keywords ? data.meta_keywords : "keywords"}
        />
      {/* </Helmet> */}

      {/* /////////////////// TOP BANNER //////////////// */}

      <Box
        className="IndivisualIndexNameBanner DF AIC JCC"
        sx={{
          backgroundImage: `url(${
            searchParam?.get('banner') ? searchParam?.get('banner') : data?.Banner_Image
          })`,
        }}
      >
        <Typography
          variant={"h1"}
          className="IndivisualIndexNameBannerText W60 TAC mobW100"
        >
          {searchParam?.get('heading') ? searchParam?.get('heading') : data?.Banner_Name}
        </Typography>
        <Box
          component={"div"}
          sx={{ display: `${portuguesebtn}` }}
          className="posAbs groupBtnLanguage"
        >
          <Button
            className={activeBtn === "Eng" ? "grpBtnActive" : "grpBtnInActive"}
            onClick={() => setActiveBtn("Eng")}
          >
            {data?.language === "English" ? "English" : "Inglês"}
          </Button>
          <Button
            className={activeBtn === "Port" ? "grpBtnActive" : "grpBtnInActive"}
            onClick={() => setActiveBtn("Port")}
          >
            Português
          </Button>
        </Box>
      </Box>

      <Box id="my-component">
        {/* ///// ////////////////// INDEX CONTAINER /////////// */}

        <Box className="container IndexContainer">
          <Typography variant="h2" component={"h2"} className="IndexText">
            {searchParam?.get('indexname')
              ? searchParam?.get('indexname')
              : defaultindexname}
          </Typography>
          <Typography variant="p" component={"p"} className="IndexTextPara">
            {/* {data ? data.Description : "Descritption"} */}
            <Interweave content={data ? data.Description : "Descritption"} />
          </Typography>

          <Box
            id="IndexBlueBox"
            className="IndexBlueBox P30 PR0 DIB bordRadius10 JCSE AIC smallMobFFC"
          >
            {data ? (
              data.Factsheet !== null ? (
                <Box
                  className="IndexWhiteBox DIB MR30 cursorPointer"
                  onClick={() => {
                    data.Factsheet !== "D"
                      ? window.open(data?.FactSheet, "_blank", "noreferrer")
                      : generatePDF();
                  }}
                >
                  <Box className="DF InnerIndexWhiteBox">
                    <Image src={FactSheet} alt="" className="IconClass"/>
                    <Typography
                      variant="p"
                      component={"p"}
                      className="IndexIconText"
                    >
                      {data?.language === "English"
                        ? "Fact Sheet"
                        : "Ficha Informativa"}
                    </Typography>
                  </Box>
                </Box>
              ) : null
            ) : null}

            {data ? (
              data.Methodology !== null ? (
                <Box
                  className="IndexWhiteBox DIB MR30"
                  sx={{ cursor: "pointer" }}
                >
                  <Box
                    className="DF InnerIndexWhiteBox"
                    onClick={() =>
                      window.open(data.Methodology, "_blank", "noreferrer")
                    }
                  >
                    <Image
                      src={Methodology}
                      alt=""
                      className="IconClass"
                    />
                    <Typography
                      variant="p"
                      component={"p"}
                      className="IndexIconText"
                    >
                      {data?.language === "English"
                        ? "Methodology"
                        : "Metodologia"}
                    </Typography>
                  </Box>
                </Box>
              ) : null
            ) : null}

            <Box
              className="IndexWhiteBox DIB MR30"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                indexvaluebtnclicked();
              }}
            >
              <Box className="DF InnerIndexWhiteBox">
                <Image src={IndexValue} alt="" className="IconClass" />
                <Typography
                  variant="p"
                  component={"p"}
                  className="IndexIconText"
                  sx={{ color: `${OnClicked}` }}
                >
                  {"Index Values"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ///////////////// CONTACT BOX /////////////////////// */}

        <Box
          sx={{ display: `${showContactForm}` }}
          className="container IndexContactBox"
        >
          <Typography variant={"h3"} className="IndexContactBoxHeading">
            {"Please enter your contact details to receive index values"}
          </Typography>

          <Box
            component={"div"}
            className=" DF FWW smallMobFFC AIC mobW100 mobMB30"
          >
            {/* <FormControl className="DF formBox PB60  mobPT0 mobPB60 "> */}
            <Box className="contactFormLine "></Box>
            <input
              name="name"
              id="name"
              placeholder="Name*"
              className={` MT30 PL1 FontFamilyInter IndivisualBoxContactus PL1 PB10`}
              onChange={handleChange}
              value={contactInfo.name}
            />

            <input
              type="number"
              name="Phone"
              id="Phone"
              placeholder="Mobile No."
              className={` MT30 PL1 FontFamilyInter IndivisualBoxContactus PL1 PB10`}
              onChange={handleChange}
              value={contactInfo.Phone}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 15);
              }}
            />

            <input
              name="Company"
              id="Company"
              placeholder="Company Name*"
              className={` MT30 PL1 FontFamilyInter IndivisualBoxContactus PL1 PB10`}
              onChange={handleChange}
              value={contactInfo.Company}
            />

            <input
              type="email"
              name="Email"
              id="Email"
              className={` MT30 PL1 FontFamilyInter IndivisualBoxContactus PL1 PB10`}
              placeholder="Email*"
              onChange={handleChange}
              value={contactInfo.Email}
            />
            <Box className="reCaptcha">
              <ReCaptchaV2
                // sitekey={"6LfoBRUgAAAAAL6e1-thG56JCxpCRfDs_r5zoDry"}
                sitekey={"6Ld5c_UoAAAAAHqS4gazOrVdYHcxJ6t5K-9MfKfY"}
                // onChange={handleToken}
                // onExpire={handleExpire}
                className="MT40 MB40 IndivisualIndxxCatchpa"
              />
            </Box>
            <Box
              component={"div"}
              className="DF AIFS MB40  IndivisualCookieBox"
            >
              <Checkbox
                style={{ padding: "0 1rem 0 0" }}
                name="checkboxCookie"
                //  defaultChecked = {false}
                value={contactInfo.checkboxCookie}
                onChange={handleChange}
              ></Checkbox>
              <Typography variant="p" className="IndivisualCookietext">
                I accept Indxx&apos;s terms of usage, acknowledge the Data Privacy
                Policy, and authorize to contact.
              </Typography>
            </Box>

            <Button
              className="IndivisualContactBoxSubmitBtn FontFamilyInter"
              variant="outlined"
              onClick={createContactInfo}
            >
              {"submit"}
            </Button>
            {/* </FormControl> */}
          </Box>
        </Box>

        {/* /////////////////// GRAPH BOX /////////////////////////// */}
        {showgraph && (
          <Box className="GraphBox container">
            <Box className="Tab">
              <TabContext value={Gvalue}>
                <Box>
                <TabList
                    onChange={handleChange2}
                    aria-label="lab API tabs example"
                  >
                    {availabletypestabs?.map((ele, ind) => {
                      return (
                        // <Tab
                        //   key={ind}
                        //   label={ele}
                        //   value={ind + 1}
                        //   className="TabM"
                        //   onClick={() => setIndexType(ele)}
                        // />
                        <Box
                          key={ind}
                          onClick={() => {
                            setIndexType(ele);
                            setActiveTabBtn(ind);
                            setGValue(ind+1);
                          }}
                          className={
                           `${ activeTabBtn === ind
                              ? 'TabSelected'
                              : 'TabNonSelected'} DF AIC JCC cursorPointer`
                          }
                        >
                          {ele}
                        </Box>
                      );
                    })}
                  </TabList>
                </Box>
              </TabContext>
            </Box>

            {getStepContent(Gvalue)}

            <Box className="PoweredByBox">
              <Typography
                variant="p"
                component={"p"}
                className="PoweredByUpperText"
              >
                {data?.language === "English"
                  ? "Powered By "
                  : "Distribuído por "}
                <Image
                  src={IndxxLogo}
                  alt="INDXX Logo"
                  className="IndxxLogo poweredbylogo"
                />
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                className="PoweredByLowerText"
              >
                {data?.language === "English"
                  ? "Back-tested performance is hypothetical and has certain inherent limitations. Back-tested performance differs from live performance and is included for informational purposes only."
                  : "O desempenho do backtesting é hipotético e tem certas limitações inerentes. O desempenho back-testado difere do desempenho ao vivo e é incluído apenas para fins informativos."}
              </Typography>
            </Box>
          </Box>
        )}

        {/* ////////////////////// CHARACTERSTICS TABLE ///////////// */}
        {data ? (
          data.INDEX_CHARACTERISTICS !== null ? (
            <Box className="container StatisticsTableBox">
              <Typography className="IndivisualStatisticsHeading">
                {data?.language === "English"
                  ? "Index Characteristics"
                  : "CARACTERÍSTICAS DO ÍNDICE"}
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
                                    {item.split("_").join(" ") ===
                                      "Dividend Yield" ||
                                    item.split("_").join(" ") ===
                                      "Rendimento de dividendos" ? (
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                      >
                                        {item.split("_").join(" ")}
                                        <sup>{"*"}</sup>
                                      </StyledTableCell>
                                    ) : item.split("_").join(" ") ===
                                        "52 Week High/Low" ||
                                      item.split("_").join(" ") ===
                                        "52 semanas de alta / baixa" ? (
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                      >
                                        {item.split("_").join(" ")}
                                        <sup>{"**"}</sup>
                                      </StyledTableCell>
                                    ) : (
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                      >
                                        {item.split("_").join(" ")}
                                      </StyledTableCell>
                                    )}

                                    <StyledTableCell align="right">
                                      {ind === 2
                                        ? values[ind] == null
                                          ? "NA"
                                          : (
                                              Math.round(values[ind] * 100) /
                                              100
                                            ).toFixed(2) + "%"
                                        : values[ind]}
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
                  className="StatisticsbaseText MT9PX"
                  component={"p"}
                >
                  {data?.language === "English"
                    ? "* Trailing 12 months data for current year portfolio"
                    : "* Dados finais de 12 meses para o portfólio do ano atual"}
                </Typography>

                <Typography
                  variant="p"
                  className="StatisticsbaseText"
                  component={"p"}
                >
                  {data?.language === "English"
                    ? "** Trailing 12 months"
                    : "** 12 meses finais"}
                </Typography>
              </Box>
            </Box>
          ) : null
        ) : null}

        {/* ///////////////////////// INDEX CONSTITUENTS ///////////////////// */}
        {data ? (
          data["constituents"] !== null ? (
            <Box
              id="constituentsstable"
              className="container ConstituentsTableBox"
            >
              <Typography className="ConstituentsHeading">
                {data?.language === "English"
                  ? "Index Constituents"
                  : "Constituintes Do Índice"}
              </Typography>

              <Box className="ConstituentsTable">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        {data
                          ? data["constituents"] !== null
                            ? Object.keys(data["constituents"][0]).map(
                                (item, ind) => {
                                  if (ind === 0) {
                                    return (
                                      <StyledTableCell key={ind}>
                                        {item.split("_").join(" ")}
                                      </StyledTableCell>
                                    );
                                  } else {
                                    return (
                                      <StyledTableCell align="right" key={ind}>
                                        {item.split("_").join(" ")}
                                      </StyledTableCell>
                                    );
                                  }
                                }
                              )
                            : null
                          : null}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data
                        ? data["constituents"] !== null
                          ? data["constituents"].map((item, ind) => (
                              <StyledTableRow key={ind}>
                                {Object.values(item).map((x, i) => {
                                  if (i === 0) {
                                    return (
                                      <StyledTableCell
                                        key={i}
                                        component="th"
                                        scope="row"
                                      >
                                        {capitalizeFirstLetterOfEveryWord(
                                          x.split("_")[0]
                                        )}
                                        <sup>{x.split("_")[1]}</sup>
                                      </StyledTableCell>
                                    );
                                  } else {
                                    return (
                                      <StyledTableCell key={i} align="right">
                                        {x}
                                      </StyledTableCell>
                                    );
                                  }
                                })}
                              </StyledTableRow>
                            ))
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
                  {data.constituents_tagline !== null
                    ? "* " + data.constituents_tagline
                    : null}
                </Typography>
              </Box>
            </Box>
          ) : null
        ) : null}

        {/* ////////////////////// Statistics TABLE ///////////// */}
        {data ? (
          data["INDEX_RISK_AND_RETURN_STATISTICS"] !== null ? (
            <Box className="container StatisticsTableBox">
              <Typography className="IndivisualStatisticsHeading">
                {data?.language === "English"
                  ? "Index Risk & Return Statistics"
                  : "RISCO DE ÍNDICE E ESTATÍSTICAS DE RETORNO"}
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
                                if (ind === 0) {
                                  return (
                                    <StyledTableCell key={ind}>
                                      {item.split("_").join(" ")}
                                    </StyledTableCell>
                                  );
                                } else {
                                  return (
                                    <StyledTableCell align="right" key={ind}>
                                      {item.split("_").join(" ")}
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
                                    if (i === 0) {
                                      return (
                                        <StyledTableCell
                                          key={i}
                                          component="th"
                                          scope="row"
                                        >
                                          {x.split("_")[0]}
                                          <sup>{x.split("_")[1]}</sup>
                                        </StyledTableCell>
                                      );
                                    } else {
                                      if (
                                        item.Statistic === "Beta_1" ||
                                        item.Statistic === "Correlation_1" ||
                                        item.Statistic === "Correlação_1"
                                      ) {
                                        return (
                                          <StyledTableCell
                                            key={i}
                                            align="right"
                                          >
                                            {x === "NA"
                                              ? x
                                              : x == null
                                              ? "NA"
                                              : x}
                                          </StyledTableCell>
                                        );
                                      } else {
                                        return (
                                          <StyledTableCell align="right" key={i}>
                                            {x === "NA"
                                              ? x
                                              : x == null
                                              ? "NA"
                                              : x + "%"}
                                          </StyledTableCell>
                                        );
                                      }
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
                  1. W.R.T.: {secondGraphTitle}{" "}
                  {secondGraphTitle !== "" ? indexType : ""}
                </Typography>

                <Typography
                  variant="p"
                  className="StatisticsbaseText"
                  component={"p"}
                >
                  {data?.language === "English"
                    ? "2. As of last trading day."
                    : "2. No último dia de negociação."}
                </Typography>
              </Box>
            </Box>
          ) : null
        ) : null}
      </Box>

      {/* loader */}
      {setTimeOutLoader || loader ? <Loader /> : ""}
    </>
  );
}
