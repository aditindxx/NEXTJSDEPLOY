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
import AdvcustomindicesBanner from "../../Assets/Images/advcustomindicesBanner.png";
import calculationaboutimg from "../../Assets/Images/calculationaboutimg.png";
import calculation1 from "../../Assets/Images/calculation1.png";
import calculation2 from "../../Assets/Images/calculation2.png";
import calculation3 from "../../Assets/Images/calculation3.png";
import calculation4 from "../../Assets/Images/calculation4.png";
import advcustomindicesdevelopment1 from "../../Assets/Images/advcustomindices1.png";
import advcustomindicesdevelopment2 from "../../Assets/Images/advcustomindices2.png";
import advcustomindicesdevelopment3 from "../../Assets/Images/advcustomindices3.png";
import advcustomindicesdevelopment4 from "../../Assets/Images/advcustomindices4.png";
import Link from "next/link";
import Callback from "@/Components/Callback/Callback";
import DOMPurify from "dompurify";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Advcustomindices() {
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
    const zoomOutElements =
      typeof document !== "undefined" && document.querySelectorAll(".zoom-out");
    const fadeInElements =
      typeof document !== "undefined" && document.querySelectorAll(".fade-in");

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
  }, []);

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
          className="advcustomindicesbannerimg DF AIC JCC"
          sx={{
            backgroundImage: `url(${AdvcustomindicesBanner.src})`,
          }}
        >
          <div
            className={`DF FFC AIC`}
            data-aos-delay="2250"
            data-aos="zoom-out"
          >
            <Typography
              variant={"h2"}
              className="advcustomindicesbannerimgheading TAC"
            >
              {"Your Vision, Our Methodology: Crafting"}
              <br />
              {"Unique Custom Indices"}
            </Typography>
            <Typography
              variant=""
              className="advcustomindicesbannerimgdesc TAC"
            >
              {
                "From idea to index: We craft tailored index solutions for banks, ETF issuers, and AMCs worldwide."
              }
              <br />
              {
                "Experience your vision realized through our highly speciaized custom index solutions."
              }
            </Typography>
            <Box className="DF FGrow1AllItem JCSB AIFS MT60 smallMobAIC smallMobFFC reactCountExperience W90">
              <Box className="DF FFC AIC TAC smallMobFFR mobJCC AIStretch">
                <Typography
                  variant=""
                  className="advcustomindicescount smallMobTAE expTextBox MB20"
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
                  className="advcustomindicescountText smallMobTAL PL1 PR1 expTextBox"
                >
                  Years of Expertise
                </Typography>
              </Box>
              <Box className="BLResp2 BRResp2 DF FFC AIC PL1 PR1 TAC smallMobFFR mobJCC AIStretch">
                <Typography
                  variant=""
                  className="advcustomindicescount smallMobTAE expTextBox MB20"
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
                  className="advcustomindicescountText smallMobTAL PB30 mobPB0  PL1 PR1 expTextBox"
                >
                  {"Products"} <br /> {"$20 bn+ AUM"}
                </Typography>
              </Box>

              <Box className="DF FFC AIC PL1 PR1 TAC smallMobFFR mobJCC AIStretch">
                <Typography
                  variant=""
                  className="advcustomindicescount smallMobTAE expTextBox MB20"
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
                  className="advcustomindicescountText smallMobTAL PL1 PR1 expTextBox"
                >
                  {"Global Awards"} <br /> {"& Recognitions"}
                </Typography>
              </Box>
            </Box>
          </div>
        </Box>

        {/* First Section */}
        <Box className="advcustomindicesfirstsection">
          <div className="container" data-aos="fade-up">
            <Box
              component={"div"}
              className=" DF Fgap27 mobAIC verySmallMobMT30 smallMobFFC"
            >
              <Box className="advcustomindicesfirstsectiontextbox DF FFC JCC">
                <Typography className="firstsectionheading">
                  Crafting Your Edge: Tailor-Made Indices for Strategic Growth
                </Typography>
                <Typography className="advcustomindicesfirstsectiondesc">
                  Indxx Custom Indices are expertly crafted solutions, uniquely
                  tailored to client specifications. Leveraging our team&apos;s
                  extensive expertise, we facilitate the transformation of your
                  concepts into distinctive index strategies. Through rigorous
                  analysis of backtesting and data, each custom index is finely
                  tuned to capture optimal value proposition.
                </Typography>
              </Box>

              <Callback />
            </Box>
          </div>
        </Box>

        {/* Development Process Box */}
        <Box className="advcustomindicesDevopmentBox">
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
            <Typography className="TAC advcustomindicesdevelopmenttext">
              {
                "Indxx Custom Index Solutions enable clients to implement any strategy by actualizing their investment"
              }
              <br />
              {
                "concepts. Below are the key steps in our index development process:"
              }
            </Typography>

            <Box className="IndustryComponents MT60 DF FWW JCSB smallMobFFC">
              <Box
                className="advcustomindicesdevelopmentOuterBox boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(1)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="advcustomindicesdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={advcustomindicesdevelopment1}
                    alt="img"
                    className="advcustomindicesdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advcustomindicesdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Methodology Definition"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advcustomindicesdevelopmentComponentInnerBoxTopText PT20 MA"
                  >
                    {
                      "We design unique methodologies focusing on client requirements through a detailed consultative process. The research team conducts an in-depth analysis of the idea and creates a framework based on which the index creation occurs."
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
                className="advcustomindicesdevelopmentOuterBox boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(2)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="advcustomindicesdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={advcustomindicesdevelopment2}
                    alt="img"
                    className="advcustomindicesdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advcustomindicesdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Crafting Indices"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advcustomindicesdevelopmentComponentInnerBoxTopText PT20 MA"
                  >
                    {
                      "We construct indices to meet specific client requirements, applying investability and liquidity criteria along with a set of pre-defined constraints. In the case of thematic indices, our custom indices team conducts extensive research on the themes and the companies prior to their inclusion."
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
                className="advcustomindicesdevelopmentOuterBox boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(3)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="advcustomindicesdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={advcustomindicesdevelopment3}
                    alt="img"
                    className="advcustomindicesdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advcustomindicesdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Back-Testing & Performance Analysis"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advcustomindicesdevelopmentComponentInnerBoxTopText PT20 MA"
                  >
                    {
                      "We evaluate multiple screening and weighting techniques to identify the best possible framework for the underlying investment strategy. Each index strategy is assessed by running backtests and performance analysis is conducted to provide a detailed analysis of the index concept."
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
                className="advcustomindicesdevelopmentOuterBox boxshadow4sides smallMobW100"
                onMouseEnter={() => setHovered(4)}
                onMouseLeave={() => setHovered(-1)}
              >
                <Box className="advcustomindicesdevelopmentComponentInnerBoxTop ">
                  <Image
                    src={advcustomindicesdevelopment4}
                    alt="img"
                    className="advcustomindicesdevimages"
                  />
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advcustomindicesdevelopmentComponentInnerBoxTopHeading PT28 MA"
                    sx={{ color: "#395FD2" }}
                  >
                    {"Index Administration & Management"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="advcustomindicesdevelopmentComponentInnerBoxTopText PT20 MA"
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

        {/* About Box */}
        <Box className={"advcustomindicesbluebox  MB60 mobMT0 mobMB0"}>
          <div
            className="container fade-in"
            // data-aos="fade"
            // data-aos-anchor-placement="top-bottom"
          >
            <Box className="DF FFC AIC">
              <Typography className="advcustomindicesaboutindxx">
                About Indxx
              </Typography>
            </Box>
            <Divider
              classes={`MT35 MB35 smallMobMT25 smallMobMB10`}
              colorOne={"white"}
              colorTwo={"#ED3125"}
            />
            <Box className="DF smallMobFFC">
              <Box className="advcustomindicesaboutimageboxouter">
                <Image
                  src={calculationaboutimg}
                  alt="img"
                  className="advcustomindicesaboutimg"
                />
              </Box>
              <Box className="DF FFC JCC advcustomindicesabouttextbox">
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
            <Typography className="calculationdevelopmentheading">
              Unveiling Value: Our Customized Edge
            </Typography>
          </Box>
          <Divider
            classes={`MT35 MB35 smallMobMT25 smallMobMB10`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />

          <Box className="DF">
            <Box className="advcustomindicesboxtext DF FFC JCC">
              <Typography className="advcustomindicesboxtextheading MB10">
                SPEED
              </Typography>
              <Typography className="advcustomindicesboxtextdesc">
                {
                  "We build top quality, customized indices quickly, allowing our clients to get to market and launch products as soon as possible. Development times for a fully custom index typically take between 4-6 weeks from start to go-live."
                }
              </Typography>
            </Box>

            <Image
              src={calculation1}
              alt="map"
              className="advcustomindicesboximage"
            />
          </Box>

          <Box className="DF">
            <Image
              src={calculation2}
              alt="map"
              className="advcustomindicesboximage2"
            />
            <Box className="advcustomindicesboxtext DF FFC JCC">
              <Typography className="advcustomindicesboxtextheading MB10">
                QUALITY
              </Typography>
              <Typography className="advcustomindicesboxtextdesc">
                Our Custom Indices follow a research-focused product development
                process that translates into high quality products. Each product
                also undergoes an end-to-end quality process that ensures
                error-free delivery.
              </Typography>
            </Box>
          </Box>

          <Box className="DF">
            <Box className="advcustomindicesboxtext DF FFC JCC">
              <Typography className="advcustomindicesboxtextheading MB10">
                BROAD COVERAGE
              </Typography>
              <Typography className="advcustomindicesboxtextdesc">
                Our indices can be customized across a broad range of factors,
                such as size, sector, exchanges, unique adjustment of corporate
                actions, and alternative weighting. We specialize in adapting to
                any client-driven requests for our index offerings to best
                reflect the idea and meet client expectations.
              </Typography>
            </Box>

            <Image
              src={calculation3}
              alt="map"
              className="advcustomindicesboximage3"
            />
          </Box>

          <Box className="DF">
            <Image
              src={calculation4}
              alt="map"
              className="advcustomindicesboximage4"
            />
            <Box className="advcustomindicesboxtext DF FFC JCC">
              <Typography className="advcustomindicesboxtextheading MB10">
                DOMAIN EXPERTISE
              </Typography>
              <Typography className="advcustomindicesboxtextdesc">
                We are a leader in the thematic indexing space, and have
                successfully developed indices targeting emerging innovative
                themes including the metaverse, blockchain, 5G, decentralized
                finance, and hydrogen economy, to name a few. Our thematic
                indices are tracked by some of the largest funds globally,
                including Global X U.S. Infrastructure Development ETF, PAVE,
                listed in the United States (the largest US Infrastructure ETF
                in the world), and First Trust Indxx NextG ETF, NXTG, listed in
                the United States, Canada, and Europe (the 2nd largest 5G ETFs
                in the world).
              </Typography>
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
