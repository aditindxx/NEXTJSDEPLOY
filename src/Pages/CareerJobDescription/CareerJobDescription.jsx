"use client";
import { Box, Button, Typography, Checkbox, FormControl } from "@mui/material";
import React, { useRef } from "react";
import { useEffect } from "react";
import { getMethodApi, postMethodApi } from "../../Utils/Methods";
import {
  GET_CAREER_JOB_DESCRIPTION,
  POST_APPLYJOB,
} from "../../Apis/EndPoints";
import { useState } from "react";
import Loader from "../../Components/Loader/Loader";
import ReCaptchaV2 from "react-google-recaptcha";
import { toast } from "react-toastify";
// import { useLocation, useNavigate } from "react-router-dom";
import { Interweave } from "interweave";
// import { Helmet } from "react-helmet";
import { usePathname, useRouter } from "next/navigation";

export default function CareerJobDescription() {
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [selectedfile, setselectedfile] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    contactno: "",
    qualification: "",
    email: "",
    experience: "",
    noticeperiod: "",
    checkboxCookie: false,
  });
  // const navigate = useNavigate();
  const router = useRouter();
  // const location = useLocation();
  const pathname = usePathname();
  const jobOpeningsRef = useRef();

  useEffect(() => {
    let queryParam = pathname?.split("/")[pathname?.split("/")?.length - 1];
    getMethodApi(GET_CAREER_JOB_DESCRIPTION + queryParam).then((response) => {
      if (response.status === 200) {
        setData(response.data);
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
  }, [pathname]);
  const createContactInfo = () => {
    if (contactInfo.name.trim() === "") {
      toast.error("Name is required !!");
      return;
    }

    if (contactInfo.qualification.trim() === "") {
      toast.error("Qualification is required !!");
      return;
    }
    if (selectedfile === "") {
      toast.error("CV is required !!");
      return;
    }
    if (contactInfo.email.trim() === "") {
      toast.error("Email is required !!");
      return;
    }

    if (
      !contactInfo.email.split("").includes("@") ||
      !contactInfo.email.split("").includes(".")
    ) {
      toast.error("Enter proper email !!");
      return;
    }

    if (contactInfo.experience.trim() === "") {
      toast.error("Total Experience is required !!");
      return;
    }
    if (contactInfo.noticeperiod.trim() === "") {
      toast.error("Notice Period is required !!");
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

    const fmData = new FormData();

    fmData.append("Name", contactInfo.name);
    fmData.append("Email", contactInfo.email);
    fmData.append("Contact_no", contactInfo.contactno);
    fmData.append("Experience", contactInfo.experience);
    fmData.append("Qualification", contactInfo.qualification);
    fmData.append("Notice_period", contactInfo.noticeperiod);
    fmData.append("CV", selectedfile);
    fmData.append("opening", data?.id);

    postMethodApi(POST_APPLYJOB, fmData)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Information Sent Successfully !!");
          setContactInfo({
            name: "",
            contactno: "",
            qualification: "",
            email: "",
            experience: "",
            noticeperiod: "",
            checkboxCookie: false,
          });
          setselectedfile("");
          router.push("/thank-you");
        }
      })
      .catch((error) => {
        toast.error("Some error occur !!");
        return;
      });
  };

  const fileupload = (e) => {
    if (
      e.target.files[0].name.slice(-3) === "pdf" ||
      e.target.files[0].name.slice(-4) === "docx"
    ) {
      setselectedfile(e.target.files[0]);
    } else {
      toast.error("Please Upload PDF or Doc File only.");
    }
  };

  const handleChange = (event) => {
    setContactInfo({
      ...contactInfo,
      [event.target.name]:
        event.target.name !== "checkboxCookie"
          ? event.target.value
          : event.target.checked,
    });
  };

  const openingJobsScroll = () => {
    jobOpeningsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
  };

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
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        className="carrerjobdescriptionimg"
      >
        <Box component={"div"} className="container DF FFC JCC AIC">
          <Typography
            component={"h1"}
            variant={"h1"}
            className="topHeadingPageCareer"
          >
            {data ? data["Title"] : ""}
          </Typography>
          <Button
            className="bannerBtn MT30 MB20"
            variant="outlined"
            onClick={() => {
              openingJobsScroll();
            }}
          >
            {"Join Our Team"}
          </Button>
        </Box>
      </Box>
      <Box component={"div"} className="container carrerjobContainer">
        <Typography component={"p"} variant={"p"} className="belowbannertext">
          <span className="textColor">Location :</span>
          <span className="dynamic"> {data ? data["Location"] : ""}</span>
        </Typography>
        <Typography component={"p"} variant={"p"} className="belowbannertext">
          <span className="textColor">Role : </span>
          <span className="dynamic">
            {data ? <Interweave className="role" content={data["Role"]} /> : ""}
          </span>
        </Typography>
        <Typography component={"p"} variant={"p"} className="belowbannertext">
          <span className="textColor">No. of Openings :</span>
          <span className="dynamic"> {data ? data["Opening"] : ""}</span>
        </Typography>
        <Typography component={"p"} variant={"p"} className="belowbannertext">
          <span className="textColor">Work Mode :</span>
          <span className="dynamic"> {data ? data["Job_Type"] : ""}</span>
        </Typography>
        <Typography component={"h2"} variant={"h2"} className="heading2">
          ROLE SUMMARY:
        </Typography>
        <Typography component={"h2"} variant={"h2"} className="heading2descr">
          {data ? (
            <Interweave content={data["ROLE_SUMMARY_AND_RESPONSIBILITIES"]} />
          ) : (
            ""
          )}
        </Typography>
        <Typography component={"h2"} variant={"h2"} className="heading3">
          ROLE RESPONSIBILITIES:
        </Typography>
        <Typography component={"h2"} variant={"h2"} className="heading2descr">
          {data ? <Interweave content={data["ROLE_RESPONSIBILITIES"]} /> : ""}
        </Typography>
        <Typography component={"h2"} variant={"h2"} className="heading3">
          REQUIRED SKILLS:
        </Typography>
        <Typography component={"h2"} variant={"h2"} className="heading2descr">
          {data ? (
            <Interweave
              content={
                data.REQUIRED_TECHNICAL_QUALIFICATIONS_in_order_of_level_of_need
              }
            />
          ) : (
            ""
          )}
        </Typography>
        <Typography component={"h2"} variant={"h2"} className="heading3">
          EDUCATIONAL REQUIREMENTS:
        </Typography>
        <Typography component={"h2"} variant={"h2"} className="heading2descr">
          {data ? <Interweave content={data["EDUCATION_REQUIREMENTS"]} /> : ""}
        </Typography>
      </Box>
      <Box
        component={"div"}
        className="container contactformDiv"
        ref={jobOpeningsRef}
      >
        <Typography
          component={"h2"}
          variant={"h2"}
          className="contactformheading"
        >
          Apply to Indxx
        </Typography>
        <FormControl className="DF FFC formBox PB60 PT50 mobPT0 mobPB60 ">
          <Box className="mainformdiv AIStretch">
            <Box component={"div"}>
              <input
                name="name"
                id="name"
                placeholder="Full Name"
                className={`careerjobdescriptioninput MT30 FontFamilyInter inputBoxJobDescription PB10`}
                onChange={handleChange}
                value={contactInfo.name}
              />
              <input
                name="contactno"
                id="contactno"
                type="number"
                placeholder="Contact No"
                className={`careerjobdescriptioninput MT30 FontFamilyInter inputBoxJobDescription  PB10`}
                onChange={handleChange}
                value={contactInfo.contactno}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 15);
                }}
              />
              <input
                name="qualification"
                id="qualification"
                placeholder="Highest Professional Qualification"
                className={`careerjobdescriptioninput MT30 FontFamilyInter inputBoxJobDescription  PB10`}
                onChange={handleChange}
                value={contactInfo.qualification}
              />
              <input
                name="uploadcv"
                id="uploadcv"
                placeholder="Upload CV"
                type="file"
                className={`careerjobdescriptioninputupload MT30 FontFamilyInter inputBoxJobDescription PB10`}
                onChange={fileupload}
              />
            </Box>
            <Box component={"div"}>
              <input
                name="email"
                id="email"
                placeholder="Email Id"
                className={`careerjobdescriptioninput MT30 FontFamilyInter inputBoxJobDescription PB10`}
                onChange={handleChange}
                value={contactInfo.email}
              />
              <input
                name="experience"
                id="experience"
                type="number"
                placeholder="Total Years of experience"
                className={`careerjobdescriptioninput MT30 FontFamilyInter inputBoxJobDescription  PB10`}
                onChange={handleChange}
                value={contactInfo.experience}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseFloat(e.target.value))
                    .toString()
                    .slice(0, 3);
                }}
              />
              <input
                name="noticeperiod"
                id="noticeperiod"
                placeholder="Joining time/ Notice Period"
                className={`careerjobdescriptioninput MT30 FontFamilyInter inputBoxJobDescription  PB10`}
                onChange={handleChange}
                value={contactInfo.noticeperiod}
              />
              <Box className="checkboxdivcareerjob DF">
                <Checkbox
                  name="checkboxCookie"
                  defaultChecked={false}
                  value={contactInfo.checkboxCookie}
                  onChange={handleChange}
                  className="checkboxcareerjob PL0 PT2"
                ></Checkbox>
                <Typography className="checkboxcontentcareerjob linehtN">
                  I accept Indxx&apos;s terms of usage, acknowledge the Data Privacy
                  Policy, and authorize to contact.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box component={"div"} className="MT30 mobMT20 smallMobMT10 DF AIStretch smallMobFFC">
            <Box>
              <Box className="reCaptcha">
                <ReCaptchaV2
                  sitekey={"6Ld5c_UoAAAAAHqS4gazOrVdYHcxJ6t5K-9MfKfY"}
                  // onChange={handleToken}
                  // onExpire={handleExpire}
                  className="captach"
                />
              </Box>
            </Box>
            <Box>
              <Button
                className="careerjobdescontactbutton"
                onClick={createContactInfo}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </FormControl>
      </Box>

      {/* loader */}
      {setTimeOutLoader || loader ? <Loader /> : ""}
    </>
  );
}
