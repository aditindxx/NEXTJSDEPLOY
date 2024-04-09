"use client";
import React from "react";
import { GET_INDXX_DATA_AND_TECHNOLOGY } from "../../../Apis/EndPoints";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Interweave } from "interweave";
import ContactUsForm from "../../../Components/ContactForm/ContactUsForm";
import { getMethodApi } from "../../../Utils/Methods";

import Loader from "../../../Components/Loader/Loader";
// import { useNavigate } from "react-router-dom";
import { usePathname, useRouter } from "next/navigation";

export default function IndxxDataAndTechnology() {
  const [data, setData] = useState({});
  // const navigate = useNavigate();
  const router = useRouter();
  const [loader1, setLoader1] = useState(true);
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
    getMethodApi(GET_INDXX_DATA_AND_TECHNOLOGY).then((response) => {
      if (response.status === 200) {
        setData(response.data);
        setLoader1(false);
      }
    });
  }, []);

  return (
    <>
      <title>
        {data?.meta_title ? data.meta_title : "Indxx Data & Technology"}
      </title>
      <link
        rel="canonical"
        href={`https://www.indxx.com${pathname.split("&").join("and")}`}
        key="canonical"
      />
      <meta
        name="description"
        content={
          data?.meta_description
            ? data.meta_description
            : "Indxx provides a suite of data and technology solutions which are designed to empower companies in the investment management community. Learn more here."
        }
      />
      <meta
        name="keywords"
        content={
          data?.meta_keywords ? data.meta_keywords : "Indxx Data & Technology"
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
            className="text PT1 verySmallMobPT10 PR50 overviewTextOnly verySmallMobPR0 verySmallMobTAC"
          >
            {data.overview ? data.overview : ""}
          </Typography>
        </Box>
      </Box>

      {/* Our Solutions */}
      <Box>
        <Box
          component={"div"}
          className="container DF JCSB MB60 FGap2R mobFFC smallMobMT40"
        >
          {data?.values?.length > 0
            ? data?.values?.map((ele, ind) => {
                return (
                  <Box
                    className="indxxInsightBox IStretchF DF FFC JCSB"
                    key={ind}
                  >
                    <Box>
                      <Box
                        className={"indxxInsightImgDataTechnology DF AIFE JCFE"}
                        sx={{
                          backgroundImage: `url(${ele.image})`,
                        }}
                      ></Box>
                      <Typography
                        component={"h5"}
                        className="indxxInsightHeadingDataTechnology MT20 MR13 ML13 colorRed"
                      >
                        {ele.title}
                      </Typography>
                    </Box>
                    <Box component={"div"} className="indxxInsightBorder"></Box>
                    <Box>
                      <Typography
                        component={"h5"}
                        className="indxxInsightText MT20 MR18 ML18"
                      >
                        <Interweave content={ele.description} />
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className="MT20 OurValuesText MB1 ML18"
                      >
                        <Button
                          className="tabBtnDT mobMT20 mobMAuto"
                          onClick={() =>
                            ele.navigate
                              ? router.replace(
                                  `/${ele.navigate
                                    .split(" ")
                                    .join("")
                                    .toLowerCase()}`
                                )
                              : ""
                          }
                        >
                          Learn More
                        </Button>
                      </Typography>
                    </Box>
                  </Box>
                );
              })
            : ""}
        </Box>
      </Box>
      {/* loader */}
      {setTimeOutLoader || loader1 ? <Loader /> : ""}
    </>
  );
}
