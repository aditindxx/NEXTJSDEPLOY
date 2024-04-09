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
import { Box, Button, Typography, TextField, Checkbox } from "@mui/material";
import CountUp from "react-countup";
import Divider from "@/Components/Widgets/Divider";
import Loader from "@/Components/Loader/Loader";
import { usePathname, useRouter } from "next/navigation";
import AdvindxxindicesBanner from "../../Assets/Images/advindxxindicesBanner.png";
import advindxxindicespioneering1 from "../../Assets/Images/advindxxindicespioneering1.png";
import advindxxindicespioneering2 from "../../Assets/Images/advindxxindicespioneering2.png";
import advindxxindices1 from "../../Assets/Images/advindxxindices1.png";
import advindxxindices2 from "../../Assets/Images/advindxxindices2.png";
import advindxxindices3 from "../../Assets/Images/advindxxindices3.png";
import advindxxindices4 from "../../Assets/Images/advindxxindices4.png";
import advindxxindices5 from "../../Assets/Images/advindxxindices5.png";
import Link from "next/link";
import Callback from "@/Components/Callback/Callback";
import DOMPurify from "dompurify";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Advindxxindices() {
  const [expData, setExpData] = useState([]);
  const [seoData, setSeoData] = useState("");
  const [clientData, setClientsData] = useState([]);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [loader3, setLoader3] = useState(true);
  const [hovered, setHovered] = useState(-1);
  const [insideblueboxhovered, setinsideblueboxhovered] = useState(-1);
  const getintouchref = useRef();
  const pathname = usePathname();
  const router = useRouter();
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
          className="advindxxindicesbannerimg DF AIC JCC"
          sx={{
            backgroundImage: `url(${AdvindxxindicesBanner.src})`,
          }}
        >
          <div
            className={`DF FFC AIC`}
            data-aos-delay="2250"
            data-aos="zoom-out"
          >
            <Typography
              variant={"h2"}
              className="advindxxindicesbannerimgheading TAC"
            >
              {"Shaping Markets Through Unique Indices"}
            </Typography>
            <Typography variant="" className="advindxxindicesbannerimgdesc TAC">
              {
                "Discover a realm of possibilities as Indxx's proprietary indices redefine norms, propelling strategies into"
              }{" "}
              <br /> {"uncharted territories."}
            </Typography>
            <Box className="DF FGrow1AllItem JCSB AIFS MT60 smallMobAIC smallMobFFC reactCountExperience W90">
              <Box className="DF FFC AIC TAC smallMobFFR mobJCC AIStretch">
                <Typography
                  variant=""
                  className="advindxxindicescalculationcount smallMobTAE expTextBox"
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
                  className="advindxxindicescountText smallMobTAL PL1 PR1 expTextBox"
                >
                  Years of Expertise
                </Typography>
              </Box>
              <Box className="BLResp2 BRResp2 DF FFC AIC PL1 PR1 TAC smallMobFFR mobJCC AIStretch">
                <Typography
                  variant=""
                  className="advindxxindicescalculationcount smallMobTAE expTextBox"
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
                  className="advindxxindicescountText smallMobTAL PB30 mobPB0  PL1 PR1 expTextBox"
                >
                  {"Products"} <br /> {"$20 bn+ AUM"}
                </Typography>
              </Box>

              <Box className="DF FFC AIC PL1 PR1 TAC smallMobFFR mobJCC AIStretch">
                <Typography
                  variant=""
                  className="advindxxindicescalculationcount smallMobTAE expTextBox"
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
                  className="advindxxindicescountText smallMobTAL PL1 PR1 expTextBox"
                >
                  {"Global Awards"} <br /> {"& Recognitions"}
                </Typography>
              </Box>
            </Box>
          </div>
        </Box>

        {/* First Section */}
        <Box className="advindxxindicesfirstsection">
          <div className="container" data-aos="fade-up">
            <Box
              component={"div"}
              className=" DF Fgap27 mobAIC verySmallMobMT30 smallMobFFC"
            >
              <Box className="advindxxindicesfirstsectiontextbox DF FFC JCC">
                <Typography className="firstsectionheading">
                  Futuristic indices that mirror market dynamics in real time.
                </Typography>
                <Typography className="advindxxindicesfirstsectiondesc">
                  {"Indxx Indices represent a lineage of exclusivity."}
                  <br />
                  <br />
                  {
                    "Our product development team continuously evaluates the overall macro-economic conditions to identify potential investment opportunities and then develops unique index strategies"
                  }
                  <br />
                  <br />
                  {
                    "We build a variety of indices, including thematic, factor-based, multi-asset, leveraged and ESG, to name a few. Once developed, they are made available for licensing as fund benchmarks or ETF benchmarks."
                  }
                </Typography>
              </Box>

              <Callback />
            </Box>
          </div>
        </Box>

        {/* Development Process Box */}
        <Box className="advindxxindicesDevopmentBox">
          <Box className="container">
            <Box className="DF FFC AIC">
              <Typography className="calculationdevelopmentheading">
                {"Unlocking potential through indices that"}
              </Typography>
              <Typography className="calculationdevelopmentheading">
                {"capture tomorrow's trends today."}
              </Typography>
            </Box>
            <Divider
              classes={`MT35 MB35 smallMobMT25 smallMobMB10`}
              colorOne={"#395FD2"}
              colorTwo={"#ED3125"}
            />
            <Typography className="TAC advindxxindicesdevelopmenttext">
              {"Here’s how we develop our unique indices."}
            </Typography>

            <Box className="IndustryComponents MT60 DF FWW JCSB smallMobFFC">
              <Box
                className="advindxxindicesdevelopmentOuterBox boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(1)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="advindxxindicesdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={advindxxindices1}
                    alt="img"
                    className="advindxxindicesdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advindxxindicesdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Idea Generation"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advindxxindicesdevelopmentComponentInnerBoxTopText PT20 MA"
                  >
                    {
                      "Our team conducts research studies to identify investment opportunities across all sectors. Each idea is further evaluated to determine the investment thesis that offers a promising growth outlook."
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
                className="advindxxindicesdevelopmentOuterBox boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(2)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="advindxxindicesdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={advindxxindices2}
                    alt="img"
                    className="advindxxindicesdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advindxxindicesdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Index Creation"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advindxxindicesdevelopmentComponentInnerBoxTopText PT20 MA"
                  >
                    {
                      "Once the index concept is finalized, our product development team designs a unique framework to capture the underlying strategy in the most efficient way. We run historical simulations and conduct a competitive analysis to ensure that our indices are of superior quality."
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
                className="advindxxindicesdevelopmentOuterBox boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(3)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="advindxxindicesdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={advindxxindices3}
                    alt="img"
                    className="advindxxindicesdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advindxxindicesdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Index Enhancements"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advindxxindicesdevelopmentComponentInnerBoxTopText PT20 MA"
                  >
                    {
                      "We then approach our clients with these unique individual indices, or families of indices, for them to license for passive products. Based on a client’s request (if any), these indices may undergo additional changes to meet their investment needs."
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
            </Box>

            <Box className="IndustryComponents DF FWW JCC smallMobFFC">
              <Box
                className="advindxxindicesdevelopmentOuterBoxmr2   boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(4)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="advindxxindicesdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={advindxxindices4}
                    alt="img"
                    className="advindxxindicesdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advindxxindicesdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Index Licensing"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advindxxindicesdevelopmentComponentInnerBoxTopText PT20 MA"
                  >
                    {
                      "After enhancements (if any) the index is licensed to the client. Examples of our Indxx Indices include the Indxx Supply Chain Innovation Index, Indxx Blockchain Index, Indxx US Inflation Protected Stocks Index, Indxx Global Tactical Managed Risk Index, and Indxx Disruptive Technologies Index, which are built on a rule-based methodology approach."
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

              <Box
                className="advindxxindicesdevelopmentOuterBox boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(5)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="advindxxindicesdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={advindxxindices5}
                    alt="img"
                    className="advindxxindicesdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advindxxindicesdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Index Administration & Management"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advindxxindicesdevelopmentComponentInnerBoxTopText PT20 MA"
                  >
                    {
                      "After the index is licensed, our team sets up, calculates, and maintains the index on a periodic basis as per the methodology. We also incorporate any relevant corporate action and changes to the index."
                    }
                  </Typography>
                </Box>
                <Box
                  className="IndustryInnerBoxBottom"
                  sx={{
                    bgcolor: `${hovered === 5 ? "#395FD2" : "white"}`,
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

        {/* Blue Box */}
        <Box className="advindxxindicesbluebox">
          <Box className="container fade-in">
            <Box className="DF FFC AIC">
              <Typography className="advindxxindicesblueboxheading">
                Types Of Indices Offered
              </Typography>
            </Box>
            <Divider
              classes={`MT35 MB35 smallMobMT25 smallMobMB10`}
              colorOne={"white"}
              colorTwo={"#ED3125"}
            />

            <Box className=" DF FWW JCSB smallMobFFC">
              <Box
                className={`${
                  insideblueboxhovered === 1
                    ? "advindxxindicesofferedboxhovered1"
                    : "advindxxindicesofferedbox"
                }  smallMobW100 cursorPointer`}
                onMouseEnter={() => setinsideblueboxhovered(1)}
                onMouseLeave={() => setinsideblueboxhovered(-1)}
              >
                <Link
                  href={"/indices/benchmark-indices"}
                  className={`${
                    insideblueboxhovered === 1
                      ? "advindxxindicesofferedboxtexthovered"
                      : "advindxxindicesofferedboxtext"
                  }`}
                >
                  {"Benchmark Indices"}
                </Link>
              </Box>
              <Box
                className={`${
                  insideblueboxhovered === 6
                    ? "advindxxindicesofferedboxhovered6"
                    : "advindxxindicesofferedbox"
                }  smallMobW100 cursorPointer`}
                onMouseEnter={() => setinsideblueboxhovered(6)}
                onMouseLeave={() => setinsideblueboxhovered(-1)}
              >
                <Link
                  href={"/indices/digital-asset-indices"}
                  className={`${
                    insideblueboxhovered === 6
                      ? "advindxxindicesofferedboxtexthovered"
                      : "advindxxindicesofferedboxtext"
                  }`}
                >
                  {"Digital Asset Indices"}
                </Link>
              </Box>

              <Box
                className={`${
                  insideblueboxhovered === 2
                    ? "advindxxindicesofferedboxhovered2"
                    : "advindxxindicesofferedbox"
                }  smallMobW100 cursorPointer`}
                onMouseEnter={() => setinsideblueboxhovered(2)}
                onMouseLeave={() => setinsideblueboxhovered(-1)}
              >
                <Link
                  href={"/indices/esg-indices"}
                  className={`${
                    insideblueboxhovered === 2
                      ? "advindxxindicesofferedboxtexthovered"
                      : "advindxxindicesofferedboxtext"
                  }`}
                >
                  {"ESG Indices"}
                </Link>
              </Box>

              <Box
                className={`${
                  insideblueboxhovered === 3
                    ? "advindxxindicesofferedboxhovered3"
                    : "advindxxindicesofferedbox"
                }  smallMobW100 cursorPointer`}
                onMouseEnter={() => setinsideblueboxhovered(3)}
                onMouseLeave={() => setinsideblueboxhovered(-1)}
              >
                <Link
                  href={"/indices/income-indices"}
                  className={`${
                    insideblueboxhovered === 3
                      ? "advindxxindicesofferedboxtexthovered"
                      : "advindxxindicesofferedboxtext"
                  }`}
                >
                  {"Income Indices"}
                </Link>
              </Box>

              <Box
                className={`${
                  insideblueboxhovered === 4
                    ? "advindxxindicesofferedboxhovered4"
                    : "advindxxindicesofferedbox"
                }  smallMobW100 cursorPointer`}
                onMouseEnter={() => setinsideblueboxhovered(4)}
                onMouseLeave={() => setinsideblueboxhovered(-1)}
              >
                <Link
                  href={"/indices/strategy-indices"}
                  className={`${
                    insideblueboxhovered === 4
                      ? "advindxxindicesofferedboxtexthovered"
                      : "advindxxindicesofferedboxtext"
                  }`}
                >
                  {"Strategy Indices"}
                </Link>
              </Box>

              <Box
                className={`${
                  insideblueboxhovered === 5
                    ? "advindxxindicesofferedboxhovered5"
                    : "advindxxindicesofferedbox"
                }  smallMobW100 cursorPointer`}
                onMouseEnter={() => setinsideblueboxhovered(5)}
                onMouseLeave={() => setinsideblueboxhovered(-1)}
              >
                <Link
                  href={"/indices/thematic-indices"}
                  className={`${
                    insideblueboxhovered === 5
                      ? "advindxxindicesofferedboxtexthovered"
                      : "advindxxindicesofferedboxtext"
                  }`}
                >
                  {"Thematic Indices"}
                </Link>
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

        {/* Unveiling Value */}
        <div className="container PT60 mobPT0 PB60 zoom-out">
          <Box className="DF FFC AIC">
            <Typography className="calculationdevelopmentheading TAC">
              {"About Indxx - Pioneering a new era in indices"}
            </Typography>
            <Typography className="calculationdevelopmentheading TAC">
              {"with unparalleled innovations."}
            </Typography>

            <Typography className="TAC advindxxindicesdevelopmenttext MB35 MT20">
              {
                "Founded in 2005 and with offices in Miami, New York, and multiple locations in India, Indxx is a leading index provider delivering innovative solutions to the investment management community at large. These range from end-to end indexing services to data and technology products. Indxx and products tracking its indices have been nominated for and received numerous awards."
              }
            </Typography>
          </Box>

          <Divider
            classes={`MT35 MB35 smallMobMT25 smallMobMB10`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />

          <Box className="DF">
            <Box className="advindxxindicesboxtext DF FFC JCC">
              <Typography className="advindxxindicesboxtextheading MB10">
                CAPTURING HIGH GROWTH POTENTIAL IDEAS
              </Typography>
              <Typography className="advindxxindicesboxtextdesc">
                {
                  "Indxx has an established reputation for developing novel ideas. We are a pioneer in identifying long-term investment trends and bringing innovative strategies to the market in a timely manner."
                }
                <br />
                <br />
                {
                  "Our Indxx Indices are developed to capture ideas (such as themes and strategies) that have a promising outlook. Our in-depth research allows us to identify investable themes or ideas that can be transformed into innovative index solutions that deliver excellent performances."
                }
              </Typography>
            </Box>

            <Image
              src={advindxxindicespioneering1}
              alt="map"
              className="advindxxindicesboximage"
            />
          </Box>

          <Box className="DF">
            <Image
              src={advindxxindicespioneering2}
              alt="map"
              className="advindxxindicesboximage2"
            />
            <Box className="advindxxindicesboxtext DF FFC JCC">
              <Typography className="advindxxindicesboxtextheading MB10">
                CONTINUOUS MANAGEMENT
              </Typography>
              <Typography className="advindxxindicesboxtextdesc">
                {
                  "Our indices undergo annual methodology reviews to ensure the focus of the index is always consistent with changing times. We do this with the intent of capturing the evolving nature of the thematic trend in our pursuit of fitting representation, adding/redefining themes as required."
                }
              </Typography>
              <Button
                className="advindxxindicesgetintouchbtnpioneer"
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
        </div>

        {/* Clients */}
        <Box className="container PT60 mobPT0 PB60 fade-in">
          <Box className="DF FFC AIC">
            <Typography className="calculationdevelopmentheading">
              Our Clients
            </Typography>
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
        {loader2 || loader3 || setTimeOutLoader ? <Loader /> : ""}
      </Box>
    </>
  );
}
