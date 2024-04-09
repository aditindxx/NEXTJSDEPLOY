"use client";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { Carousel } from "react-carousel-minimal";
import { getMethodApi } from "../../Utils/Methods";
import {
  GET_CAREER,
  GET_REWARDS,
  GET_CURRENT_OPENINGS_REGION,
  GET_TESTIMONIALS,
  GET_LIFE_AT_INDXX,
} from "../../Apis/EndPoints";
import useStyles from "../../Assets/Styles/Common/Common";
import { Interweave } from "interweave";

import LeftArrow from "./../../Assets/Icons/leftArrowCarousel.svg";
import RightArrow from "./../../Assets/Icons/rightArrowCarousel.svg";
import Quotes from "./../../Assets/Icons/quote.svg";
import us from "./../../Assets/Images/us.png";
import europe from "./../../Assets/Images/europe.png";
import asia from "./../../Assets/Images/asia.png";
import Loader from "../../Components/Loader/Loader";
// import { useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const captionStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
};
const slideNumberStyle = {
  fontSize: "20px",
  fontWeight: "bold",
};

const openingsImg = [asia, us, europe];

const notice = [
  {
    name: "Notice of LCA - Senior Consultant - NYC",
    link: "https://www.indxx.com/media/LCA/SC.pdf",
  },
  {
    name: "Notice of LCA - Chief Operating Officer – Miami and NYC",
    link: "https://www.indxx.com/media/LCA/LCA-Posting-Notice.pdf",
  },
  {
    name: "Notice of LCA - Senior Analyst - Miami",
    link: "https://www.indxx.com/media/LCA/LCA-Senior-Associate-Miami.pdf",
  },
  {
    name: "Notice of LCA - Senior Associate - Miami",
    link: "https://www.indxx.com/media/LCA/LCA-Senior-Associate-Miami.pdf",
  },
];

export default function Career() {
  // const [indexLife, setIndexLife] = useState(0);
  const [mousedOver, setMousedOver] = useState(false);
  const [careerData, setData] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [currentOpening, setCurrentOpening] = useState([]);
  // const [lifeAtIndxx, setLifeAtIndxx] = useState(
  //   lifeAtIndxxData[0] ? lifeAtIndxxData[0] : ""
  // );
  const [lifeAtIndxxIndex, setLifeAtIndxxIndex] = useState(0);
  const [lifeAtIndxxData, setLifeAtIndxxData] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectOpening, setSelectOpening] = useState(0);
  const { whatToExpectCard, awardAndRecognitionCard } = useStyles();
  const [loader1, setLoader1] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [loader3, setLoader3] = useState(true);
  const [loader4, setLoader4] = useState(true);
  const [loader5, setLoader5] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [automaticOff, setAutomaticOff] = useState(true);
  const [forFirstTime, setForFirstTime] = useState(3000);
  // const navigate = useNavigate();
  const pathname = usePathname();
  const router = useRouter();
  const jobOpeningsRef = useRef();
  // let timeLifeAtIndxx = 15000;

  useEffect(() => {
    getMethodApi(GET_LIFE_AT_INDXX).then((response) => {
      if (response.status === 200) {
        setLifeAtIndxxData(response.data);
        // if (response.data) {
        //   for (let i = 0; i < response?.data?.length; i++) {
        //     setInterValTime([
        //       ...interValTime,
        //       response?.data[i]?.image.length * 3500,
        //     ]);
        //   }
        // }
        setLoader5(false);
      }
    });
    getMethodApi(GET_CAREER).then((response) => {
      if (response.status === 200) {
        setData(response.data);
        setLoader3(false);
      }
    });
    getMethodApi(GET_CURRENT_OPENINGS_REGION).then((response) => {
      if (response.status === 200) {
        setCurrentOpening(response.data);
        setLoader1(false);
      }
    });
    getMethodApi(GET_TESTIMONIALS).then((response) => {
      if (response.status === 200) {
        setTestimonials(response.data);
        setLoader2(false);
      }
    });
    getMethodApi(GET_REWARDS).then((response) => {
      if (response.status === 200) {
        setRewards(response.data);
        setLoader4(false);
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

  const changeCraousel = (ind) => {
    setLifeAtIndxxIndex(ind);
    // interValTime[ind];
    setSetTimeOutLoader(true);
    setTimeout(() => {
      setSetTimeOutLoader(false);
    }, 250);
  };
  useEffect(() => {
    setTimeout(() => {
      setMousedOver(true);
    }, 0);
  }, []);

  useEffect(() => {
    let ind = lifeAtIndxxIndex;
    if (mousedOver && lifeAtIndxxData[lifeAtIndxxIndex]?.image?.length) {
      const timer = setInterval(() => {
        if (ind < lifeAtIndxxData?.length - 1) {
          ind++;
          changeCraousel(ind);
        } else {
          ind = 0;
          changeCraousel(ind);
        }
        // }, (timeLifeAtIndxx + 3000));
      }, lifeAtIndxxData[lifeAtIndxxIndex]?.image?.length * 2000 + forFirstTime);
      setForFirstTime(2000);
      if (!automaticOff) {
        setTimeout(() => {
          setAutomaticOff(true);
        }, 2000);
      }
      // console.log('interval',lifeAtIndxxData[lifeAtIndxxIndex]?.image?.length);
      // console.log('change',forFirstTime);
      return () => clearInterval(timer);
    }
  }, [lifeAtIndxxIndex, lifeAtIndxxData?.length, mousedOver, automaticOff]);

  const openingJobsScroll = () => {
    jobOpeningsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
  };

  // setInterval(() => {
  //   console.log('3000');
  // }, lifeAtIndxxData[lifeAtIndxxIndex]?.image?.length*3000);

  return (
    <>
      {/* <Helmet> */}
      <title>
        {careerData?.meta_title
          ? careerData.meta_title
          : "Careers | Life at Indxx"}
      </title>
      <link
        rel="canonical"
        href={`https://www.indxx.com${pathname}`}
        key="canonical"
      />
      <meta
        name="description"
        content={
          careerData?.meta_description
            ? careerData.meta_description
            : "description"
        }
      />
      <meta
        name="keywords"
        content={
          careerData?.meta_keywords ? careerData.meta_keywords : "keywords"
        }
      />

      {/* Heading and BG */}
      <Box
        sx={{
          backgroundImage: `url(${careerData?.Image})`,
        }}
        className="careersBannerBG DF FFC JCC AIC PR1 PL1 MB60"
      >
        <Typography
          variant={"h1"}
          className="topHeadingPageWithBTn W70 TAC mobW100 MT20"
        >
          {careerData?.Title}
        </Typography>
        <Button
          className="bannerBtn MT30 MB20"
          variant="outlined"
          onClick={() => {
            openingJobsScroll();
          }}
        >
          {"Join Our Team"}
        </Button>
      </Box>

      {/* work culture and work life balance */}
      {careerData?.values.length > 0 ? (
        <Box component={"div"} className="container PT60">
          {careerData?.values?.map((ele, ind) => {
            return (
              <Box
                component={"div"}
                className={`DF MB30 FGap60 mobFFCR mobAIC mobMB50 ${
                  ind % 2 === 1 ? "FFRR" : ""
                }`}
                key={ind}
              >
                <Image
                  src={ele.image}
                  loader={() => ele.image}
                  alt=""
                  className="W49 ourWorkCultureImg mobW80 mobRordRadiusTL mobRordRadiusTR mobRordRadiusBL mobRordRadiusBR"
                  width={1}
                  height={10}
                />
                <Box component={"div"} className="DF FFC JCC W49 mobW100">
                  <Typography
                    variant="h4"
                    component={"h4"}
                    className="ourWorkCultureSubHead MB1"
                  >
                    {ele.title}
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MT10 ourWorkCultureText mobOnlyTAJ"
                  >
                    {ele.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        ""
      )}

      {/* what to expected */}
      <Box component={"div"} className="container">
        <Paper
          className={`DF FFC AIC JCC ${whatToExpectCard} PL60 PR60 PT20 PB20 mobPL1 mobPR1`}
        >
          <Typography variant="h3" className="whatToExpectHeading TAC mobPB20">
            {"What to Expect"}
          </Typography>
          <Typography variant="p" className="whatToExpectSubText MT10 TAC">
            {`Joining the Indxx team means embarking on a rewarding and fulfilling career journey. Here's what you can expect when you become a part of our Indxx family:`}
          </Typography>
        </Paper>

        {careerData?.process?.length > 0 ? (
          <Box className="MT3-25R DF FWW JCSB">
            {careerData?.process?.map((ele, ind) => {
              return (
                <Box
                  key={ind}
                  className="whatToExpectOuterBox boxshadow4sides DF JCSB FFC MB30 mobW100"
                >
                  <Box className="mobP20 P40">
                    <Typography
                      variant="p"
                      component={"p"}
                      className="whatToExpectInnerBoxTopHeading colorBlue MB1"
                    >
                      {ele.title}
                    </Typography>
                    <Interweave
                      className="whatToExpectInnerBoxText PT1 MA"
                      content={ele.description}
                    />
                  </Box>
                  <Box className="whatToExpectInnerBoxBottom bGColorBlue"></Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          ""
        )}
      </Box>

      <Box component={"div"} className="container MT30 TAC PB40">
        <Typography
          variant="p"
          component={"p"}
          className="whatToExpectInnerBoxText"
          id="lineHt23p"
        >
          {
            "Join us in building a dynamic and exciting future in indexing and investment management."
          }
        </Typography>
        <Button
          className="bannerBtn MT1"
          variant="outlined"
          onClick={() => {
            openingJobsScroll();
          }}
        >
          {"Explore Opportunities"}
        </Button>
      </Box>

      {/* awards */}
      <Paper className={`${awardAndRecognitionCard} PT60 PB20 MB60`}>
        <Box component={"div"} className="container">
          <Typography
            variant="h3"
            className="awardAndRecognitionHeading TAC mobPB20 PT30 colorWhite MB60"
          >
            {"Awards and Recognition"}
          </Typography>
          <Box component={"div"} className="DF JCSB AIC verySmallMobFFC">
            {rewards?.map((ele, ind) => {
              return (
                <Box
                  key={ind}
                  className="verySmallMobMB20 verySmallMobW100 W49"
                >
                  <Typography
                    variant="p"
                    className="awardAndRecognitionSubHeading MT10 TAC colorWhite PL1 noWrap"
                  >
                    {ele.Title}
                  </Typography>
                  <Box className="MT40 DF FWW FGap2R ">
                    <Image
                      loader={() => ele.image1}
                      src={ele.image1}
                      alt=""
                      className="W45 H45"
                      width={1}
                      height={1}
                    />
                    <Image
                      loader={() => ele.image2}
                      src={ele.image2}
                      width={1}
                      height={1}
                      alt=""
                      className="W45 H45"
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Paper>

      {/* testimonials */}
      <Box component={"div"} className="PT40 PB60 smallMobPT0 smallMobPB0">
        <Typography
          variant="h4"
          component={"h4"}
          className="ourWorkCultureSubHead MT25 MB50 TAC"
        >
          Testimonials
        </Typography>

        {/* desktop view testimonial */}
        <Box component={"div"} className="DF JCSB AIC mobDispNone900">
          <Box component={"div"} className="W15 smallMobW10 DF JCC AIC ">
            <Box
              component={"div"}
              className="cursorPointer mobW60"
              onClick={() => {
                if (index > 0) {
                  setIndex(index - 2);
                }
              }}
            >
              <Image src={LeftArrow} alt="" className="W100" />
            </Box>
          </Box>
          <Box
            component={"div"}
            className={`container DF FGap2R AIStretch ${
              testimonials[index + 1] ? "" : "W50"
            }`}
          >
            <Box className="DF FFC JCSB">
              <Box className="textTestimonoal P35 MB20 IStretchF">
                <Box>
                  <Image src={Quotes} alt="" className="" />
                </Box>
                <Typography className="PT25 lineHt30p ">
                  {testimonials[index]?.Text}
                </Typography>
              </Box>
              <Box className="DF AIC JCFS MT25 FGap2R">
                <Box>
                  {testimonials[index]?.image ? (
                    <Image
                      loader={() => testimonials[index]?.image}
                      src={testimonials[index]?.image}
                      alt=""
                      width={1}
                      height={1}
                      className="testimonialImg"
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Typography className="linehtN fs18">
                  {testimonials[index]?.Designation}
                </Typography>
              </Box>
            </Box>
            {testimonials[index + 1] ? (
              <Box className="DF FFC JCSB">
                <Box className="textTestimonoal P35 MB20 IStretchF">
                  <Box>
                    <Image src={Quotes} alt="" />
                  </Box>
                  <Typography className="PT25 lineHt30p">
                    {testimonials[index + 1]?.Text}
                  </Typography>
                </Box>
                <Box className="DF AIC JCFS MT25 FGap2R">
                  <Box>
                    {testimonials[index + 1]?.image ? (
                      <Image
                        loader={() => testimonials[index + 1]?.image}
                        src={testimonials[index + 1]?.image}
                        alt=""
                        width={1}
                        height={1}
                        className="testimonialImg"
                      />
                    ) : (
                      ""
                    )}
                  </Box>
                  <Typography className="linehtN fs18">
                    {testimonials[index + 1]?.Designation}
                  </Typography>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Box>

          <Box component={"div"} className="W15 smallMobW10 DF JCC AIC ">
            <Box
              component={"div"}
              className="cursorPointer mobW60"
              onClick={() => {
                if (index < testimonials?.length - 2) {
                  setIndex(index + 2);
                }
              }}
            >
              <Image src={RightArrow} alt="" className="W100" />
            </Box>
          </Box>
        </Box>

        {/* mobile view */}
        <Box component={"div"} className="DF JCSB AIC deskDispNone900">
          <Box component={"div"} className="W15 smallMobW10 DF JCC AIC ">
            <Box
              component={"div"}
              className="cursorPointer mobW60"
              onClick={() => {
                if (index > 0) {
                  setIndex(index - 1);
                }
              }}
            >
              <Image src={LeftArrow} alt="" className="W100" />
            </Box>
          </Box>
          <Box component={"div"} className="container DF FGap2R AIStretch">
            <Box className="DF FFC JCSB">
              <Box className="textTestimonoal smallMobP20 P35 MB20 IStretchF">
                <Box>
                  <Image src={Quotes} alt="" className="" />
                </Box>
                <Typography className="PT25 lineHt30p">
                  {testimonials[index]?.Text}
                </Typography>
              </Box>
              <Box className="DF AIC JCFS MT25 FGap2R">
                <Box>
                  {testimonials[index]?.image ? (
                    <Image
                      loader={() => testimonials[index]?.image}
                      src={testimonials[index]?.image}
                      alt=""
                      width={1}
                      height={1}
                      className="testimonialImg"
                    />
                  ) : (
                    ""
                  )}
                </Box>
                <Typography>{testimonials[index]?.Designation}</Typography>
              </Box>
            </Box>
          </Box>

          <Box component={"div"} className="W15 smallMobW10 DF JCC AIC ">
            <Box
              component={"div"}
              className="cursorPointer mobW60"
              onClick={() => {
                if (index < testimonials?.length - 1) {
                  setIndex(index + 1);
                }
              }}
            >
              <Image src={RightArrow} alt="" className="W100" />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* life at indxx */}
      <Box className="bGColorWhiteSmoke smallMobPT10 PT40 MT60 MB60 smallMobMB0 PB40">
        <Typography
          variant="h4"
          component={"h4"}
          className="ourWorkCultureSubHead MT40 smallMobMT20 MB40 TAC"
        >
          Life At Indxx
        </Typography>
        <Box component={"div"} className="container" sx={{ height: "70vh" }}>
          {setTimeOutLoader ? (
            ""
          ) : lifeAtIndxxData[lifeAtIndxxIndex] ? (
            <Box
              className="fade-in-image"
              // onTouchStart={() => setMousedOver(false)}
              // onTouchEnd={() => setMousedOver(true)}
              // onMouseOver={() => setMousedOver(false)}
              // onMouseOut={() => setMousedOver(true)}
              onClick={()=>{
                setAutomaticOff(false)
                setTimeout(() => {
                  setAutomaticOff(true)
                }, 2000);
                setMousedOver(false)
                setTimeout(() => {
                  setMousedOver(true)
                }, 0);
              }}
            >
              <Carousel
                data={
                  lifeAtIndxxData[lifeAtIndxxIndex]?.image
                    ? lifeAtIndxxData[lifeAtIndxxIndex]?.image
                    : ""
                }
                time={
                  // timeLifeAtIndxx /
                  // lifeAtIndxxData[lifeAtIndxxIndex]?.image?.length
                  2000
                }
                width="100%"
                height="70vh"
                captionStyle={captionStyle}
                radius="10px"
                slideNumber={false}
                slideNumberStyle={slideNumberStyle}
                captionPosition="bottom"
                // automatic={automaticOff}
                automatic={true}
                dots={false}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="contain"
                // slideImageFit="cover"
                thumbnails={true}
                thumbnailWidth="60px"
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  maxHeight: "60vh",
                  margin: "70px auto",
                }}
              />
            </Box>
          ) : (
            ""
          )}
        </Box>

        {lifeAtIndxxData?.length > 1 ? (
          <Box className="DF AIC JCC PT70">
            {lifeAtIndxxData?.map((ele, ind) => {
              return (
                <Box
                  key={ind}
                  className={
                    lifeAtIndxxIndex === ind
                      ? "lifeIndxxActive"
                      : "lifeIndxxInactive"
                  }
                  onTouchStart={() => setMousedOver(false)}
                  onTouchEnd={() => setMousedOver(true)}
                  onMouseOver={() => setMousedOver(false)}
                  onMouseOut={() => setMousedOver(true)}
                  onClick={() => {
                    setLifeAtIndxxIndex(ind);
                    // interValTime[ind];
                    setSetTimeOutLoader(true);
                    setAutomaticOff(true)
                    setTimeout(() => {
                      setSetTimeOutLoader(false);
                    }, 250);
                  }}
                ></Box>
              );
            })}
          </Box>
        ) : null}
      </Box>

      {/* job openings */}
      <Box
        component={"div"}
        className="PT40 container MB40"
        ref={jobOpeningsRef}
      >
        <Typography
          variant="h4"
          component={"h4"}
          className="ourWorkCultureSubHead MT25 MB50 TAC"
        >
          Current Openings{" "}
        </Typography>

        <Box component={"div"} className="">
          <Box
            component={"div"}
            className="DF FGap30 JCFS AIC MB15 mob900FFC smallMobW100 verySmallMobFFC"
          >
            {currentOpening.length == 2
              ? currentOpening?.map((ele, ind) => {
                  return (
                    <Box
                      key={ind}
                      className={`cursorPointer ${
                        selectOpening === ind
                          ? "currentOpeningOpenImg"
                          : "currentOpeningImg"
                      } colorWhite W48 currentOpeningHeading bordRadius20 DF JCC AIC smallMobW100`}
                      sx={{
                        background: `url(${openingsImg[ind].src})`,
                      }}
                    >
                      <Box
                        key={ind}
                        onClick={() => {
                          setSelectOpening(ind);
                        }}
                        className={`${
                          selectOpening === ind
                            ? "currentOpeningImgLayer linehtN"
                            : "currentImgLayer linehtN"
                        } bordRadius20 DF JCC AIC P10`}
                        height={"100%"}
                        width={"100%"}
                      >
                        {Object.keys(ele)}
                      </Box>
                    </Box>
                  );
                })
              : currentOpening?.map((ele, ind) => {
                  return (
                    <Box
                      key={ind}
                      className={`cursorPointer ${
                        selectOpening === ind
                          ? "currentOpeningOpenImg"
                          : "currentOpeningImg"
                      } colorWhite currentOpeningHeading bordRadius20 DF JCC AIC smallMobW100`}
                      sx={{
                        background: `url(${openingsImg[ind]})`,
                      }}
                    >
                      <Box
                        key={ind}
                        onClick={() => {
                          setSelectOpening(ind);
                        }}
                        className={`${
                          selectOpening === ind
                            ? "currentOpeningImgLayer linehtN"
                            : "currentImgLayer linehtN"
                        } bordRadius20 DF JCC AIC P10`}
                        height={"100%"}
                        width={"100%"}
                      >
                        {Object.keys(ele)}
                      </Box>
                    </Box>
                  );
                })}
          </Box>
          <Box className="DF JCSB FWW">
            {currentOpening.length > 0 ? (
              Object.values(currentOpening[selectOpening])[0].length > 0 ? (
                Object.values(currentOpening[selectOpening])[0]?.map(
                  (ele, ind) => {
                    return (
                      <Box
                        key={ind}
                        className="applyNow bordRadius20 P30 MT30 W48 mobOnlyW100"
                      >
                        {" "}
                        <Typography variant="p" className="text24 DB linehtN">
                          {ele?.Title}
                        </Typography>
                        <Button
                          className="bannerBtn MT30"
                          variant="outlined"
                          onClick={() =>
                            router.replace(`/contact-us/careers/${ele?.slug}`)
                          }
                        >
                          {"Apply Now"}
                        </Button>
                      </Box>
                    );
                  }
                )
              ) : (
                <Box className="applyNow bordRadius20 P30 MT30 mobOnlyW100">
                  {" "}
                  <Typography variant="p" className="text24 DB linehtN">
                    {
                      "Currently, there are no job openings in this region. For any additional information or queries, please contact HR@indxx.com"
                    }
                  </Typography>
                </Box>
              )
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>

      {/* notices and labour condition */}
      <Box component={"div"} className="PT40 smallMobPT10 container">
        <Typography
          variant="h4"
          component={"h4"}
          className="ourWorkCultureSubHead MT25 MB50 TAC"
        >
          Labor Condition Applications
        </Typography>

        <Typography
          variant="p"
          component={"p"}
          className="text PB20 smallMobTAC"
          id="lineht24"
        >
          {
            "Pursuant to 20 CFR 655.734, notice is being provided to potentially affected workers that H-1B workers are being sought at the worksites listed below. Copies of each Labor Condition Application and supporting documents are maintained in file and are available for public inspection at the offices of Indxx, LLC at 470 Park Avenue S, Suite 8S, New York, NY 10016."
          }
        </Typography>
        <Typography
          variant="p"
          component={"p"}
          className="text smallMobTAC"
          id="lineht24"
        >
          {
            "Complaints alleging misrepresentation of material facts in the labor condition application and/or failure to comply with the terms of the labor condition application may be filed with any office of the Wage and Hour Division of the United States Department of Labor."
          }
        </Typography>

        <Typography
          variant="h4"
          component={"h4"}
          className="ourWorkCultureSubHead MT50 MB50 TAC"
        >
          Notices
        </Typography>
        <Box className="DF FWW JCSB ">
          {notice?.map((ele, ind) => {
            return (
              <Box
                key={ind}
                className="noticeLink PL10 PR10 TAC PT10 PB10 W48 MB20 cursorPointer verySmallMobW100 DF JCC AIC"
                onClick={() => window.open(`${ele.link}`, "_blank")}
              >
                {ele.name}
              </Box>
            );
          })}
        </Box>
      </Box>
      {/* loader */}
      {loader1 || loader2 || loader3 || loader4 || loader5 ? <Loader /> : ""}
    </>
  );
}
