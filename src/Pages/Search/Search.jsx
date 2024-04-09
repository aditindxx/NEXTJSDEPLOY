"use client";
import { Box, Button, Pagination, Paper, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import SearchIcon from "./../../Assets/Svgs/search.svg";
import CloseIcon from "./../../Assets/Svgs/close.svg";
import useStyles from "../../Assets/Styles/Common/Common";
// import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { GET_SEARCH_SUGGESTION, POST_SEARCH } from "../../Apis/EndPoints";
import { getMethodApi, postMethodApi } from "../../Utils/Methods";
import { Interweave } from "interweave";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import NoResult from "./../../Assets/Images/noResults.png";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Search() {
  const { searchCard, searchCardBtn } = useStyles();
  // const navigate = useNavigate();
  const router = useRouter();
  // const location = useLocation();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const [searchInput, setSearchInput] = useState(search);
  const [resultInput, setResultInput] = useState(search);
  const [searchedData, setSearchedData] = useState(null);
  const [values, setValues] = useState(0);
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [selectedValue, setSelectedValue] = useState("all_results");
  const [page, setPage] = useState(1);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(10);
  const [open, setOpen] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [noemptysuggestion, setnoemptysuggestion] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  let inputRef = useRef(null);

  const handleChangePage = (event, value) => {
    setPage(value);
    setPageStart(value * 10 - 10);
    setPageEnd(value * 10);
  };

  useEffect(() => {
    handleOpen();
    setSelectedValue("all_results");
    setValues(0);
    setPage(1);
    setPageStart(0);
    setPageEnd(10);
    postMethodApi(POST_SEARCH, { text: search }).then((response) => {
      if (response.status === 200) {
        setSearchInput(search);
        setResultInput(search);
        setSearchedData(response.data);
        handleClose();
        // setSearchInput("");
        setnoemptysuggestion(false);
        if (response.data) {
          setNoResult(true);
        }
      }
    });
    getMethodApi(GET_SEARCH_SUGGESTION).then((response) => {
      if (response.status === 200) {
        setSearchSuggestion(response.data);
      }
    });
  }, [pathname]);

  const onChange = (event) => {
    setnoemptysuggestion(true);
    setSearchInput(event.target.value);
  };
  const onSearch = (searchTerm) => {
    handleOpen();
    setSelectedValue("all_results");
    setValues(0);
    setPage(1);
    setPageStart(0);
    setPageEnd(10);
    postMethodApi(POST_SEARCH, { text: searchTerm.trim() }).then((response) => {
      if (response.status === 200) {
        setSearchedData(response.data);
        setResultInput(searchTerm);
        handleClose();
        // setSearchInput("");
        setnoemptysuggestion(false);
      }
    });
    setSearchInput(searchTerm.trim());
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchInput) {
        onSearch(searchInput);
        router.replace(`/search?query=${searchInput}`);
      }
    }
  };

  const handleChange = (event, newValue) => {
    setValues(newValue);
  };

  const AntTabs = styled(Tabs)({
    "& .MuiTabs-indicator": {
      backgroundColor: "#ED3125",
      height: "1px",
    },
  });

  const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      minWidth: 0,
      marginRight: theme.spacing(1),
      color: "#000",
      fontFamily: "Inter",
      fontSize: "20px",
      fontWeight: "400",
      letterSpacing: "-0.6px",
      textTransform: "capitalize",
      "&:hover": {
        color: "#395FD2",
        opacity: 1,
      },
      "&.Mui-selected": {
        color: "#395FD2",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#d1eaff",
      },
    })
  );

  function capitalizeFLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <>
    <title>{"Search Data"}</title>
        <link
          rel="canonical"
          href={`https://www.indxx.com${pathname}`}
          key="canonical"
        />
        <meta
          name="description"
          content={
            "description"
          }
        />
        <meta
          name="keywords"
          content={"keywords"}
        />
      <Box
        component={"div"}
        className="bGColorGrey PT45 smallMobPT10 PB40 containerWithPadding"
      >
        <Box
          component={"div"}
          className={`searchBarHeaderBoxSearch border1Black bGColorWhite DF AIC JCSB MA MT50 ${
            searchSuggestion?.filter((item) => {
              const searchTerm = searchInput.toLowerCase();
              const data = item.toLowerCase();

              return (
                searchTerm && data.startsWith(searchTerm) && data !== searchTerm
              );
            }).length > 0
              ? "searchBarChaegedBorderRadius"
              : ""
          }`}
        >
          <Box component={"div"} className="DF W90">
            <Box
              onClick={() => {
                "";
              }}
              className="cursorPointer DF JCC AIC MR13"
            >
              <Image
                src={SearchIcon}
                alt="searchAndCloseLogo"
                className="opacityTransition ML10 H22px"
                onClick={() => {
                  if (searchInput) {
                    onSearch(searchInput);
                    router.replace(`/search?query=${searchInput}`);
                  }
                }}
              />
            </Box>
            <input
              placeholder="Search"
              type="text"
              className="opacityTransition searchBarHeader W90 colorBlack"
              autoFocus
              value={searchInput}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
          </Box>

          <Box
            onClick={() => {
              setSearchInput("");
              inputRef.current.focus();
            }}
            className="cursorPointer DF JCC AIC MR13"
          >
            <Image
              src={CloseIcon}
              alt="searchAndCloseLogo"
              className="opacityTransition ML10 H30px"
            />
          </Box>
          {searchInput ? (
            <Box
              component={"div"}
              className={`posAbs searchBarHeaderDropDownSearchPage PL20 PR20`}
            >
              {noemptysuggestion
                ? searchSuggestion
                    ?.filter((item) => {
                      const searchTerm = searchInput.toLowerCase();
                      const data = item.toLowerCase();

                      return (
                        searchTerm &&
                        data.includes(searchTerm) &&
                        data !== searchTerm
                      );
                    })
                    .slice(0, 10)
                    .map((item, index) => {
                      return (
                        <Box key={index}>
                          <Box
                            component={"div"}
                            className="cursorPointer MT5 MB5 noWrap overflowHidden colorBlack textOverFlowEllipsis"
                            onClick={() => {
                              onSearch(item);
                              setSearchInput(item);
                              router.replace(`/search?query=${item}`);
                            }}
                          >
                            {item}
                          </Box>
                          {searchSuggestion
                            ?.filter((item) => {
                              const searchTerm = searchInput.toLowerCase();
                              const data = item.toLowerCase();

                              return (
                                searchTerm &&
                                data.startsWith(searchTerm) &&
                                data !== searchTerm
                              );
                            })
                            .slice(0, 10).length -
                            1 !==
                          index ? (
                            <Box
                              sx={{
                                // borderBottom: "1px solid #61656452",
                                p: "1px",
                              }}
                            ></Box>
                          ) : (
                            ""
                          )}
                        </Box>
                      );
                    })
                : null}
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>

      {searchedData && searchedData[selectedValue]?.length ? (
        <>
          <Box
            component={"div"}
            className="PB25 MB20 bGColorGrey containerWithPadding"
          >
            <Box>
              <AntTabs
                value={values}
                onChange={handleChange}
                aria-label="ant example"
                className="searchTabs bGColorGrey"
              >
                {searchedData
                  ? Object.keys(searchedData)?.map((item, ind) => {
                      if (searchedData[item]?.length > 0) {
                        return (
                          <AntTab
                            key={ind}
                            label={item.split("_").join(" ")}
                            onClick={() => {
                              setSelectedValue(item);
                              setPageStart(0);
                              setPageEnd(10);
                            }}
                          />
                        );
                      }
                      return "";
                    })
                  : ""}
              </AntTabs>
              <Box sx={{ p: 3 }} />
            </Box>
          </Box>

          <Box className="colorBlue container searchResults">
            {searchedData && searchedData[selectedValue]?.length
              ? `${searchedData[selectedValue]?.length} Results for '${resultInput}'`
              : ""}
          </Box>

          <Box component={"div"} className="container">
            <Box className="MB30">
              {searchedData
                ? searchedData[selectedValue]
                    ?.filter((ele, ind) => {
                      return ind >= pageStart && ind < pageEnd;
                    })
                    ?.map((item, index) => {
                      return (
                        <Box key={index} component={"div"} className="MT40">
                          <Link
                            target="_blank"
                            className="links colorBlue searchTitles"
                            href={`${item?.url}`}
                          >
                            <Interweave content={item?.title} />
                          </Link>
                          <Typography
                            component={"p"}
                            variant="p"
                            className="searchDescriptions"
                          >
                            <Interweave
                              content={
                                searchInput.length > 0
                                  ? item?.decription.split(" ").length > 19
                                    ? item?.decription
                                        .split(searchInput)
                                        .join(`<b>${searchInput}</b>`)
                                        .split(searchInput.toLowerCase())
                                        .join(
                                          `<b>${searchInput.toLowerCase()}</b>`
                                        )
                                        .split(capitalizeFLetter(searchInput))
                                        .join(
                                          `<b>${capitalizeFLetter(
                                            searchInput
                                          )}</b>`
                                        ) + "..."
                                    : item?.decription
                                        .split(searchInput)
                                        .join(`<b>${searchInput}</b>`)
                                        .split(searchInput.toLowerCase())
                                        .join(
                                          `<b>${searchInput.toLowerCase()}</b>`
                                        )
                                        .split(capitalizeFLetter(searchInput))
                                        .join(
                                          `<b>${capitalizeFLetter(
                                            searchInput
                                          )}</b>`
                                        )
                                  : item?.decription
                              }
                            />
                          </Typography>
                          <Link
                            target="_blank"
                            href={`${item?.url}`}
                            className="links searchLinks"
                          >
                            {item?.url.length > 119
                              ? item?.url.slice(0, 119) + "..."
                              : item.url}
                          </Link>
                        </Box>
                      );
                    })
                : null}
            </Box>

            <Pagination
              count={
                searchedData && searchedData[selectedValue]?.length
                  ? Math.ceil(searchedData[selectedValue]?.length / 10)
                  : 0
              }
              size="large"
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </>
      ) : noResult ? (
        <Box component={"div"} className="DF FFC AIC MT60 mobMT30 container">
          <Image src={NoResult} alt="" className="noResult" />
          <Typography variant="'h2" component={"h2"} className="subHeadingRed">
            No result found
          </Typography>
        </Box>
      ) : (
        ""
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper
        className={`DF FFC AIC JCC container ${searchCard} PL1 PR1 PT30 PB30 MT60`}
      >
        <Typography variant="p" className="searchCardText">
          Not able to find what you are searching for?{" "}
        </Typography>
        <Button
          className={`MT20 ${searchCardBtn} contactUsHerebtn`}
          onClick={() => {
            router.replace("/contact-us");
          }}
        >
          Contact Us here{" "}
        </Button>
      </Paper>
    </>
  );
}
