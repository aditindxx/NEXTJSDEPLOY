"use client";
import React from "react";
import { GET_CADMIN, POST_CONTACT_US } from "../../Apis/EndPoints";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  // Checkbox,
  FormControl,
  // TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

import { getMethodApi, postMethodApi } from "../../Utils/Methods";
import useStyles from "../../Assets/Styles/Common/Common";

import { Swiper, SwiperSlide } from "swiper/react";
import DOMPurify from "dompurify";
import { Interweave } from "interweave";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Loader from "../../Components/Loader/Loader";
import CadminIndustryBanner from "../../Assets/Images/CadminIndustryBanner.png";
import CadminCadminBanner from "../../Assets/Images/CadminCadminBanner.png";
import CadminCadminBanner2 from "../../Assets/Images/CadminCadminBanner2.png";
import Divider from "../../Components/Widgets/Divider";
import CadminBottomBanner from "../../Assets/Images/CadminBottomBanner.png";
import CadminTwitter from "../../Assets/Svgs/CadminTwitter.svg";
import CadminInstagram from "../../Assets/Svgs/CadminInstagram.svg";
import CadminLinkedin from "../../Assets/Svgs/CadminLinkedin.svg";
// import { useNavigate } from "react-router";
import { usePathname, useRouter } from "next/navigation";
// import { Helmet } from "react-helmet";
import Image from "next/image";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import ReCaptchaV2 from "react-google-recaptcha";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

export default function Cadmin() {
  // const navigate = useNavigate();
  const router = useRouter();
  const { f22text } = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [header, setHeader] = useState();
  const [industryProblems, setIndustryProblems] = useState();
  const [solution, setSolution] = useState();
  const [cadminFeatures, setCadminFeatures] = useState();
  const [process, setProcess] = useState();
  const [cadFaq, setCadFaq] = useState();
  const [loader1, setLoader1] = useState(true);
  const [hovered, setHovered] = useState(-1);
  const executiveDescription = useRef();
  const [seodata, setSeoData] = useState("");
  const location = usePathname();
  const [contactInfo, setContactInfo] = useState({
    name: "",
    Email: "",
    Message: "",
    ip_address: "",
    page_name: location?.split("/")?.slice(-1)[0],
  });
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const pathname = usePathname();
  // const [open, setOpen] = useState(false);
  // const getInTouch = useRef();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange2 = (event) => {
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

    // if(isCaptchaVerified == false){
    //   toast.error("Please verify Captcha");
    //   return;
    // }

    postMethodApi(POST_CONTACT_US, contactInfo)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Contact Information is sent !!");
          router.push("/thank-you");
          setContactInfo({
            name: "",
            Email: "",
            Message: "",
          });
        }
      })
      .catch((error) => {
        toast.error("Some error occur !!");
        return;
      });
  };

  useEffect(() => {
    getMethodApi(GET_CADMIN).then((response) => {
      if (response.status === 200) {
        setHeader(response.data["Header"]);
        setIndustryProblems(response.data["Industry_Problems"]);
        setSolution(response.data["solution"]);
        setCadminFeatures(response.data["Cadmin_Features"]);
        setProcess(response.data["process"]);
        setCadFaq(response.data["Cad_Faq"]);
        setSeoData(response.data);
        setLoader1(false);
      }
    });

    setTimeout(() => {
      setSetTimeOutLoader(false);
    }, 2000);
  }, [location]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {/* <Helmet> */}
      <title>{seodata?.meta_title ? seodata.meta_title : "Indices page"}</title>
      <link
        rel="canonical"
        href={`https://www.indxx.com${pathname}`}
        key="canonical"
      />
      <meta
        name="description"
        content={
          seodata?.meta_description ? seodata.meta_description : "description"
        }
      />
      <meta
        name="keywords"
        content={seodata?.meta_keywords ? seodata.meta_keywords : "keywords"}
      />
      {/* </Helmet> */}

      {/* top heading*/}
      <Box
        component={"div"}
        className="ITICScontactUse DF mobFFC"
        sx={{
          backgroundImage: `url(${header ? header.Banner_Image : ""})`,
        }}
      >
        <Box className="container DF JCSB smallMobFFC">
          <Box component={"div"} className="DF AIC JCC mobW100">
            <Box
              component={"div"}
              className="CadminBannerStyle smallMobDF smallMobFFC"
            >
              <Image
                loader={() => header.title_logo}
                src={header ? header.title_logo : ""}
                width={1}
                height={1}
                alt="cadmin logo"
                className="CadminLogo"
              />
              <Typography
                variant="h1"
                component={"h1"}
                className="h1HeadingCADMIN"
                id="lineHt47p"
              >
                {header
                  ? header.subtitle
                  : "Corporate Actions Management Redefined"}
              </Typography>
              <Button
                className="tabBtn mobMT20 mobMAuto MT30 W11-25R"
                onClick={() => executiveDescription.current.scrollIntoView()}
              >
                {"Book Demo"}
              </Button>
            </Box>
          </Box>

          {/* <Image
            loader={() => header.image}
            src={header ? header.image : ""}
            alt="cadmindesktop"
            width={1}
            height={1}
            className="CadminDesktop"
          /> */}
        </Box>
      </Box>

      {/* {CADMIN INDUSTRY PROBLEMS} */}
      <Box component={"div"} className="container MT6-25R smallMobMT1  ">
        <Box
          component={"div"}
          className="CadminIndustryBanner DF smallMobMB2N"
          sx={{
            backgroundImage: `url(${CadminIndustryBanner.src})`,
          }}
        >
          <Box className="TAC W65 smallMobW100 MA">
            <Typography
              variant="h2"
              component={"h2"}
              className="IndustryProblemBannerHeading"
            >
              {"Industry Problems"}
            </Typography>
            <Typography
              variant="h3"
              component={"h3"}
              className="IndustryProblemBannerText MT15"
            >
              {header
                ? header.Indus_head_desc
                : "Over 4 million corporate actions are processed per year, and this is growing by 12% annually on average."}
            </Typography>
          </Box>
        </Box>

        <Box className="IndustryComponents MT60 DF FWW JCSB smallMobFFC">
          {industryProblems
            ? industryProblems.map((item, ind) => (
                <Box
                  key={ind}
                  className="IndustryComponentOuterBox boxshadow4sides smallMobW100"
                >
                  <Box className="IndustryComponentInnerBoxTop ">
                    <Typography
                      variant="p"
                      component={"p"}
                      className="IndustryComponentInnerBoxTopHeading PT28 MA"
                      sx={{ color: `${ind % 2 === 0 ? "#ED3125" : "#395FD2"}` }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="p"
                      component={"p"}
                      className="IndustryComponentInnerBoxTopText PT20 MA"
                    >
                      {item.description}
                    </Typography>
                  </Box>
                  <Box
                    className="IndustryInnerBoxBottom"
                    sx={{ bgcolor: `${ind % 2 === 0 ? "#ED3125" : "#395FD2"}` }}
                  ></Box>
                </Box>
              ))
            : null}
        </Box>
      </Box>

      {/* {CADMIN CADMIN} */}
      <Box
        component={"div"}
        className="CadminCadminBanner DF MT6-25R smallMobMT1"
        sx={{
          backgroundImage: `url(${CadminCadminBanner.src})`,
        }}
      >
        <Box className="TAC W65 smallMobW100 MA">
          <Typography
            // variant="h1"
            // component={"h1"}
            className="IndustryProblemBannerHeading"
          >
            {"“ONE PLATFORM, INTEGRATED SOLUTION”"}
          </Typography>
          <Typography
            // variant="h1"
            // component={"h1"}
            className="CadminBannerText MT15"
          >
            {"Bring all your data vendors corporate actions to one place."}
          </Typography>
        </Box>
      </Box>

      <Box component={"div"} className="container MT6-25R smallMobMT1 ">
        <Box
          component={"div"}
          className="DF ImgAndTextGap smallMobFFC smallMobMB60 verySmallMobMT30 mobMT0 FGap6-25R  mobAIC MT60"
        >
          <Box component={"div"} className="DF FFC JCFS W50 mobW100 MT40 JCC">
            <Box>
              <Image
                loader={() => solution.title_logo}
                src={solution ? solution.title_logo : ""}
                width={1}
                height={1}
                alt="cadminlogo"
                className="CadminLogo2"
              />
              <Typography
                variant="p"
                component={"p"}
                className="MT12 CadminCadminText mobTAJ"
              >
                {solution
                  ? solution.solution_desc
                  : "The use of technology to handle the process of combining numerous corporate actions into a single master record eliminates conflicting data from various data sources, resulting in a single record that can be easily communicated both internally and externally to customers."}
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                className="MT12 CadminCadminHeading mobTAJ"
              >
                {solution
                  ? solution.solution_title
                  : "NEVER MISS A CORPORATE ACTION."}
              </Typography>
              <Button
                className="DownloadBrochurebtn fw400 MT25 W50"
                onClick={() =>
                  window.open(
                    // `https://indxxtechnology.com/corporate-action-management-CAdmin/Cadmin_brochure.pdf`,
                    `https://indxxfiles.s3.amazonaws.com/CAdminbrochureDigital.pdf`,
                    "_blank"
                  )
                }
                // onClick={handleClickOpen}
              >
                {"Download Brochure"}
              </Button>
            </Box>
          </Box>

          <Image
            loader={() => solution.solution_image}
            src={solution ? solution.solution_image : ""}
            alt=""
            height={1}
            width={1}
            className="solution_image bordRadTL bordRadBR W50 mobW80 curve3sides100 smallMobMT60 verySmallMobMT30"
          />
        </Box>
      </Box>

      {/* {EXPLORE FEATURES} */}
      <Box className="container boxshadow4sides bordRadius10 MT6-25R Zindex2 posRel bGColorWhite FeatureBannerBox">
        <Box className="DF JCSB CadminFeatureBox">
          <Typography
            // variant="h1"
            // component={"h1"}
            className="CadminFeatureHeading DF AIC"
          >
            {"Explore Features"}
          </Typography>
          <Typography variant="p" component={"p"} className="CadminFeatureText">
            {
              "CAdmin mitigates the costly risk of missing discrepancies in corporate actions data by collating, standardizing, validating, and finally consolidating them into a single consistent data copy."
            }
          </Typography>
        </Box>
      </Box>

      {cadminFeatures ? (
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
          {cadminFeatures?.map((item, ind) => (
            <SwiperSlide key={ind}>
              <Box className="FeatureCarouselBox DF">
                <Box className=" DF JCSB container CadminMobFFC">
                  <Image
                    loader={() => item.feature_image}
                    width={1}
                    height={1}
                    src={item.feature_image}
                    alt="FeatureImg1"
                    className="CadminCarouselImg"
                  />
                  <Box className="CadminCarouselTextBox">
                    <Typography
                      // variant="h1"
                      // component={"h1"}
                      className="CadminCarouselHeading"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="p"
                      component={"p"}
                      className="CadminCarouselText"
                    >
                      {item.title_decs}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}

      {/* {CADMIN BENEFITS} */}
      <Box className="container MT7-875R smallMobMT30">
        <Typography
          variant="p"
          component={"p"}
          className="ManageCookieHeading colorRed"
        >
          {"Experience the Benefits"}
        </Typography>

        <Divider
          classes={`MT20 MB10`}
          colorOne={"#395FD2"}
          colorTwo={"#ED3125"}
        />

        <Box className="MT3-25R DF FWW JCSB verySmallMobJCC">
          {process
            ? process.map((item, ind) => (
                <Box
                  key={ind}
                  className="Cadminouterbox boxshadow4sides"
                  onMouseEnter={() => setHovered(ind)}
                  onMouseLeave={() => setHovered(-1)}
                >
                  <Box
                    className="CadminInnerBoxTop"
                    sx={{
                      bgcolor: `${hovered === ind ? "#395FD2" : "#FFFFFF"}`,
                    }}
                  >
                    <Box className="CadminInnerBoxImg PT28 ">
                      <Image
                        loader={() =>
                          hovered === ind ? item.alternate_image : item.image
                        }
                        src={
                          hovered === ind ? item.alternate_image : item.image
                        }
                        width={1}
                        height={1}
                        alt="BenefitsImg1"
                        className="CadminInnerBoxImgInnerImg"
                      />
                    </Box>
                    <Typography
                      variant="p"
                      component={"p"}
                      className="innerBoxTopHeadingCadmin PT28 MA"
                      sx={{
                        color: `${hovered === ind ? "#FFFFFF" : "#395FD2"}`,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Interweave
                      className={`${
                        hovered === ind ? "colorWhite" : "colorBlack"
                      } innerBoxTopText PT20 MA DB `}
                      content={item.description}
                    />
                  </Box>
                </Box>
              ))
            : null}
        </Box>
      </Box>

      {/* {CADMIN QUESTIONS} */}
      <Box
        component={"div"}
        className="CadminCadminBanner2 DF MT7-5R smallMobMT1"
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(57, 95, 210, 0.4), rgba(57, 95, 210, 0.2)),url(${CadminCadminBanner2.src})`,
        }}
      >
        <Box className="TAC W40 smallMobW100 MA">
          <Typography
            // variant="h1"
            // component={"h1"}
            className="IndustryProblemBannerHeading"
          >
            {"LET US ASSIST YOU IN MANAGING YOUR CORPORATE ACTIONS"}
          </Typography>
        </Box>
      </Box>

      <Box
        component="div"
        className="container CookieWeUse MT7-5R"
        sx={{ marginTop: 10 }}
      >
        <Box className="DF newsInsightContainer mobFFC boxshadow4sides announcementouterbox IStretchF DF FFC JCSB">
          <Box sx={{ m: 2 }} className="M34 MB0 mobML1 mobMR1 mobMT1">
            <Box className="newsandresearchreddiv verySmallMobP20 linehtN">
              {"Frequently Asked Questions"}
            </Box>
          </Box>

          <Box sx={{ mb: 5 }} className="M34LR MB0 mobML1 mobMR1">
            {cadFaq
              ? cadFaq.map((item, ind) => (
                  <Accordion
                    key={ind}
                    className="removeaccordion"
                    expanded={expanded === ind}
                    onChange={handleChange(ind)}
                  >
                    <AccordionSummary
                      className="P0"
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="CadminQuestonsfs redHover fw400 linehtN Lspac">
                        {item.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="P0">
                      <Box>
                        <Typography
                          variant="p"
                          component={"p"}
                          className="MB1 CadminQuestonsfs fw400"
                        >
                          {item.answer}
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))
              : null}
          </Box>
        </Box>
      </Box>

      {/* {CADMIN BOTTOM BANNER} */}
      <Box
        component={"div"}
        className="CadminBottomBanner DF mobFFC MT9-75R CadminBottomBannerMT1"
        sx={{
          backgroundImage: `url(${CadminBottomBanner.src})`,
        }}
      >
        <Box className="container DF JCSB smallMobFFC">
          <Box component={"div"} className="DF AIC JCC mobW100">
            <Box component={"div"}>
              <Typography
                // variant="h1"
                // component={"h1"}
                className="CadminBottomBannerHeading"
              >
                {
                  "Learn how CAdmin adds credibility to your corporate actions data on a daily basis."
                  //   data.business_offering ? data.business_offering : ""
                }
              </Typography>
            </Box>
          </Box>

          <Box
            component={"div"}
            className="W38 DF AIC JCC mobW100 mobMB30"
            ref={executiveDescription}
          >
            <FormControl className="DF FFC formBox PB60 PT50 mobPT0 mobPB60">
              <Typography
                // variant="h1"
                className="headingContactUs DF AIC JCC mobPT30"
              >
                {"BOOK DEMO"}
              </Typography>
              <Box className="contactFormLine"></Box>
              <input
                name="name"
                id="name"
                placeholder="Name"
                className={`${f22text} MT30 PL1 FontFamilyInter CadminInputBox PL1 PB10 fw700 fs1-125R`}
                onChange={handleChange2}
                value={contactInfo.name}
              />
              <input
                type="email"
                name="Email"
                id="Email"
                className={`${f22text} MT30 PL1 FontFamilyInter CadminInputBox PL1 PB10 fw700 fs1-125R`}
                placeholder="Email Address"
                onChange={handleChange2}
                value={contactInfo.Email}
              />
              <input
                name="Message"
                id="message"
                placeholder="Message"
                className={`${f22text} MT30 PL1 FontFamilyInter CadminInputBox PL1 PB10 fw700 fs1-125R`}
                onChange={handleChange2}
                value={contactInfo.Message}
              />

              <Button
                className="submitBtnContactUsPage MT50 FontFamilyInter"
                variant="outlined"
                onClick={createContactInfo}
              >
                {"submit"}
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box className="DownloadBrochure"></Box>

      <Box className="container boxshadow4sides bordRadius20  Zindex2 DownloadBrochureDiv bGColorWhite">
        <Box className="DF smallMobFFC JCSB CadminDownloadBrochureBox">
          <Box>
            {/* <TwitterShareButton
              url={window.location.href}
              media={window.location.href}
              quote={"Dummy text!"}
            > */}
            <Image
              className="LogoPadding cursorPointer"
              src={CadminTwitter}
              alt="twitter"
              onClick={() =>
                window.open("https://twitter.com/indxxindices?lang=en")
              }
            />
            {/* </TwitterShareButton> */}
            <Image
              src={CadminInstagram}
              alt="Instagramlogo"
              className="LogoPadding cursorPointer"
              onClick={() =>
                window.open("https://www.instagram.com/lifeatindxx/?hl=en")
              }
            ></Image>
            {/* <LinkedinShareButton
              url={window.location.href}
              media={window.location.href}
              quote={"Dummy text!"}
            > */}
            <Image
              className="LogoPadding cursorPointer"
              src={CadminLinkedin}
              alt="linkdin"
              onClick={() =>
                window.open("https://www.linkedin.com/company/indxx/")
              }
            />
            {/* </LinkedinShareButton> */}
          </Box>
          <Button
            className="DownloadBrochurebtn fw400 smallMobMT20"
            onClick={() =>
              window.open(
                // `https://indxxtechnology.com/corporate-action-management-CAdmin/Cadmin_brochure.pdf`,
                `https://indxxfiles.s3.amazonaws.com/CAdminbrochureDigital.pdf`,
                "_blank"
              )
            }
            // onClick={handleClickOpen}
          >
            {"Download Brochure"}
          </Button>
        </Box>
      </Box>

      {/* <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box className="boxshadow4sides bordr10px getintouchform">
          <Box sx={{ p: 3.26 }}>
            <Typography variant={"h1"} className="contactusformheadingCadmin TAC">
              {"To access the brochure please share some basic details!"}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ mt: 3.25 }} className="DF JCSB FWW getintouchinputfield">
              <TextField
                name="name"
                label="Name*"
                className="accordionbggrey textfieldstyle"
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
                className="accordionbggrey textfieldstyle"
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
                className="accordionbggrey textfieldstyle"
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
                ref={getInTouch}
                name="Phone"
                label="Phone"
                type="number"
                className="accordionbggrey textfieldstyle"
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

            <Box className="DF JCSB FFC">
            <ReCaptchaV2
              // sitekey={"6LfoBRUgAAAAAL6e1-thG56JCxpCRfDs_r5zoDry"}
              sitekey={process.env.REACT_APP_SITE_KEY}
              // onChange={handleToken}
              // onExpire={handleExpire}
              className="MB20"
            />

            <Box component={"div"} className="DF AIFS MB20 verySmallMobMB10">
              <Checkbox
                style={{ padding: "2px 1rem 0px 0rem" }}
                className=""
                name="checkboxCookie"
                defaultChecked={false}
                value={contactInfo.checkboxCookie}
                onChange={handleChange}
              ></Checkbox>
              <Typography className="Contactustermsofusage linehtN">
                {
                  "I accept Indxx's terms of usage, acknowledge the Data Privacy Policy, and authorize to contact."
                }
              </Typography>
            </Box>

            </Box>

            <Button
              className="sendmsgBtn mobMT20 mobMAuto linehtN"
              onClick={createContactInfo}
            >
              {"Submit"}
            </Button>
          </Box>
        </Box>
      </BootstrapDialog> */}

      {/* loader */}
      {setTimeOutLoader || loader1 ? <Loader /> : ""}

      {/* pop up */}
    </>
  );
}
