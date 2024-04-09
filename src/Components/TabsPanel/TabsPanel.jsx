import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import Link from "next/link";
import PropTypes from "prop-types";

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
    <Box
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
    </Box>
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

export default function TabsPanel({ tabHeadings, tabData }) {
  const [value, setValue] = useState(0);
  const [heading, setHeading] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dateFunction = (date) => {
    let dateArr = date.split("-");
    return `${dateAlpha[+dateArr[1] - 1]} ${dateArr[2]}, ${dateArr[0]}`;
  };
  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        aria-label="scrollable auto tabs example"
        className="homeTabs"
      >
        {tabHeadings?.map((ele, ind) => {
          return (
            <Tab
              className="tab"
              onClick={() => setHeading(ele)}
              key={ind}
              label={ele}
              {...a11yProps(ind)}
            />
          );
        })}
      </Tabs>
      {tabData?.map((ele, ind) => {
        return (
          <TabPanel key={ind} value={value} index={ind} className="tabPanel">
            {ele?.map((ele2, ind2) => {
              return (
                <Link
                  key={ind2}
                  href={`${
                    heading === "Index Notifications" ||
                    heading === "Index Documents"
                      ? ele2.PDF
                      : heading === "Press Releases"
                      ? "/news-and-research/press-releases/" + ele2.slug
                      : heading === "Indxx Insights"
                      ? "/news-and-research/news-and-research-insider/" +
                        ele2.slug
                      : ele2.PDF !== null
                      ? ele2.PDF
                      : ele2.URL
                  }`}
                  target={
                    heading === "Press Releases" || heading === "Indxx Insights"
                      ? ""
                      : "_blank"
                  }
                  className={`links DF JCSB  ${
                    ele.length - 1 === ind2
                      ? "tabPanelChildLast"
                      : "tabPanelChild"
                  } P1 verySmallMobDIB bGColorSkyBlue`}
                >
                  <Box component="span" className="tabPanelTitle text">
                    {ele2.Title}
                  </Box>
                  <Box
                    component="span"
                    className="tabPanelDate verySmallMobFloatRight verySmallMobPL1"
                  >
                    {dateFunction(ele2.Date)}
                  </Box>
                </Link>
              );
            })}
          </TabPanel>
        );
      })}
    </Box>
  );
}
