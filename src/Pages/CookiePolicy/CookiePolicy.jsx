"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Divider from "../../Components/Widgets/Divider";
// import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CookiePolicyBanner from "../../Assets/Images/cookiepolicybanner.png";
import PolicyImg from "../../Assets/Images/cookiepolicyimg.png";
import { useState } from "react";
import { getMethodApi } from "../../Utils/Methods";
import { GET_CONFIG } from "../../Apis/EndPoints";
import Loader from "../../Components/Loader/Loader";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function CookiePolicy() {
  const [expanded, setExpanded] = React.useState(false);
  const [hovered, setHovered] = useState(0);
  const [seoData, setSeoData] = useState("");
  const [loader1, setLoader1] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    getMethodApi(GET_CONFIG).then((response) => {
      if (response.status === 200) {
        setSeoData(response.data);
        setLoader1(false);
      }
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {/* Seo */}
      <title>
        {seoData?.CK_Title
          ? seoData.CK_Title[0].value
          : "Cookie Policy | Indxx"}
      </title>
      <link
          rel="canonical"
          href={`https://www.indxx.com${pathname}`}
          key="canonical"
        />
      <meta
        name="description"
        content={
          seoData?.CK_Description
            ? seoData.CK_Description[0].value
            : "This cookie policy outlines the use of cookies on our website and how we collect and use your data. Find out more here."
        }
      />
      <meta
        name="keywords"
        content={
          seoData?.CK_Keywords
            ? seoData.CK_Keywords[0].value
            : "Indxx Cookie Policy"
        }
      />

      <Box
        className="cookiepolicyimg DF AIC smallMobJCC"
        sx={{
          backgroundImage: `url(${CookiePolicyBanner.src})`,
        }}
      >
        <Typography variant={"h1"} className="cookiepolicyimgpara">
          {"Cookie Policy"}
        </Typography>
      </Box>

      <Box className="container MT7-5R CookiePolicyTop">
        <Typography variant="p" component={"p"} className="privacyHeading">
          {"COOKIE POLICY"}
        </Typography>

        <Divider
          classes={`MT20 MB10`}
          colorOne={"#395FD2"}
          colorTwo={"#ED3125"}
        />
      </Box>

      <Box component={"div"} className="container PB2-5R">
        <Box
          component={"div"}
          className="DF ImgAndTextGap FGap6R mobFFC mobAIC MT35"
        >
          <Box component={"div"} className="DF FFC JCFS W50 mobW100 MT40">
            <Typography
              variant="p"
              component={"p"}
              className="MT10 cookiepolicyText"
            >
              {
                "A cookie is a file containing an identifier (a string of letters and numbers) that is sent by a web server to a web browser and is stored by the browser. The identifier is then sent back to the server each time the browser requests a page from the server."
              }
            </Typography>

            <Typography
              variant="p"
              component={"p"}
              className="MT10 cookiepolicyText"
            >
              {
                'Cookies may be either "persistent" cookies or "session" cookies: a persistent cookie will be stored by a web browser and will remain valid until its set expiry date, unless deleted by the user before the expiry date; a session cookie, on the other hand, will expire at the end of the user session, when the web browser is closed.'
              }
            </Typography>

            <Typography
              variant="p"
              component={"p"}
              className="MT10 cookiepolicyText"
            >
              {
                "Cookies do not typically contain any information that personally identifies a user, but Personal Data that We store about You may be linked to the information stored in and obtained from cookies."
              }
            </Typography>
          </Box>

          <Image
            src={PolicyImg}
            alt=""
            className="bordRadTL bordRadBR W50 policyImg mobW80 curve3sides100"
          />
        </Box>
      </Box>

      <Box component="div" className="container CookieWeUse MT5R">
        <Box className="DF newsInsightContainer mobFFC boxshadow4sides announcementouterbox IStretchF DF FFC JCSB">
          <Box sx={{ m: 2 }} className="M34 MB0 mobML1 mobMR1 mobMT1">
            <Box className="newsandresearchreddiv linehtN">
              {"Cookie We Use"}
            </Box>
          </Box>

          <Box sx={{ mb: 5 }} className="M34LR MB0 mobML1 mobMR1">
            <Accordion
              className="removeaccordion"
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                className="P0"
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  Session Cookies
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="P0">
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    These are temporary cookies that contain no expiration date
                    and are deleted after the users browser is closed. You will
                    be required to log in again at the next session, where you
                    will be treated as a new user
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw600 colorRed linehtN Lspac"
                  >
                    Session cookies examples:
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Shopping cart, remembering previous actions, managing and
                    passing security tokens, multimedia content player session
                    cookies, load balancing session cookies and third party
                    social content plug in sharing cookies
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                className="P0"
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  Persistent Cookies
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="P0">
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    These are cookies which are saved in your browser until they
                    are deleted by the you or are deleted by your browser after
                    they reach their expiration date.
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw600 colorRed linehtN Lspac"
                  >
                    Persistent cookies examples:
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Authentication, language selection, theme selection,
                    favorites, internal site bookmarks, menu preferences,
                    address and payment information.
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                className="P0"
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  Functionality Cookies
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="P0">
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Functionality cookies allow us to remember choices that have
                    been made by you in order to create an experience that’s
                    made to fit. These cookies safely store authentication and
                    identification information, for example your language
                    selection or region.
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                className="P0"
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  Performance Cookies
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="P0">
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Performance cookies allow us to collect information, such as
                    the most used pages or error messages, in order to
                    understand how you use our website and enable us to create a
                    better user experience. All information collected by
                    performance cookies in anonymous.
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                className="P0"
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  Advertisement Tracking Cookies
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="P0">
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Advertising tracking cookies are third party cookies used by
                    advertisers to enable them to tailor their advertising to
                    you. Information is collected from your browser about the
                    types of websites you visit in order to offer advertisements
                    which will most likely interest you. The cookies are placed
                    by our advertisers with our permission.
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
            >
              <AccordionSummary
                className="P0"
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  Affiliate Tracking Cookies
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="P0">
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    When you come to us via an affiliate link a cookie is stored
                    on your browser and this cookie is used to track the
                    affiliate referral. We require this cookie in order to pay
                    commission to the referrer.
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>

      <Box className="container PurposeOfUsingCookie MT7-875R">
        <Typography
          variant="p"
          component={"p"}
          className="ManageCookieHeading colorRed"
        >
          {"Purpose Of Using Cookies"}
        </Typography>

        <Divider
          classes={`MT20 MB10`}
          colorOne={"#395FD2"}
          colorTwo={"#ED3125"}
        />

        <Box className="MT3-25R DF FWW JCSB smallMobJCC FCG1">
          <Box
            className="outerBox boxshadow4sides"
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(0)}
          >
            <Box
              className="innerBoxTop"
              sx={{ bgcolor: `${hovered === 1 ? "#395FD2" : "#FFFFFF"}` }}
            >
              <Typography
                variant="p"
                component={"p"}
                className="innerBoxTopHeading PT28 MA"
                sx={{ color: `${hovered === 1 ? "#FFFFFF" : "#395FD2"}` }}
              >
                {"Authentication"}
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                className="innerBoxTopText PT20 MA"
                sx={{ color: `${hovered === 1 ? "#FFFFFF" : "#000000"}` }}
              >
                {
                  "We use cookies to identify You when You visit Our Website and as You navigate Our Website;"
                }
              </Typography>
            </Box>
            <Box
              className="innerBoxBottom"
              sx={{ bgcolor: `${hovered === 1 ? "#FFFFFF" : "#395FD2"}` }}
            ></Box>
          </Box>

          <Box
            className="outerBox boxshadow4sides"
            onMouseEnter={() => setHovered(2)}
            onMouseLeave={() => setHovered(0)}
          >
            <Box
              className="innerBoxTop"
              sx={{ bgcolor: `${hovered === 2 ? "#395FD2" : "#FFFFFF"}` }}
            >
              <Typography
                variant="p"
                component={"p"}
                className="innerBoxTopHeading PT28 MA"
                sx={{ color: `${hovered === 2 ? "#FFFFFF" : "#395FD2"}` }}
              >
                {"Status"}
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                className="innerBoxTopText PT20 MA"
                sx={{ color: `${hovered === 2 ? "#FFFFFF" : "#000000"}` }}
              >
                {
                  "We use cookies to help Us determine if You are logged into Our Website;"
                }
              </Typography>
            </Box>
            <Box
              className="innerBoxBottom"
              sx={{ bgcolor: `${hovered === 2 ? "#FFFFFF" : "#395FD2"}` }}
            ></Box>
          </Box>

          <Box
            className="outerBox boxshadow4sides"
            onMouseEnter={() => setHovered(3)}
            onMouseLeave={() => setHovered(0)}
          >
            <Box
              className="innerBoxTop"
              sx={{ bgcolor: `${hovered === 3 ? "#395FD2" : "#FFFFFF"}` }}
            >
              <Typography
                variant="p"
                component={"p"}
                className="innerBoxTopHeading PT28 MA"
                sx={{ color: `${hovered === 3 ? "#FFFFFF" : "#395FD2"}` }}
              >
                {"Personalization"}
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                className="innerBoxTopText PT20 MA"
                sx={{ color: `${hovered === 3 ? "#FFFFFF" : "#000000"}` }}
              >
                {
                  "We use cookies to store information about Your preferences and to personalize the Website for You;"
                }
              </Typography>
            </Box>
            <Box
              className="innerBoxBottom"
              sx={{ bgcolor: `${hovered === 3 ? "#FFFFFF" : "#395FD2"}` }}
            ></Box>
          </Box>

          <Box
            className="outerBox boxshadow4sides"
            onMouseEnter={() => setHovered(4)}
            onMouseLeave={() => setHovered(0)}
          >
            <Box
              className="innerBoxTop"
              sx={{ bgcolor: `${hovered === 4 ? "#395FD2" : "#FFFFFF"}` }}
            >
              <Typography
                variant="p"
                component={"p"}
                className="innerBoxTopHeading PT28 MA"
                sx={{ color: `${hovered === 4 ? "#FFFFFF" : "#395FD2"}` }}
              >
                {"Security"}
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                className="innerBoxTopText PT20 MA"
                sx={{ color: `${hovered === 4 ? "#FFFFFF" : "#000000"}` }}
              >
                {
                  "We use cookies as an element of the security measures used to protect user accounts, including preventing fraudulent use of login credentials, and to protect Our Website and Services generally;"
                }
              </Typography>
            </Box>
            <Box
              className="innerBoxBottom"
              sx={{ bgcolor: `${hovered === 4 ? "#FFFFFF" : "#395FD2"}` }}
            ></Box>
          </Box>

          <Box
            className="outerBox boxshadow4sides"
            onMouseEnter={() => setHovered(5)}
            onMouseLeave={() => setHovered(0)}
          >
            <Box
              className="innerBoxTop"
              sx={{ bgcolor: `${hovered === 5 ? "#395FD2" : "#FFFFFF"}` }}
            >
              <Typography
                variant="p"
                component={"p"}
                className="innerBoxTopHeading PT28 MA"
                sx={{ color: `${hovered === 5 ? "#FFFFFF" : "#395FD2"}` }}
              >
                {"Advertising"}
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                className="innerBoxTopText PT20 MA"
                sx={{ color: `${hovered === 5 ? "#FFFFFF" : "#000000"}` }}
              >
                {
                  "We use cookies to help Us to display advertisements that will be relevant to You;"
                }
              </Typography>
            </Box>
            <Box
              className="innerBoxBottom"
              sx={{ bgcolor: `${hovered === 5 ? "#FFFFFF" : "#395FD2"}` }}
            ></Box>
          </Box>

          <Box
            className="outerBox boxshadow4sides"
            onMouseEnter={() => setHovered(6)}
            onMouseLeave={() => setHovered(0)}
          >
            <Box
              className="innerBoxTop"
              sx={{ bgcolor: `${hovered === 6 ? "#395FD2" : "#FFFFFF"}` }}
            >
              <Typography
                variant="p"
                component={"p"}
                className="innerBoxTopHeading PT28 MA"
                sx={{ color: `${hovered === 6 ? "#FFFFFF" : "#395FD2"}` }}
              >
                {"Analysis"}
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                className="innerBoxTopText PT20 MA"
                sx={{ color: `${hovered === 6 ? "#FFFFFF" : "#000000"}` }}
              >
                {
                  "We use cookies to help Us to analyze the use and performance of Our Website and Services;"
                }
              </Typography>
            </Box>
            <Box
              className="innerBoxBottom"
              sx={{ bgcolor: `${hovered === 6 ? "#FFFFFF" : "#395FD2"}` }}
            ></Box>
          </Box>
        </Box>
      </Box>

      <Box component="div" className="bGColorBlue MT4-375R">
        <Box className="container PT4R PB4R">
          <Box>
            <Typography
              variant="p"
              component={"p"}
              className="cookieServiceHeading colorWhite"
            >
              {"Cookies Used by Our Service Providers"}
            </Typography>
          </Box>

          <Typography
            variant="p"
            component={"p"}
            className="cookieServiceText colorWhite MT2-375R fw400"
          >
            {
              "Our service providers use cookies and those cookies may be stored on Your computer when You visit Our Website."
            }
          </Typography>
          <Typography
            variant="p"
            component={"p"}
            className="cookieServiceText colorWhite MT1-475 fw600"
          >
            {"Google Analytics"}
          </Typography>

          <Box className="MT1-475 TAC">
            <Typography
              variant="span"
              component={"span"}
              className="cookieServiceText colorWhite fw400"
            >
              {`We use Google Analytics to analyze the use of Our Website. Google Analytics gathers information about Website use by means of cookies. The information gathered relating to Our Website is used to create reports about the use of Our Website. Google's privacy policy is available at:`}
            </Typography>
            <Link
              href={"https://www.google.com/policies/privacy/"}
              target="_blank"
              className="links"
            >
              <Typography
                component={"span"}
                className="cookieServiceText colorWhite fw400"
              >
                {" https://www.google.com/policies/privacy/."}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box className="container ManageingCookie MT7-5R PB3-75R">
        <Typography
          variant="p"
          component={"p"}
          className="ManageCookieHeading colorRed"
        >
          {"Managing Cookies"}
        </Typography>

        <Divider
          classes={`MT20 MB10`}
          colorOne={"#395FD2"}
          colorTwo={"#ED3125"}
        />

        <Typography
          variant="p"
          component={"p"}
          className="ManageCookieText MT40 TAC"
        >
          {
            "You can disable cookie tracking and learn more about the privacy policies of the third parties We use by visiting the following links:"
          }
        </Typography>

        <Box component={"div"} className="DF JCSB">
          <Box className="DF FFC JCSB MT2-938R">
            <Typography
              variant="p"
              component={"p"}
              className="fs1-125R fw600 ReuceManageCookieText linehtN Lspac"
            >
              {"Third Party"}
            </Typography>

            <Typography
              variant="p"
              component={"p"}
              className="fs1-125R fw600 MT2-75R ReuceManageCookieText linehtN Lspac"
            >
              {"Google Analytics"}
            </Typography>

            <Typography
              variant="p"
              component={"p"}
              className="fs1-125R fw600 MT2-75R ReuceManageCookieText linehtN Lspac"
            >
              {"Facebook Ads"}
            </Typography>
          </Box>
          <Box className="DF FFC AIC JCSB MT2-75R">
            <Typography
              variant="p"
              component={"p"}
              className="fs1-125R fw600 ReuceManageCookieText linehtN Lspac"
            >
              {"Opt Out Page"}
            </Typography>

            <Link
              href={"https://tools.google.com/dlpage/gaoptout"}
              target="_blank"
              className="colorRed MT2-75R "
            >
              <Typography
                component={"span"}
                className="fw600 fs1-125R ReuceManageCookieText linehtN Lspac"
              >
                {"Opt Out"}
              </Typography>
            </Link>

            <Link
              href={"https://www.facebook.com/help/568137493302217"}
              target="_blank"
              className="colorRed MT2-75R "
            >
              <Typography
                component={"span"}
                className=" fw600 fs1-125R ReuceManageCookieText linehtN Lspac"
              >
                {"Opt Out "}
              </Typography>
            </Link>
          </Box>
          <Box className="DF FFC JCSB MT2-75R">
            <Typography
              variant="p"
              component={"p"}
              className="fs1-125R fw600 ReuceManageCookieText linehtN Lspac"
            >
              {"Privacy Policy"}
            </Typography>

            <Link
              href={"https://policies.google.com/privacy"}
              target="_blank"
              className="colorRed MT2-75R"
            >
              <Typography
                component={"span"}
                className=" fw600 fs1-125R ReuceManageCookieText linehtN Lspac"
              >
                {"Privacy Policy"}
              </Typography>
            </Link>

            <Link
              href={"https://www.facebook.com/about/privacy/"}
              target="_blank"
              className="colorRed MT2-75R "
            >
              <Typography
                component={"span"}
                className=" fw600 fs1-125R ReuceManageCookieText linehtN Lspac"
              >
                {"Privacy Policy"}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
      {loader1 ? <Loader /> : ""}
    </>
  );
}
