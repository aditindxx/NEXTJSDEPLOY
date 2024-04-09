"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { getMethodApi } from "../../Utils/Methods";
import { GET_ANNOUNCEMENTS_BY_LIMIT, GET_CONFIG } from "../../Apis/EndPoints";
import { useState } from "react";
import TabsPanelByYear from "../../Components/TabsPanelByYear/TabsPanelByYear";
import Loader from "../../Components/Loader/Loader";
// import { useLocation } from "react-router-dom";
import { usePathname } from "next/navigation";

export default function Announcement() {
  const [announcementsdata, setannouncementsdata] = useState([]);
  const [loader, setLoader] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  // const location = useLocation();
  const pathname = usePathname();
  const [seoData, setSeoData] = useState("");
  const [loader2, setLoader2] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      let queryParam = pathname?.split("/");
      
      if (queryParam.includes("index-notifications")) {
        document.getElementById(`sections1`)?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "end",
        });
      }
      if (queryParam.includes("index-documents")) {
        document.getElementById(`sections2`)?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "end",
        });
      }
    }, 2000);
  }, [pathname]);

  useEffect(() => {
    getMethodApi(GET_CONFIG).then((response) => {
      if (response.status === 200) {
        setSeoData(response.data);
        setLoader2(false);
      }
    });

    getMethodApi(GET_ANNOUNCEMENTS_BY_LIMIT).then((response) => {
      if (response.status === 200) {
        setannouncementsdata(response.data);
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
        {seoData?.Announ_Title
          ? seoData.Announ_Title[0].value
          : "Announcements | Indxx"}
      </title>
      <link
          rel="canonical"
          href={`https://www.indxx.com${pathname}`}
          key="canonical"
        />
      <meta
        name="description"
        content={
          seoData?.Announ_Description
            ? seoData.Announ_Description[0].value
            : "View latest notifications and updates about our indices."
        }
      />
      <meta
        name="keywords"
        content={
          seoData?.Announ_Keywords
            ? seoData.Announ_Keywords[0].value
            : "View latest notifications and updates about our indices."
        }
      />
      <Box className="announcementimg smallMobPB0 DF JCC AIC PL1 PR1">
        <Typography variant={"h1"} className="topHeadingPage W60 TAC mobW100">
          {"Announcements"}
        </Typography>
      </Box>

      <Box
        component="div"
        className="container MT100 mobMT80 smallMobMT40 verySmallMobMT20"
      >
        {announcementsdata.length !== 0
          ? announcementsdata?.map((data, index) => (
              <Box
                className="DF newsInsightContainer mobFFC boxshadow4sides announcementouterbox MB50 smallMobMB30 IStretchF DF FFC JCSB"
                key={index}
                id={`sections${index + 1}`}
              >
                <TabsPanelByYear
                  topheadeing={Object.keys(data)}
                  tabHeadings={getyrs(data).reverse()}
                  tabData={gettabdata(data).reverse()}
                />
              </Box>
            ))
          : ""}
      </Box>

      {/* loader */}
      {setTimeOutLoader || loader || loader2 ? <Loader /> : ""}
    </>
  );
}
