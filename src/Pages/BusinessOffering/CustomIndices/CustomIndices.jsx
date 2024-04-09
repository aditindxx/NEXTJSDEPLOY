"use client";
import React from "react";
import { GET_INDXX_TYPES, GET_CUSTOM_INDICES } from "../../../Apis/EndPoints";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ContactUsForm from "../../../Components/ContactForm/ContactUsForm";
import { getMethodApi } from "../../../Utils/Methods";
import Divider from "../../../Components/Widgets/Divider";

import oneProcess from "./../../../Assets/Images/customIndicesProcess1.png";
import twoProcess from "./../../../Assets/Images/customIndicesProcess2.png";
import Loader from "../../../Components/Loader/Loader";
import ArrowRight from "./../../../Assets/Icons/arrowRight.svg";
import { Interweave } from "interweave";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function CustomIndices() {
  const [data, setData] = useState({});
  const [indxxTypes, setIndxxTypes] = useState([]);
  const [loader1, setLoader1] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      setSetTimeOutLoader(false);
    }, 2000);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    getMethodApi(GET_INDXX_TYPES).then((response) => {
      if (response.status === 200) {
        setIndxxTypes(response.data);
        setLoader2(false);
      }
    });
    getMethodApi(GET_CUSTOM_INDICES).then((response) => {
      if (response.status === 200) {
        setData(response.data);
        setLoader1(false);
      }
    });
  }, []);

  return (
    <>
      <title>
        {data?.meta_title
          ? data.meta_title
          : "Custom Indices | Custom Index Solutions | Indxx"}
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
            : "Our custom indices are tailor-made index solutions that translate investment ideas into index strategies as per client requirements. Find out more here."
        }
      />
      <meta
        name="keywords"
        content={
          data?.meta_keywords
            ? data.meta_keywords
            : "custom Indices, custom index"
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
            variant=""
            className="textOverviewDescription PT1 verySmallMobPT10 PR50 overviewTextOnly verySmallMobPR0 verySmallMobTAC"
          >
            {data.overview ? <Interweave content={data.overview} /> : ""}
          </Typography>
        </Box>
      </Box>

      {/* process */}
      <Box component={"div"} className="container MT120 mobMT60">
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
            {data?.process_description ? (
              <Interweave content={data.process_description} />
            ) : null}
            :
          </Typography>
        </Box>

        {/* Desktop */}
        <Box
          component={"div"}
          className="MT70 mobMT60 MB60 processCIBox DF mobDispNone900 FGap2R"
        >
          <Box component={"div"} className="IStretchF">
            {data?.process?.map((item, ind) => {
              return (
                <Box
                  key={ind}
                  component={"div"}
                  className={`processCISubBox1 ${
                    ind % 2 === 0 ? "" : "visibilityNone"
                  } DF AIC`}
                >
                  <Typography
                    variant="p"
                    className="processCustumIndSubText colorBlack"
                  >
                    {data.process ? (
                      <Interweave content={item.description} />
                    ) : (
                      ""
                    )}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Box component={"div"} className="processCIIconBorderBox DF FFC JCSB">
            {data?.process?.map((ele, ind) => {
              return (
                <Box
                  key={ind}
                  className={`${ind % 2 === 0 ? "PR75" : "PL75"} posRel`}
                >
                  <Box
                    className={`${
                      ind % 2 === 0 ? "roundcirclered" : "roundcircleblue"
                    } DF AIC JCC`}
                  >
                    <Typography variant="p" className="roundcircleinnertext">
                      {ind < 9 ? "0" : ""}
                      {ind + 1}
                    </Typography>
                  </Box>
                  <Box
                    component={"div"}
                    className={`processCIBG DF AIC JCC ${
                      ind % 2 === 0 ? "PL120" : "PR90"
                    }`}
                    sx={{
                      backgroundImage: `url(${
                        ind % 2 === 0 ? oneProcess.src : twoProcess.src
                      })`,
                    }}
                  >
                    <Typography
                      variant="h6"
                      className="processCustIndSubHeading colorDarkGrey TAC"
                    >
                      {ele.title}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box component={"div"} className="IStretchF">
            {data?.process?.map((item, ind) => {
              return (
                <Box
                  key={ind}
                  component={"div"}
                  className={`processCISubBox1 ${
                    ind % 2 !== 0 ? "" : "visibilityNone"
                  } DF AIC`}
                >
                  <Typography
                    variant="p"
                    className="processCustumIndSubText colorBlack"
                  >
                    {data?.process ? (
                      <Interweave content={item.description} />
                    ) : (
                      ""
                    )}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* mobile */}
        <Box
          component={"div"}
          className="MT30 devProcessBox DF deskDispNone900"
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
                        0{ind + 1}
                      </Box>
                    </Box>
                  </Box>
                  <Box component={"div"} className=" TAC">
                    <Typography
                      variant="h6"
                      className={`processCustIndSubHeading TAC MB15 ${
                        ind % 2 === 0 ? "colorRed" : "colorBlue"
                      }`}
                    >
                      {ele?.title}
                    </Typography>
                    <Typography
                      variant="p"
                      className="processCustumIndSubText colorBlack TAC"
                    >
                      {ele?.description ? (
                        <Interweave content={ele.description} />
                      ) : null}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* values */}
      <Box className="MT120">
        <Typography variant="h2" className="subHeadingRed">
          {"Our Value Additions"}
        </Typography>
        <Divider
          classes={`MT20 MB50 smallMobMB30`}
          colorOne={"#395FD2"}
          colorTwo={"#ED3125"}
        />
        <Box component={"div"} className="container">
          {data.values
            ? data.values?.map((ele, ind) => {
                return (
                  <Box
                    component={"div"}
                    className={`DF FGap60 mobFFC mobAIC mobMB50 smallMobTAC ${
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
                        {ele?.title}
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className="MT10 OurValuesText"
                      >
                        {ele?.description}
                      </Typography>
                    </Box>
                    <Image
                      loader={() => ele.image}
                      fill
                      src={ele?.image}
                      alt=""
                      className="bordRadiusTL bordRadiusBR W49 ourValueImg mobW80 mobRordRadiusTL mobRordRadiusTR mobRordRadiusBL mobRordRadiusBR"
                    />
                  </Box>
                );
              })
            : ""}
        </Box>
      </Box>

      {/* types of indices offered */}
      {indxxTypes?.length > 0 ? (
        <Box
          component={"div"}
          className="MB-60 MT84 mobMT60 indiciedOfferd containerWithPadding PT60"
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
            {indxxTypes?.sort(function compareByName(a, b) {
                return a.Name.localeCompare(b.Name); 
              })?.map((ele, ind) => {
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
      {setTimeOutLoader || loader1 || loader2 ? <Loader /> : ""}
    </>
  );
}
