"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { getMethodApi } from "../../Utils/Methods";
import {
  CAREER_OPENINGS_SLUG_LIST,
  GET_CONFIG,
  GET_NEWS_AND_RESEARCH,
} from "../../Apis/EndPoints";
import { useState } from "react";
import TabsPanelByYear from "../../Components/TabsPanelByYear/TabsPanelByYear";
import Loader from "../../Components/Loader/Loader";
// import { useLocation } from "react-router-dom";
import { usePathname } from "next/navigation";

export default function NewsResearch() {
  const [newsandresearchdata, setnewsandresearchdata] = useState([]);
  const [loader, setLoader] = useState(true);
  const [seoData, setSeoData] = useState("");
  const [loader2, setLoader2] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  // const location = useLocation();
  const pathname = usePathname();

  useEffect(() => {
    getMethodApi(GET_CONFIG).then((response) => {
      if (response.status === 200) {
        setSeoData(response.data);
        setLoader2(false);
      }
    });
    setTimeout(() => {
      let queryParam = pathname?.split("/");
      if (queryParam.includes("indxx-insights")) {
        document.getElementById(`section1`).scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "end",
        });
      }
      if (queryParam.includes("in-the-news")) {
        document.getElementById(`section2`).scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "end",
        });
      }
      if (queryParam.includes("press-releases")) {
        document.getElementById(`section3`).scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "end",
        });
      }
    }, 2000);
  }, [pathname]);

  useEffect(() => {
    getMethodApi(GET_NEWS_AND_RESEARCH).then((response) => {
      if (response.status === 200) {
        setnewsandresearchdata(response.data);
        setLoader(false);
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

  function getyrs(data) {
    for (let item in data) {
      let inneritem = Object.keys(data[item]);
      return inneritem;
    }
  }

  function gettabdata(data) {
    for (let item in data) {
      let inneritem = Object.values(data[item]);
      return inneritem;
    }
  }

  return (
    <>
      {/* Seo */}
      <title>
        {seoData?.News_Title
          ? seoData.News_Title[0].value.split("&").join("and")
          : "News & Research | Indxx"}
      </title>
      <link
        rel="canonical"
        href={`https://www.indxx.com${pathname.split("&").join("and")}`}
        key="canonical"
      />
      <meta
        name="description"
        content={
          seoData?.News_Description
            ? seoData.News_Description[0].value
            : "Keep up to date with the latest news and insights from Indxx, a leading provider of innovative index solutions."
        }
      />
      <meta
        name="keywords"
        content={
          seoData?.News_Keywords
            ? seoData.News_Keywords[0].value
            : "Keep up to date with the latest news and insights from Indxx, a leading provider of innovative index solutions."
        }
      />

      <Box className="newsandresearchimg smallMobPB0 DF JCC AIC PL1 PR1">
        <Typography
          variant={"h1"}
          className="topHeadingPage W60 TAC mobW100 linehtN"
        >
          {"News & Research"}
        </Typography>
      </Box>

      <Box
        component="div"
        className="container MT75 smallMobMT40 verySmallMobMT20"
      >
        {newsandresearchdata.length !== 0
          ? newsandresearchdata?.map((data, index) => (
              <Box
                className="DF newsInsightContainer mobFFC boxshadow4sides announcementouterbox MB60 smallMobMB30 IStretchF DF FFC JCS"
                key={index}
                id={`section${index + 1}`}
              >
                <TabsPanelByYear
                  topheadeing={Object.keys(data)}
                  tabHeadings={getyrs(data).reverse()}
                  tabData={gettabdata(data).reverse()}
                />
              </Box>
            ))
          : null}
      </Box>

      {/* loader */}
      {setTimeOutLoader || loader || loader2 ? <Loader /> : ""}
    </>
  );
}
