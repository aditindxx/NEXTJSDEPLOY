"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getMethodApi, postMethodApi } from "@/Utils/Methods";
import { GET_CONFIG, POST_CONTACT_US } from "@/Apis/EndPoints";
import { toast } from "react-toastify";
import ReCaptchaV2 from "react-google-recaptcha";
import { Box, Button, Typography, TextField, Checkbox } from "@mui/material";
import CountUp from "react-countup";
import Divider from "@/Components/Widgets/Divider";
import Loader from "@/Components/Loader/Loader";
import CadminCadminBanner from "../../Assets/Images/CadminCadminBanner.png";
import CadminCadminBanner2 from "../../Assets/Images/CadminCadminBanner2.png";
import advcadminslider1 from "../../Assets/Images/advcadminslider1.png";
import advcadminslider2 from "../../Assets/Images/advcadminslider2.png";
import advcadminslider3 from "../../Assets/Images/advcadminslider3.png";
import advcadminslider4 from "../../Assets/Images/advcadminslider4.png";
import advcadminslider5 from "../../Assets/Images/advcadminslider5.png";
import { Interweave } from "interweave";
import { usePathname, useRouter } from "next/navigation";
import AdvcadminBanner from "../../Assets/Images/advcadminBanner.png";
import calculationaboutimg from "../../Assets/Images/calculationaboutimg.png";
import advcadminwhite1 from "../../Assets/Images/advcadminwhite1.png";
import advcadminwhite2 from "../../Assets/Images/advcadminwhite2.png";
import advcadminwhite3 from "../../Assets/Images/advcadminwhite3.png";
import advcadminwhite4 from "../../Assets/Images/advcadminwhite4.png";
import advcadminwhite5 from "../../Assets/Images/advcadminwhite5.png";
import advcadminwhite6 from "../../Assets/Images/advcadminwhite6.png";
import advcadminblue1 from "../../Assets/Images/advcadminblue1.png";
import advcadminblue2 from "../../Assets/Images/advcadminblue2.png";
import advcadminblue3 from "../../Assets/Images/advcadminblue3.png";
import advcadminblue4 from "../../Assets/Images/advcadminblue4.png";
import advcadminblue5 from "../../Assets/Images/advcadminblue5.png";
import advcadminblue6 from "../../Assets/Images/advcadminblue6.png";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import Callback from "@/Components/Callback/Callback";
import DOMPurify from "dompurify";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Advcadmin() {
  const [expData, setExpData] = useState([]);
  const [seoData, setSeoData] = useState("");
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [loader2, setLoader2] = useState(true);
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

    setTimeout(() => {
      setSetTimeOutLoader(false);
      AOS.refresh();
    }, 2000);
  }, []);

  useEffect(() => {
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
      initClassName: "aos-init", // class applied after initialization
      animatedClassName: "aos-animate", // class applied on animation
      useClassNames: false, // if true, will add content of data-aos as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by data-aos-* attributes:
      offset: 0, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1000, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
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
        {/* <Box
          sx={{
            display: loader2 & setTimeOutLoader ? "block" : "none",
            height: "100vh",
            width: "100%",
          }}
        ></Box> */}
        <Box
          className={`advcadminbannerimg DF AIC JCC 
            `}
          sx={{
            backgroundImage: `url(${AdvcadminBanner.src})`,
          }}
        >
          <div
            className={`DF FFC AIC ${''
              // !loader2 & !setTimeOutLoader ? "" : "zoom-out"
            } `}
            data-aos-delay="2000"
            // data-aos-duration="4000"
            data-aos="zoom-out"
            // data-aos-offset="200"
          >
            <Typography
              variant={"h2"}
              className="advcalculationbannerimgheading TAC"
            >
              {"Navigating Corporate Actions Complexity,"}
              <br />
              {"Enhancing Operational Efficiency"}
            </Typography>
            <Typography variant="" className="advcadminbannerimgdesc TAC">
              {
                "A customizable, centralized, and automated platform that streamlines corporate actions management for"
              }
              <br />
              {"investment management."}
            </Typography>
            <Box className="DF FGrow1AllItem JCSB AIFS MT60 smallMobAIC smallMobFFC reactCountExperience W90">
              <Box className="DF FFC AIC TAC smallMobFFR mobJCC AIStretch">
                <Typography
                  variant=""
                  className="advcadmincount smallMobTAE expTextBox"
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
                  className="advcadmincountText smallMobTAL PL1 PR1 expTextBox"
                >
                  Years of Expertise
                </Typography>
              </Box>
              <Box className="BLResp2 BRResp2 DF FFC AIC PL1 PR1 TAC smallMobFFR mobJCC AIStretch">
                <Typography
                  variant=""
                  className="advcadmincount smallMobTAE expTextBox"
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
                  className="advcadmincountText smallMobTAL PB30 mobPB0  PL1 PR1 expTextBox"
                >
                  {"Products"} <br /> {"$20 bn+ AUM"}
                </Typography>
              </Box>

              <Box className="DF FFC AIC PL1 PR1 TAC smallMobFFR mobJCC AIStretch">
                <Typography
                  variant=""
                  className="advcadmincount smallMobTAE expTextBox"
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
                  className="advcadmincountText smallMobTAL PL1 PR1 expTextBox"
                >
                  {"Global Awards"} <br /> {"& Recognitions"}
                </Typography>
              </Box>
            </Box>
          </div>
        </Box>

        {/* First Section */}
        <Box className="advcadminfirstsection">
          <div className="container" data-aos="fade-up">
            <Box
              component={"div"}
              className=" DF Fgap27 mobAIC verySmallMobMT30 smallMobFFC"
            >
              <Box className="advcadminfirstsectiontextbox DF FFC JCC">
                <Box>
                  <Box component="span" className="advcadminlogostart">
                    {"CAdm"}
                  </Box>
                  <Box component="span" className="advcadminlogoend">
                    {"in"}
                  </Box>
                </Box>
                <Typography className="advcadminfirstsectionheading">
                  Corporate Actions Management Redefined
                </Typography>
                <Typography className="advcadminfirstsectiondesc">
                  The use of technology to handle the process of combining
                  numerous corporate actions into a single master record
                  eliminates conflicting data from various data sources,
                  resulting in a single record that can be easily communicated
                  both internally and externally to customers.
                </Typography>
              </Box>

              <Callback />
            </Box>
          </div>
        </Box>

        {/* {EXPLORE FEATURES} */}
        <Box className="container boxshadow4sides bordRadius10 MT6-25R Zindex2 posRel bGColorWhite FeatureBannerBox">
          <Box className="DF JCSB CadminFeatureBox">
            <Typography
              variant="h1"
              component={"h1"}
              className="CadminFeatureHeadingadv DF AIC"
            >
              {"Explore Features"}
            </Typography>
            <Typography
              variant="p"
              component={"p"}
              className="CadminFeatureTextadv"
            >
              {
                "CAdmin mitigates the costly risk of missing discrepancies in corporate actions data by collating, standardizing, validating, and finally consolidating them into a single consistent data copy."
              }
            </Typography>
          </Box>
        </Box>

        <Swiper
          spaceBetween={30}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Box className="FeatureCarouselBox DF">
              <Box className=" DF JCSB container CadminMobFFC">
                <Image
                  loader={() => advcadminslider2.src}
                  width={1}
                  height={1}
                  src={advcadminslider2.src}
                  alt="FeatureImg1"
                  className="CadminCarouselImg"
                  unoptimized={true}
                />
                <Box className="CadminCarouselTextBox">
                  <Typography
                    variant="h1"
                    component={"h1"}
                    className="CadminCarouselHeadingadv"
                  >
                    {"Security Universe"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="CadminCarouselTextadv"
                  >
                    {
                      "CAdmin enables you to build a universe of securities for which you'd like to track daily corporate actions. This is a one-time task that must be completed when launching CAdmin and adding/removing securities from the universe."
                    }
                  </Typography>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className="FeatureCarouselBox DF">
              <Box className=" DF JCSB container CadminMobFFC">
                <Image
                  loader={() => advcadminslider3.src}
                  width={1}
                  height={1}
                  src={advcadminslider3.src}
                  alt="FeatureImg1"
                  className="CadminCarouselImg"
                  unoptimized={true}
                />
                <Box className="CadminCarouselTextBox">
                  <Typography
                    variant="h1"
                    component={"h1"}
                    className="CadminCarouselHeadingadv"
                  >
                    {"Compliance & Security"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="CadminCarouselTextadv"
                  >
                    {
                      "All the data that is expected to be handled in CAdmin on a daily basis will be provided by the client and will only be stored on the client's servers. Clients would have access to their data only."
                    }
                  </Typography>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className="FeatureCarouselBox DF">
              <Box className=" DF JCSB container CadminMobFFC">
                <Image
                  loader={() => advcadminslider4.src}
                  width={1}
                  height={1}
                  src={advcadminslider4.src}
                  alt="FeatureImg1"
                  className="CadminCarouselImg"
                  unoptimized={true}
                />
                <Box className="CadminCarouselTextBox">
                  <Typography
                    variant="h1"
                    component={"h1"}
                    className="CadminCarouselHeadingadv"
                  >
                    {"Manual CA insertion"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="CadminCarouselTextadv"
                  >
                    {
                      "If your data providers fail to report a company's corporate action on a given day, CAdmin allows you to manually enter that corporate action."
                    }
                  </Typography>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>

          <SwiperSlide>
            <Box className="FeatureCarouselBox DF">
              <Box className=" DF JCSB container CadminMobFFC">
                <Image
                  loader={() => advcadminslider5.src}
                  width={1}
                  height={1}
                  src={advcadminslider5.src}
                  alt="FeatureImg1"
                  className="CadminCarouselImg"
                  unoptimized={true}
                />
                <Box className="CadminCarouselTextBox">
                  <Typography
                    variant="h1"
                    component={"h1"}
                    className="CadminCarouselHeadingadv"
                  >
                    {"User-specific Dashboard"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="CadminCarouselTextadv"
                  >
                    {
                      "CAdmin allows you to build a dashboard based on your needs and resources, and plan accordingly to take your required critical decisions."
                    }
                  </Typography>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box className="FeatureCarouselBox DF">
              <Box className=" DF JCSB container CadminMobFFC">
                <Image
                  loader={() => advcadminslider1.src}
                  width={1}
                  height={1}
                  src={advcadminslider1.src}
                  alt="FeatureImg1"
                  className="CadminCarouselImg"
                  unoptimized={true}
                />
                <Box className="CadminCarouselTextBox">
                  <Typography
                    variant="h1"
                    component={"h1"}
                    className="CadminCarouselHeadingadv"
                  >
                    {"Analytics"}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="CadminCarouselTextadv"
                  >
                    {
                      "CAdmin provides a graphical summary dashboard that provides performance of key"
                    }
                  </Typography>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        </Swiper>

        <Box
          component={"div"}
          className="CadminCadminBanner DF  smallMobMT1"
          sx={{
            backgroundImage: `url(${CadminCadminBanner.src})`,
          }}
        >
          <Box className="TAC W65 smallMobW100 MA">
            <Typography
              variant="h1"
              component={"h1"}
              className="IndustryProblemBannerHeadingadv"
            >
              {"“ONE PLATFORM, INTEGRATED SOLUTION”"}
            </Typography>
            <Typography
              variant="h1"
              component={"h1"}
              className="CadminBannerTextadv MT15"
            >
              {"Bring all your data vendors corporate actions to one place."}
            </Typography>
          </Box>
        </Box>

        {/* {CADMIN BENEFITS} */}
        <Box className="container MT7-875R smallMobMT30">
          <Typography
            variant="p"
            component={"p"}
            className="ManageCookieHeadingadv colorRed"
          >
            {"Experience the Benefits"}
          </Typography>

          <Divider
            classes={`MT20 MB10`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />

          <Box className="MT3-25R DF FWW JCSB verySmallMobJCC">
            <Box
              className="Cadminouterbox boxshadow4sides"
              onMouseEnter={() => setHovered(1)}
              onMouseLeave={() => setHovered(-1)}
            >
              <Box
                className="CadminInnerBoxTop"
                // sx={{
                //   bgcolor: `${hovered === 1 ? "#395FD2" : "#FFFFFF"}`,
                // }}
              >
                <Box className="CadminInnerBoxImg PT28 ">
                  <Image
                    loader={() =>
                      hovered === 1 ? advcadminwhite1.src : advcadminblue1.src
                    }
                    src={
                      hovered === 1 ? advcadminwhite1.src : advcadminblue1.src
                    }
                    width={1}
                    height={1}
                    alt="BenefitsImg1"
                    className="CadminInnerBoxImgInnerImgadv"
                    unoptimized={true}
                  />
                </Box>
                <Typography
                  variant="p"
                  component={"p"}
                  className="innerBoxTopHeadingCadminadv PT28 MA"
                  sx={{
                    color: `${hovered === 1 ? "#FFFFFF" : "#395FD2"}`,
                  }}
                >
                  {"Scalable Infrastructure"}
                </Typography>
                <Interweave
                  className={`${
                    hovered === 1 ? "colorWhite" : "colorBlack"
                  } innerBoxTopTextadv PT20 MA DB `}
                  content={
                    "Our tool supports high volumes of corporate actions and complex multi-x capabilities."
                  }
                />
              </Box>
            </Box>

            <Box
              className="Cadminouterbox boxshadow4sides"
              onMouseEnter={() => setHovered(2)}
              onMouseLeave={() => setHovered(-1)}
            >
              <Box
                className="CadminInnerBoxTop"
                // sx={{
                //   bgcolor: `${hovered === 2 ? "#395FD2" : "#FFFFFF"}`,
                // }}
              >
                <Box className="CadminInnerBoxImg PT28 ">
                  <Image
                    loader={() =>
                      hovered === 2 ? advcadminwhite2.src : advcadminblue2.src
                    }
                    src={
                      hovered === 2 ? advcadminwhite2.src : advcadminblue2.src
                    }
                    width={1}
                    height={1}
                    alt="BenefitsImg1"
                    className="CadminInnerBoxImgInnerImgadv"
                    unoptimized={true}
                  />
                </Box>
                <Typography
                  variant="p"
                  component={"p"}
                  className="innerBoxTopHeadingCadminadv PT28 MA"
                  sx={{
                    color: `${hovered === 2 ? "#FFFFFF" : "#395FD2"}`,
                  }}
                >
                  {"Cost Effective"}
                </Typography>
                <Interweave
                  className={`${
                    hovered === 2 ? "colorWhite" : "colorBlack"
                  } innerBoxTopTextadv PT20 MA DB `}
                  content={
                    "We reduce high fixed costs associated with corporate action validation to a variable cost as per each client’s requirements."
                  }
                />
              </Box>
            </Box>

            <Box
              className="Cadminouterbox boxshadow4sides"
              onMouseEnter={() => setHovered(3)}
              onMouseLeave={() => setHovered(-1)}
            >
              <Box
                className="CadminInnerBoxTop"
                // sx={{
                //   bgcolor: `${hovered === 3 ? "#395FD2" : "#FFFFFF"}`,
                // }}
              >
                <Box className="CadminInnerBoxImg PT28 ">
                  <Image
                    loader={() =>
                      hovered === 3 ? advcadminwhite3.src : advcadminblue3.src
                    }
                    src={
                      hovered === 3 ? advcadminwhite3.src : advcadminblue3.src
                    }
                    width={1}
                    height={1}
                    alt="BenefitsImg1"
                    className="CadminInnerBoxImgInnerImgadv"
                    unoptimized={true}
                  />
                </Box>
                <Typography
                  variant="p"
                  component={"p"}
                  className="innerBoxTopHeadingCadminadv PT28 MA"
                  sx={{
                    color: `${hovered === 3 ? "#FFFFFF" : "#395FD2"}`,
                  }}
                >
                  {"Simplified Operations"}
                </Typography>
                <Interweave
                  className={`${
                    hovered === 3 ? "colorWhite" : "colorBlack"
                  } innerBoxTopTextadv PT20 MA DB `}
                  content={
                    "We target to eliminate inefficient and error-prone manual processing of corporate actions and hence transfer the burden of corporate actions from clients to a trusted professional service."
                  }
                />
              </Box>
            </Box>

            <Box
              className="Cadminouterbox boxshadow4sides"
              onMouseEnter={() => setHovered(4)}
              onMouseLeave={() => setHovered(-1)}
            >
              <Box
                className="CadminInnerBoxTop"
                // sx={{
                //   bgcolor: `${hovered === 4 ? "#395FD2" : "#FFFFFF"}`,
                // }}
              >
                <Box className="CadminInnerBoxImg PT28 ">
                  <Image
                    loader={() =>
                      hovered === 4 ? advcadminwhite4.src : advcadminblue4.src
                    }
                    src={
                      hovered === 4 ? advcadminwhite4.src : advcadminblue4.src
                    }
                    width={1}
                    height={1}
                    alt="BenefitsImg1"
                    className="CadminInnerBoxImgInnerImgadv"
                    unoptimized={true}
                  />
                </Box>
                <Typography
                  variant="p"
                  component={"p"}
                  className="innerBoxTopHeadingCadminadv PT28 MA"
                  sx={{
                    color: `${hovered === 4 ? "#FFFFFF" : "#395FD2"}`,
                  }}
                >
                  {"Single Source"}
                </Typography>
                <Interweave
                  className={`${
                    hovered === 4 ? "colorWhite" : "colorBlack"
                  } innerBoxTopTextadv PT20 MA DB `}
                  content={
                    "We provide streamlined collection, validation, and dissemination of corporate actions governance in a single place. Hence, oftentimes multiple data sources and feeds can be converged in a single place."
                  }
                />
              </Box>
            </Box>

            <Box
              className="Cadminouterbox boxshadow4sides"
              onMouseEnter={() => setHovered(5)}
              onMouseLeave={() => setHovered(-1)}
            >
              <Box
                className="CadminInnerBoxTop"
                // sx={{
                //   bgcolor: `${hovered === 5 ? "#395FD2" : "#FFFFFF"}`,
                // }}
              >
                <Box className="CadminInnerBoxImg PT28 ">
                  <Image
                    loader={() =>
                      hovered === 5 ? advcadminwhite5.src : advcadminblue5.src
                    }
                    src={
                      hovered === 5 ? advcadminwhite5.src : advcadminblue5.src
                    }
                    width={1}
                    height={1}
                    alt="BenefitsImg1"
                    className="CadminInnerBoxImgInnerImgadv"
                    unoptimized={true}
                  />
                </Box>
                <Typography
                  variant="p"
                  component={"p"}
                  className="innerBoxTopHeadingCadminadv PT28 MA"
                  sx={{
                    color: `${hovered === 5 ? "#FFFFFF" : "#395FD2"}`,
                  }}
                >
                  {"Reduced Risk"}
                </Typography>
                <Interweave
                  className={`${
                    hovered === 5 ? "colorWhite" : "colorBlack"
                  } innerBoxTopTextadv PT20 MA DB `}
                  content={
                    "We aim to limit downstream errors or delays and the risks or consequences associated with flawed data."
                  }
                />
              </Box>
            </Box>

            <Box
              className="Cadminouterbox boxshadow4sides"
              onMouseEnter={() => setHovered(6)}
              onMouseLeave={() => setHovered(-1)}
            >
              <Box
                className="CadminInnerBoxTop"
                // sx={{
                //   bgcolor: `${hovered === 6 ? "#395FD2" : "#FFFFFF"}`,
                // }}
              >
                <Box className="CadminInnerBoxImg PT28 ">
                  <Image
                    loader={() =>
                      hovered === 6 ? advcadminwhite6.src : advcadminblue6.src
                    }
                    src={
                      hovered === 6 ? advcadminwhite6.src : advcadminblue6.src
                    }
                    width={1}
                    height={1}
                    alt="BenefitsImg1"
                    className="CadminInnerBoxImgInnerImgadv"
                    unoptimized={true}
                  />
                </Box>
                <Typography
                  variant="p"
                  component={"p"}
                  className="innerBoxTopHeadingCadminadv PT28 MA"
                  sx={{
                    color: `${hovered === 6 ? "#FFFFFF" : "#395FD2"}`,
                  }}
                >
                  {"Comprehensive Coverage"}
                </Typography>
                <Interweave
                  className={`${
                    hovered === 6 ? "colorWhite" : "colorBlack"
                  } innerBoxTopTextadv PT20 MA DB `}
                  content={
                    "We understand worldwide marketplaces and are capable of addressing corporate actions from all regions."
                  }
                />
              </Box>
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

        {/* About Box */}
        <Box className={"advcadminbluebox MT60  mobMT0 mobMB0"}>
          <div
            className="container fade-in"
            // data-aos="fade"
            // data-aos-anchor-placement="top-bottom"
          >
            <Box className="DF FFC AIC">
              <Typography className="advcadminaboutindxx">
                About Indxx
              </Typography>
            </Box>
            <Divider
              classes={`MT35 MB35 smallMobMT25 smallMobMB10`}
              colorOne={"white"}
              colorTwo={"#ED3125"}
            />
            <Box className="DF smallMobFFC">
              <Box className="advcadminaboutimageboxouter">
                <Image
                  src={calculationaboutimg}
                  alt="img"
                  className="advcadminaboutimg"
                />
              </Box>
              <Box className="DF FFC JCC advcadminabouttextbox">
                <Typography className="advcadminabouttextboxheading">
                  We add credibility to your corporate actions data
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

        <Box
          component={"div"}
          className="CadminCadminBanner2 DF  smallMobMT1"
          sx={{
            backgroundImage: `linear-gradient(to bottom, rgba(57, 95, 210, 0.4), rgba(57, 95, 210, 0.2)),url(${CadminCadminBanner2.src})`,
          }}
        >
          <Box className="TAC W40 smallMobW100 MA">
            <Typography
              variant="h1"
              component={"h1"}
              className="IndustryProblemBannerHeadingadv"
            >
              {"LET US ASSIST YOU IN MANAGING YOUR CORPORATE ACTIONS"}
            </Typography>
          </Box>
        </Box>

        {/* Get In Touch */}
        <Box className="container MT5R opacityTransitionBanner zoom-out">
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
      </Box>
      {/* loader */}
      {loader2 || setTimeOutLoader ? <Loader /> : ""}
    </>
  );
}
