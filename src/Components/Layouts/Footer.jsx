"use client";
import { Button, CssBaseline, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getMethodApi, postMethodApi } from "../../Utils/Methods";
import { GET_CONFIG, GET_TABS, POST_CONTACT_US } from "../../Apis/EndPoints";
import { useState } from "react";
import { useEffect } from "react";
import useStyles from "../../Assets/Styles/Common/Common";
import Logo from "./../../Assets/Svgs/indxxLogoWhite.svg";
import Map from "./../../Assets/Icons/map-location.svg";
import Call from "./../../Assets/Icons/call.svg";
import Email from "./../../Assets/Icons/mail.svg";
import ArrowRight from "./../../Assets/Icons/arrowRightSmall.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
// import { email } from "react-share";
import { useRouter } from "next/navigation";

function Copyright() {
  return (
    <Typography variant="body2">
      <Link
        href="https://www.indxx.com/"
        target="_blank"
        className="linkFooter"
      >
        {"© All Copyright, Indxx 2023 All Rights Reserved."}
      </Link>
    </Typography>
  );
}

export default function Footer() {
  const router = useRouter();
  const {
    menuButtonFooter,
    footerLowerContainer,
    footerUpperContainer,
    footerUnderline,
    footerHeading,
    text_18_footer,
    footerTextContactUs,
    footerHeadingBox,
  } = useStyles();
  const [tabsDataFooter, setTabsDataFooter] = useState([]);
  const [address, setaddress] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    Email: "",
    ip_address: "",
    page_name: "Footer",
  });

  useEffect(() => {
    getMethodApi(GET_TABS).then((response) => {
      if (response.status === 200) {
        setTabsDataFooter(response.data.F);
      }
    });
    getMethodApi(GET_CONFIG).then((response) => {
      if (response.status === 200) {
        setaddress(response.data["Contact Us"]);
      }
    });
  }, []);

  const getMenuButtonsAll = () => {
    return tabsDataFooter?.map(({ Name, Link }, ind) => {
      return (
        <Box
          // {...{
          key={ind}
          // to: Name === "Home" ? "/" : Name.toLowerCase().split(" ").join(""),
          className={`${menuButtonFooter} links noWrap mobMB1 menuButtonFooter`}
          onClick={() =>
            router.replace(
              `/${
                Name === "Home"
                  ? ""
                  : Name === "Careers"
                  ? `contact-us/${Name.toLowerCase().split(" ").join("-")}`
                  : Name.toLowerCase().split(" ").join("-")
              }`
            )
          }
          // }}
        >
          {Name}
        </Box>
      );
    });
  };

  const handleChange = (event) => {
    setContactInfo({
      ...contactInfo,
      [event.target.name]: event.target.value,
    });
  };

  const createContactInfo = () => {
    contactInfo.ip_address = localStorage.getItem("IPAddress");

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

    postMethodApi(POST_CONTACT_US, contactInfo)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Contact Information is sent !!");
          setContactInfo({
            Email: "",
            page_name: "",
          });
          router.push("/thank-you");
        }
      })
      .catch((error) => {
        toast.error("Some error occur !!");
        return;
      });
  };

  return (
    <>
      <CssBaseline />
      <Box>
        <Box className={`${footerUpperContainer} MT60`}>
          <Box className="DF JCSB FWW FGap2R">
            <Box className="DF FFC">
              <Box className={`${footerHeadingBox} MB40`}>
                <Image src={Logo} alt="white logo indxx" />
              </Box>
              <Box>
                <Typography variant="p" className={text_18_footer}>
                Founded in 2005 and with offices in the US and India, Indxx is
                  a leading global index provider. Indxx offers end-to-end
                  indexing services including index licensing, development,
                  calculation, and administration as well as{" "}
                  <Link
                    href={"https://www.indxx.com/indxx-data-&-technology"}
                    className="colorWhite"
                  >
                    {" "}
                    data and technology products
                  </Link>{" "}
                  (CAdmin & ITICS).
                </Typography>
              </Box>
            </Box>
            <Box className="DF FFC">
              <Box className={`DF ${footerHeadingBox} FFC JCSB MB40`}>
                <Typography variant="" className={footerHeading}>
                  {"Company"}
                </Typography>
                <Box className={footerUnderline}></Box>
              </Box>
              <Box className="DF FFC W10R"> {getMenuButtonsAll()} </Box>
            </Box>
            <Box className="DF FFC">
              <Box className={`DF ${footerHeadingBox} FFC JCSB MB40`}>
                <Typography variant="" className={footerHeading}>
                  {"Contact Us"}
                </Typography>
                <Box className={footerUnderline}></Box>
              </Box>
              <Box className="DF FFC JCSB IStretchF">
                <Box className="DF FFC ">
                  {address
                    ?.filter((ele, ind) => {
                      return ele.value !== "Human Resources";
                    })
                    ?.map((ele, indx) => {
                      let seprate = ele.description.split(";");
                      let img;
                      if (ele.value === "PHONE") {
                        img = Call;
                      } else if (ele.value === "EMAIL") {
                        img = Email;
                      } else {
                        img = Map;
                      }
                      return (
                        <Box className={`DF FFR JCFS AIFS`} key={indx}>
                          <Box className="W3R">
                            <Image src={img} alt="map" className="MT5" />
                          </Box>
                          <Box className="MB20">
                            {seprate?.map((ele, ind) => {
                              return (
                                <Typography
                                  key={ind}
                                  variant="p"
                                  className={`${footerTextContactUs}`}
                                >
                                  {ele}
                                </Typography>
                              );
                            })}
                          </Box>
                        </Box>
                      );
                    })}{" "}
                </Box>
                <Box
                  component={"div"}
                  className="bGColorWhite subscribeBtnBoxFooter bordRadius60 DF JCSB AIC"
                >
                  <input
                    name="Email"
                    type="Email"
                    className="subscribeInput bordRadius60 PL30 W60"
                    placeholder="Enter your email"
                    value={contactInfo.Email}
                    onChange={handleChange}
                  />
                  <Button
                    className="bGColorBlue subscribeBtnFooter bordRadius60 colorWhite PL20 PR20 W40"
                    onClick={createContactInfo}
                  >
                    <Image src={ArrowRight} alt="" className="MR10" />{" "}
                    {"Subscribe"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={`DF JCC AIC ${footerLowerContainer}`}>
          {Copyright()}
        </Box>
      </Box>

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
    </>
  );
}
