'use client';
import React from "react";
import {
  GET_INDXX_TYPES,
  GET_NEWS_AND_RESEARCH_BY_LIMIT,
  GET_INDXX_SERVICES,
} from "../../../Apis/EndPoints";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ContactUsForm from "../../../Components/ContactForm/ContactUsForm";
import { getMethodApi } from "../../../Utils/Methods";

import Loader from "../../../Components/Loader/Loader";
import { Interweave } from "interweave";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function IndxxSerivice() {
  const [data, setData] = useState({});
  // const [indxxInsightsData, setIndxxInsights] = useState([]);
  // const [indxxTypes, setIndxxTypes] = useState([]);
  const [loader1, setLoader1] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [loader3, setLoader3] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
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
    getMethodApi(GET_INDXX_SERVICES).then((response) => {
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
      {/* top heading and contact form */}
      <Box
        component={"div"}
        className="IIcontactUse DF smallMobFFC mobPR20 smallMobPR0 smallMobPL0 smallMobJCSB verySmallMobHeightMin100vh"
        sx={{
          backgroundImage: `
        linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.65) 100%), url(${
          data?.Banner_Image ? data?.Banner_Image : ""
        })`,
        }}
      >
        <Box
          component={"div"}
          className="DF AIC JCFS W60 mobW90 smallMobW100 smallMobPT20"
        >
          <Box component={"div"}>
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
              className="headingSubtextOffering"
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
        className="DF overviewBox smallMobMT40 verySmallMobFFC verySmallMobMT20 MB60"
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
            component={"h2"}
            className="subHeadingOverview verySmallMobPT10"
          >
            {"Overview of "} {data.Title ? data.Title : ""}
          </Typography>
          <Typography
            variant="p"
            component="p"
            className="textOverviewDescription PT1 verySmallMobPT10 PR50 overviewTextOnly verySmallMobPR0 verySmallMobTAC"
          >
            {data.overview ? <Interweave content={data.overview} /> : ""}
          </Typography>
        </Box>
      </Box>

      {/* values */}
      <Box>
        <Box component={"div"} className="container PB60 mobPB0 PT10 mobTAC">
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
