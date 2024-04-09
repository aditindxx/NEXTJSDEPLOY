"use client";
import {
  GET_INDXX_INDICES,
  GET_INDXX_TYPES,
  GET_LICENCED_CLIENTS,
} from "@/Apis/EndPoints";
import Loader from "@/Components/Loader/Loader";
import Divider from "@/Components/Widgets/Divider";
import { getMethodApi } from "@/Utils/Methods";
import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useStyles from "@/Assets/Styles/Common/Common";
import GreaterThenArrow from "./../../../Assets/Icons/greaterThenArraow.svg";
import Licensing from "./../../../Assets/Images/licensing.png";
import Licensing2 from "./../../../Assets/Images/licensing2.png";
import GetInTouchBanner from "./../../../Assets/Images/licensingGetInTouchBanner.png";

import G1L1 from "./../../../Assets/Icons/G1L1.png";
import G1L2 from "./../../../Assets/Icons/G1L2.png";
import G1L3 from "./../../../Assets/Icons/G1L3.png";
import G1L4 from "./../../../Assets/Icons/G1L4.png";
import G1L5 from "./../../../Assets/Icons/G1L5.png";
import G1L6 from "./../../../Assets/Icons/G1L6.png";
import G1L7 from "./../../../Assets/Icons/G1L7.png";
import G1L8 from "./../../../Assets/Icons/G1L8.png";

import G2L1 from "./../../../Assets/Icons/G2L1.png";
import G2L2 from "./../../../Assets/Icons/G2L2.png";
import G2L3 from "./../../../Assets/Icons/G2L3.png";
import G2L4 from "./../../../Assets/Icons/G2L4.png";
import G2L5 from "./../../../Assets/Icons/G2L5.png";
import G2L6 from "./../../../Assets/Icons/G2L6.png";
import G2L7 from "./../../../Assets/Icons/G2L7.png";
import G2L8 from "./../../../Assets/Icons/G2L8.png";
import G2L9 from "./../../../Assets/Icons/G2L9.png";
import G2L10 from "./../../../Assets/Icons/G2L10.png";

const grp1 = [
  { image: G1L1, title: "Exchange Traded Funds (ETFs)" },
  { image: G1L2, title: "Exchange Traded Notes (ETNs)" },
  { image: G1L3, title: "Index Funds" },
  { image: G1L4, title: "Separately Managed Accounts (SMAs)" },
  { image: G1L5, title: "Fixed and Variable Annuities" },
  { image: G1L6, title: "Structured Products and more" },
  { image: G1L7, title: "Mutual funds" },
  { image: G1L8, title: "IULS" },
];
const grp2 = [
  { image: G2L1, title: "Asset Management Companies" },
  { image: G2L2, title: "Banks" },
  { image: G2L3, title: "Custodians" },
  { image: G2L4, title: "Direct Indexing Companies" },
  { image: G2L5, title: "Family Offices" },
  { image: G2L6, title: "Hedge Funds" },
  { image: G2L7, title: "Institutional Investors" },
  { image: G2L8, title: "Insurance Companies" },
  { image: G2L9, title: "Market Makers" },
  { image: G2L10, title: "Registered Investment Advisors (RIAs)" },
];

export default function IndexLicensingAndDataLicensingServices() {
  const [data, setData] = useState({});
  const [clientData, setClientsData] = useState([]);
  const [indxxTypes, setIndxxTypes] = useState([]);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [loader1, setLoader1] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [loader3, setLoader3] = useState(true);
  const router = useRouter();
  const { whatToExpectCard } = useStyles();

  useEffect(() => {
    getMethodApi(GET_LICENCED_CLIENTS).then((response) => {
      if (response.status === 200) {
        setClientsData(response.data);
        setLoader1(false);
      }
    });
    getMethodApi(GET_INDXX_TYPES).then((response) => {
      if (response.status === 200) {
        setIndxxTypes(response.data);
        setLoader2(false);
      }
    });
    getMethodApi(GET_INDXX_INDICES).then((response) => {
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
      {/* top heading and contact form */}
      <Box
        component={"div"}
        className="IIcontactUse DF JCC P1"
        sx={{
          backgroundImage: `
        linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.5) 100%), url(${
          data?.Banner_Image ? data?.Banner_Image : ""
        })`,
        }}
      >
        <Box
          component={"div"}
          className="DF AIC JCC TAC W70 mobW90 smallMobW100 smallMobPT20"
        >
          <Box component={"div"} className="">
            <Typography
              variant="h1"
              component={"h1"}
              className="h1HeadingOfferingLicensing FontFamilyInter"
            >
              Index Licensing & Data Licensing Services{" "}
            </Typography>
            <Typography
              variant="body1"
              component={"p"}
              className="headingSubtextOffering FontFamilyInter PT20"
            >
              Tailored index licensing and data services for your unique
              investment needs.
            </Typography>
          </Box>
        </Box>
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
            className="subHeadingOverviewLicensing verySmallMobPT10"
          >
            {"Overview "}
          </Typography>
          <Typography
            variant=""
            className="textOverviewDescriptionLicnesing PT1 verySmallMobPT10 PR50 overviewTextOnly verySmallMobPR0 verySmallMobTAC"
          >
            For more than 15 years, Indxx has crafted innovate cutting-edge
            indices for clients worldwide. Whether you're interested in
            licensing a custom index or benchmark index, or subscribing to our
            index data services, our offerings can be tailored to meet your
            requirements. Discover our suite of indices designed to address the
            diverse demands of the investment management community.{" "}
          </Typography>
        </Box>
      </Box>

      {/* Index Licensing */}
      <Box className="container">
        <Box className="MT80 smallMobMT60">
          <Box className="DF FFC AIC">
            <Typography variant="" className="subHeadingRed">
              Index Licensing{" "}
            </Typography>
            <Divider
              classes={`MT20 MB20 smallMobMB10`}
              colorOne={"#395FD2"}
              colorTwo={"#ED3125"}
            />
            <Typography variant="" className="text TAC PL50 PR50">
              As a trusted partner for index licensing and index data licensing,
              Indxx Indices cater to the needs of leading ETF providers and
              asset managers worldwide. As of December 2023, our licensed
              indices are tracked by more than 115+ products with over $20
              billion in assets. These include:
            </Typography>
          </Box>
        </Box>
        <Box className="MT50 MB50">
          <Box className="DF FWW JCFS verySmallMobFFC">
            {grp1?.map((ele, ind) => {
              return (
                <Box
                  key={ind}
                  className="bGColorLightBlue indexLicensingOuterBox P10 bordRadius8 DF AIC"
                >
                  <Box className="bordRadius8 indexLicensingInnerBox DF AIC JCC FS">
                    <Image src={ele.image} alt="white logo indxx" />
                  </Box>
                  <Typography
                    variant=""
                    className="indexLicensingInnerBoxText P10"
                  >
                    {ele.title}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Paper
          className={`DF FFC AIC JCC ${whatToExpectCard} PL60 PR60 PT20 PB20 mobPL1 mobPR1 MB50`}
        >
          <Typography
            variant="p"
            className="whatToExpectSubText MT10 TAC FontFamilyInter fw400"
          >
            {`With 200+ employees, Indxx is able to provide quick and efficient delivery of quality products. Securing an index license agreement is a prerequisite for introducing products linked to our indices or for trading or other use cases based on our indices and underlying data`}
          </Typography>
        </Paper>
        <Box>
          <Typography
            variant="p"
            component={"p"}
            className="text TAC PL50 PR50"
          >
            Our index licensing offering can be tailored to meet the demands of
            a diverse group of industry participants, including but not limited
            to:
          </Typography>
        </Box>
        <Box className="MT50 MB50">
          <Box className="DF FWW JCFS verySmallMobFFC">
            {grp2?.map((ele, ind) => {
              return (
                <Box
                  key={ind}
                  className="bGColorLightBlue indexLicensingOuterBox P10 bordRadius8 DF AIC"
                >
                  <Box className="bordRadius8 indexLicensingInnerBox DF AIC JCC FS">
                    <Image src={ele.image} alt="white logo indxx" />
                  </Box>
                  <Typography
                    variant=""
                    className="indexLicensingInnerBoxText P10"
                  >
                    {ele.title}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>{" "}
      </Box>

      {/* Get in touch */}
      <Box
        component={"div"}
        className="getInTouchBanner DF FFC smallMobMT1 MT100"
        sx={{
          backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${GetInTouchBanner.src})`,
        }}
      >
        <Box className="TAC container">
          <Typography
            variant="h1"
            component={"h1"}
            className="GetInTouchBannerHeading MB40 PT10"
          >
            {
              "Elevate your investment strategy with Indxx Indices. Interested in licensing an index? Book a consultation with our Sales team"
            }
          </Typography>
          <Button
            className="advcadmingetintouchbtn getintouchbtn"
            onClick={() => router.push("/contact-us/get-in-touch")}
          >
            {"Get In Touch"}
          </Button>
        </Box>
      </Box>

      {/* Data Licensing */}
      <Box>
        <Box className="container MT120 smallMobMT60">
          <Box className="DF FFC AIC">
            <Typography variant="" className="subHeadingRed">
              Data Licensing{" "}
            </Typography>
            <Divider
              classes={`MT20 MB20 smallMobMB10`}
              colorOne={"#395FD2"}
              colorTwo={"#ED3125"}
            />
            <Typography variant="" className="text TAC PL50 PR50">
              Our Data Licensing services enable users to access index related
              data, including index levels, constituent data, and corporate
              action information. Indxx licenses both end-of-day and real-time
              values of its indices.
            </Typography>
          </Box>
        </Box>

        <Box className="MT40">
          <Box component={"div"} className="container">
            <Box
              component={"div"}
              className={`DF FGap80 mobFFCR mobAIC mobMB50 smallMobTAC AIStretch`}
            >
              <Box component={"div"} className="">
                <Typography variant="p" component={"p"} className="text TAJ">
                  An Index Data Subscription can serve as a powerful tool for
                  tracking market performance, benchmarking funds (both active
                  and passive), and evaluating portfolio performance and risk
                  exposures. Indxx offers a diverse range of subscription plans
                  that can be tailored to align with your unique requirements.
                  For added flexibility, our subscription services are
                  accessible through the following data plans*:
                </Typography>
                <Typography
                  variant="p"
                  component={"p"}
                  className="OurValuesText MT20"
                >
                  <ul className="PL20 TAL">
                    <li className="PB1 text colorBlue fw600">
                      Single Index License
                    </li>
                    <li className="PB1 text colorBlue fw600">
                      Suite of Indices License-
                      <span className="colorBlack fw400">
                        Includes indices grouped together on the basis of
                        themes, sectors, regions, & other types.{" "}
                      </span>
                    </li>
                    <li className="PB1 text colorBlue fw600">
                      Blanket License-{" "}
                      <span className="colorBlack fw400">
                        Includes all current indices as well as future launches.
                      </span>
                    </li>
                  </ul>
                </Typography>
                <Typography
                  variant="p"
                  component={"p"}
                  className="text TAJ PB20"
                >
                  Subscribers can securely access this information through
                  email, FTP, API, and third-party data vendors.
                </Typography>
                <Button
                  className="listOfIndicesBtn listofindicesbtn"
                  onClick={() => router.push("/indices")}
                >
                  View Complete List of Indices
                </Button>
                <Typography
                  variant="p"
                  component={"p"}
                  className="text fs16 TAJ MT1"
                >
                  *Terms and conditions apply{" "}
                </Typography>
              </Box>
              <Box className="DF JCFS">
                <Image
                  loader={() => ele.image}
                  fill
                  src={Licensing2}
                  alt=""
                  className="W100 bordRadiusTL bordRadiusBR ourValueImg mobRordRadiusTL mobRordRadiusTR mobRordRadiusBL mobRordRadiusBR"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Get in touch */}
      <Box
        component={"div"}
        className="getInTouchBanner2 DF FFC smallMobMT1 MT100"
        sx={{
          backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${GetInTouchBanner.src})`,
        }}
      >
        <Box className="TAC container">
          <Typography
            variant="h1"
            component={"h1"}
            className="GetInTouchBannerHeading MB40"
          >
            {"Looking to license index data? Contact us for more information."}
          </Typography>
          <Button
            className="advcadmingetintouchbtn getintouchbtn"
            onClick={() => router.push("/contact-us/get-in-touch")}
          >
            {"Get In Touch"}
          </Button>
        </Box>
      </Box>

      {/* Indxx Index Licensing */}
      <Box>
        <Box className="container MT120 smallMobMT60">
          <Box className="DF FFC AIC">
            <Typography variant="" className="subHeadingRed">
              Indxx Index Licensing: Key Advantages{" "}
            </Typography>
            <Divider
              classes={`MT20 MB20 smallMobMB10`}
              colorOne={"#395FD2"}
              colorTwo={"#ED3125"}
            />
            <Typography variant="" className="text TAC PL50 PR50">
              Indxx is an award-winning index provider, trusted by leading asset
              managers globally. As of December 2023, more than 115 products
              track Indxx Indices, with over $20 billion in assets under
              management. Funds tracking Indxx indices have emerged to become
              the leaders in their respective themes globally, such as:
            </Typography>
          </Box>
        </Box>

        <Box className="MT40">
          <Box component={"div"} className="container">
            <Box
              component={"div"}
              className={`DF FGap80 mobFFC mobAIC mobMB50 smallMobTAC AIStretch`}
            >
              <Box className="DF JCFE">
                <Image
                  loader={() => ele.image}
                  fill
                  src={Licensing}
                  alt=""
                  className="W100 bordRadiusTL bordRadiusBR ourValueImg mobRordRadiusTL mobRordRadiusTR mobRordRadiusBL mobRordRadiusBR"
                />
              </Box>
              <Box component={"div"} className="">
                <Typography
                  variant="p"
                  component={"p"}
                  className="OurValuesText PR20"
                >
                  <ul className="PL20">
                    <li className="PB1">
                      Global X U.S. Infrastructure Development ETF (PAVE): PAVE,
                      positioned as the largest global US Infrastructure ETF,
                      manages over $5 billion in assets. The fund's benchmark is
                      the{" "}
                      <Link
                        href={
                          "https://www.indxx.com/indices/benchmark-indices/indxx_u.s._infrastructure_development_index"
                        }
                        target="_blank"
                        className="colorBlackLight colorBlueHover"
                      >
                        Indxx U.S. Infrastructure Development Index.
                      </Link>
                    </li>
                    <li className="PB1">
                      Global X Robotics & Artificial Intelligence ETF (BOTZ)-
                      Recognized as one of the world's most popular Robotics
                      ETFs, BOTZ, listed in the US, tracks the{" "}
                      <Link
                        href={
                          "https://www.indxx.com/indices/thematic-indices/indxx_global_robotics_&_artificial_intelligence_thematic_index"
                        }
                        target="_blank"
                        className="colorBlackLight colorBlueHover"
                      >
                        Indxx Global Robotics & Artificial Intelligence Thematic
                        Index.
                      </Link>{" "}
                    </li>
                    <li className="PB1">
                      First Trust Indxx NextG ETF (NXTG)- This US-listed ETF,
                      tracking the{" "}
                      <Link
                        href={
                          "https://www.indxx.com/indices/thematic-indices/indxx_5g_&_nextg_thematic_index"
                        }
                        target="_blank"
                        className="colorBlackLight colorBlueHover"
                      >
                        Indxx 5G & NextG Thematic Index,
                      </Link>{" "}
                      has emerged as a leader among all global 5G ETFs.
                    </li>
                    <li className="">
                      Mirae Asset TIGER US Tech Top 10 INDXX ETF (USTTT)-
                      Experiencing rapid growth in the South Korean market,
                      USTTT has become one of the fastest-growing ETFs, amassing
                      over $1 billion in assets within a year of listing. The
                      fund tracks the{" "}
                      <Link
                        href={
                          "https://www.indxx.com/indices/thematic-indices/indxx_us_tech_top_10_index"
                        }
                        target="_blank"
                        className="colorBlackLight colorBlueHover"
                      >
                        Indxx US Tech Top 10 Index.
                      </Link>
                    </li>
                  </ul>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* types of indices offered */}
      <Box className="MT60 smallMobMT20">
        {indxxTypes.length > 0 ? (
          <Box
            component={"div"}
            className="MB-60 indicesBox containerWithPadding PT60 smallMobPT20"
          >
            <Box className="DF FFC AIC">
              <Typography variant="" className="subHeadingRed">
                Types Of Indices Offered{" "}
              </Typography>
            </Box>
            <Divider
              classes={`MT20 MB35 smallMobMT25 smallMobMB10`}
              colorOne={"#395FD2"}
              colorTwo={"#ED3125"}
            />

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
      </Box>

      {/* Clients */}
      <Box className="smallContainer PT60 PB60 MT40">
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

      {/* loader */}
      {setTimeOutLoader || loader1 || loader2 || loader3 ? <Loader /> : ""}
    </>
  );
}
