"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getMethodApi } from "@/Utils/Methods";
import {
  GET_ANNOUNCEMENTS_BY_LIMIT,
  GET_AWARDS,
  GET_BUSINESS_OFFERINGS,
  GET_CAROUSEL_TABS,
  GET_CONFIG,
  GET_LICENCED_CLIENTS,
  GET_NEWS_AND_RESEARCH_BY_LIMIT,
} from "@/Apis/EndPoints";
import useStyles from "@/Assets/Styles/Common/Common";
import { Box, Button, Paper, Typography } from "@mui/material";
import Carousel from "@/Components/Carousel/Carousel";
// import CountUp from "react-countup/build/CountUp";
import CountUp from "react-countup";
import Divider from "@/Components/Widgets/Divider";
import Circle from "@/Components/Widgets/Circle";
import newsImg from "@/Assets/Svgs/news-and-research.svg";
import announcementsImg from "@/Assets/Svgs/announcement.svg";
import TabsPanel from "@/Components/TabsPanel/TabsPanel";
import Loader from "@/Components/Loader/Loader";
import { Interweave } from "interweave";
import Map from "@/Assets/Svgs/map.svg";
import indxxPoster from "../../Assets/Images/indxxPoster.png";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [tabsData, setTabsData] = useState([]);
  const [expData, setExpData] = useState([]);
  const [seoData, setSeoData] = useState("");
  const [clientData, setClientsData] = useState([]);
  const [businessOfferingData, setBusinessOfferingData] = useState([]);
  const [awardsData, setAwardsData] = useState([]);
  const [newsDataHeadings, setNewsDataHeadings] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [announcementsDataHeadings, setAnnouncementsDataHeadings] = useState(
    []
  );
  const ref = useRef();
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [startEnd, setStartEnd] = useState(0);
  const [blockSize, setBlockSize] = useState({
    start: 0,
    mid: 0,
    end: 0,
  });
  const [hoveredCart, setHoveredCart] = useState(-1);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [loader1, setLoader1] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [loader3, setLoader3] = useState(true);
  const [loader4, setLoader4] = useState(true);
  const [loader5, setLoader5] = useState(true);
  const [loader6, setLoader6] = useState(true);
  const [loader7, setLoader7] = useState(true);
  const [muted, setMuted] = useState(true);
  const [stopVideo2, setStopVideo2] = useState(false);
  const [pauseVideo2, setPauseVideo2] = useState(false);
  const pathname = usePathname();

  const router = useRouter();
  const services = useRef();
  const videoIndxx = useRef();

  const { expCard, expCardBtn, text_18_24 } = useStyles();

  const showCartHandler = (i) => {
    setHoveredCart(i);
  };

  const hideCartHandler = () => {
    setHoveredCart(-1);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);

  const handlePlayPause = () => {
    const video = videoRef?.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  // useEffect(() => {
  //   let options = {
  //     rootMargin: "0px",
  //     threshold: [0.25, 0.75],
  //   };

  //   let handlePlay = (entries, observer) => {

  //       entries?.forEach((entry) => {

  //         if (entry?.isIntersecting) {
  //           videoRef?.current?.play();
  //           setMuted(false);
  //         } else {
  //           videoRef?.current?.pause();
  //           setMuted(false);
  //         }

  //     });

  //   };

  //   let observer = new IntersectionObserver(handlePlay, options);

  //   if(stopVideo === 0){
  //   observer.observe(videoRef.current);
  //   }

  // }, []);

  useEffect(() => {
    getMethodApi(GET_CAROUSEL_TABS).then((response) => {
      if (response.status === 200) {
        setTabsData(response.data["Home"]);
        setLoader1(false);
      }
    });
    getMethodApi(GET_CONFIG).then((response) => {
      if (response.status === 200) {
        setSeoData(response?.data);
        setExpData(response.data["About Us"]);
        setLoader2(false);
      }
    });
    getMethodApi(GET_LICENCED_CLIENTS).then((response) => {
      if (response.status === 200) {
        setClientsData(response.data);
        setLoader3(false);
      }
    });
    getMethodApi(GET_BUSINESS_OFFERINGS).then((response) => {
      if (response.status === 200) {
        setBusinessOfferingData(response.data);
        setLoader4(false);
      }
    });
    getMethodApi(GET_AWARDS).then((response) => {
      if (response.status === 200) {
        setAwardsData(response.data);
        setBlockSize({
          start: Math.round(response.data?.length / 3),
          mid: Math.round(response.data?.length / 3) * 2,
          end: response.data?.length,
        });
        setLoader5(false);
      }
    });
    getMethodApi(GET_NEWS_AND_RESEARCH_BY_LIMIT + "5/").then((response) => {
      if (response.status === 200) {
        setNewsDataHeadings(Object.keys(response.data));
        setNewsData([
          response.data["News"],
          response.data["Press Releases"],
          response.data["Indxx Insights"],
        ]);
        setLoader6(false);
      }
    });
    getMethodApi(GET_ANNOUNCEMENTS_BY_LIMIT + "5/").then((response) => {
      if (response.status === 200) {
        setAnnouncementsDataHeadings(Object.keys(response.data));
        setAnnouncementsData([
          response.data["Index Notifications"],
          response.data["Index Documents"],
        ]);
        setLoader7(false);
      }
    });

    setTimeout(() => {
      setSetTimeOutLoader(false);
    }, 2000);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const carouselFunc = (data) => {
    router.replace(data);
  };

  const onScrollerAwards = (ind) => {
    if (ind < blockSize.start) {
      setStartEnd(0);
    } else if (ind >= blockSize.start && ind < blockSize.mid) {
      setStartEnd(1);
    } else {
      setStartEnd(2);
    }
  };

  return (
    <>
      {/* Seo */}

      <title>
        {seoData?.meta_title
          ? seoData.meta_title[0].value
          : "Indxx - Indexing Redefined"}
      </title>
      <link
        rel="canonical"
        href={`https://www.indxx.com${pathname}`}
        key="canonical"
      />
      <meta
        name="description"
        content={
          seoData?.meta_description
            ? seoData.meta_description[0].value
            : "Indxx is a leading global index provider, offering end to end indexing solutions, including index development, index maintenance, and index calculation. Our experienced indexing experts work closely with our clients to build custom index solutions tailored to their needs. Indxx and products tracking our indices have been nominated for and received numerous awards."
        }
      />
      <meta
        name="keywords"
        content={
          seoData?.meta_keywords
            ? seoData.meta_keywords[0].value
            : "Index Services,Index Development,Index Provider,Index Maintenance,Index Calculation"
        }
      />

      <Box className="MB120">
        {/* Carousel */}
        <Carousel
          data={tabsData}
          btnOne={"Know more"}
          btnTwo={"Watch Video"}
          indxxVideo={videoIndxx}
          playVideo={handlePlayPause}
          carouselFun={carouselFunc}
          color={"#0532c6"}
        />

        {/* Experience */}
        <Box className="containerExperience">
          <Box className="experienceBackground">
            {expData
              ?.filter((ele) => ele.value === "YEARS")
              ?.map((filterValue) => filterValue.description)}{" "}
            Years
          </Box>
          <Box className="containerWithPadding bGColorSkyBlue MB60">
            <Box className="expTextBox PT120 mobPT60">
              <Box className="DF FFC AIC">
                <Typography
                  variant="h1"
                  component={"h1"}
                  className="subHeadingRed W70"
                >
                  A Leading Index Provider Redefining the Indexing Industry for
                  over{" "}
                  {expData
                    ?.filter((ele) => ele.value === "YEARS")
                    ?.map((filterValue) => filterValue.description)}{" "}
                  years.
                </Typography>
                <Typography variant="" className="subHeadingRed"></Typography>
              </Box>
              <Box className="DF FFC AIC PT20">
                <Typography variant="" className=" TAC fs22 mobDispNone900">
                  Founded in 2005 and with offices in the US and India, Indxx is
                  a leading global index provider.
                </Typography>
                <Typography variant="" className=" TAC fs22 mobDispNone900">
                  Indxx offers end-to-end indexing services including index
                  licensing, development, calculation,
                </Typography>
                <Typography variant="" className=" TAC fs22 mobDispNone900">
                  and administration as well as{" "}
                  <Link
                    href={"https://www.indxx.com/indxx-data-&-technology"}
                    className="colorBlackLight mobDispNone900"
                  >
                    {" "}
                    data and technology products
                  </Link>{" "}
                  (CAdmin & ITICS).
                </Typography>
                <Typography variant="" className=" TAC fs22 deskDispNone900NotFlex">
                  Founded in 2005 and with offices in the US and India, Indxx is
                  a leading global index provider. Indxx offers end-to-end
                  indexing services including index licensing, development,
                  calculation, and administration as well as{" "}
                  <Link
                    href={"https://www.indxx.com/indxx-data-&-technology"}
                    className="colorBlackLight"
                  >
                    {" "}
                    data and technology products
                  </Link>{" "}
                  (CAdmin & ITICS).
                </Typography>
              </Box>
            </Box>
            <Box className="DF JCSB AIStretch MT60 smallMobFFC reactCountExperience">
              <Box className="DF FFC AIC TAC smallMobFFR mobJCC AIStretch">
                <Typography variant="" className="count smallMobTAE expTextBox">
                  {" "}
                  <CountUp
                    start={0}
                    end={expData
                      ?.filter((ele) => ele.value === "YEARS")
                      ?.map((filterValue) => filterValue.description)}
                    duration={6}
                  />
                  +
                </Typography>
                <Typography
                  variant=""
                  className="countText smallMobTAL PL1 PR1 expTextBox"
                >
                  Years of Expertise
                </Typography>
              </Box>
              <Box className="BLResp2 BRResp2 DF FFC AIC PL1 PR1 TAC smallMobFFR mobJCC AIStretch">
                <Typography variant="" className="count smallMobTAE expTextBox">
                  {" "}
                  <CountUp
                    start={0}
                    end={expData
                      ?.filter((ele) => ele.value === "PRODUCTS")
                      ?.map((filterValue) => filterValue.description)}
                    duration={5}
                  />
                  +
                </Typography>
                <Typography
                  variant=""
                  className="countText smallMobTAL PB30 mobPB0  PL1 PR1 expTextBox"
                >
                  Products tracking Indxx Indices
                </Typography>
              </Box>
              <Box className="DF FFC AIC PL1 PR1 TAC smallMobFFR mobJCC BRResp2 AIStretch">
                <Typography variant="" className="count smallMobTAE expTextBox">
                  <CountUp
                    start={0}
                    end={expData
                      ?.filter((ele) => ele.value === "AWARDS")
                      ?.map((filterValue) => filterValue.description)}
                    duration={6}
                  />
                  +
                </Typography>
                <Typography
                  variant=""
                  className="countText smallMobTAL PL1 PR1 expTextBox"
                >
                  Global Awards & Recognitions
                </Typography>
              </Box>
              <Box className="DF FFC AIC PL1 PR1 TAC smallMobFFR mobJCC AIStretch">
                <Typography variant="" className="count smallMobTAE expTextBox">
                  $
                  <CountUp
                    start={0}
                    end={expData
                      ?.filter((ele) => ele.value === "AUM")
                      ?.map((filterValue) => filterValue.description)}
                    duration={6}
                  />
                  +
                </Typography>
                <Typography
                  variant=""
                  className="countText smallMobTAL PL1 PR1 expTextBox"
                >
                  Assets Tracking Indxx Indices (in bn)
                </Typography>
              </Box>
            </Box>
            <Paper
              className={`DF FFC AIC JCC ${expCard} exploreOurService PL1 PR1 PT20 PB20 smallMobMT-90px MT-70px`}
            >
              <Typography variant="p" className="expCardText">
                With our domain expertise and technological prowess,
              </Typography>
              <Typography variant="p" className="expCardSubText MT10">
                we offer end-to-end indexing solutions designed to revolutionize
                the indexing industry.
              </Typography>
              <Button
                className={`MT30 ${expCardBtn}`}
                id="linehtN"
                onClick={() => {
                  services.current.scrollIntoView();
                }}
              >
                Explore our Services
              </Button>
            </Paper>
          </Box>
        </Box>

        {/* Video Embeded */}
        <Box
          onMouseEnter={() => {
            stopVideo2 === false ? videoRef?.current?.play() : null;
            setPauseVideo2(true);
          }}
          onMouseLeave={() => {
            setPauseVideo2(false);
            setTimeout(() => {
              videoRef?.current?.pause();
            }, 100);
          }}
        >
          <Box className="container PT60">
            <Box className="wrapper">
              {/* <Box
              className={`${stopVideo ? "dispNone" : ""}`}
            > */}
              <video
                ref={videoRef}
                width={"100%"}
                height={"auto"}
                controls
                controlsList="nodownload"
                poster={indxxPoster}
                muted
                onClick={() => {
                  if (stopVideo2 === false) {
                    setStopVideo2(true);
                  } else {
                    setStopVideo2(false);
                  }
                }}
                onPause={() => {
                  if (pauseVideo2 == true) {
                    setStopVideo2(true);
                  }
                }}
                onPlay={() => {
                  if (pauseVideo2 == true) {
                    setStopVideo2(false);
                  }
                }}
                // autoPlay
                // muted='muted'
                // muted={muted}
              >
                <source
                  src="https://indxxfiles.s3.amazonaws.com/Full%20Branding%20Video.mp4"
                  type="video/mp4"
                />
              </video>
              <Box sx={{ height: "60px" }} ref={videoIndxx}></Box>
              {/* </Box> */}
              {/* <Box
              className={`${stopVideo ? "" : "dispNone"}`}
              onClick={() => {
                setStopVideo(false);
              }}
            >
              <Box>
                <Image src={indxxPoster} className="W100 HAuto" />
              </Box>
            </Box> */}
            </Box>
          </Box>
        </Box>

        {/* Business Offering */}
        <Box className="container PT111 MB60 mobPT60" ref={services}>
          <Box className="DF FFC AIC">
            <Typography variant="h2" component={"h2"} className="subHeadingRed">
              Our Broad Range of Integrated Indexing Solutions
            </Typography>
            <Divider
              classes={`MT20 MB50 mobMT10 mobMB20`}
              colorOne={"#395FD2"}
              colorTwo={"#ED3125"}
            />
            <Box className="DF FWW  JCFS smallMobFFC">
              {businessOfferingData?.map((ele, ind) => {
                return (
                  <Box
                    onMouseEnter={() => showCartHandler(ind)}
                    onMouseLeave={hideCartHandler}
                    onClick={() =>
                      router.replace(
                        ele.Title.toLowerCase().split(" ").join("-")
                      )
                    }
                    key={ind}
                    className="businessOfferingBG PT40 PB40"
                    sx={{
                      backgroundImage: `url(${
                        ele ? ele.image : ""
                      }), linear-gradient(180deg, ${
                        hoveredCart === ind ? "#ED3125" : "#395FD2"
                      } 0%, ${hoveredCart === ind ? "#ED3125" : "#395FD2"} 100%)
                    `,
                    }}
                  >
                    <Box
                      className="businessOfferingIcon"
                      sx={{
                        backgroundImage: `
                    url(${ele ? ele.icon : ""})`,
                      }}
                    ></Box>
                    <Typography
                      variant=""
                      className="businessOfferingHeading DB PT20"
                    >
                      {ele.Title}
                    </Typography>
                    <Typography
                      variant=""
                      className="businessOfferingSubHeading DB PT20"
                    >
                      {ele.Sub_title}
                    </Typography>
                    <Box className="businessOfferingtext DB PT20">
                      <Interweave content={ele.Short_Description} />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* Map */}
        <Box className="container PT50 MB60 mobPT0 smallMobMB30 ">
          <Box className="DF FFC AIC">
            <Typography variant="" className="subHeadingRed ">
              Navigating Global Markets: Our Footprint Across Continents
            </Typography>
            <Typography variant="" className="text PT1 TAC" id="linehtN">
              Our footprint across multiple continents allows us to navigate
              global markets and
            </Typography>
            <Typography variant="" className="text TAC" id="linehtN">
              provide tailored indexing solutions to clients in diverse
              geographic locations.
            </Typography>
          </Box>
          <Divider
            classes={`MT35 MB35`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />
          <Box className="">
            <Image src={Map} alt="map" className="W100" />
            {/* <GlassMagnifier
            imageSrc={Map}
            imageAlt="Example"
            largeImageSrc={Map}
          /> */}
          </Box>
          <Box className="DF MT35 mobFFC smallMobMT15 AIStretch">
            <Box className="DF AIC mobPL30 mobMB20 smallMobMB10">
              <Box>
                <Circle color={"#ED3125"} classes={`MR1`} />
              </Box>
              <Typography variant="p" className="mapText">
                Markets with products currently tracking Indxx Indices
              </Typography>
            </Box>
            <Box className="DF AIC mobPL30 PR10 mobMB20 smallMobMB10">
              <Box>
                <Circle color={"#616564"} classes={`MR1`} />
              </Box>
              <Typography variant="p" className="mapText">
                Expected future product launches
              </Typography>
            </Box>
            <Box className="DF AIC mobPL30">
              <Box>
                <Circle color={"#395FD2"} classes={`MR1`} />
              </Box>
              <Typography variant="p" className="mapText">
                Indxx office locations
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Clients */}
        <Box className="smallContainer PT60 mobPT0 PB60">
          <Box className="DF FFC AIC">
            <Typography variant="" className="subHeadingRed">
              The marquee clients in our constellation of success
            </Typography>
            <Typography variant="" className="text PT1 TAC ">
              Honored to be in partnership with some of the leading ETF issuers,
              Asset Managers,
            </Typography>
            <Typography variant="" className="text TAC">
              and Financial Institutions in the world.
            </Typography>
          </Box>
          <Divider
            classes={`MT35 MB35 smallMobMT25 smallMobMB10`}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />

          <Box className="DF clientIconContainer">
            {clientData?.map((ele, ind) => {
              if (ind < 15) {
                return (
                  <Box
                    key={ind}
                    sx={{
                      pl: 1,
                      pr: 1,
                      mt: 1,
                    }}
                    className={`${
                      (ind + 1) % 5 !== 0 ? "BRResp" : ""
                    } verySmallMobBRResp verySmallMobIStretchF`}
                  >
                    <Box
                      className={`clientIcon ${
                        ind < 10 ? "BBResp" : ""
                      } verySmallMobBBResp`}
                      sx={{
                        backgroundImage: `
                    url(${ele ? ele?.Image : ""})`,
                      }}
                    ></Box>
                  </Box>
                );
              }
              return null;
            })}
          </Box>
        </Box>

        {/* Awards */}
        <Box>
          <Box className={"awardBox DF MT60 MB60 mobMT0 mobMB0"}>
            <Box className="container DF AIStretch PT20 PB20 mobFFC">
              <Box className="BRResp1 PR50 PT30 mobTAC mobP0 mobPT1">
                <Typography variant="" className="blueBGHeading">
                  {`Setting the Benchmark in Indexing: Our Awards and Recognitions`}
                </Typography>
                <Divider
                  classes={`MT30 MB30 JCFSimp`}
                  colorOne={"#ED3125"}
                  colorTwo={"#395FD2"}
                />
                <Typography
                  variant=""
                  className={`${text_18_24} colorWhite mobTAC linehtN`}
                >
                  {`We are proud to be recognized as one of the leading index
                providers globally. Our commitment to innovation and excellence
                has led us to win several awards and recognitions:`}
                </Typography>
              </Box>
              <Box
                className="awardScrollable PL50 PB30 mobPL0"
                component={"div"}
              >
                {awardsData?.map((ele, ind) => {
                  return (
                    <Box
                      key={ind}
                      component={"div"}
                      className="BLResp4R MT30 awardText PL25"
                      ref={ref}
                      id={`awardDiv${ind + 1}`}
                      onMouseOver={() => {
                        onScrollerAwards(ind);
                      }}
                    >
                      <Interweave className="" content={ele.Description} />
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box className="blueCrouselBtnContainer DF FFC posRel JCSB mobDispNone">
              <Box
                className={
                  startEnd === 0 ? "blueCrouselBtnActive" : "blueCrouselBtn"
                }
                onClick={() => {
                  setStartEnd(0);
                  document
                    .getElementById("awardDiv1")
                    .scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              ></Box>
              <Box
                className={
                  startEnd === 1 ? "blueCrouselBtnActive" : "blueCrouselBtn"
                }
                onClick={() => {
                  setStartEnd(1);
                  document
                    .getElementById(
                      `awardDiv${Math.round(awardsData?.length / 2) - 1}`
                    )
                    .scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              ></Box>
              <Box
                className={
                  startEnd === 2 ? "blueCrouselBtnActive" : "blueCrouselBtn"
                }
                onClick={() => {
                  setStartEnd(2);
                  document
                    .getElementById(`awardDiv${awardsData?.length - 1}`)
                    .scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              ></Box>
            </Box>
          </Box>
        </Box>

        {/* News and Insights */}
        {newsData ? (
          <Box className="container PT60 smallMobPT30">
            <Typography
              variant="h2"
              className="subHeadingRed PB60 smallMobPB30"
            >
              {"News & Research"}
            </Typography>

            <Box className="DF newsInsightContainerHome smallMobFFC smallMobAIC">
              <Box
                className="DF JCC newsInsightImageNewsOnly smallMobW50 verySmallMobW100 mobMB20 AIFS mobPT10"
                sx={{
                  backgroundImage: `url(${newsImg ? newsImg : ""})`,
                }}
              ></Box>

              <Box className="newsInsightTabPanel mobW100 IStretchF DF FFC JCSB">
                <TabsPanel tabHeadings={newsDataHeadings} tabData={newsData} />
                <Button
                  className="tabBtn mobMT20 mobMAuto MT10"
                  onClick={() => {
                    router.replace("/news-and-research");
                  }}
                >
                  {"Learn More"}
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}

        {/* Announcements */}
        {announcementsData ? (
          <Box className="container PT60 smallMobPT30">
            <Typography
              variant="h2"
              className="subHeadingRed PB60 smallMobPB30"
            >
              {"Announcements"}
            </Typography>

            <Box className="DF newsInsightContainerHome smallMobFFC smallMobAIC">
              <Box
                className="DF JCC newsInsightImageAnnouncmentOnly smallMobW50 verySmallMobW100 mobMB20 AIFS mobPT10"
                sx={{
                  backgroundImage: `url(${
                    announcementsImg ? announcementsImg : ""
                  })`,
                }}
              ></Box>
              <Box className="newsInsightTabPanel mobW100 IStretchF DF FFC JCSB">
                <TabsPanel
                  featureOfPanel={[]}
                  tabHeadings={announcementsDataHeadings}
                  tabData={announcementsData}
                />
                <Button
                  className="tabBtn mobMT20 mobMAuto MT10"
                  onClick={() => {
                    router.replace("/announcements");
                  }}
                >
                  {"Learn More"}
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}

        {/* loader */}
        {setTimeOutLoader ||
        loader1 ||
        loader2 ||
        loader3 ||
        loader4 ||
        loader5 ||
        loader6 ||
        loader7 ? (
          <Loader />
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
