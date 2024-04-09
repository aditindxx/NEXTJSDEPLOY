"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getMethodApi, postMethodApi } from "@/Utils/Methods";
import {
  GET_CONFIG,
  GET_LICENCED_CLIENTS,
  POST_CONTACT_US,
} from "@/Apis/EndPoints";
import { toast } from "react-toastify";
import ReCaptchaV2 from "react-google-recaptcha";
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
} from "@mui/material";
// import CountUp from "react-countup/build/CountUp";
import CountUp from "react-countup";
import Divider from "@/Components/Widgets/Divider";
import Loader from "@/Components/Loader/Loader";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import { useRouter } from 'next/router'
import { usePathname, useRouter } from "next/navigation";
import AdvcalculationBanner from "../../Assets/Images/advcalculationBanner.jpg";
import calculationaboutimg from "../../Assets/Images/calculationaboutimg.png";
import calculation1 from "../../Assets/Images/calculation1.png";
import calculation2 from "../../Assets/Images/calculation2.png";
import calculation3 from "../../Assets/Images/calculation3.png";
import calculation4 from "../../Assets/Images/calculation4.png";
import calculationdevelopment1 from "../../Assets/Images/calculationdevelopment1.png";
import calculationdevelopment2 from "../../Assets/Images/calculationdevelopment2.png";
import calculationdevelopment3 from "../../Assets/Images/calculationdevelopment3.png";
import calculationdevelopment4 from "../../Assets/Images/calculationdevelopment4.png";
import Link from "next/link";
import Callback from "@/Components/Callback/Callback";
import DOMPurify from "dompurify";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Advcalculation() {
  const [expData, setExpData] = useState([]);
  const [seoData, setSeoData] = useState("");
  const [clientData, setClientsData] = useState([]);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [loader3, setLoader3] = useState(true);
  const [hovered, setHovered] = useState(-1);
  const getintouchref = useRef();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedbtn, setselectedbtn] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    Company: "",
    Email: "",
    Message: "",
    Phone: "",
    ip_address: "",
    checkboxCookie: false,
    page_name: pathname?.split("/")?.slice(-1)[0],
  });

  useEffect(() => {
    getMethodApi(GET_CONFIG).then((response) => {
      if (response.status === 200) {
        setSeoData(response?.data);
        setExpData(response.data["About Us"]);
        setLoader2(false);
      }
    });
    getMethodApi(GET_LICENCED_CLIENTS).then((response) => {
      if (response.status === 200) {
        setClientsData(response.data);
        setLoader3(false);
      }
    });

    setTimeout(() => {
      setSetTimeOutLoader(false);
      AOS.refresh();
    }, 2000);
  }, []);

  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      // attributes-
      offset: 0,
      delay: 0,
      duration: 1000,
      easing: "ease",
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  const handleChange = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setContactInfo({
      ...contactInfo,
      [event.target.name]: sanitizedValue,
    });
  };

  const createContactInfo = () => {
    contactInfo.ip_address = localStorage.getItem("IPAddress");

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

    if (contactInfo.Message.trim() === "") {
      toast.error("Message is required !!");
      return;
    }

    if (
      contactInfo.checkboxCookie === "" ||
      contactInfo.checkboxCookie === undefined ||
      contactInfo.checkboxCookie === false
    ) {
      toast.error("Please accept Terms of Usage !!");
      return;
    }

    // if(isCaptchaVerified == false){
    //   toast.error("Please verify Captcha");
    //   return;
    // }

    postMethodApi(POST_CONTACT_US, contactInfo)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Contact Information is sent !!");
          // console.log(contactInfo);
          router.push("/thank-you");
          setContactInfo({
            name: "",
            Company: "",
            Email: "",
            Phone: "",
            Message: "",
            ip_address: "",
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const zoomOutElements = typeof document !== 'undefined' && document.querySelectorAll(".zoom-out");
    const fadeInElements = typeof document !== 'undefined' && document.querySelectorAll(".fade-in");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
        // else {
        //   entry.target.classList.remove("show");
        // }
      });
    });
  
    fadeInElements.forEach((element) => {
      observer.observe(element);
    });
    zoomOutElements.forEach((element) => {
      observer.observe(element);
    });
  }, [])

  return (
    <>
      {/* Seo */}

      <title>
        {seoData?.meta_title
          ? seoData.meta_title[0].value
          : "Indxx - Indexing Redefined"}
      </title>
      <link
        rel="canonical"
        href={`https://www.indxx.com${pathname}`}
        key="canonical"
      />
      <meta
        name="description"
        content={
          seoData?.meta_description
            ? seoData.meta_description[0].value
            : "Indxx is a leading global index provider, offering end to end indexing solutions, including index development, index maintenance, and index calculation. Our experienced indexing experts work closely with our clients to build custom index solutions tailored to their needs. Indxx and products tracking our indices have been nominated for and received numerous awards."
        }
      />
      <meta
        name="keywords"
        content={
          seoData?.meta_keywords
            ? seoData.meta_keywords[0].value
            : "Index Services,Index Development,Index Provider,Index Maintenance,Index Calculation"
        }
      />

      <Box className="MB120">
        <Box
          className="advcalculationbannerimg DF AIC JCC"
          sx={{
            backgroundImage: `url(${AdvcalculationBanner.src})`,
          }}
        >
          <div
            className={`DF FFC AIC`}
            data-aos-delay="2250"
            data-aos="zoom-out"
          >
            <Typography
              variant={"h2"}
              className="advcalculationbannerimgheading TAC"
            >
              {"Empowering Your Strategies: Index"}
              <br />
              {" Calculation and Administration Expertise"}
            </Typography>
            <Typography variant="" className="advcalculationbannerimgdesc TAC">
              {
                "Unlock precision and maximize returns with our customized solutions,"
              }{" "}
              <br /> {"exclusively designed for your vision."}
            </Typography>
            <Box className="DF FGrow1AllItem JCSB AIFS MT60 smallMobAIC smallMobFFC reactCountExperience W90">
              <Box className="DF FFC AIC TAC smallMobFFR mobJCC AIStretch">
                <Typography
                  variant=""
                  className="calculationcount smallMobTAE expTextBox"
                >
                  {" "}
                  <CountUp
                    start={0}
                    end={expData
                      ?.filter((ele) => ele.value === "YEARS")
                      ?.map((filterValue) => filterValue.description)}
                    duration={6}
                  />
                  +
                </Typography>
                <Typography
                  variant=""
                  className="calculationcountText smallMobTAL PL1 PR1 expTextBox"
                >
                  Years of Expertise
                </Typography>
              </Box>
              <Box className="BLResp2 BRResp2 DF FFC AIC PL1 PR1 TAC smallMobFFR mobJCC AIStretch">
                <Typography
                  variant=""
                  className="calculationcount smallMobTAE expTextBox"
                >
                  {" "}
                  <CountUp
                    start={0}
                    end={expData
                      ?.filter((ele) => ele.value === "PRODUCTS")
                      ?.map((filterValue) => filterValue.description)}
                    duration={5}
                  />
                  +
                </Typography>
                <Typography
                  variant=""
                  className="calculationcountText smallMobTAL PB30 mobPB0  PL1 PR1 expTextBox"
                >
                  {"Products"} <br /> {"$20 bn+ AUM"}
                </Typography>
              </Box>

              <Box className="DF FFC AIC PL1 PR1 TAC smallMobFFR mobJCC AIStretch">
                <Typography
                  variant=""
                  className="calculationcount smallMobTAE expTextBox"
                >
                  <CountUp
                    start={0}
                    end={expData
                      ?.filter((ele) => ele.value === "AWARDS")
                      ?.map((filterValue) => filterValue.description)}
                    duration={6}
                  />
                  +
                </Typography>
                <Typography
                  variant=""
                  className="calculationcountText smallMobTAL PL1 PR1 expTextBox"
                >
                  {"Global Awards"} <br /> {"& Recognitions"}
                </Typography>
              </Box>
            </Box>
          </div>
        </Box>

        {/* First Section */}
        <Box className="calculationfirstsection">
          <div className="container" data-aos="fade-up">
            <Box
              component={"div"}
              className=" DF Fgap27 mobAIC verySmallMobMT30 smallMobFFC"
            >
              <Box className="calculationfirstsectiontextbox DF FFC JCC">
                <Typography className="firstsectionheading">
                  Transforming Indices into Actionable Insights for You
                </Typography>
                <Typography className="firstsectiondesc">
                  Streamline your index management needs with our Equity Basket
                  Calculation service. We offer comprehensive solutions,
                  including independent backtesting, meticulous index
                  administration, and precise index calculation. With a robust
                  rules-based approach, transparency, and timely data delivery,
                  we manage over 500 indices and uphold a reputation for
                  excellence.
                </Typography>
              </Box>

              <Callback />
            </Box>
          </div>
        </Box>

        {/* Development Process Box */}
        <Box className="calculationDevopmentBox">
          <Box className="container">
            <Box className="DF FFC AIC">
              <Typography className="calculationdevelopmentheading">
                Our Index Development Process
              </Typography>
            </Box>
            <Divider
              classes={`MT35 MB35 smallMobMT25 smallMobMB10`}
              colorOne={"#395FD2"}
              colorTwo={"#ED3125"}
            />
            <Typography className="TAC calculationdevelopmenttext">
              {
                "Unlock your index vision with our tailored solutions. Share your exact requirements, and our expert"
              }
              <br />
              {
                "team will code, build, and backtest your index, bringing your vision to life."
              }
            </Typography>

            <Box className="IndustryComponents MT60 DF FWW JCSB smallMobFFC">
              <Box
                className="calculationdevelopmentOuterBox boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(1)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="calculationdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={calculationdevelopment1}
                    alt="img"
                    className="calculationdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="calculationdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Client Request"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="calculationdevelopmentComponentInnerBoxTopText PT20 MA"
                  >
                    {
                      "The client requests Indxx to build an index and provides detailed instructions by filling in a template shared by us."
                    }
                  </Typography>
                </Box>
                <Box
                  className="IndustryInnerBoxBottom"
                  sx={{
                    bgcolor: `${hovered === 1 ? "#395FD2" : "white"}`,
                  }}
                ></Box>
              </Box>

              <Box
                className="calculationdevelopmentOuterBox boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(2)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="calculationdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={calculationdevelopment2}
                    alt="img"
                    className="calculationdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="calculationdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Index Creation"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="calculationdevelopmentComponentInnerBoxTopText PT20 MA"
                  >
                    {
                      "We construct indices to meet specific client requirements, applying investability and liquidity criteria along with a set of pre-defined constraints."
                    }
                    <br />
                    <br />
                    {
                      "In the case of thematic indices, our client indices team conducts extensive research on the themes and the companies prior to their inclusion."
                    }
                  </Typography>
                </Box>
                <Box
                  className="IndustryInnerBoxBottom"
                  sx={{
                    bgcolor: `${hovered === 2 ? "#395FD2" : "white"}`,
                  }}
                ></Box>
              </Box>

              <Box
                className="calculationdevelopmentOuterBox boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(3)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="calculationdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={calculationdevelopment3}
                    alt="img"
                    className="calculationdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="calculationdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Backtest Simulation"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="calculationdevelopmentComponentInnerBoxTopText PT20 MA"
                  >
                    {
                      "We test our approach through historical back-tests (based on the client’s instructions) and optimize client strategy in the best way. The variations may include the below: Weighting Scheme, Selection Criteria, Rebalancing and Reconstitution."
                    }
                  </Typography>
                </Box>
                <Box
                  className="IndustryInnerBoxBottom"
                  sx={{
                    bgcolor: `${hovered === 3 ? "#395FD2" : "white"}`,
                  }}
                ></Box>
              </Box>

              <Box
                className="calculationdevelopmentOuterBox boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(4)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="calculationdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={calculationdevelopment4}
                    alt="img"
                    className="calculationdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="calculationdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Index Administration & Management"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="calculationdevelopmentComponentInnerBoxTopText PT20 MA"
                  >
                    {
                      "After the index is licensed, our team sets up, calculates, and maintains the index on a periodic basis as per the methodology. We also incorporate any relevant corporate action and changes to the index."
                    }
                  </Typography>
                </Box>
                <Box
                  className="IndustryInnerBoxBottom"
                  sx={{
                    bgcolor: `${hovered === 4 ? "#395FD2" : "white"}`,
                  }}
                ></Box>
              </Box>
            </Box>

            <Button
              className="advcadmingetintouchbtn"
              onClick={() =>
                getintouchref.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "center",
                })
              }
            >
              {"Get In Touch"}
            </Button>
          </Box>
        </Box>

        {/* Equity Basket Calculation Box */}
        <Box className="container MT60">
          <Box className="DF FFC AIC">
            <Typography className="calculationquityheading">
              Equity Basket Calculation
            </Typography>
          </Box>
          <Divider
            classes={`MT35 MB35 smallMobMT25 smallMobMB10`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />
          <Typography className="TAC calculationequitytext">
            A simple, one-stop solution to all the index calculation,
            management, and administration needs of our clients.
          </Typography>

          <Box className="DF smallMobFFC">
            <button
              className={`DF AIC ${
                selectedbtn == 1
                  ? `calculationequitybtnactive`
                  : `calculationequitybtn`
              }`}
              onClick={() => setselectedbtn(1)}
            >
              {selectedbtn === 1 ? (
                <ArrowDownwardIcon className="MR10" />
              ) : (
                <ArrowRightAltIcon className="MR10" />
              )}
              INDEX BACKTEST
            </button>
            <button
              className={`DF AIC ${
                selectedbtn == 2
                  ? `calculationequitybtnactive`
                  : `calculationequitybtn`
              }`}
              onClick={() => setselectedbtn(2)}
            >
              {selectedbtn === 2 ? (
                <ArrowDownwardIcon className="MR10" />
              ) : (
                <ArrowRightAltIcon className="MR10" />
              )}
              INDEX MANAGEMENT
            </button>
            <button
              className={`DF AIC ${
                selectedbtn == 3
                  ? `calculationequitybtnactive`
                  : `calculationequitybtn`
              }`}
              onClick={() => setselectedbtn(3)}
            >
              {selectedbtn === 3 ? (
                <ArrowDownwardIcon className="MR10" />
              ) : (
                <ArrowRightAltIcon className="MR10" />
              )}
              INDEX CALCULATION
            </button>
            <button
              className={`DF AIC ${
                selectedbtn == 4
                  ? `calculationequitybtnactive`
                  : `calculationequitybtn`
              }`}
              onClick={() => setselectedbtn(4)}
            >
              {selectedbtn === 4 ? (
                <ArrowDownwardIcon className="MR10" />
              ) : (
                <ArrowRightAltIcon className="MR10" />
              )}
              INDEX DISSEMINATION
            </button>
          </Box>

          {selectedbtn == 1 ? (
            <Typography className="calculationequitydesc">
              Our independent standard backtests evaluate index strategies over
              extended timeframes. We excel in diverse asset classes, including
              equities and income, along with thematic, tactical, and income
              strategies. Collaboratively, we enhance methodologies and optimize
              strategies to align with the current investment landscape.
            </Typography>
          ) : selectedbtn == 2 ? (
            <Typography className="calculationequitydesc">
              Our comprehensive index management and administration services
              encompass independent rebalance, review, reconstitution, and
              benchmark administration. Working in close partnership with
              clients, we vigilantly track corporate events and announcements.
              Our rule-based approach ensures transparency with publicly
              available index rules, constituents, and data.
            </Typography>
          ) : selectedbtn == 3 ? (
            <Typography className="calculationequitydesc">
              <p className="MB1">
                We offer index calculations at your preferred frequency:
              </p>
              <ul className="MB1 ML2">
                <li>
                  <b>Real-time Index Calculation:</b> Values calculated and
                  delivered every 15 seconds.
                </li>
                <li>
                  <b>End-of-Day Index Calculation:</b> Values calculated and
                  delivered at market close.
                </li>
              </ul>
              <span>
                Our vigilant oversight manages the risk and complexities of
                various corporate actions. Robust governance frameworks
                guarantee the delivery of high-quality data to our clients.
              </span>
              <br />
              <br />
              <span>
                Learn more about{" "}
                <Link
                  className="colorBlue cursorPointer TDN"
                  target="_blank"
                  href={
                    "https://indxxfiles.s3.amazonaws.com/Indxx_Calculation_Standard_Guidelines_Document.pdf"
                  }
                >
                  Indxx Standard Calculation Guidelines
                </Link>
              </span>
            </Typography>
          ) : selectedbtn == 4 ? (
            <Typography className="calculationequitydesc">
              <span>
                Timely index-related notifications are our commitment. Index
                values, daily opening and closing files, and corporate action
                announcements are tailored to your desired format. Accessible
                through a range of platforms, including FTP servers, Exchange
                Tapes, and multiple global data vendors, we ensure that you have
                your data where you need it.
              </span>
              <br />
              <br />
              <span>
                You can opt for multiple services to suit your needs, including
                custom factsheets and webpages for your client indices.
              </span>
            </Typography>
          ) : null}
        </Box>

        {/* About Box */}
        <Box className={"calculationbluebox MT60 MB60 mobMT0 mobMB0"}>
          <div
            className="container fade-in"
            // data-aos="fade"
            // data-aos-anchor-placement="top-bottom"
            >
            <Box className="DF FFC AIC">
              <Typography className="calculationaboutindxx">
                About Indxx
              </Typography>
            </Box>
            <Divider
              classes={`MT35 MB35 smallMobMT25 smallMobMB10`}
              colorOne={"white"}
              colorTwo={"#ED3125"}
            />
            <Box className="DF smallMobFFC">
              <Box className="calculationaboutimageboxouter">
                <Image
                  src={calculationaboutimg}
                  alt="img"
                  className="calculationaboutimg"
                />
              </Box>
              <Box className="DF FFC JCC calculationabouttextbox">
                <Typography className="advcadminabouttextboxheading">
                  Pioneering a new era in indices with unparalleled innovations.
                </Typography>
                <Typography className="advcadminabouttextboxdesc">
                  Founded in 2005 and with offices in Miami, New York, and
                  multiple locations in India, Indxx is a leading index provider
                  delivering innovative solutions to the investment management
                  community at large. These range from end-to end indexing
                  services to data and technology products. Indxx and products
                  tracking its indices have been nominated for and received
                  numerous awards.
                </Typography>
              </Box>
            </Box>
          </div>
        </Box>

        {/* Unveiling Value */}
        <div className="container PT60 mobPT0 PB60 zoom-out">
          <Box className="DF FFC AIC">
            <Typography className="ourclients">
              Unveiling Value: Our Customized Edge
            </Typography>
          </Box>
          <Divider
            classes={`MT35 MB35 smallMobMT25 smallMobMB10`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />

          <Box className="DF">
            <Box className="calculationboxtext DF FFC JCC">
              <Typography className="calculationboxtextheading">
                SPEED
              </Typography>
              <Typography className="calculationboxtextdesc">
                Clients can count on us to allow them to get indices up and
                running quickly. Development times typically take between 2-3
                weeks from starting the process to go-live.
              </Typography>
            </Box>

            <Image
              src={calculation1}
              alt="map"
              className="calculationboximage"
            />
          </Box>

          <Box className="DF">
            <Image
              src={calculation2}
              alt="map"
              className="calculationboximage2"
            />
            <Box className="calculationboxtext DF FFC JCC">
              <Typography className="calculationboxtextheading">
                QUALITY
              </Typography>
              <Typography className="calculationboxtextdesc">
                Client Indices follow a research-focused product development
                process, creating a range of indices depending on the client’s
                needs. Our experienced team brings in their domain expertise and
                programming skills to deliver timely and cost-effective
                solutions to clients.
              </Typography>
            </Box>
          </Box>

          <Box className="DF">
            <Box className="calculationboxtext DF FFC JCC">
              <Typography className="calculationboxtextheading">
                BROAD COVERAGE
              </Typography>
              <Typography className="calculationboxtextdesc">
                Our ability to develop differentiated indices based on size,
                sector, exchanges, unique adjustments of corporate actions and
                alternative weighting is one of our core services. We specialize
                in adapting to any client-driven requests for our index
                offerings to best reflect the idea and meet client expectations.
              </Typography>
            </Box>

            <Image
              src={calculation3}
              alt="map"
              className="calculationboximage3"
            />
          </Box>

          <Box className="DF">
            <Image
              src={calculation4}
              alt="map"
              className="calculationboximage4"
            />
            <Box className="calculationboxtext DF FFC JCC">
              <Typography className="calculationboxtextheading">
                INDEX SPECIFIC HANDLING OF CORPORATE ACTIONS
              </Typography>
              <Typography className="calculationboxtextdesc">
                Our corporate action adjustment process is distinct for each
                index and in line with the industry standard guidebook. We also
                have a provision to accommodate any special corporate action
                adjustments that our clients may require.
              </Typography>
            </Box>
          </Box>
        </div>

        {/* Clients */}
        <Box className="container PT60 mobPT0 PB60 fade-in">
          <Box className="DF FFC AIC">
            <Typography className="ourclients">Our Clients</Typography>
          </Box>
          <Divider
            classes={`MT35 MB35 smallMobMT25 smallMobMB10`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />

          <Box className="DF clientIconContainer">
            {clientData?.map((ele, ind) => {
              if (ind < 15) {
                return (
                  <Box
                    key={ind}
                    sx={{
                      pl: 1,
                      pr: 1,
                      mt: 1,
                    }}
                    className={`${
                      (ind + 1) % 5 !== 0 ? "BRResp" : ""
                    } verySmallMobBRResp verySmallMobIStretchF`}
                  >
                    <Box
                      className={`clientIcon ${
                        ind < 10 ? "BBResp" : ""
                      } verySmallMobBBResp`}
                      sx={{
                        backgroundImage: `
                    url(${ele ? ele?.Image : ""})`,
                      }}
                    ></Box>
                  </Box>
                );
              }
              return null;
            })}
          </Box>
        </Box>

        {/* Get In Touch */}
        <Box component={"div"} className="container MT5R zoom-out">
          <Box
            className="boxshadow4sides bordr10px getintouchform"
            ref={getintouchref}
          >
            <Box sx={{ p: 3.26 }}>
              <Typography variant={"h1"} className="contactusformheading TAC">
                {"Get in Touch"}
              </Typography>

              <Box className="DF JCSB smallMobFFC">
                <Box
                  sx={{ mt: 3.25, width: "65%" }}
                  className="DF JCSB FWW getintouchinputfield smallMobFFC"
                >
                  <TextField
                    name="name"
                    label="Name*"
                    className="accordionbggrey advcadmintextfieldstyle"
                    sx={{ color: "#636363" }}
                    id="linehtN"
                    size="small"
                    InputProps={{
                      style: {
                        height: "50px",
                        color: "#636363",
                      },
                    }}
                    onChange={handleChange}
                    value={contactInfo.name}
                  />

                  <TextField
                    name="Company"
                    label="Company*"
                    className="accordionbggrey advcadmintextfieldstyle"
                    sx={{ color: "#636363" }}
                    id="linehtN"
                    size="small"
                    InputProps={{
                      style: {
                        height: "50px",
                        color: "#636363",
                      },
                    }}
                    onChange={handleChange}
                    value={contactInfo.Company}
                  />

                  <TextField
                    name="Email"
                    label="Email*"
                    className="accordionbggrey advcadmintextfieldstyle"
                    sx={{ color: "#636363" }}
                    id="linehtN"
                    size="small"
                    InputProps={{
                      style: {
                        height: "50px",
                        color: "#636363",
                      },
                    }}
                    onChange={handleChange}
                    value={contactInfo.Email}
                  />

                  <TextField
                    // ref={getInTouch}
                    name="Phone"
                    label="Phone"
                    type="number"
                    className="accordionbggrey advcadmintextfieldstyle"
                    sx={{ color: "#636363" }}
                    id="linehtN"
                    size="small"
                    InputProps={{
                      style: {
                        height: "50px",
                        color: "#636363",
                      },
                    }}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 15);
                    }}
                    onChange={handleChange}
                    value={contactInfo.Phone}
                  />
                </Box>

                <TextField
                  name="Message"
                  label="Message*"
                  className="accordionbggrey advcadmintextfieldstylefull"
                  id="outlined-multiline-static linehtN"
                  multiline
                  rows={4}
                  size="small"
                  sx={{ height: 100, color: "#636363" }}
                  InputProps={{
                    style: {
                      height: "120px",
                      color: "#636363",
                    },
                  }}
                  onChange={handleChange}
                  value={contactInfo.Message}
                />
              </Box>

              <Box className="DF FFC smallMobFFC">
                <Box className="reCaptcha">
                  <ReCaptchaV2
                    sitekey={"6Ld5c_UoAAAAAHqS4gazOrVdYHcxJ6t5K-9MfKfY"}
                    // onChange={handleToken}
                    // onExpire={handleExpire}
                    className="MB20"
                  />
                </Box>

                <Box
                  component={"div"}
                  className="DF AIC MB20 verySmallMobMB10 advcadmingetintouchcheckbox"
                >
                  <Checkbox
                    style={{ padding: "2px 1rem 0px 0rem" }}
                    className=""
                    name="checkboxCookie"
                    defaultChecked={false}
                    value={contactInfo.checkboxCookie}
                    onChange={handleChange}
                  ></Checkbox>
                  <Typography className="Contactustermsofusage linehtN colorBlack">
                    {"I accept Indxx's terms of usage, acknowledge the "}
                    <Link href={"/data-privacy"} className="colorBlack">
                      {"Data Privacy"}
                    </Link>
                    {" Policy, and authorize to contact."}
                  </Typography>
                </Box>
              </Box>

              <Button
                className="advcadminsendmsgBtn mobMT20 mobMAuto linehtN"
                onClick={createContactInfo}
              >
                {"Submit"}
              </Button>
            </Box>
          </Box>
        </Box>

        {/* loader */}
        {
        loader2 ||
        loader3 ||
        setTimeOutLoader ? (
          <Loader />
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
