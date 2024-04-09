"use client";
import React from "react";
import { GET_EQUITY_BASKET_CALCULATION } from "../../../Apis/EndPoints";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ContactUsForm from "../../../Components/ContactForm/ContactUsForm";
import { getMethodApi } from "../../../Utils/Methods";

import Loader from "../../../Components/Loader/Loader";
import Divider from "../../../Components/Widgets/Divider";
import { Interweave } from "interweave";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function EquityBasketCalculation() {
  const [data, setData] = useState({});
  const [loader3, setLoader3] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    getMethodApi(GET_EQUITY_BASKET_CALCULATION).then((response) => {
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
          : "Index Calculation, Management, and Administration | Indxx"}
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
            : "Our Equity Basket Calculation service is a one-stop solution to meet all the index calculation, management, and administration needs of our clients."
        }
      />
      <meta
        name="keywords"
        content={
          data?.meta_keywords
            ? data.meta_keywords
            : "index calculation, equity basket calculation, index calculation agent, index administration, index management"
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

      {/* our services */}
      <Box component={"div"} className="container MT143 mobMT60 MB60">
        <Box className="DF FFC AIC">
          <Typography variant="h3" component={"h3"} className="subHeadingRed">
            {"Our "} {data.Title ? data.Title : ""} {"Services"}
          </Typography>
          <Divider
            classes={`MT20 MB10`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />
          {data?.process_description ? (
            <Typography variant="" className="text PT1 TAC textWidth mobW100">
              {data?.process_description}
            </Typography>
          ) : (
            ""
          )}
        </Box>

        {/* desktop */}
        <Box component={"div"} className="mobDispNone900">
          <Box className="DF JCC AIC FGap1-5R FWW MB60 smallMobMB0 MT40">
            {data.process?.map((ele, ind) => {
              const arr = ele?.title.split(" ");
              for (let i = 0; i < arr.length; i++) {
                arr[i] =
                  arr[i].charAt(0).toUpperCase() +
                  arr[i].slice(1).toLowerCase();
              }
              const capitalTitle = arr.join(" ");
              return (
                <>
                  <Box
                    className="equityProcessBox P1"
                    sx={{
                      border:
                        ind % 2 === 0
                          ? "8px solid #ED3125"
                          : "8px solid #616564",
                    }}
                  >
                    <Box className="processEQNumberOuter DF JCC AIC">
                      <Box
                        className={` processEQNumberInner colorWhite  DF JCC AIC ${
                          ind % 2 === 0 ? "bGColorRed" : "bGColorDarkGrey"
                        }`}
                      >
                        {ind < 9 ? 0 : ""}
                        {ind + 1}
                      </Box>
                    </Box>
                    <Typography
                      component={""}
                      variant=""
                      className="equityProcessBoxHeading DB TAC W100"
                    >
                      {capitalTitle}
                    </Typography>
                  </Box>
                </>
              );
            })}
          </Box>

          {data.process?.map((ele, ind) => {
            return (
              <Box component={"span"} className={`DF FFC MB25`} key={ind}>
                <Box component={"div"} className="">
                  <Typography
                    variant="h6"
                    className={`processEQSubHeading colorRed MB20`}
                  >
                    {ele?.title}
                  </Typography>
                  <Typography variant="p" className="processCISubText">
                    <Interweave content={ele?.description} />
                  </Typography>
                </Box>
              </Box>
            );
          })}
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
                    <Box className="processCINumberOuter DF JCC AIC">
                      <Box
                        className={`processEBCSNumberInner colorWhite  DF JCC AIC ${
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
                      className={`processCISubHeading ${
                        ind % 2 === 0 ? "colorRed" : "colorBlue"
                      } TAC MB15`}
                    >
                      {ele?.title}
                    </Typography>
                    <Typography variant="p" className="processCISubTextMob TAC">
                      <Interweave content={ele?.description} />
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* values */}
      <Box>
        <Typography
          variant="h2"
          className="subHeadingRed MT172 mobMT0 smallMobMT30"
        >
          {"Our Value Additions"}
        </Typography>
        <Divider
          classes={`MT20 MB60 smallMobMB30`}
          colorOne={"#395FD2"}
          colorTwo={"#ED3125"}
        />
        <Box component={"div"} className="container PT10 MB80 mobMB0">
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
      {setTimeOutLoader || loader3 ? <Loader /> : ""}
    </>
  );
}
