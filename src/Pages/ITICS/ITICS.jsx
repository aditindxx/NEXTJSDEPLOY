"use client";
import React, { useRef } from "react";
import { GET_CAROUSEL_TABS, GET_ITICS } from "../../Apis/EndPoints";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Interweave } from "interweave";

import { getMethodApi } from "../../Utils/Methods";

import Loader from "../../Components/Loader/Loader";
import ContactUsForm from "../../Components/ContactForm/ContactUsForm";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ITICS() {
  const [analyticsITICS, setAnalyticsITICS] = useState([]);
  const [iticsData, setIticsData] = useState();
  const [theITICSEdge, setTheITICSEdge] = useState();
  const [theITICSAdvantage, setTheITICSAdvantage] = useState();
  const [loader1, setLoader1] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const pathname = usePathname();
  const executiveDescription = useRef();

  useEffect(() => {
    getMethodApi(GET_ITICS).then((response) => {
      if (response.status === 200) {
        setIticsData(response.data);
        setTheITICSEdge(response.data.The_ITICS_Edge.process);
        setTheITICSAdvantage(response.data.The_ITICS_Advantage);
        setLoader1(false);
      }
    });
    getMethodApi(GET_CAROUSEL_TABS).then((response) => {
      if (response.status === 200) {
        setAnalyticsITICS(response.data["Home"][3]);
        setLoader2(false);
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
          {iticsData?.meta_title ? iticsData.meta_title : "Industry Classification Benchmark | ITICS | Indxx"}
        </title>
        <link
          rel="canonical"
          href={`https://www.indxx.com${pathname}`}
          key="canonical"
        />
        <meta
          name="description"
          content={
            iticsData?.meta_description
              ? iticsData.meta_description
              : "Indxx Thematic Industry Classification System (ITICS) is an industry classification taxonomy that offers precise categorization of the global equity universe."
          }
        />
        <meta
          name="keywords"
          content={
            iticsData?.meta_keywords ? iticsData.meta_keywords : "ITICS, Indxx Thematic Industry Classification System, industry classification, industry classification benchmark, standard industry classifications, industry classification code, thematic industry classification, industry taxonomy"
          }
        />
      {/* top heading and contact form */}
      <Box
        component={"div"}
        className="IIcontactUse DF JCC P1"
        sx={{
          backgroundImage: `
        linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%), url(${iticsData?.Banner_Image})`,
        }}
      >
        <Box
          component={"div"}
          className="DF AIC JCFS W70 mobW90 smallMobW100 smallMobPT20"
        >
          <Box component={"div"} className="smallMobDF FFC FCG1">
            <Typography
              variant="h1"
              component={"h1"}
              className="h1HeadingOffering"
            >
              {iticsData ? iticsData.Title : ""}
            </Typography>
            <Typography
              variant="body1"
              component={"p"}
              className="headingSubtextOffering"
            >
              {iticsData?.Description ? (
                <Interweave content={iticsData?.Description} />
              ) : (
                ""
              )}
            </Typography>
            <Button
                className="tabBtn mobMT20 mobMAuto MT30 W15R"
                // onClick={() => executiveDescription.current.scrollIntoView()}
              >
                {"Download Brochure"}
              </Button>
          </Box>
        </Box>
        {/* <ContactUsForm hidemobileinput="mobile" /> */}
      </Box>

      {/* overview */}
      <Box
        component={""}
        className="DF overviewBox verySmallMobFFC verySmallMobMT20 smallMobMT40 smallMobMB40"
      >
        <Box
          component={"div"}
          sx={{
            backgroundImage: `url(${
              iticsData ? iticsData.Overview_Image : ""
            })`,
          }}
          className="imgForFull flexRatio12"
        ></Box>
        <Box className="DF FFC overviewBoxText AIFS JCC ML40 PL20 flexRatio21 MT25 MB25 verySmallMobML1 verySmallMobMR1 verySmallMobPL0 verySmallMobAIC">
          <Typography
            variant="h3"
            className="subHeadingOverview verySmallMobPT10"
          >
            {"Overview"}
          </Typography>
          <Typography
            variant="p"
            className="text ITICSoverviewtext PT1 verySmallMobPT10 PR50 overviewTextOnly verySmallMobPR0 verySmallMobTAC"
          >
            {iticsData ? <Interweave content={iticsData.overview} /> : ""}
          </Typography>
        </Box>
      </Box>

      {/* {ITICS STORY} */}
      <Box component={"div"} className="container PB2-5R">
        <Box
          component={"div"}
          className="DF ImgAndTextGap mobMT0 FGap6-25R mobFFC mobAIC MT60"
        >
          <Box
            component={"div"}
            className="DF FFC JCFS W50 mobW100 MT40 JCC smallMobMB30"
          >
            <Box>
              <Typography
                variant="p"
                component={"p"}
                className="ITICSstoryHeading mobTAC"
              >
                {"The ITICS Story"}
              </Typography>
              <Typography
                variant="p"
                component={"p"}
                className="MT14 ITICSstoryText mobTAJ"
              >
                {iticsData
                  ? iticsData.story
                  : "With over 15 years of expertise in the indexing industry, Indxx has devised a methodology that is unrivaled in its precision for classifying companies within the global equity universe. The Indxx Thematic Industry Classification System (ITICS) is a state-of-the-art system that serves as a powerful tool for classifying companies, conducting industry analysis, and making data-driven investment decisions. It has been developed to provide the most accurate and granular classification of the companies, thus providing the user with a better and more in-depth view of the latest trends and opportunities."}
              </Typography>
            </Box>
          </Box>

          <Image
            loader={() => iticsData.story_image}
            src={iticsData ? iticsData.story_image : ""}
            alt=""
            width={1}
            height={1}
            className="bordRadTL bordRadBR W50 policyImg mobW80 curve3sides100"
          />
        </Box>
      </Box>

      {/* {ITICS GLANCE} */}
      <Box component={"div"} className="ITICSGlanceContainer MT6-25R">
        <Typography variant="p" component={"p"} className="ITICSGlanceHeading">
          {"ITICS at a Glance"}
        </Typography>
        {analyticsITICS?.Is_Analytics ? (
          <Box
            component={"div"}
            className="DF JCSB AIStretch ITICSGlanceMobileView top-130 smallMobFFC MT40"
          >
            {Object.entries(analyticsITICS?.Is_Analytics)?.map(
              ([key, value], ind) => {
                return (
                  <Box
                    key={ind}
                    className={`DF FFC AIC TAC mobMT10 mobJCC PR1 PL1 AIStretch ${
                      ind > 0 ? "ITICSBLResp2" : ""
                    }`}
                  >
                    <Typography variant="" className="ITICSCountstyle noWrap">
                      {value}
                    </Typography>
                    <Typography variant="" className="ITICScountText PL1 PR1">
                      {key}
                    </Typography>
                  </Box>
                );
              }
            )}
          </Box>
        ) : (
          ""
        )}

        <Typography
          variant="p"
          component={"p"}
          className="ITICSGlanceText MT25"
        >
          {
            "*Level 1 represents broad thematic categories. Level 2 represents more specific sub-categories within those thematic categories."
          }
        </Typography>
      </Box>

      {/* {ITICS EDGE} */}
      <Box component={"div"} className="ITICSEdgeContainer MT7-5R">
        <Typography variant="p" component={"p"} className="ITICSGlanceHeading">
          {"The ITICS Edge"}
        </Typography>

        <Box className="MT50 AllGradient">
          {theITICSEdge
            ? theITICSEdge.map((item, ind) => (
                <Box
                  key={ind}
                  className={`${
                    ind % 2 === 0
                      ? "bordRadius20 MB1 GradientEnding DF"
                      : "bordRadius20 MB1 GradientStarting  DF"
                  }`}
                >
                  <Box
                    className={`${ind % 2 === 0 ? "WhiteBoxLeft" : "BlueBox"}`}
                  ></Box>
                  <Box className="IconBox DF AIC JCC EdgeImgLaptop MT1 MB1">
                    <Image
                      loader={() => item.image}
                      width={95}
                      height={95}
                      src={item.image}
                      alt=""
                      className="iticsEdgeImg"
                    />
                  </Box>
                  <Box className="GradientContent PB20 PR10">
                    <Box className="MT1 EdgeImgMobile">
                      <Image
                        width={95}
                        height={95}
                        loader={() => item.image}
                        src={item.image}
                        alt=""
                        className="iticsEdgeImg"
                      />
                    </Box>
                    <Typography
                      variant="p"
                      component={"p"}
                      className="MT30 GradientContentHeading"
                    >
                      {item.title}
                    </Typography>
                    {/* <Typography
                      variant="p"
                      component={"p"}
                      className="GradientContentText MB30"
                    >
                      {item.description}
                    </Typography> */}
                    <Interweave
                      className="GradientContentText MB30"
                      content={item.description}
                    />
                  </Box>
                  <Box
                    className={`${ind % 2 === 0 ? "RedBox" : "WhiteBoxRight"}`}
                  ></Box>
                </Box>
              ))
            : null}
        </Box>
      </Box>

      {/* {ITICS ADVANTAGE} */}
      <Box component={"div"} className="container ADVBox MT7-5R">
        <Typography
          variant="p"
          component={"p"}
          className="ITICSAdvantageHeading"
        >
          {"The ITICS Advantage"}
        </Typography>
        <Typography variant="p" component={"p"} className="ITICSAdvantageText">
          {theITICSAdvantage ? theITICSAdvantage.process_description : ""}
        </Typography>

        <Box component={"div"} className="verySmallMobDispNone">
          <Box className="DF JCSB AIFS">
            {theITICSAdvantage
              ? theITICSAdvantage.process.map((item, ind) => {
                  return (
                    <Box className="IStretchF" key={ind}>
                      <Box className="DF FFC AIC">
                        <Box
                          className={`${
                            ind % 2 === 0 ? "BlueCircle" : "RedCircle"
                          }  MT1-475 DF JCC AIC`}
                        >
                          <Image
                            loader={() => item.image}
                            width={1}
                            height={1}
                            src={item.image}
                            className="Centericon"
                            alt="Adv2"
                          />
                        </Box>

                        <Box className="DF W100 AIFE MT1-475">
                          <Box
                            className="bGColorGrey IStretchF"
                            sx={{ height: "5px", marginBottom: "6px" }}
                          ></Box>
                          <Box
                            className={`${
                              ind % 2 === 1
                                ? "BlueCircleSmall"
                                : "RedCircleSmall"
                            }`}
                          ></Box>
                          <Box
                            className="bGColorGrey IStretchF"
                            sx={{ height: "5px", marginBottom: "6px" }}
                          ></Box>
                        </Box>
                        <Box
                          className={`bGColorGrey ${
                            ind % 2 === 1
                              ? "shortBorderIconImage"
                              : "longBorderIconImage"
                          }`}
                        ></Box>
                        <Box className="TAC W125">
                          <Typography
                            variant="p"
                            component={"p"}
                            className="AdvImgTextHeading"
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="p"
                            component={"p"}
                            className="AdvImgTextPara"
                          >
                            <Interweave content={item.description} />
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              : ""}
          </Box>
        </Box>

        <Box className="DF FFC AIC ITICSAdvMobileView">
          {theITICSAdvantage
            ? theITICSAdvantage.process.map((item, ind) =>
                ind % 2 === 0 ? (
                  <>
                    <Box key={ind} className="BlueCircle MT1-475 DF JCC AIC">
                      <Image
                        loader={() => item.image}
                        src={item.image}
                        width={1}
                        height={1}
                        className="Centericon"
                        alt="Adv1"
                      />
                    </Box>
                    <Box className="TAC MT1">
                      <Typography
                        variant="p"
                        component={"p"}
                        className="AdvImgTextHeading"
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className="AdvImgTextPara"
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box className="RedCircle MT1-475 DF JCC AIC">
                      <Image
                        loader={() => item.image}
                        width={1}
                        height={1}
                        src={item.image}
                        className="Centericon"
                        alt="Adv2"
                      />
                    </Box>
                    <Box className="TAC MT1">
                      <Typography
                        variant="p"
                        component={"p"}
                        className="AdvImgTextHeading"
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className="AdvImgTextPara"
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </>
                )
              )
            : null}
        </Box>
      </Box>

      {/* {ITICS GENERAL ELECTRIC} */}
      <Box component={"div"} className="container GEBox MT15-25R">
        <Typography
          variant="p"
          component={"p"}
          className="ITICSAdvantageHeading  mobMB10"
        >
          {"General Electric-Through the ITICS Lens"}
        </Typography>
        <Box className="DF JCSB smallMobFFC">
          <Box className="GEImgBox DF JCC AIC">
            <Image
              loader={() => iticsData.itics_lens_image}
              src={iticsData ? iticsData.itics_lens_image : ""}
              width={1}
              height={1}
              className="GEImgBoxImage DB MA W100"
              alt="GeneralElectric Graph"
            />
          </Box>
          <Box className="LevelBox DF FFC smallMobAIC">
            <Image
              loader={() => iticsData.itics_lens_text_image}
              width={1}
              height={1}
              src={iticsData ? iticsData.itics_lens_text_image : ""}
              className="GEImgBoxImageHalf W100"
              alt="GeneralElectric Level1"
            />
            <Image
              loader={() => iticsData.itics_lens_text_image_1}
              width={1}
              height={1}
              src={iticsData ? iticsData.itics_lens_text_image_1 : ""}
              className="GEImgBoxImageHalf W100 MT15Pec"
              alt="GeneralElectric Level2 "
            />
          </Box>
        </Box>
      </Box>

      {/* loader */}
      {setTimeOutLoader || loader1 || loader2 ? <Loader /> : ""}

      {/* pop up */}
    </>
  );
}
