"use client";
import {
  Box,
  Typography,
  Checkbox,
  InputLabel,
  // Select,
  MenuItem,
  OutlinedInput,
  FormControl,
  ListItemText,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import ReCaptchaV2 from "react-google-recaptcha";
// import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";

import phoneimg from "../../Assets/Icons/phoneimg.svg";
import emailimg from "../../Assets/Icons/emailimg.svg";
import { getMethodApi, postMethodApi } from "../../Utils/Methods";
import {
  GET_CONFIG,
  GET_CONTACT_US_DROPDOWN,
  GET_OFFICE_LOCATION,
  POST_CONTACT_US,
} from "../../Apis/EndPoints";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router";
// import { Helmet } from "react-helmet";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
// import { NextSeo } from "next-seo";
// import Head from "next/head";
import Link from "next/link";
// import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import Select from "react-select";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const contactUs = [{ icon: phoneimg }, { icon: emailimg }, { icon: emailimg }];

export default function ContactUs() {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  // const navigate = useNavigate();
  const router = useRouter();
  const [aboutUs, setAboutUs] = useState([]);
  const [location, setlocation] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(true);
  const [seoData, setSeoData] = useState("");
  const [loader2, setLoader2] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [areaOfIntrest, setAreaOfIntrest] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const pathname = usePathname();
  const [contactInfo, setContactInfo] = useState({
    name: "",
    Company: "",
    Email: "",
    Message: "",
    Phone: "",
    ip_address: "",
    intrest: [],
    checkboxCookie: false,
    page_name: pathname?.split("/")?.slice(-1)[0],
  });
  // const locationLink = useLocation();
  const getInTouch = useRef();
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleMultiSelect = (selected) => {
    setSelectedOptions(selected);
    setContactInfo({
      ...contactInfo,
      intrest: selected,
    });
  };

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    // setPersonName(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );
    setContactInfo({
      ...contactInfo,
      intrest: typeof value === "string" ? value.split(",") : value,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      let queryParam = pathname?.split("/");
      if (queryParam.includes("get-in-touch")) {
        getInTouch.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }, 2000);
  }, [pathname]);

  useEffect(() => {
    getMethodApi(GET_CONFIG).then((response) => {
      if (response.status === 200) {
        setAboutUs(response.data["Contact Us"]);
        setSeoData(response.data);
        setLoader(false);
      }
    });
    getMethodApi(GET_CONTACT_US_DROPDOWN).then((response) => {
      if (response.status === 200) {
        setAreaOfIntrest(response.data);
        setLoader2(false);
      }
    });
    getMethodApi(GET_OFFICE_LOCATION).then((response) => {
      if (response.status === 200) {
        setlocation(response.data);
        setLoader1(false);
      }
    });

    setTimeout(() => {
      setSetTimeOutLoader(false);
    }, 2000);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
    if (contactInfo.intrest.length === 0) {
      toast.error("Interest is required !!");
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
          router.replace("/thank-you");
          setContactInfo({
            name: "",
            Company: "",
            Email: "",
            Phone: "",
            intrest: [],
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

  return (
    <>
      {/* Seo */}
      {/* <Helmet> */}
      <title>
        {seoData?.Contact_us_Title
          ? seoData.Contact_us_Title[0].value
          : "Title"}
      </title>
      <link
        rel="canonical"
        href={`https://www.indxx.com${pathname}`}
        key="canonical"
      />
      <meta
        name="description"
        content={
          seoData?.Contact_us_Description
            ? seoData.Contact_us_Description[0].value
            : "description"
        }
      />
      <meta
        name="keywords"
        content={
          seoData?.Contact_us_Keywords
            ? seoData.Contact_us_Keywords[0].value
            : "keys"
        }
      />

      <Box className="contactusbannerimg DF JCC AIC">
        <Typography variant={"h1"} className="contactusbannerimgpara">
          {"Contact Us"}
        </Typography>
      </Box>

      <Box>
        <Box component={"div"} className="container">
          <Box
            component={"div"}
            className="getintouchContainer DF Fgap27 mobAIC MT4REM verySmallMobMT30"
          >
            <Box
              sx={{ width: "57.15%" }}
              className="boxshadow4sides bordr10px getintouchform"
            >
              <Box sx={{ p: 3.26 }}>
                <Typography variant={"h2"} className="contactusformheading">
                  {"Get in Touch"}
                </Typography>

                <Box
                  sx={{ mt: 3.25 }}
                  className="DF JCSB FWW getintouchinputfield"
                >
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

                <TextField
                  name="Message"
                  label="Message*"
                  className="accordionbggrey textfieldstylefull"
                  id="outlined-multiline-static linehtN"
                  multiline
                  rows={4}
                  size="small"
                  sx={{ height: 100, color: "#636363" }}
                  InputProps={{
                    style: {
                      height: "100px",
                      color: "#636363",
                    },
                  }}
                  onChange={handleChange}
                  value={contactInfo.Message}
                />

                {areaOfIntrest ? (
                  <Select
                    value={contactInfo.intrest}
                    onChange={handleMultiSelect}
                    options={areaOfIntrest}
                    closeMenuOnSelect={false}
                    isMulti
                    placeholder="Please select area of interest*"
                    className="selectfieldstyle"
                  />
                ) : (
                  ""
                )}

                {/* <FormControl
                  sx={{ width: "100%" }}
                  className="interestLabel MB20"
                >
                  <InputLabel id="demo-multiple-checkbox-label">
                    {" "}
                    Please select area of interest*{" "}
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name="intrest"
                    value={contactInfo.intrest}
                    onChange={handleChange2}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {areaOfIntrest?.map((name, ind) => (
                      <MenuItem
                        key={name}
                        value={
                          areaOfIntrest?.length - 1 === ind
                            ? name.slice(2, -2)
                            : name.slice(2, -1)
                        }
                      >
                        <Checkbox
                          checked={
                            contactInfo.intrest.indexOf(
                              areaOfIntrest?.length - 1 === ind
                                ? name.slice(2, -2)
                                : name.slice(2, -1)
                            ) > -1
                          }
                        />
                        <ListItemText
                          primary={
                            areaOfIntrest?.length - 1 === ind
                              ? name.slice(2, -2)
                              : name.slice(2, -1)
                          }
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

                {/* <select
                              name="intrest"
                              id=""
                              value={contactInfo.intrest}
                              onChange={handleChange}
                              className="accordionbggrey textfieldstyle checkboxIntrest PL10"
                            >
                              <option value="">Please select area of interest*</option>
                              {areaOfIntrest?.map((ele, ind) => {
                                return (
                                  <option key={ind} value={ele.slice(2, -1)}>
                                    {ele.slice(2, -1)}
                                  </option>
                                );
                              })}
                            </select> */}

                {/* <FormControl sx={{ width: "100%" }} className="interestLabel">
                  <InputLabel id="demo-multiple-chip-label">
                    Please select area of interest*{" "}
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    name="intrest"
                    value={contactInfo.intrest}
                    onChange={handleChange2}
                    className="accordionbggrey checkboxIntrest"
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    // MenuProps={MenuProps}
                  >
                    {areaOfIntrest?.map((name) => (
                      <MenuItem
                        key={name}
                        value={name.slice(2, -1)}
                        style={getStyles(name, contactInfo.intrest, theme)}
                      >
                        {name.slice(2, -1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

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
                  className="DF AIFS MB20 verySmallMobMB10"
                  // style={{ width: "48.027%" }}
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

                <Button
                  className="sendmsgBtn mobMT20 mobMAuto linehtN"
                  onClick={createContactInfo}
                >
                  {"Submit"}
                </Button>
              </Box>
            </Box>

            <Box className="callandemailbox">
              {aboutUs
                ?.filter((ele) => {
                  return ele.value !== "ADDRESS";
                })
                .map((ele, ind) => {
                  let name = ele.description;
                  if (ele.value === "EMAIL") {
                    name = ele.description.split(";")[0];
                  }
                  return (
                    <Box
                      className="DF iconsboxstyle MT1 boxshadow4sides bordr5px"
                      key={ind}
                    >
                      <Box className="bordr5px DF JCC AIC iconimgstyle">
                        <Image src={contactUs[ind]?.icon} alt="phoneimg" />
                      </Box>
                      <Box className="paddingtop125">
                        <Typography
                          variant="body1"
                          component={"p"}
                          className="iconssubhead"
                        >
                          {ele.value === "PHONE"
                            ? "Call Us"
                            : ele.value === "EMAIL"
                            ? "Email"
                            : ele.value}
                        </Typography>
                        <Typography
                          variant="body1"
                          component={"p"}
                          className="iconscontent"
                        >
                          {name}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Box>

          {location?.length > 0 ? (
            <Typography variant={"h3"} className="contactuslocationheading">
              {"Office Locations"}
            </Typography>
          ) : (
            ""
          )}
          <Box className="DF FWW FGap2R mobJCC mobFGap0">
            {location?.map((continents, i) => (
              <Box className="MT60 mobMT30" key={i}>
                <Box className="locationBtn mobMT20 mobMAuto DF AIC JCC PL10 PR10">
                  {Object.keys(continents)}
                </Box>
                <Box className={`locationbox DF FWW FGap2R JCFS mobJCC`}>
                  {Object.values(continents).map((item, i) => {
                    return item.map((city, ind) => (
                      <Box className="DF FFC" key={ind}>
                        <Image
                          className="locationimg"
                          loader={() => city.Image}
                          src={city.Image}
                          alt="locationimg"
                          width={1}
                          height={1}
                        />
                        <Typography variant={"p"} className="locationimgtext">
                          {city.city}
                        </Typography>
                      </Box>
                    ));
                  })}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {setTimeOutLoader || loader || loader1 || loader2 ? <Loader /> : ""}
    </>
  );
}
