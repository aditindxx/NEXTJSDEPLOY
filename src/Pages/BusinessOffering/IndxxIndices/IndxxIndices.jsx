"use client";
import React from "react";
import {
  GET_INDXX_INDICES,
  GET_INDXX_TYPES,
  GET_NEWS_AND_RESEARCH_BY_LIMIT,
} from "./../../../Apis/EndPoints";
import { htmlToText } from "html-to-text";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Interweave } from "interweave";
import ContactUsForm from "../../../Components/ContactForm/ContactUsForm";
import { getMethodApi } from "./../../../Utils/Methods";
import Divider from "../../../Components/Widgets/Divider";

import CircleRight from "./../../../Assets/Icons/circleRight.svg";
import CircleLeft from "./../../../Assets/Icons/circleLeft.svg";
import ArrowRight from "./../../../Assets/Icons/arrowRight.svg";
import Loader from "./../../../Components/Loader/Loader";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const dateAlpha = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function IndxxIndices() {
  const [data, setData] = useState({});
  const [indxxInsightsData, setIndxxInsights] = useState([]);
  const [indxxTypes, setIndxxTypes] = useState([]);
  const [loader1, setLoader1] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [loader3, setLoader3] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getMethodApi(GET_NEWS_AND_RESEARCH_BY_LIMIT + "3").then((response) => {
      if (response.status === 200) {
        setIndxxInsights(response.data["Indxx Insights"]);
        setLoader1(false);
      }
    });
    getMethodApi(GET_INDXX_TYPES).then((response) => {
      if (response.status === 200) {
        setIndxxTypes(response.data);
        setLoader2(false);
      }
    });
    getMethodApi(GET_INDXX_INDICES).then((response) => {
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

  const dateFunction = (date) => {
    let dateArr = date.split("-");
    return `${dateAlpha[+dateArr[1] - 1]} ${dateArr[2]}`;
  };

  return (
    <>
      <title>
        {data?.meta_title
          ? data.meta_title
          : "Indxx Indices | Innovative Indices | Index Development"}
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
            : "Our index development team builds innovative indices to capture emerging investment trends. These can be licensed as benchmarks for funds/ETFs."
        }
      />
      <meta
        name="keywords"
        content={
          data?.meta_keywords
            ? data.meta_keywords
            : "index development, innovative indices"
        }
      />
      {/* top heading and contact form */}
      <Box
        component={"div"}
        className="IIcontactUse DF JCC P1"
        sx={{
          backgroundImage: `url(${
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
              className="headingSubtextOffering MT10 MB30"
            >
              {data.Description ? (
                <Interweave content={data.Description} />
              ) : (
                ""
              )}
            </Typography>
            <Button
              className="advcadmingetintouchbtn listOfIndicesBtn MT20"
              onClick={() =>
                router.push("/index-licensing-and-data-licensing-services")
              }
            >
              {"Index & Data Licensing Services"}
            </Button>
          </Box>
        </Box>

        {/* <ContactUsForm /> */}
      </Box>

      {/* overview */}
      <Box
        component={""}
        className="DF overviewBox smallMobMT40 verySmallMobFFC verySmallMobMT20"
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
            variant="p"
            component={"p"}
            className="textOverviewDescription PT1 verySmallMobPT10 PR50 overviewTextOnly verySmallMobPR0 verySmallMobTAC"
          >
            {data.overview ? <Interweave content={data.overview} /> : ""}
          </Typography>
        </Box>
      </Box>

      {/* indxx development process */}
      <Box
        component={"div"}
        className="containerWithPadding MT75 bGColorOffWhite overflowHidden"
      >
        <Box className="DF FFC AIC">
          <Typography variant="h3" component={"h3"} className="subHeadingRed">
            {"Development Process of our "} {data.Title ? data.Title : ""}
          </Typography>
          <Divider
            classes={`MT20 MB25`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />
          <Typography
            variant=""
            className="textAwardsData PT1 TAC textWidth mobW100"
          >
            {data.process_description ? data.process_description : ""}
          </Typography>
        </Box>

        {/* desktop new design */}
        <Box component={"div"} className="MT60 MB-60 verySmallMobDispNone">
          {data?.process?.map((ele, ind) => {
            return (
              <Box
                key={ind}
                component={"div"}
                className="DF FGap2R indxxIndicesDevProcessBox"
                sx={{ position: "relative", top: `${-34 * ind}px` }}
              >
                <Box component={"div"} className="IStretchF">
                  <Box
                    component={"div"}
                    className={`${ind % 2 === 0 ? "visibilityNone" : ""}`}
                  >
                    <Typography
                      variant="h6"
                      className={`devProcessHeading colorBlue MB10 MT20`}
                    >
                      {ind < 9 ? 0 : ""}
                      {ind + 1}. {ele.title}
                    </Typography>
                    <Interweave
                      className="devProcessText"
                      content={ele.description}
                    />
                  </Box>
                </Box>

                <Box
                  component={"div"}
                  className={`DF AIC JCC indxxIndicesDevProcessImages ${
                    ind % 2 === 0 ? "ML10 PR10" : "MR10 PL10"
                  }`}
                  sx={{
                    backgroundImage: `url(${
                      ind % 2 === 0 ? CircleRight.src : CircleLeft.src
                    })`,
                  }}
                >
                  <Image
                    loader={() => ele.image}
                    src={ele.image}
                    alt=""
                    width={60}
                    height={60}
                    className="indxxIndicesDevProcessImagesIcon"
                  />
                </Box>

                <Box component={"div"} className="IStretchF">
                  <Box
                    component={"div"}
                    className={`${ind % 2 === 1 ? "visibilityNone" : ""}`}
                  >
                    <Typography
                      variant="h6"
                      className={`devProcessHeading colorBlue MB10 MT20`}
                    >
                      0{ind + 1}. {ele.title}
                    </Typography>
                    <Interweave
                      className="devProcessText"
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
          className="MT10 devProcessBox verySmallMobDispVisible"
        >
          <Box component={"div"} className="iconContainer ML0 MB50 mobW100 TAC">
            {data.process
              ? data.process?.map((ele, ind) => {
                  return (
                    <Box component={"span"} className="" key={ind}>
                      <Box className="ML1">
                        <Image
                          src={CircleRight}
                          alt=""
                          className="iconsBorderMob mobML2"
                          width={150}
                          height={150}
                        />
                        <Image
                          loader={() => ele.image}
                          src={ele.image}
                          alt=""
                          className="iconsMob"
                          width={40}
                          height={40}
                        />
                      </Box>
                      <Box component={"div"} className="">
                        <Typography
                          variant="h6"
                          className="devProcessHeading colorBlue"
                        >
                          {ind < 9 ? 0 : ""}
                          {ind + 1}. {ele.title}
                        </Typography>
                        <Typography variant="p" className="devProcessText">
                          <Interweave content={ele.description} />
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              : ""}
          </Box>
        </Box>
      </Box>

      {/* values */}
      <Box>
        <Box className="DF FFC AIC">
          <Typography variant="h2" className="subHeadingRed">
            {"Our Value Additions"}
          </Typography>
          <Divider
            classes={`MT20 MB60`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />
        </Box>
        <Box component={"div"} className="container">
          {data.values
            ? data.values?.map((ele, ind) => {
                return (
                  <Box
                    component={"div"}
                    className={`DF FGap60 mobFFC mobAIC mobMB50 smallMobTAC ${
                      ind % 2 === 1 ? "FFRR" : ""
                    }`}
                    key={ind}
                  >
                    <Box
                      component={"div"}
                      className="DF FFC JCC W49 mobW100 IStretchF"
                    >
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
                      src={ele.image}
                      alt=""
                      fill
                      className="bordRadiusTL bordRadiusBR W49 ourValueImg mobW80 mobRordRadiusTL mobRordRadiusTR mobRordRadiusBL mobRordRadiusBR "
                    />
                  </Box>
                );
              })
            : ""}
        </Box>
      </Box>

      {/* indxx insights */}
      <Box>
        <Box className="DF FFC AIC MT60">
          <Typography variant="h2" className="subHeadingRed">
            {"Indxx Insights"}
          </Typography>
          <Divider
            classes={`MT20 MB50`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />
        </Box>

        <Box
          component={"div"}
          className="container DF JCSB MB60 FGap2R verySmallMobFFC"
        >
          {indxxInsightsData.length > 0
            ? indxxInsightsData?.map((ele, ind) => {
                const plainText = htmlToText(ele?.intro_description);
                return (
                  <Box
                    className="indxxInsightBox IStretchF DF FFC JCSB PB1"
                    key={ind}
                  >
                    <Box>
                      <Box
                        className={"indxxInsightImg DF AIFE JCFE"}
                        sx={{
                          backgroundImage: `url(${ele.Image})`,
                          backgroundColor: "#616564",
                        }}
                      >
                        <Typography
                          component={"p"}
                          className="dateBlockIndxxInsights DF AIC JCC TAC PL10 PR10"
                        >
                          {dateFunction(ele.Date)}
                        </Typography>
                      </Box>
                      <Typography
                        component={"h5"}
                        className="indxxInsightHeading MT20 MR13 ML13"
                      >
                        {ele.Title}
                      </Typography>
                    </Box>
                    <Box component={"div"} className="indxxInsightBorder"></Box>
                    <Box>
                      <Typography
                        component={"h5"}
                        className="indxxInsightText MT10 MR18 ML18 MB1"
                      >
                        {plainText.substring(0, 80).trim()}...
                      </Typography>
                      <Link
                        component={"h5"}
                        className="indxxInsightText links MR18 ML18 MB1 colorRed PB20 cursorPointer"
                        href={`/news-and-research/news-and-research-insider/${ele?.slug}`}
                      >
                        {"Read More"}
                      </Link>
                    </Box>
                  </Box>
                );
              })
            : ""}
        </Box>
      </Box>

      {/* types of indices offered */}
      {indxxTypes.length > 0 ? (
        <Box
          component={"div"}
          className="MB-60 indiciedOfferd containerWithPadding PT60"
        >
          <Typography variant="h3" className="subHeadingWhite MT30">
            {"Types Of Indices Offered"}
          </Typography>
          <Divider
            classes={`MT20 MB50`}
            colorOne={"#ED3125"}
            colorTwo={"#ED3125"}
          />
          <Box component={"div"} className="DF FWW FGap2R JCSB mobJCC">
            {indxxTypes
              ?.sort(function compareByName(a, b) {
                return a.Name.localeCompare(b.Name); 
              })
              ?.map((ele, ind) => {
                return (
                  <Box
                    component={"div"}
                    key={ind}
                    className="DF indiciedOfferdAllBox FWW mobW80 smallMobW100"
                  >
                    <Box
                      component={"span"}
                      className="bGColorRed indiciedOfferdArrowBox DF AIC JCC"
                    >
                      <Image src={ArrowRight} alt="" />
                    </Box>

                    <Box
                      component={"span"}
                      className="bGColorWhite indiciedOfferdLinkBox DF AIC JCFS PL30"
                    >
                      <Link
                        href={`/indices/${ele?.slug}`}
                        className="indiciedOfferdLink"
                      >
                        {ele?.Name}
                      </Link>
                    </Box>
                  </Box>
                );
              })}
            {(indxxTypes?.length - 2) % 3 === 0 ? (
              <Box
                component={"div"}
                className="DF indiciedOfferdAllBox FWW mobW80 smallMobW100"
              ></Box>
            ) : (
              <Box
                component={"div"}
                className="DF indiciedOfferdAllBox FWW mobW80 smallMobW100 dispNone"
              ></Box>
            )}
          </Box>
        </Box>
      ) : (
        ""
      )}

      {/* loader */}
      {setTimeOutLoader || loader1 || loader2 || loader3 ? <Loader /> : ""}
    </>
  );
}
