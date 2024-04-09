import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// import { htmlToText } from "html-to-text";
import {
  GET_DOCUMENTS_BY_YEAR,
  GET_INDXX_INSIGHTS_BY_YEAR,
  GET_IN_THE_NEWS_BY_YEAR,
  GET_NEWS_AND_RESEARCH_BY_LIMIT,
  GET_NOTIFICATIONS_BY_YEAR,
  GET_PRESS_RELEASES_BY_YEAR,
} from "../../Apis/EndPoints";
import { getMethodApi } from "../../Utils/Methods";
import Loader from "../Loader/Loader";
import Link from "next/link";

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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsPanelByYear({ topheadeing, tabHeadings, tabData }) {
  const [tabDat, settabDat] = useState(tabData);
  const [value, setValue] = useState(0);
  const [indxxInsightsData, setIndxxInsights] = useState([]);
  const [loader, setLoader] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dateFunction = (date) => {
    let dateArr = date.split("-");
    return `${dateAlpha[+dateArr[1] - 1]} ${dateArr[2]}`;
  };

  const changetabdata = (year) => {
    if (topheadeing[0] === "Index Notifications") {
      getMethodApi(GET_NOTIFICATIONS_BY_YEAR + year).then((response) => {
        if (response.status === 200) {
          let a = [];
          a.push(response.data);
          settabDat(a);
        }
      });
    } else if (topheadeing[0] === "Index Documents") {
      getMethodApi(GET_DOCUMENTS_BY_YEAR + year).then((response) => {
        if (response.status === 200) {
          let a = [];
          a.push(response.data);
          settabDat(a);
        }
      });
    } else if (topheadeing[0] === "INDXX INSIGHTS") {
      getMethodApi(GET_INDXX_INSIGHTS_BY_YEAR + year).then((response) => {
        if (response.status === 200) {
          let a = [];
          a.push(response.data);
          settabDat(a);
        }
      });
    } else if (topheadeing[0] === "IN THE NEWS") {
      getMethodApi(GET_IN_THE_NEWS_BY_YEAR + year).then((response) => {
        if (response.status === 200) {
          let a = [];
          a.push(response.data);
          settabDat(a);
        }
      });
    } else if (topheadeing[0] === "PRESS RELEASES") {
      getMethodApi(GET_PRESS_RELEASES_BY_YEAR + year).then((response) => {
        if (response.status === 200) {
          let a = [];
          a.push(response.data);
          settabDat(a);
        }
      });
    }
  };

  useEffect(() => {
    getMethodApi(GET_NEWS_AND_RESEARCH_BY_LIMIT + "3").then((response) => {
      if (response.status === 200) {
        setIndxxInsights(response.data["Indxx Insights"]);
        setLoader(false);
      }
    });
  }, []);

  return (
    <Box>
      <Box className="ML40 mobML20 MT40 mobMT20 MR30 mobMR20 MB1">
        <Box className="newsandresearchreddiv linehtN">{topheadeing[0]}</Box>
      </Box>
      {topheadeing[0] === "INDXX INSIGHTS" ? (
        <Box
          component={"div"}
          className="ML40 mobML20 MR30 mobMR20 DF JCSB MB1 MT40 mobMT20 FGap2R verySmallMobFFC"
        >
          {indxxInsightsData.length > 0
            ? indxxInsightsData?.map((ele, ind) => {
                // const plainText = htmlToText(ele?.intro_description);
                return (
                  <Box
                    className="indxxInsightImgForTabs indxxInsightBox IStretchF DF FFC JCSB PB1 bordRadius10"
                    key={ind}
                  >
                    <Link
                      className="links"
                      href={`/news-and-research/news-and-research-insider/${ele?.slug}`}
                    >
                      <Box
                        className={
                          "indxxInsightImgTabPanel DF AIFE JCFE bordRadius10"
                        }
                        sx={{
                          backgroundImage: `url(${ele.Image})`,
                          backgroundColor: "#616564",
                        }}
                      >
                        <Typography
                          component={"p"}
                          className="dateBlockIndxxInsightsForTabs DF AIC JCC TAC PL10 PR10 "
                        >
                          {dateFunction(ele.Date)}
                        </Typography>
                      </Box>
                      <Typography
                        component={"h5"}
                        className="indxxInsightHeadingForTabs MT20 MR13 ML13"
                      >
                        {ele.Title}
                      </Typography>
                    </Link>
                  </Box>
                );
              })
            : ""}
        </Box>
      ) : (
        ""
      )}
      <Box className="tabpanelyear ML30">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          // aria-label="scrollable auto tabs example"
          aria-label="string"
          style={{ margin: "0% 30px" }}
        >
          {tabHeadings?.map((ele, ind) => {
            return (
              <Tab
                className="newsandresearchtabheading linehtN"
                key={ind}
                label={ele}
                onClick={() => changetabdata(ele)}
                {...a11yProps(ind)}
              />
            );
          })}
        </Tabs>
        {tabDat?.map((ele, ind) => {
          return (
            <TabPanel
              key={ind}
              value={0}
              index={ind}
              className="newsandresearchtabpanel paddingL15R45"
            >
              {ele?.map((ele2, ind2) => {
                return (
                  <Link
                    key={ind2}
                    href={
                      topheadeing[0] === "IN THE NEWS"
                        ? ele2.URL
                        : topheadeing[0] === "PRESS RELEASES"
                        ? "/news-and-research/press-releases/" + ele2.slug
                        : topheadeing[0] === "INDXX INSIGHTS" && ele2.PDF === ""
                        ? "/news-and-research/news-and-research-insider/" +
                          ele2?.slug
                        : ele2.PDF
                    }
                    target={
                      topheadeing[0] === "IN THE NEWS" ||
                      topheadeing[0] === "Index Notifications" ||
                      topheadeing[0] === "Index Documents" ||
                      ele2.PDF !== ""
                        ? "_blank"
                        : ""
                    }
                    className={`links DF JCSB ${
                      ele.length - 1 === ind2
                        ? "tabPanelChildLast"
                        : "tabPanelChild"
                    } P1 PB20 verySmallMobFFC bGColorWhite verySmallMobPT10 verySmallMobPB10`}
                  >
                    <Box
                      component="span"
                      className="tabPanelTitleNewsAndAnnouncement text Lspac"
                      id="linehtN"
                    >
                      {ele2.Title}
                    </Box>
                    <Box
                      component="span"
                      className="date noWrap ML1 verySmallMobFloatRight verySmallMobPL1 Lspac fs1-125R font18px verySmallMobTAR"
                      id="linehtN"
                    >
                      {ele2.Date ? dateFunction(ele2.Date) : ""}
                    </Box>
                  </Link>
                );
              })}
            </TabPanel>
          );
        })}
      </Box>

      {/* loader */}
      {loader ? <Loader /> : ""}
    </Box>
  );
}
