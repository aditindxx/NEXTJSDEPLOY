"use client";
import { Box, Typography, Button, FormControl, Checkbox } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { getMethodApi, postMethodApi } from "../../Utils/Methods";
import ReCaptchaV2 from "react-google-recaptcha";
// import { useNavigate } from "react-router";

import {
  GET_NEWS_AND_RESEARCH_INSIDER,
  POST_CONTACT_US,
} from "../../Apis/EndPoints";
import { useState } from "react";
import Loader from "../../Components/Loader/Loader";
import Divider from "../../Components/Widgets/Divider";
import Mailicon from "../../Assets/Icons/Mailicon.svg";
import Linkdin from "../../Assets/Icons/Linkdin.svg";
import Twitter from "../../Assets/Icons/Twitter.svg";
import Linkicon from "../../Assets/Icons/Link.svg";
import ArrowRight from "./../../Assets/Icons/arrowRightSmall.svg";
// import { useLocation } from "react-router-dom";
import { Interweave } from "interweave";
import { ToastContainer, toast } from "react-toastify";
import Banerimg from "../../Assets/Images/NewsAndResearchInsider.png";
// import {
//   TwitterShareButton,
//   LinkedinShareButton,
//   EmailShareButton,
// } from "react-share";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function NewsAndResearchInsider() {
  const [loader, setLoader] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  // const navigate = useNavigate();
  const router = useRouter();
  const [newsAndResearchInsider, setNewsAndResearchInsider] = useState();
  // const location = useLocation();
  const pathname = usePathname();

  const [contactInfo, setContactInfo] = useState({
    name: "",
    companyName: "",
    ip_address: "",
    phoneNumber: "",
    checkboxCookie: false,
    page_name: pathname.split("/").slice(-2)[0],
  });

  const [contactInfo2, setContactInfo2] = useState({
    email: "",
    ip_address: "",
    page_name: pathname.split("/").slice(-2)[0],
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

  const handleChange2 = (event) => {
    setContactInfo2({
      ...contactInfo2,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    let queryParam =
    pathname?.split("/")[pathname?.split("/")?.length - 1]
        .length > 0
        ? pathname?.split("/")[
            pathname?.split("/")?.length - 1
          ]
        : pathname?.split("/")[
            pathname?.split("/")?.length - 2
          ];
    getMethodApi(GET_NEWS_AND_RESEARCH_INSIDER + queryParam)
      .then((res) => {
        if (res.status === 200) {
          setNewsAndResearchInsider(res.data);
          if (res.data.length===0) {
            // navigate(`/search/${queryParam}`)
            router.replace(`/search?query=${queryParam}`)
          }
          setLoader(false);
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
  }, [pathname]);

  const createContactInfo = () => {
    contactInfo.ip_address = localStorage.getItem("IPAddress");

    if (contactInfo.name.trim() === "") {
      toast.error("Name is required !!");
      return;
    }

    if (contactInfo.companyName.trim() === "") {
      toast.error("Company name is required !!");
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

    postMethodApi(POST_CONTACT_US, contactInfo)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Contact Information is sent !!");
          router.push("/thank-you");
          setContactInfo({
            name: "",
            Company: "",
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

  const createContactInfo2 = () => {
    contactInfo2.ip_address = localStorage.getItem("IPAddress");

    if (contactInfo2.email.trim() === "") {
      toast.error("Email is required !!");
      return;
    }

    if (
      !contactInfo2.email.split("").includes("@") ||
      !contactInfo2.email.split("").includes(".")
    ) {
      toast.error("Enter proper email !!");
      return;
    }

    postMethodApi(POST_CONTACT_US, contactInfo2)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Contact Information is sent !!");
          setContactInfo2({
            email: "",
          });
          router.push("/thank-you");
        }
      })
      .catch((error) => {
        toast.error("Some error occur !!");
        return;
      });
  };

  const getdate = (date) => {
    const dateAlpha = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let splitdate = date?.split("-");
    // splitdate = splitdate.split("-").join(",");
    // return splitdate[1];
    return splitdate
      ? dateAlpha[parseInt(splitdate[1]) - 1] +
          " " +
          splitdate[2] +
          ", " +
          splitdate[0]
      : "";
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(pathname);
    toast.success("Copied to Clipboard.");
  };

  return (
    <>
        <title>
          {newsAndResearchInsider?.meta_title
            ? newsAndResearchInsider.meta_title
            : "Indices page"}
        </title>
        <link
          rel="canonical"
          href={`https://www.indxx.com${pathname}`}
          key="canonical"
        />
        <meta
          name="description"
          content={
            newsAndResearchInsider?.meta_description
              ? newsAndResearchInsider.meta_description
              : "description"
          }
        />
        <meta
          name="keywords"
          content={
            newsAndResearchInsider?.meta_keywords
              ? newsAndResearchInsider.meta_keywords
              : "keywords"
          }
        />
      <Box
        className="newsandresearchinsiderimg DF JCC AIC"
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundImage: `url(${
            newsAndResearchInsider?.Banner_Image === null ||
            newsAndResearchInsider?.Banner_Image === ""
              ? Banerimg
              : newsAndResearchInsider?.Banner_Image
          })`,
        }}
      >
        <Box component={"div"} className="container DF FFC JCC MT40 MB20">
          {newsAndResearchInsider?.label !== "" && (
            <Button className="ShortLongReadBtn MB20">
              {newsAndResearchInsider?.label}
            </Button>
          )}

          <Typography
            variant={"h1"}
            component={"h1"}
            className="newsandresearchinsiderbannerheading"
          >
            {newsAndResearchInsider ? newsAndResearchInsider["Title"] : ""}
          </Typography>
          <Typography
            variant={"p"}
            className="newsandresearchbannerdescription"
          >
            {newsAndResearchInsider
              ? getdate(newsAndResearchInsider["Date"])
              : getdate("2001-01-01")}
          </Typography>
          <Typography variant={"p"} className="authoredby" component={"p"}>
            {newsAndResearchInsider
              ? newsAndResearchInsider["authored_by"]
              : ""}
          </Typography>

          <Box
            component={"div"}
            className="bGColorWhite subscribeBtnBox bordRadius60 DF verySmallMobW100 JCSB AIC MB10"
          >
            <input
              name="email"
              type="email"
              className="subscribeInput bordRadius60 PL25 W48"
              placeholder="Enter your email"
              value={contactInfo2.email}
              onChange={handleChange2}
            />
            <Button
              className="bGColorBlue subscribeBtn bordRadius60 colorWhite PL20 PR20 W52"
              onClick={createContactInfo2}
            >
              <Image src={ArrowRight} alt="arrowright" className="MR8" />{" "}
              Subscribe to Indxx Insights
            </Button>
          </Box>
        </Box>
      </Box>

      <Box component={"div"} className="container">
        <Typography variant="h2" className="newsandresearchinsidersubheading">
          Introduction
        </Typography>

        <Box component={"div"} className="DF ">
          <Divider
            classes={`MT30  `}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />
        </Box>
        <Box component={"div"} className="newsandresearchinsiderdiv1"></Box>
        <Box component={"div"} className="newsandresearchinsiderdiv2">
          {/* <Typography variant={"p"} className="newsandresearchinsiderdes2"> */}
          <Typography variant={"p"}>
            {newsAndResearchInsider ? (
              <Interweave
                content={newsAndResearchInsider["intro_description"]}
              />
            ) : (
              ""
            )}
          </Typography>
        </Box>
      </Box>
      <Box component={"div"} className="container tablecontainer">
        <Typography
          variant="h2"
          component={"h2"}
          className="tablecontainerheading"
        >
          Table of Contents
        </Typography>
        <Box className="MT40">
          {newsAndResearchInsider
            ? newsAndResearchInsider["table_of_contents"]?.map((item, ind) => {
                return (
                  <>
                    <Typography
                      variant="h3"
                      component={"h3"}
                      className="cursorPointer tablecontainerdata"
                      onClick={() =>
                        document
                          .getElementById(`tableContent${ind + 1}`)
                          .scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "start",
                          })
                      }
                    >
                      {item.serial_no}
                      {". "}
                      {item.Title}
                    </Typography>
                  </>
                );
              })
            : ""}
        </Box>
      </Box>

      <Box component={"div"} className="container tabledescription">
        {newsAndResearchInsider
          ? newsAndResearchInsider["contents"]?.map((item, ind) => (
              <Box
              key={ind}
                component={"div"}
                id={`tableContent${ind + 1}`}
                className="PT140 MT-100 mobPT80 mobMT-50"
              >
                <Typography variant="h3" className="tabledescriptionheading">
                  {item.serial_no}
                  {". "}
                  {item.Title}
                </Typography>
                <Box className="tabledescriptionpara">
                  <Interweave content={item.description} />
                </Box>
              </Box>
            ))
          : ""}
        <Typography
          variant="p"
          component={"p"}
          className="discleemer MT40 smallMobMT20"
        >
          DISCLAIMER: The content provided in this article is intended solely
          for educational purposes and should not be construed as investment
          advice. Indxx explicitly disclaims any endorsement, approval, or
          expression of opinion with respect to any issuer, security, financial
          product, instrument, or trading strategy referenced. Any inquiries or
          requests for additional information can be directed to info@indxx.com.
        </Typography>
      </Box>
      <Box component={"div"} className="container">
        <Typography
          variant="h2"
          className="newsandresearchinsiderrefrences"
          id="section1"
        >
          REFERENCES
        </Typography>

        <Box component={"div"} className="DF ">
          <Divider
            classes={`MT30  `}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />
        </Box>

        <Box className="newsandresearchinsiderrefrenceslink">
          {newsAndResearchInsider ? (
            <Interweave content={newsAndResearchInsider["references"]} />
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Box component={"div"} className="container tablecontainer">
        <FormControl className="DF FFC formBox PB60 PT50 mobPT0 mobPB60 formcontrolplaceholder">
          <Typography variant="h2" className="tablecontainerheading">
            Contact Us
          </Typography>
          <Box className="contactFormLine JCSB AIC  FWW">
            <input
              name="name"
              id="name"
              placeholder="Name"
              className={`newsandresearchinsiderinput W30 smallMobW100 MT30 FontFamilyInter inputBoxContactusNewsAndResearch PB10`}
              style={{ color: "black" }}
              onChange={handleChange}
              value={contactInfo.name}
            />
            <input
              name="companyName"
              id="companyName"
              placeholder="Company Name"
              className={`newsandresearchinsiderinput W30 smallMobW100 MT30 FontFamilyInter inputBoxContactusNewsAndResearch  PB10`}
              style={{ color: "black" }}
              onChange={handleChange}
              value={contactInfo.companyName}
            />
            <input
              name="phoneNumber"
              id="phoneNumber"
              type="number"
              placeholder="Phone Number"
              className={`newsandresearchinsiderinput W30 smallMobW100 MT30 FontFamilyInter inputBoxContactusNewsAndResearch PB10`}
              style={{ color: "black" }}
              onChange={handleChange}
              value={contactInfo.phoneNumber}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 15);
              }}
            />
          </Box>

          <Box component={"div"} className="AIFS belowinput ">
            <Box className="reCaptcha">
              <ReCaptchaV2
                // sitekey={"6LfoBRUgAAAAAL6e1-thG56JCxpCRfDs_r5zoDry"}
                sitekey={"6Ld5c_UoAAAAAHqS4gazOrVdYHcxJ6t5K-9MfKfY"}
                // onChange={handleToken}
                // onExpire={handleExpire}
                className="captach"
              />
            </Box>
            <Box className="checkboxdiv">
              <Checkbox
                name="checkboxCookie"
                defaultChecked={false}
                value={contactInfo.checkboxCookie}
                onChange={handleChange}
                className="checkbox"
              ></Checkbox>
              <Typography className="checkboxcontent">
                I accept Indxx&apos;s terms of usage,<br></br> acknowledge the Data
                Privacy Policy,<br></br> and authorize to contact.{" "}
              </Typography>
            </Box>
            <Button
              className="newsresearchcontactbutton"
              onClick={createContactInfo}
            >
              Submit
            </Button>
          </Box>
        </FormControl>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Box>
      <Box component={"div"} className="container DF FFC JCC">
        <Typography variant="p" className="pressreleasesubheading1">
          Share On Social Media:
        </Typography>
      </Box>
      <Box component={"div"} className="container DF iconcontainer">
        {/* <TwitterShareButton
          url={pathname}
          media={pathname}
          quote={"Dummy text!"}
        > */}
          <Image className="pressreleaseicon" src={Twitter} alt="twitter" />
        {/* </TwitterShareButton> */}
        {/* <LinkedinShareButton
          url={pathname}
          media={pathname}
          quote={"Dummy text!"}
        > */}
          <Image className="pressreleaseicon" src={Linkdin} alt="linkdin" />
        {/* </LinkedinShareButton> */}
        {/* <EmailShareButton
          url={pathname}
          media={pathname}
          quote={"Dummy text!"}
        > */}
          <Image className="pressreleaseicon" src={Mailicon} alt="Mailicon" />
        {/* </EmailShareButton> */}
        <Image
          className="pressreleaseicon cursorPointer"
          src={Linkicon}
          alt="Linkicon"
          onClick={handleCopyUrl}
        />
      </Box>

      {/* loader */}
      {setTimeOutLoader || loader ? <Loader /> : ""}
    </>
  );
}
