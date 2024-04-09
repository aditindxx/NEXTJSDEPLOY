"use client";
import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Interweave } from "interweave";

import { GET_INDICES, GET_INDXX_TYPES } from "../../Apis/EndPoints";
import { getMethodApi } from "../../Utils/Methods";
import Loader from "../../Components/Loader/Loader";

import GreaterThenArrow from "./../../Assets/Icons/greaterThenArraow.svg";
import DownDirectionalArrow from "./../../Assets/Icons/downDirectionalArrow.svg";
import Line from "./../../Assets/Images/line.png";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Indices() {
  const [indicesData, setIndicesData] = useState([]);
  const [indxxTypes, setIndxxTypes] = useState([]);
  const [loader1, setLoader1] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getMethodApi(GET_INDICES).then((response) => {
      if (response.status === 200) {
        setIndicesData(response.data);
        setLoader1(false);
      }
    });
    getMethodApi(GET_INDXX_TYPES).then((response) => {
      if (response.status === 200) {
        setIndxxTypes(response.data);
        setLoader2(false);
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
      {/* Heading and BG */}
      <title>
        {indicesData?.meta_title ? indicesData.meta_title : "Indices | Indxx"}
      </title>
      <link
        rel="canonical"
        href={`https://www.indxx.com${pathname}`}
        key="canonical"
      />
      <meta
        name="description"
        content={
          indicesData?.meta_description
            ? indicesData.meta_description
            : "We offer a broad range of indexing solutions to meet the rigorous demands of our clients. Learn more about our indices here."
        }
      />
      <meta
        name="keywords"
        content={
          indicesData?.meta_keywords
            ? indicesData.meta_keywords
            : "Indices, Indxx, offer a broad range of indexing solutions, indices here."
        }
      />

      <Box className="indicesHeadingBGLayer">
        <Box
          className="benchmarkindicesimg DF JCC AIC"
          sx={{
            backgroundImage: `url(${indicesData?.Banner_Image})`,
          }}
        >
          <Typography variant={"h1"} className="topHeadingPage W50 TAC mobW100">
            {indicesData.Title ? indicesData.Title : ""}
          </Typography>
        </Box>
      </Box>

      {/* about us description and image */}
      <Box
        component={""}
        className="DF overviewBox smallMobMT40 verySmallMobFFC verySmallMobMT20"
      >
        <Box
          component={"div"}
          sx={{
            backgroundImage: `url(${
              indicesData.Image ? indicesData.Image : ""
            })`,
          }}
          className="imgForFull flexRatio12"
        ></Box>
        <Box className="DF FFC overviewBoxText AIFS JCC ML40 PL20 flexRatio21 MT25 MB25 verySmallMobML1 verySmallMobMR1 verySmallMobPL0 verySmallMobAIC">
          <Typography
            variant="h3"
            className="subHeadingOverview verySmallMobPT10"
          >
            {"Overview"}
          </Typography>
          <Typography
            variant=""
            className="text PT1 verySmallMobPT10 PR50 overviewTextOnly verySmallMobPR0 verySmallMobTAC"
            id="linehtN"
          >
            {indicesData.description ? (
              <Interweave content={indicesData.description} />
            ) : (
              ""
            )}
          </Typography>
          <Button
            className="advcadmingetintouchbtn listOfIndicesPageBtn"
            onClick={() =>
              router.push("/index-licensing-and-data-licensing-services")
            }
          >
            {"Index & Data Licensing Services"}
          </Button>
        </Box>
      </Box>

      {/* ikeep  */}
      <Box component={"div"} className="container MT60">
        <Box className="DF FFC AIC">
          <Typography variant="h2" className="subHeadingBlue">
            {"Our Key Differentiators"}
          </Typography>
        </Box>
        {/* desktop */}
        <Box
          component={"div"}
          className="MT60 keyDifferentiatBox DF mobDispNone900 FGap2R"
        >
          <Box component={"div"} className="IStretchF">
            {indicesData.key_differentiators
              ? indicesData.key_differentiators.map(
                  (item, ind) =>
                    ind % 2 !== 0 && (
                      <>
                        <Box
                          component={"div"}
                          className="keyDifferentiatSubBox1Emp"
                        ></Box>
                        <Box
                          component={"div"}
                          className="keyDifferentiatSubBox1Emp"
                        >
                          <Interweave
                            className="indexDevProcessHeading colorRed"
                            content={item.title}
                          />
                          <br />
                          <Interweave
                            className="ikeepSubTextIndices"
                            content={item.description}
                          />
                        </Box>
                        {/* <Box component={"div"} className="keyDifferentiatSubBox3Emp"></Box> */}
                      </>
                    )
                )
              : null}
          </Box>

          <Box component={"div"} className="ikeepIconBorderBox DF FFC">
            {indicesData?.key_differentiators?.map((ele, ind) => {
              if (ind < indicesData.key_differentiators.length - 1) {
                return (
                  <Box key={ind} component={"div"} className=" DF FFC">
                    <Box
                      component={"div"}
                      className={"keyDifferentiatOuterCircle DF AIC JCC"}
                    >
                      <Box
                        component={"div"}
                        className={`keyDifferentiatInnerCircle DF AIC JCC ${
                          ind % 2 === 0 ? "bGColorBlue" : "bGColorRed"
                        }`}
                      >
                        <Image
                          loader={() => ele.image}
                          width={44}
                          height={44}
                          src={ele.image}
                          alt=""
                          className="keyDifferentiatInnerCircleIcon"
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        backgroundImage: `url(${Line.src})`,
                      }}
                      className="downDirectionalArrowBox DF AIC JCC IStretchF"
                    >
                      <Image src={DownDirectionalArrow} alt="" />
                    </Box>
                  </Box>
                );
              } else {
                return (
                  <Box key={ind} component={"div"} className="IStretchF DF FFC">
                    <Box
                      component={"div"}
                      className={"keyDifferentiatOuterCircle DF AIC JCC"}
                    >
                      <Box
                        component={"div"}
                        className={`keyDifferentiatInnerCircle DF AIC JCC ${
                          ind % 2 === 0 ? "bGColorBlue" : "bGColorRed"
                        }`}
                      >
                        <Image
                          loader={() => ele.image}
                          width={44}
                          height={44}
                          src={ele.image}
                          alt=""
                          className="keyDifferentiatInnerCircleIcon"
                        />
                      </Box>
                    </Box>
                  </Box>
                );
              }
            })}
          </Box>

          <Box component={"div"} className="IStretchF">
            {indicesData.key_differentiators
              ? indicesData.key_differentiators.map(
                  (item, ind) =>
                    ind % 2 === 0 && (
                      <>
                        <Box
                          component={"div"}
                          className="keyDifferentiatSubBox1"
                        >
                          <Interweave
                            className="indexDevProcessHeading colorBlue"
                            content={item.title}
                          />
                          <br />
                          <Interweave
                            className="ikeepSubTextIndices"
                            content={item.description}
                          />
                        </Box>
                        <Box
                          component={"div"}
                          className="keyDifferentiatSubBox1"
                        ></Box>
                      </>
                    )
                )
              : null}
          </Box>
        </Box>

        {/* mobile */}
        <Box
          component={"div"}
          className="MT20 devProcessBox DF deskDispNone900"
        >
          <Box component={"div"} className="iconContainer  mobW100">
            {indicesData.key_differentiators?.map((ele, ind) => {
              return (
                <Box component={"span"} className="DF AIC JCC FFC" key={ind}>
                  <Box
                    key={ind}
                    component={"div"}
                    className={"keyDifferentiatOuterCircle DF AIC JCC MB20"}
                  >
                    <Box
                      component={"div"}
                      className={`keyDifferentiatInnerCircle DF AIC JCC ${
                        ind % 2 === 0 ? "bGColorBlue" : "bGColorRed"
                      }`}
                    >
                      <Image
                        loader={() => ele.image}
                        width={44}
                        height={44}
                        src={ele.image}
                        alt=""
                        className="keyDifferentiatInnerCircleIcon"
                      />
                    </Box>
                  </Box>
                  <Box component={"div"} className="MB20 TAC">
                    <Typography
                      variant="h6"
                      className={`devProcessHeading MB10 ${
                        ind % 2 === 0 ? "colorBlue" : "colorRed"
                      }`}
                    >
                      {ele.title}
                    </Typography>
                    <Typography variant="p" className="ikeepSubTextIndices">
                      <Interweave content={ele.description} />
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* types of indices offered */}
      {indxxTypes.length > 0 ? (
        <Box
          component={"div"}
          className="MB-60 indicesBox containerWithPadding PT60 smallMobPT20"
        >
          <Typography variant="h3" className="subHeadingBlue MT30 PB60">
            {"Indices"}
          </Typography>

          <Box component={"div"} className="DF FWW FGap30 JCFS mobJCC">
            {indxxTypes
              ?.sort(function compareByName(a, b) {
                return a.Name.localeCompare(b.Name);
              })
              ?.map((ele, ind) => {
                return (
                  <Box
                    component={"div"}
                    key={ind}
                    className="DF indicesAllBox JCSB bordRadius10 FWW mobW80 smallMobW100"
                  >
                    <Box
                      component={"span"}
                      className="indiciedOfferdLinkBox DF AIC JCFS PL30 W100 IStretchF"
                    >
                      <Link
                        href={`/indices/${ele.slug}`}
                        className="indicesLink TDN IStretchF"
                      >
                        {ele?.Name}
                      </Link>
                    </Box>
                    <Box component={"span"} className="DF AIC JCC PR30 PL10">
                      <Image src={GreaterThenArrow} alt="" />
                    </Box>
                  </Box>
                );
              })}
            {(indxxTypes?.length - 2) % 3 === 0 ? (
              <Box
                component={"div"}
                className="DF JCSB bordRadius10 FWW mobW80 smallMobW100"
              ></Box>
            ) : (
              <Box
                component={"div"}
                className="DF JCSB bordRadius10 FWW mobW80 smallMobW100 dispNone"
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
