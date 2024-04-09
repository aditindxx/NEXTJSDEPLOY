"use client";
import React from "react";
import {
  GET_INDXX_TYPES,
  GET_NEWS_AND_RESEARCH_BY_LIMIT,
  GET_CLIENT_INDICES,
} from "../../../Apis/EndPoints";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ContactUsForm from "../../../Components/ContactForm/ContactUsForm";
import { getMethodApi } from "../../../Utils/Methods";
import Loader from "../../../Components/Loader/Loader";
import Divider from "../../../Components/Widgets/Divider";

import LeftArrow from "./../../../Assets/Images/leftRedArrow.png";
import RightArrow from "./../../../Assets/Images/rightRedArrow.png";
import { Interweave } from "interweave";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ClientIndices() {
  const [data, setData] = useState({});
  // const [indxxInsightsData, setIndxxInsights] = useState([]);
  // const [indxxTypes, setIndxxTypes] = useState([]);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [loader1, setLoader1] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [loader3, setLoader3] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    getMethodApi(GET_NEWS_AND_RESEARCH_BY_LIMIT + "3").then((response) => {
      if (response.status === 200) {
        // setIndxxInsights(response.data["Indxx Insights"]);
        setLoader1(false);
      }
    });
    getMethodApi(GET_INDXX_TYPES).then((response) => {
      if (response.status === 200) {
        // setIndxxTypes(response.data);
        setLoader2(false);
      }
    });
    getMethodApi(GET_CLIENT_INDICES).then((response) => {
      if (response.status === 200) {
        setData(response.data);
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
        {data?.meta_title
          ? data.meta_title
          : "Client Indices | Benchmark Administration | Indxx"}
      </title>
      <link
          rel="canonical"
          href={`https://www.indxx.com${pathname}`}
          key="canonical"
        />
      <meta
        name="description"
        content={
          data?.meta_description
            ? data.meta_description
            : "We offer benchmark administration solutions, wherein we code, build, and backtest the index based on client requirements. Find out more here."
        }
      />
      <meta
        name="keywords"
        content={
          data?.meta_keywords ? data.meta_keywords : "benchmark administration"
        }
      />

      {/* top heading and contact form */}
      <Box
        component={"div"}
        className="IIcontactUse DF JCC P1"
        sx={{
          backgroundImage: `
          linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.65) 100%), url(${
            data?.Banner_Image ? data?.Banner_Image : ""
          })`,
        }}
      >
        <Box
          component={"div"}
          className="DF JCC FFC W70 mobW90 smallMobW100 smallMobPT20"
          >
            <Box component={"div"} className="W50 mobW80 smallMobW100">
            <Typography
              variant="h1"
              component={"h1"}
              className="h1HeadingOffering"
            >
              {data.Title ? data.Title : ""}
            </Typography>
            <Typography
              variant="body1"
              component={"p"}
              className="headingSubtextOffering MT10"
            >
              {data.Description ? (
                <Interweave content={data.Description} />
              ) : (
                ""
              )}
            </Typography>
          </Box>
        </Box>
        {/* <ContactUsForm /> */}
      </Box>

      {/* overview */}
      <Box
        component={""}
        className="DF overviewBox verySmallMobFFC verySmallMobMT20 smallMobMT40"
      >
        <Box
          component={"div"}
          sx={{
            backgroundImage: `url(${
              data.Overview_Image ? data.Overview_Image : ""
            })`,
          }}
          className="imgForFull flexRatio12"
        ></Box>
        <Box className="DF FFC overviewBoxText AIFS JCC ML40 PL20 flexRatio21 MT25 MB25 verySmallMobML1 verySmallMobMR1 verySmallMobPL0 verySmallMobAIC">
          <Typography
            variant="h2"
            component="h2"
            className="subHeadingOverview verySmallMobPT10"
          >
            {"Overview of "} {data.Title ? data.Title : ""}
          </Typography>
          <Typography
            variant=""
            className="textOverviewDescription PT1 verySmallMobPT10 PR50 overviewTextOnly verySmallMobPR0 verySmallMobTAC"
          >
            {data.overview ? <Interweave content={data.overview} /> : ""}
          </Typography>
        </Box>
      </Box>

      <Box component={"div"} className="container MT150 mobMT60">
        <Box className="DF FFC AIC">
          <Typography variant="h3" component={"h3"} className="subHeadingRed">
            {"Development Process of our "} {data.Title ? data.Title : ""}
          </Typography>

          <Divider
            classes={`MT20 MB10`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />

          <Typography
            variant=""
            className="textAwardsData PT1 TAC textWidth mobW100"
            id="linehtN"
          >
            {data?.process_description}
          </Typography>
          <Typography
            variant=""
            className="textAwardsData PT24 mobPT1 TAC textWidth mobW100"
            id="linehtN"
          >
            {`As per the requirements of the client, our team does the following:`}
          </Typography>
        </Box>

        {/* desktop */}

        <Box
          component={"div"}
          className="processCLIBox MA MT40 verySmallMobDispNone"
        >
          {data?.process?.map((ele, ind) => {
            return (
              <Box key={ind}>
                <Box
                  component={"div"}
                  className={`DF JCSB AIC ${ind % 2 === 0 ? "" : "FFRR"}`}
                >
                  <Box className="IStretchF">
                    <Typography
                      variant="h6"
                      className={`processClienISubHeading ${
                        ind % 2 === 0 ? "colorRed" : "colorBlue PL22"
                      }`}
                    >
                      {ele.title}
                    </Typography>
                  </Box>

                  <Box className="processCLINumberOuter DF JCC AIC MR40">
                    <Box
                      className={` processCINumberInner colorWhite DF JCC AIC ${
                        ind % 2 === 0 ? "bGColorRed" : "bGColorBlue"
                      }`}
                    >
                      {ind < 9 ? 0 : ""}
                      {ind + 1}
                    </Box>
                  </Box>

                  <Box
                    className={`DF IStretchF AIC ${
                      ind === 0 ? "visibilityNone" : ""
                    } ${ind % 2 === 0 ? "" : "FFRR"}`}
                  >
                    <Box
                      sx={{
                        height: "2px",
                        background: "black",
                      }}
                      className="IStretchF"
                    ></Box>
                    <Image
                      src={ind % 2 === 0 ? RightArrow : LeftArrow}
                      className=""
                      alt=""
                    />
                  </Box>
                </Box>
                <Box className={`${ind % 2 === 0 ? "" : "DF FFRR"}`}>
                  <Box
                    className={`processCLIInnerBox W50 PB20 ${
                      ind % 2 === 0 ? "BR2Black PR40" : "BL2Black PL60"
                    }`}
                  >
                    <Interweave
                      className="processCISubText"
                      content={ele.description}
                    />
                  </Box>
                </Box>
              </Box>
            );
          })}

          {data?.process?.length % 2 === 0 ? (
            <Box className="DF FFRR">
              <Box className="DF AIFS W50">
                <Box
                  sx={{
                    height: "2px",
                    background: "black",
                    position: "relative",
                    top: "-2px",
                  }}
                  className="IStretchF"
                ></Box>
                <Image src={RightArrow} className="rightArrow" alt="" />
              </Box>
            </Box>
          ) : (
            <Box className="DF">
              <Box className="DF AIFS W50">
                <Image src={LeftArrow} className="leftArrow" alt="" />
                <Box
                  sx={{
                    height: "2px",
                    background: "black",
                  }}
                  className="IStretchF"
                ></Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* mobile */}
        <Box
          component={"div"}
          className="MT30 devProcessBox DF deskDispNone660"
        >
          <Box component={"div"} className="  mobW100">
            {data.process?.map((ele, ind) => {
              return (
                <Box component={"span"} className="DF FFC AIC MB25" key={ind}>
                  <Box className="MB20">
                    <Box className="processCLINumberOuter DF JCC AIC">
                      <Box
                        className={` processCINumberInner colorWhite  DF JCC AIC ${
                          ind % 2 === 0 ? "bGColorRed" : "bGColorBlue"
                        }`}
                      >
                        {ind < 9 ? 0 : ""}
                        {ind + 1}
                      </Box>
                    </Box>
                  </Box>
                  <Box component={"div"} className=" TAC">
                    <Typography
                      variant="h6"
                      className={`processEQSubHeading ${
                        ind % 2 === 0 ? "colorRed" : "colorBlue"
                      } TAC MB15`}
                    >
                      {ele?.title}
                    </Typography>
                    <Interweave
                      className="processCISubText TAC"
                      content={ele?.description}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* values */}
      <Box className="MT200 mobMT60 verySmallBobMT0 MB100 mobMB0">
        <Typography variant="h2" className="subHeadingRed">
          {"Our Value Additions"}
        </Typography>
        <Divider
          classes={`MT20 MB60 smallMobMB30`}
          colorOne={"#395FD2"}
          colorTwo={"#ED3125"}
        />
        <Box component={"div"} className="container PT10 smallMobTAC">
          {data.values
            ? data.values?.map((ele, ind) => {
                return (
                  <Box
                    component={"div"}
                    className={`DF FGap60 mobFFC mobAIC mobMB50 ${
                      ind % 2 !== 0 ? "FFRR" : ""
                    }`}
                    key={ind}
                  >
                    <Box component={"div"} className="DF FFC JCC W49 mobW100">
                      <Typography
                        variant="h4"
                        component={"h4"}
                        className="OurValuesSubHead"
                      >
                        {ele.title}
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className="MT10 OurValuesText"
                      >
                        {ele.description}
                      </Typography>
                    </Box>
                    <Image
                      loader={() => ele.image}
                      fill
                      src={ele.image}
                      alt=""
                      className="bordRadiusTL bordRadiusBR W49 ourValueImg mobW80 mobRordRadiusTL mobRordRadiusTR mobRordRadiusBL mobRordRadiusBR"
                    />
                  </Box>
                );
              })
            : ""}
        </Box>
      </Box>

      {/* loader */}
      {setTimeOutLoader || loader1 || loader2 || loader3 ? <Loader /> : ""}
    </>
  );
}
