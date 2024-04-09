"use client";
import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMethodApi } from "../../Utils/Methods";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionArrowIcon from "../../Assets/Icons/accordionArrowIcon.svg";
import { GET_INDICES } from "../../Apis/EndPoints";
import Loader from "../../Components/Loader/Loader";
// import { useLocation, useNavigate } from "react-router-dom";
import { Interweave } from "interweave";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function TypesOfIndices() {
  const [data, setdata] = useState([]);
  const [loader, setLoader] = useState(false);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [slug, setSlug] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // let queryParam = pathname.split("/")[pathname.split("/").length - 2];
    let queryParam = pathname.split("/")[pathname.split("/").length - 1];
    setSlug(queryParam);
    getMethodApi(GET_INDICES + queryParam).then((response) => {
      if (response.status === 200) {
        setdata(response.data);
        setLoader(false);
      }
    });
    setSetTimeOutLoader(true);
    setTimeout(() => {
      setSetTimeOutLoader(false);
    }, 2000);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const onclickLearnMore = () => {
    router.replace("/contact-us");
  };
  return (
    <>
      <title>{data?.meta_title ? data.meta_title : "Search Data"}</title>
      <link
        rel="canonical"
        href={`https://www.indxx.com${pathname}`}
        key="canonical"
      />
      <meta
        name="description"
        content={data?.meta_description ? data.meta_description : "description"}
      />
      <meta
        name="keywords"
        content={data?.meta_keywords ? data.meta_keywords : "keywords"}
      />
      <Box
        className="benchmarkindicesimg DF JCC AIC"
        sx={{
          backgroundImage: `url(${data?.Banner_Image})`,
        }}
      >
        <Typography
          variant={"h1"}
          component={"h1"}
          className="benchmarkindicesimgpara TAC"
        >
          {data?.Name}
        </Typography>
      </Box>

      <Box>
        <Box component={"div"} className="container">
          <Box
            component={"div"}
            className="DF FGap60 mobFGap0 mobFFC mobAIC MT60 MB85"
          >
            <Box
              component={"div"}
              className="DF FFC JCFS W50 mobW100 MT40 mobMT0 mobMB20"
            >
              <Typography
                variant="h2"
                component={"h2"}
                className="BenchmarkSubHead"
              >
                Overview of {data?.Name}
              </Typography>

              <Typography
                variant=""
                component={""}
                className="MT10 typesOfIndicesFont"
                id="linehtN"
              >
                <Interweave content={data?.Overview} />
              </Typography>

              <Typography
                variant="p"
                component={"p"}
                className="MT20 OurValuesText MB1"
              >
                <Button
                  className="tabBtnTypesIndices mobMT20 mobMAuto"
                  onClick={onclickLearnMore}
                >
                  Learn More
                </Button>
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundImage: `url(${data.Image ? data.Image : ""})`,
              }}
              className="flexRatio12 bordRadTL bordRadBR typesOfIndicesImage flexBasis50 mobW100 imgoppbordr30"
            ></Box>
            {/* <img
              src={data?.Image}
              alt="img"
              className="bordRadTL bordRadBR W50 typesOfIndicesImage mobW80 imgoppbordr30"
            /> */}
          </Box>

          <Box>
            {data?.sub_tabs
              ? data.sub_tabs.length > 0 &&
                data.sub_tabs?.map((x, i) => {
                  let checkTheIndexxHeading = Object.keys(x)[0];
                  return (
                    <Accordion className="MT35" key={i}>
                      <AccordionSummary
                        expandIcon={
                          <Image src={AccordionArrowIcon} alt="arrow" />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className="accordionbgblue HT70 PTB22 PLR34"
                      >
                        <Typography
                          component={"h3"}
                          variant="h3"
                          className="colorWhite accordiontext"
                        >
                          {checkTheIndexxHeading === "IN"
                            ? `List of ${data?.Name}`
                            : Object.keys(x)}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className="accordionbggrey PLR34">
                        {Object.values(x).length > 0 &&
                          Object.values(x)?.map(
                            (i) =>
                              Object.keys(i).length > 0 &&
                              Object.keys(i)?.map((j, key) => {
                                return (
                                  <Box key={key}>
                                    {/* {checkTheIndexxHeading === "IN" ? (
                                      ""
                                    ) : key === 0 ? (
                                      <Typography className="PTB19 fnt125">
                                        {Object.keys(
                                          Object.values(i)[0]
                                        )[0]?.toUpperCase()}
                                      </Typography>
                                    ) : (
                                      ""
                                    )} */}

                                    {Object.values(i).length > 0 &&
                                      Object.values(i)?.map((item, key2) => {
                                        if (key2 === key) {
                                          return (
                                            <Link style={{textDecoration: 'none'}}
                                            href={{pathname: `/indices/${slug}/${item?.slug}`, query: { 
                                                      indexname: item["Index Name"],
                                                      heading: data?.Name,
                                                      slug: item?.slug,
                                                      banner:
                                                      data?.Banner_Image,
                                             }}}
                                            >
                                            
                                            <Typography
                                              key={key2}
                                              className="accordioninput MT10 MB10 cursorPointer"
                                              sx={{
                                                "&:hover": { color: "red" },
                                              }}
                                              
                                                // router.replace(
                                                //   `/indices/${slug}/${item?.slug}?indexname=${item["Index Name"]}&heading=${data?.Name}&slug=${item?.slug}&banner${data?.Banner_Image}`
                                                  // {
                                                  //   state: {
                                                  //     indexname:
                                                  //       item["Index Name"],
                                                  //     heading: data?.Name,
                                                  //     slug: item?.slug,
                                                  //     banner:
                                                  //       data?.Banner_Image,
                                                  //   },
                                                  // }
                                                // );
                                              // }}
                                            >
                                              {item["Index Name"]}
                                            </Typography>
                                            </Link>
                                          );
                                        }
                                        return "";
                                      })}
                                  </Box>
                                );
                              })
                          )}
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              : null}
          </Box>
        </Box>
      </Box>

      {setTimeOutLoader || loader ? <Loader /> : ""}
    </>
  );
}
