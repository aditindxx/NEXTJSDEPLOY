"use client";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Interweave } from "interweave";
// import Divider from "../../Components/Widgets/Divider";
import { getMethodApi } from "../../Utils/Methods";
import { GET_ABOUT_US, GET_AWARDS, GET_PEOPLE } from "../../Apis/EndPoints";

import IkeepRedCircleStart from "./../../Assets/Svgs/ikeepRedCircleStart.svg";
import IkeepBlueCircleMid from "./../../Assets/Svgs/ikeepBlueCircleMid.svg";
import IkeepRedCircleMid from "./../../Assets/Svgs/ikeepRedCircleMid.svg";
import IkeepRedCircleEnd from "./../../Assets/Svgs/ikeepRedCircleEnd.svg";
import IkeepBlueCircleEnd from "./../../Assets/Svgs/ikeepBlueCircleEnd.svg";
import linkedIn from "./../../Assets/Icons/linkedin.svg";
import Loader from "../../Components/Loader/Loader";
// import { Link, useLocation } from "react-router-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Head from 'next/head';


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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
}

export default function AboutUs() {
  const [awardsData, setAwardsData] = useState([]);
  const [aboutUsData, setAboutUsData] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [indxForDescrip, setIndxForDescrip] = useState(null);
  const [indxForDescripTwo, setIndxForDescripTwo] = useState(null);
  const [loader1, setLoader1] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [loader3, setLoader3] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const executiveDescription = useRef();
  const leadershipDescription = useRef();
  const coreValues = useRef();
  const awards = useRef();
  const ourPeoples = useRef();
  // const location = useLocation();
  const pathname = usePathname();

  const dateFunction = (date) => {
    let dateArr = date.split("-");
    return `${dateAlpha[+dateArr[1] - 1]} ${dateArr[0]}`;
  };

  useEffect(() => {
    let queryParam = pathname?.split("/");
    setTimeout(() => {
      if (queryParam.includes("core-values")) {
        coreValues.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (queryParam.includes("awards")) {
        awards.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (queryParam.includes("our-people")) {
        ourPeoples.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }, 2000);
  }, [pathname]);

  useEffect(() => {
    getMethodApi(GET_AWARDS).then((response) => {
      if (response.status === 200) {
        setAwardsData(response.data);
        setLoader1(false);
      }
    });
    getMethodApi(GET_ABOUT_US).then((response) => {
      if (response.status === 200) {
        setAboutUsData(response.data);
        setLoader2(false);
      }
    });
    getMethodApi(GET_PEOPLE).then((response) => {
      if (response.status === 200) {
        setPeopleData(response.data);
        setLoader3(false);
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

  return (
    <>
      <title>
        {aboutUsData?.meta_title ? aboutUsData.meta_title : "About Us | Indxx"}
      </title>
      <link
          rel="canonical"
          href={`https://www.indxx.com${pathname}`}
          key="canonical"
        />
      <meta
        name="description"
        content={
          aboutUsData?.meta_description
            ? aboutUsData.meta_description
            : "Founded in 2005 and with offices in the United States and India, Indxx is a leading index provider delivering a range of indexing solutions. Learn more here."
        }
      />
      <meta
        name="keywords"
        content={
          aboutUsData?.meta_keywords ? aboutUsData.meta_keywords : "keywords"
        }
      />

      {/* Heading and BG */}
      <Box
        className="aboutUsHeadingBG smallMobPB0 DF JCC AIC PB60 PL1 PR1"
        sx={{
          backgroundImage: `url(${
            aboutUsData.Banner_Image ? aboutUsData.Banner_Image : ""
          })`,
        }}
      >
        <Typography
          variant={""}
          className="topHeadingPageAboutUs W60 TAC mobW100"
        >
          {aboutUsData.Title ? aboutUsData.Title : ""}
        </Typography>
      </Box>

      {/* about us description and image */}
      <Box
        component={""}
        className="DF overviewBox verySmallMobFFC verySmallMobMT20 smallMobMT40"
      >
        <Box
          component={"div"}
          sx={{
            backgroundImage: `url(${
              aboutUsData.Image ? aboutUsData.Image : ""
            })`,
          }}
          className="imgForFull flexRatio12"
        ></Box>
        <Box className="DF FFC overviewBoxText AIFS JCC ML40 PL20 flexRatio21 MT25 MB25 verySmallMobML1 verySmallMobMR1 verySmallMobPL0 verySmallMobAIC">
          <Typography
            variant="h1"
            component={"h1"}
            className="subHeadingOverview verySmallMobPT10"
          >
            {"About Indxx"}
          </Typography>
          <Typography
            variant=""
            className="text PT1 verySmallMobPT10 PR50 overviewTextOnly verySmallMobPR0 verySmallMobTAC"
          >
            {aboutUsData.description ? (
              <Interweave content={aboutUsData.description} />
            ) : (
              ""
            )}
          </Typography>
        </Box>
      </Box>

      {/* ikeep  */}
      <Box component={"div"} className="container MT60">
        <Box className="DF FFC AIC">
          <Typography variant="h2" component="h2" className="subHeadingRed">
            {"Indxx Core Values : IKEEP"}
          </Typography>

          <Typography
            variant=""
            className="textDescriptionAboutUs PT1 TAC textWidth mobW100"
            ref={coreValues}
          >
            {"Indxx's company values can be summarized as 'IKEEP'"}
          </Typography>
        </Box>

        {/* desktop */}
        <Box
          component={"div"}
          className="MT60 DF FFC FGap10 ikeepBox mobDispNone900"
        >
          {aboutUsData?.IKEEP?.map((ele, ind) => {
            return (
              <Box key={ind} component={"div"} className="DF FGap2R">
                <Box component={"div"} className="IStretchF">
                  <Box
                    component={"div"}
                    className={`${ind % 2 === 0 ? "visibilityNone" : ""}`}
                  >
                    <Typography
                      variant="h6"
                      className={`ikeepSubHeading colorBlue`}
                    >
                      {ele.title}
                    </Typography>
                    <Interweave
                      className="ikeepSubText"
                      content={ele.description}
                    />
                  </Box>
                </Box>
                <Box
                  component={"div"}
                  className="ikeepIconBorderBox DF FFC JCSB"
                >
                  <Box
                    component={"div"}
                    className={`DF AIC JCC ${
                      ind === 0
                        ? "ikeepIconBorderTopBot DF AIC JCC PB20"
                        : ind === aboutUsData.IKEEP?.length - 1
                        ? "ikeepIconBorderTopBot DF AIC JCC PT20"
                        : ind > 0 && ind < aboutUsData.IKEEP?.length - 1
                        ? ind % 2 === 0
                          ? "ikeepIconBorderMid DF AIC JCC"
                          : "ikeepIconBorderMid DF AIC JCC"
                        : ""
                    }`}
                    sx={{
                      backgroundImage: `url(${
                        ind === 0
                          ? IkeepRedCircleStart.src
                          : ind === aboutUsData.IKEEP?.length - 1
                          ? ind % 2 === 0
                            ? IkeepRedCircleEnd.src
                            : IkeepBlueCircleEnd.src
                          : ind > 0 && ind < aboutUsData.IKEEP?.length - 1
                          ? ind % 2 === 0
                            ? IkeepRedCircleMid.src
                            : IkeepBlueCircleMid.src
                          : ""
                      })`,
                    }}
                  >
                    <Image
                      loader={() => ele.image}
                      src={ele.image}
                      width={40}
                      height={40}
                      alt=""
                      className="ikeepIcon"
                    />
                  </Box>
                </Box>
                <Box component={"div"} className="IStretchF">
                  <Box
                    component={"div"}
                    className={`${ind % 2 === 1 ? "visibilityNone" : ""}`}
                  >
                    <Typography
                      variant="h6"
                      className={`ikeepSubHeading colorRed`}
                    >
                      {ele.title}
                    </Typography>
                    <Interweave
                      className="ikeepSubText"
                      content={ele.description}
                    />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* mobile */}
        <Box
          component={"div"}
          className="MT60 verySmallMobMT10 devProcessBox DF deskDispNone900"
        >
          <Box component={"div"} className="iconContainer ML0 mobW100 TAC">
            {aboutUsData.IKEEP?.map((ele, ind) => {
              return (
                <Box component={"span"} className="iconBox1Mob" key={ind}>
                  <Box className="mobML6Percent">
                    <Image
                      src={
                        ind % 2 === 0
                          ? IkeepRedCircleMid.src
                          : IkeepBlueCircleMid.src
                      }
                      alt=""
                      width={180}
                      height={120}
                      className="iconsBorderMob"
                    />
                    <Image
                      loader={() => ele.image}
                      src={ele.image}
                      height={30}
                      width={30}
                      alt=""
                      className="ikeeoiconsMob"
                    />
                  </Box>
                  <Box component={"div"} className="">
                    <Typography
                      variant="h6"
                      className={`devProcessHeading ${
                        ind % 2 === 0 ? "colorRed" : "colorBlue"
                      }`}
                    >
                      {ele.title}
                    </Typography>
                    <Interweave
                      className="ikeepSubText"
                      content={ele.description}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* our awards */}
      <Box
        component={"div"}
        className="container MT124 mobMT60 boxshadow4sides bordRadius10 awardTabPanelBox overflowHidden"
      >
        <Box
          component={"div"}
          className="PT40 PR40 PL40 mobPT1 mobPL1 mobPR1 "
          ref={awards}
        >
          <Box className="ourAwardBox FFC">
            <Typography
              component={"h3"}
              variant="h3"
              className="subHeadingWhiteAwards PT20"
            >
              {"Our Awards"}
            </Typography>
            <Typography
              component={"p"}
              className="textDescriptionAward colorWhite W60 verySmallMobW90 TAC MA verySmallMobPB10 PB20"
            >
              {
                "Indxx and products tracking our indices have been nominated for and received numerous awards, including most recently:"
              }
            </Typography>
          </Box>
        </Box>

        <Box className="tabpanelyear PB30">
          <TabPanel className="awardTabPanel P2 PL1 PT1 PT37">
            {awardsData?.map((ele, ind) => {
              return (
                <Box
                  component="span"
                  key={ind}
                  className={"links DF JCSB awardTabPanelChild AIS FGap2R PT10"}
                >
                  <Box component="span" className="W15 MR10 textAwardsData">
                    {dateFunction(ele.Date)}
                  </Box>
                  <Box
                    component="span"
                    className="tabPanelTitle textAwardsData IStretchF"
                  >
                    <Interweave content={ele.Description} />
                  </Box>
                </Box>
              );
            })}
          </TabPanel>
        </Box>
      </Box>

      {/* our people */}
      <Box component={"div"} className="MT133 mobMT60 container">
        <Typography variant="h2" className="subHeadingRed" ref={ourPeoples}>
          {"Our People"}
        </Typography>

        <Box>
          <Typography
            component={"h3"}
            variant=""
            className="ourPeopleSectionHeading DF JCC AIC MB40 MT50 mobMRAuto mobMLAuto"
          >
            {"Executive Team"}
          </Typography>

          <Grid container spacing={0} className="verySmallMobJCC">
            {peopleData["Executive Team"]?.map((ele, ind) => {
              return (
                <Grid
                  xs={8}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                  item
                  key={ind}
                  component={"div"}
                  className="MB30"
                >
                  <Grid component={"div"} className="DF AIC JCC " item>
                    <Box
                      key={ind}
                      component={"div"}
                      onClick={() => {
                        if (indxForDescrip === ind) {
                          setIndxForDescrip(null);
                        } else {
                          setTimeout(() => {
                            executiveDescription.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                              inline: "center",
                            });
                          }, 0);
                          setIndxForDescrip(ind);
                        }
                      }}
                      className={
                        ind === indxForDescrip
                          ? "ourPeopleContainerActive"
                          : "ourPeopleContainer"
                      }
                    >
                      <Box
                        sx={{
                          backgroundImage: `url(${ele.image})`,
                        }}
                        className="ourPeopleImg"
                      >
                        {" "}
                      </Box>
                      <Box className="DF JCFS FFC ourPeopleTextBox">
                        <Typography
                          component={"h4"}
                          variant=""
                          className="TAC ourPeopleNameHeading PT20"
                        >
                          {ele.Name}
                        </Typography>
                        <Typography
                          component={"p"}
                          variant=""
                          className="TAC ourPeopleDesignationText P5"
                        >
                          {ele.Designation}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    xs={120}
                    sm={800}
                    md={600}
                    lg={400}
                    xl={300}
                    xxl={3}
                    item
                  >
                    {ind === indxForDescrip ? (
                      <Box
                        className={`MT70 ourPeopleDescriptionBox PT40 PB40 description${
                          ind + 1
                        }`}
                        ref={executiveDescription}
                      >
                        <Box className="ourPeopleNameAndPosition  verySmallMobPL1 PL40 DF FFC JCC PT10 PB10 PR30">
                          <Typography
                            component={"h4"}
                            variant=""
                            className="name"
                          >
                            {ele.Name}
                          </Typography>
                          <Typography
                            component={"div"}
                            variant=""
                            className="position"
                          >
                            {ele.Designation}
                          </Typography>
                        </Box>
                        <Box
                          component={"div"}
                          className="PL40 PR40  verySmallMobPL1 verySmallMobPR1 ourPeopleDescriptionText MT1 mobTAJ"
                        >
                          <Interweave content={ele.About} />
                        </Box>

                        <Link
                          target="_blank"
                          href={ele.linkedin}
                          className="linkedInLogoBox ML40 MT20 DF AIC JCC"
                        >
                          <Image
                            src={linkedIn}
                            alt=""
                            className="linkedInLogo"
                          />
                        </Link>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Box>
          <Typography
            component={"h3"}
            variant=""
            className="ourPeopleSectionHeading DF JCC AIC MB40 MT50 mobMRAuto mobMLAuto"
          >
            {"Leadership Team"}
          </Typography>

          <Grid container spacing={0} className=" verySmallMobJCC">
            {peopleData["Leadership Team"]?.map((ele, ind) => {
              return (
                <Grid
                  xs={8}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                  className="MB30"
                  item
                  key={ind}
                >
                  <Grid component={"div"} className="DF AIC JCC " item>
                    <Box
                      key={ind}
                      component={"div"}
                      onClick={() => {
                        if (indxForDescripTwo === ind) {
                          setIndxForDescripTwo(null);
                        } else {
                          setTimeout(() => {
                            leadershipDescription.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                              inline: "center",
                            });
                          }, 0);
                          setIndxForDescripTwo(ind);
                        }
                      }}
                      className={`${
                        ind === indxForDescripTwo
                          ? "ourPeopleContainerActive"
                          : "ourPeopleContainer"
                      }`}
                    >
                      <Box
                        sx={{
                          backgroundImage: `url(${ele.image})`,
                        }}
                        className="ourPeopleImg"
                      >
                        {" "}
                      </Box>
                      <Box className="DF JCFS FFC ourPeopleTextBox">
                        <Typography
                          component={"h4"}
                          variant=""
                          className="TAC ourPeopleNameHeading  PT20"
                        >
                          {ele.Name}
                        </Typography>
                        <Typography
                          component={"p"}
                          variant=""
                          className="TAC ourPeopleDesignationText P5"
                        >
                          {ele.Designation}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid
                    xs={120}
                    sm={800}
                    md={600}
                    lg={400}
                    xl={300}
                    xxl={3}
                    item
                  >
                    {ind === indxForDescripTwo ? (
                      <Box
                        className={`MT70 ourPeopleDescriptionBox PT40 PB40 description${
                          ind + 1
                        }`}
                        ref={leadershipDescription}
                      >
                        <Box className="ourPeopleNameAndPosition verySmallMobPL1 PL40 DF FFC JCC PT10 PB10 PR30">
                          <Typography
                            component={"h4"}
                            variant=""
                            className="name"
                          >
                            {ele.Name}
                          </Typography>
                          <Typography
                            component={"p"}
                            variant=""
                            className="position"
                          >
                            {ele.Designation}
                          </Typography>
                        </Box>
                        <Box
                          component={"div"}
                          className="PL40 PR40 verySmallMobPL1 verySmallMobPR1 ourPeopleDescriptionText MT1 mobTAJ"
                        >
                          <Interweave content={ele.About} />
                        </Box>

                        <Link
                          target="_blank"
                          href={ele.linkedin}
                          className="linkedInLogoBox ML40 MT20 DF AIC JCC"
                        >
                          <Image
                            src={linkedIn}
                            alt=""
                            className="linkedInLogo"
                          />
                        </Link>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
      {/* loader */}
      {setTimeOutLoader || loader1 || loader2 || loader3 ? <Loader /> : ""}
    </>
  );
}
