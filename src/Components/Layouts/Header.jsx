"use client";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import Link from "next/link";
// import {
//   // Link as RouterLink,
//   NavLink,
//   useNavigate,
//   // useLocation,
// } from "react-router-dom";
import Logo from "./../../Assets/Svgs/indxxLogo.svg";
import { getMethodApi } from "../../Utils/Methods";
import { GET_TABS, GET_SEARCH_SUGGESTION } from "../../Apis/EndPoints";
import useStyles from "../../Assets/Styles/Common/Common";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "./../../Assets/Svgs/search.svg";
import CloseIcon from "./../../Assets/Svgs/close.svg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [tabsData, setTabsData] = useState([]);
  const [scroller, initScroller] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdownNested, setActiveDropdownNested] = useState(null);
  const [active, setActive] = useState(10);
  const [search, setSearch] = useState(true);
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchComponent, setSearchComponent] = useState(true);
  const router = useRouter();
  // const location = useLocation();
  const pathname = usePathname();

  const {
    header,
    logo,
    toolbarOuter,
    boxShadow,
    toolbarInner,
    drawerContainer,
    menuBtnsHdr,
    drawerToolbar,
    menuIconMobContainer,
    toolbarOuterWithoutSearch,
  } = useStyles();
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    let a = window.location.href.split("/").slice(-1)[0];
    let b = window.location.href.slice(-4);
    let c = window.location.href.slice(-9);

    if (b == "esg/") {
      window.history.pushState(null, "", "/indices/esg-indices");
      window.location.reload(true);
    }

    if (c == "strategy/") {
      window.history.pushState(null, "", "/indices/strategy-indices");
      window.location.reload(true);
    }

    a = decodeURIComponent(a);
    if (a == "indxxindices") {
      window.history.pushState(null, "", "/indxx-indices");
      window.location.reload(true);
    } else if (a == "customindices") {
      window.history.pushState(null, "", "/custom-indices");
      window.location.reload(true);
    } else if (a == "clientindices") {
      window.history.pushState(null, "", "/client-indices");
      window.location.reload(true);
    } else if (a == "Equity-Basket-Calculation") {
      window.history.pushState(null, "", "/equity-basket-calculation");
      window.location.reload(true);
    } else if (a == "benchmark") {
      window.history.pushState(null, "", "/indices/benchmark-indices");
      window.location.reload(true);
    } else if (a == "benchmark") {
      window.history.pushState(null, "", "/indices/benchmark-indices");
      window.location.reload(true);
    } else if (a == "digital_asset") {
      window.history.pushState(null, "", "/indices/digital-asset-indices");
      window.location.reload(true);
    } else if (a == "esg") {
      window.history.pushState(null, "", "/indices/esg-indices");
      window.location.reload(true);
    } else if (a == "income") {
      window.history.pushState(null, "", "/indices/income-indices");
      window.location.reload(true);
    } else if (a == "strategy") {
      window.history.pushState(null, "", "/indices/strategy-indices");
      window.location.reload(true);
    } else if (a == "thematic") {
      window.history.pushState(null, "", "/indices/thematic-indices");
      window.location.reload(true);
    } else if (a == "other") {
      window.history.pushState(null, "", "/indices/other-indices");
      window.location.reload(true);
    } else if (a == "technology") {
      window.history.pushState(null, "", "/indxx-data-&-technology");
      window.location.reload(true);
    } else if (a == "indexservices") {
      window.history.pushState(null, "", "/");
      window.location.reload(true);
    }
  }, []);

  useEffect(() => {
    if (
      pathname.includes(
        "/blog/economic-growth-of-india-a-new-star-on-asias-horizon"
      )
    ) {
      router.replace(
        "/news-and-research/news-and-research-insider/economic-growth-of-india-a-new-star-on-asia-horizon"
      );
    }
  }, [pathname]);

  useEffect(() => {
    getMethodApi(GET_TABS).then((response) => {
      if (response.status === 200) {
        setTabsData(response.data.H);
      }
    });
    getMethodApi(GET_SEARCH_SUGGESTION).then((response) => {
      if (response.status === 200) {
        setSearchSuggestion(response.data);
      }
    });
  }, []);

  useEffect(() => {
    const selectedtab = pathname.split("/")[1];
    const isIndices = pathname.split("/")[1];
    if (isIndices === "indices" && pathname.split("/").length > 3) {
      document.body.style.zoom = 1;
    } else {
      document.body.style.zoom = 0.8;
    }

    if (selectedtab === "") {
      setActive(0);
    } else if (selectedtab === "indxx-indices") {
      setActive(1);
    } else if (selectedtab === "custom-indices") {
      setActive(1);
    } else if (selectedtab === "client-indices") {
      setActive(1);
    } else if (selectedtab === "equity-basket-calculation") {
      setActive(1);
    } else if (selectedtab === "index-services") {
      setActive(1);
    } else if (selectedtab === "itics") {
      setActive(1);
    } else if (selectedtab === "cadmin") {
      setActive(1);
    } else if (selectedtab === "about-us") {
      setActive(2);
    } else if (isIndices === "indices") {
      setActive(3);
    } else if (selectedtab === "announcements") {
      setActive(4);
    } else if (selectedtab === "news-and-research") {
      setActive(5);
    } else if (selectedtab === "contact-us") {
      setActive(6);
    } else if (selectedtab === "contactus") {
      setActive(6);
    } else if (selectedtab === "careers") {
      setActive(6);
    } else {
      setActive(10);
    }
    let queryParam = pathname;
    if (queryParam.includes("/search")) {
      setSearchComponent(false);
    } else {
      setSearchComponent(true);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        initScroller(false);
      } else {
        initScroller(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // document.body.style.zoom = "80%";
  }, []);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth <= 1100
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const handleDrawerOpen = () => {
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  };
  const handleDrawerClose = () => {
    setState((prevState) => ({ ...prevState, drawerOpen: false }));
    setActiveDropdown(null);
    setActiveDropdownNested(null);
  };

  const onChange = (event) => {
    setSearchInput(event.target.value);
  };
  const onSearch = (searchTerm) => {
    setSearchInput(searchTerm.trim());
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchInput) {
        setSearch(true);
        onSearch(searchInput);
        router.replace(`/search?query=${searchInput}`);
      }
    }
  };

  const displayDesktop = () => {
    return (
      <Toolbar
        className={` ${
          searchComponent ? toolbarOuter : toolbarOuterWithoutSearch
        } ${scroller ? "" : boxShadow}`}
      >
        <Box className={toolbarInner}>
          {femmecubatorLogo}
          {search ? (
            <Box className={`${menuBtnsHdr} opacityTransition`}>
              {getMenuButtonsAll()}
            </Box>
          ) : (
            <Box
              component={"div"}
              className="searchBarHeaderBox bGColorGrey DF AIC JCSB"
            >
              <input
                placeholder="Search"
                type="text"
                onChange={onChange}
                autoFocus
                value={searchInput.trimStart()}
                onKeyDown={handleKeyDown}
                className="opacityTransition W80 searchBarHeader ML24"
                // ref={inputRef}
              />

              <Box
                onClick={() => {
                  if (searchInput) {
                    setSearch(true);
                    onSearch(searchInput);
                    router.replace(`/search?query=${searchInput}`);
                  }
                }}
                className="cursorPointer searcchIconInHeader DF JCC AIC MR13"
              >
                <Image
                  src={SearchIcon}
                  alt="searchAndCloseLogo"
                  className="opacityTransition ML10"
                />
              </Box>
              {searchInput ? (
                <Box
                  component={"div"}
                  className="posAbs searchBarHeaderDropDown PL24 PR20"
                >
                  {searchSuggestion
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
                            className="cursorPointer MT5 MB5 colorDarkGrey noWrap overflowHidden textOverFlowEllipsis"
                            onClick={() => {
                              onSearch(item);
                              setSearch(true);
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
                                // borderBottom: "1px solid #616564",
                                p: "1px",
                              }}
                            ></Box>
                          ) : (
                            ""
                          )}
                        </Box>
                      );
                    })}
                </Box>
              ) : (
                ""
              )}
            </Box>
          )}
          {searchComponent ? (
            <Box
              component={"div"}
              className="cursorPointer opacityTransition DF JCC AIC"
              onClick={() => {
                setSearch(!search);
                setSearchInput("");
              }}
            >
              {search ? (
                <Image
                  src={SearchIcon}
                  alt="searchAndCloseLogo"
                  className="opacityTransition"
                />
              ) : (
                <Image
                  src={CloseIcon}
                  alt="searchAndCloseLogo"
                  className="opacityTransition closeIconInLogo"
                />
              )}
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    return (
      <Toolbar className={`${drawerToolbar} ${scroller ? "" : boxShadow}`}>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <Box className={drawerContainer}>{getDrawerChoices()}</Box>
        </Drawer>

        <IconButton
          {...{
            edge: "start",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
            className: menuIconMobContainer,
          }}
        >
          <MenuIcon />
        </IconButton>

        {search ? (
          <Link href={"/"} replace>
            {femmecubatorLogo}
          </Link>
        ) : (
          <Box
            component={"div"}
            className="searchBarHeaderBox bGColorGrey DF AIC JCSB"
          >
            <input
              placeholder="Search"
              type="text"
              onChange={onChange}
              autoFocus
              value={searchInput.trimStart()}
              onKeyDown={handleKeyDown}
              className="opacityTransition W80 searchBarHeader ML24"
              // ref={inputRef}
            />

            <Box
              onClick={() => {
                if (searchInput) {
                  setSearch(true);
                  onSearch(searchInput);
                  router.replace(`/search?query=${searchInput}`);
                }
              }}
              className="cursorPointer searcchIconInHeader DF JCC AIC MR13"
            >
              <Image
                src={SearchIcon}
                alt="searchAndCloseLogo"
                className="opacityTransition ML10"
              />
            </Box>
            {searchInput ? (
              <Box
                component={"div"}
                className="posAbs searchBarHeaderDropDown PL24 PR20"
              >
                {searchSuggestion
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
                          className="cursorPointer MT5 MB5 colorDarkGrey noWrap overflowHidden textOverFlowEllipsis"
                          onClick={() => {
                            onSearch(item);
                            setSearch(true);
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
                              // borderBottom: "1px solid #616564",
                              p: "1px",
                            }}
                          ></Box>
                        ) : (
                          ""
                        )}
                      </Box>
                    );
                  })}
              </Box>
            ) : (
              ""
            )}
          </Box>
        )}
        {searchComponent ? (
          <Box
            component={"div"}
            className="cursorPointer opacityTransition DF JCC AIC"
            onClick={() => {
              setSearch(!search);
              setSearchInput("");
            }}
          >
            {search ? (
              <Image
                src={SearchIcon}
                alt="searchAndCloseLogo"
                className="opacityTransition"
              />
            ) : (
              <Image
                src={CloseIcon}
                alt="searchAndCloseLogo"
                className="opacityTransition closeIconInLogo"
              />
            )}
          </Box>
        ) : (
          ""
        )}
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return tabsData?.map(({ mapLink, Name, sub_tabs }, ind) => {
      if (
        sub_tabs &&
        (Name === "What We Do" || sub_tabs[0].Name === "Overview")
      ) {
        return (
          <Box key={ind} className="MT25 MB25">
            <Box
              onClick={() => {
                setActiveDropdownNested(null);
                if (activeDropdown === ind) {
                  setActiveDropdown(null);
                } else {
                  setActiveDropdown(ind);
                }
              }}
              component={"div"}
              className="links DF PL1"
            >
              <Typography>{Name}</Typography>
              <Box
                sx={{ marginLeft: ".4rem" }}
                component={"span"}
                className={`DF JCC AIC`}
              >
                <KeyboardArrowDownIcon />
              </Box>
            </Box>

            {activeDropdown === ind ? (
              <Box component={"div"} className="MT20">
                {sub_tabs?.map((ele, indx) => {
                  return (
                    <>
                      <Box
                        key={indx}
                        sx={{ margin: ".5rem 1rem" }}
                        className="links menuButtonNestedMob"
                      >
                        <Box
                          onClick={() => {
                            if (activeDropdownNested === ind) {
                              setActiveDropdownNested(null);
                            } else {
                              setActiveDropdownNested(ind);
                            }
                          }}
                          className="DF"
                        >
                          <Link
                            onClick={() => {
                              if (!ele.sub_tabs) {
                                setActiveDropdown(null);
                                handleDrawerClose();
                              }
                            }}
                            href={`/${
                              sub_tabs[0].Name === "Overview"
                                ? `${Name.toLowerCase()
                                    .split(" ")
                                    .join("-")
                                    .split("&")
                                    .join("and")}/${
                                    ele.Name === "Overview"
                                      ? ""
                                      : ele.slug
                                      ? ele.slug
                                      : ele.Name.toLowerCase()
                                          .split(" ")
                                          .join("-")
                                          .split("&")
                                          .join("and")
                                  }`
                                : `${ele.Name.toLowerCase()
                                    .split(" ")
                                    .join("-")
                                    .split("&")
                                    .join("and")}`
                            }`}
                            replace
                            className="links nestedLinks DF"
                          >
                            <li>{ele.Name}</li>
                          </Link>
                          {ele.sub_tabs ? (
                            <Box
                              sx={{ marginLeft: ".4rem" }}
                              component={"span"}
                              className={`DF JCC AIC`}
                            >
                              <KeyboardArrowDownIcon />
                            </Box>
                          ) : (
                            ""
                          )}
                        </Box>
                        {indx === sub_tabs.length - 1 ? (
                          ""
                        ) : (
                          <Box
                            sx={{
                              opacity: "0.1",
                              borderBottom: "1px solid #000000",
                              paddingBottom: ".5rem",
                            }}
                          ></Box>
                        )}
                      </Box>
                      {activeDropdownNested && ele.sub_tabs?.length > 0
                        ? ele.sub_tabs?.map((ele2, indxs) => {
                            return (
                              <Box
                                key={indx}
                                sx={{ margin: ".5rem 1rem" }}
                                className="links menuButtonNestedMob ML1"
                              >
                                <Link
                                  onClick={() => {
                                    handleDrawerClose();
                                  }}
                                  href={`/${
                                    Name === "Indices"
                                      ? `indices/${ele2.slug}`
                                      : ele2.Name.toLowerCase()
                                          .split("&")
                                          .join("and")
                                  }`}
                                  replace
                                  className="links nestedLinks PL20 DF"
                                >
                                  <li>{ele2.Name}</li>
                                </Link>
                                {indx === ele.sub_tabs.length - 1 ? (
                                  ""
                                ) : (
                                  <Box
                                    className="ML1"
                                    sx={{
                                      opacity: "0.1",
                                      borderBottom: "1px solid #000000",
                                      paddingBottom: ".5rem",
                                    }}
                                  ></Box>
                                )}
                              </Box>
                            );
                          })
                        : ""}
                    </>
                  );
                })}
              </Box>
            ) : (
              ""
            )}
          </Box>
        );
      } else if (sub_tabs) {
        return (
          <Box key={ind} className="MT25 MB25">
            <Box
              onClick={() => {
                setActiveDropdownNested(null);
                if (activeDropdown === ind) {
                  setActiveDropdown(null);
                } else {
                  setActiveDropdown(ind);
                }
              }}
              component={"div"}
              className="links DF PL1"
            >
              <Link
                onClick={() => {
                  if (!ele.sub_tabs) {
                    setActiveDropdown(null);
                    handleDrawerClose();
                  }
                }}
                href={`/${Name.toLowerCase()
                  .split(" ")
                  .join("-")
                  .split("&")
                  .join("and")}`}
                className="links nestedLinks DF"
              >
                <Typography>{Name}</Typography>
              </Link>
              <Box
                sx={{ marginLeft: ".4rem" }}
                component={"span"}
                className={`DF JCC AIC`}
              >
                <KeyboardArrowDownIcon />
              </Box>
            </Box>

            {activeDropdown === ind ? (
              <Box component={"div"} className="MT20">
                {sub_tabs?.map((ele, indx) => {
                  return (
                    <>
                      <Box
                        key={indx}
                        sx={{ margin: ".5rem 1rem" }}
                        className="links menuButtonNestedMob"
                      >
                        <Box
                          onClick={() => {
                            if (activeDropdownNested === ind) {
                              setActiveDropdownNested(null);
                            } else {
                              setActiveDropdownNested(ind);
                            }
                          }}
                          className="DF"
                        >
                          <Link
                            onClick={() => {
                              if (!ele.sub_tabs) {
                                setActiveDropdown(null);
                                handleDrawerClose();
                              }
                            }}
                            href={`/${Name.toLowerCase()
                              .split(" ")
                              .join("-")
                              .split("&")
                              .join("and")}/${ele.Name.toLowerCase()
                              .split(" ")
                              .join("-")}`}
                            replace
                            className="links nestedLinks DF"
                          >
                            <li>{ele.Name}</li>
                          </Link>
                          {ele.sub_tabs ? (
                            <Box
                              sx={{ marginLeft: ".4rem" }}
                              component={"span"}
                              className={`DF JCC AIC`}
                            >
                              <KeyboardArrowDownIcon />
                            </Box>
                          ) : (
                            ""
                          )}
                        </Box>
                        {indx === sub_tabs.length - 1 ? (
                          ""
                        ) : (
                          <Box
                            sx={{
                              opacity: "0.1",
                              borderBottom: "1px solid #000000",
                              paddingBottom: ".5rem",
                            }}
                          ></Box>
                        )}
                      </Box>
                      {activeDropdownNested && ele.sub_tabs?.length > 0
                        ? ele.sub_tabs?.map((ele2, indxs) => {
                            return (
                              <Box
                                key={indx}
                                sx={{ margin: ".5rem 1rem" }}
                                className="links menuButtonNestedMob ML1"
                              >
                                <Link
                                  onClick={() => {
                                    handleDrawerClose();
                                  }}
                                  href={`/${
                                    Name === "Indices"
                                      ? `indices/${ele2.slug}`
                                      : ele2.Name.toLowerCase()
                                  }`}
                                  replace
                                  className="links nestedLinks PL20 DF"
                                >
                                  <li>{ele2.Name}</li>
                                </Link>
                                {indx === ele.sub_tabs.length - 1 ? (
                                  ""
                                ) : (
                                  <Box
                                    className="ML1"
                                    sx={{
                                      opacity: "0.1",
                                      borderBottom: "1px solid #000000",
                                      paddingBottom: ".5rem",
                                    }}
                                  ></Box>
                                )}
                              </Box>
                            );
                          })
                        : ""}
                    </>
                  );
                })}
              </Box>
            ) : (
              ""
            )}
          </Box>
        );
      } else {
        return (
          <Box className={"MT25 MB25"} key={ind}>
            <Link
              // {...{
              href={`/${
                Name === "Home"
                  ? "/"
                  : Name.toLowerCase()
                      .split(" ")
                      .join("-")
                      .split("&")
                      .join("and")
              }`}
              replace
              key={ind}
              className="links MT60 MB40"
              // }}
              onClick={() => handleDrawerClose()}
            >
              <MenuItem>{Name}</MenuItem>
            </Link>
          </Box>
        );
      }
    });
  };

  const femmecubatorLogo = (
    <Box
      onClick={() => {
        setActive(0);
        router.replace("/");
        setSearch(true);
        setSearchInput("");
      }}
    >
      <Image src={Logo} alt="" className={logo} />
    </Box>
  );

  const getMenuButtonsAll = () => {
    return tabsData?.map(({ mapLink, Name, sub_tabs }, ind) => {
      if (
        sub_tabs &&
        (Name === "What We Do" || sub_tabs[0].Name === "Overview")
      ) {
        return (
          <Box key={ind}>
            <Box
              onMouseEnter={() => setActiveDropdown(null)}
              onClick={() => {
                if (activeDropdown === ind) {
                  setActiveDropdown(null);
                } else {
                  setActiveDropdown(ind);
                }
              }}
              component={"div"}
              className={
                active === ind
                  ? "menuButtonActive cursorPointer DF JCC AIC"
                  : "menuButton links DF JCC AIC dropDownHeaderHeading"
              }
            >
              <Typography>{Name}</Typography>
              <Box
                component={"span"}
                className={`DF JCC AIC ${
                  active === ind ? "dropdownArrowHeader MR-10" : ""
                }`}
              >
                <KeyboardArrowDownIcon />
              </Box>
            </Box>
            {activeDropdown === ind ? (
              <Box
                onMouseLeave={() => {
                  setActiveDropdownNested(null);
                  setActiveDropdown(null);
                }}
                component={"div"}
                className="dropDownHeader"
              >
                <Box className="dropDownHeaderTopStrip"></Box>
                {sub_tabs?.map((ele, indx) => {
                  return (
                    <>
                      <Box
                        key={indx}
                        sx={{ padding: ".5rem 1rem" }}
                        className={`links menuButtonNested ${
                          ele.sub_tabs ? "" : ""
                        }`}
                      >
                        <Link
                          onClick={(ind) => {
                            setActive(ind);
                            setActiveDropdown(null);
                          }}
                          onMouseEnter={() => {
                            if (ele.sub_tabs) {
                              if (activeDropdownNested === ind) {
                                setActiveDropdownNested(null);
                              } else {
                                setActiveDropdownNested(ind);
                              }
                            }
                          }}
                          href={`/${
                            sub_tabs[0].Name === "Overview"
                              ? `${Name.toLowerCase()
                                  .split(" ")
                                  .join("-")
                                  .split("&")
                                  .join("and")}/${
                                  ele.Name === "Overview"
                                    ? ""
                                    : ele.slug
                                    ? ele.slug
                                    : ele.Name.toLowerCase()
                                        .split(" ")
                                        .join("-")
                                        .split("&")
                                        .join("and")
                                }`
                              : `${ele.Name.toLowerCase()
                                  .split(" ")
                                  .join("-")
                                  .split("&")
                                  .join("and")}`
                          }`}
                          replace
                          className={`links menuButtonNested ${
                            ele.sub_tabs ? "PR10 DF AIC JCSB" : ""
                          }`}
                          // sx={{
                          //   fontSize: "0.938rem",
                          //   letterSpacing: "-0.01em",
                          // }}
                        >
                          {ele.Name}
                          {ele.sub_tabs ? <ChevronRightIcon /> : ""}
                        </Link>
                        {indx === sub_tabs.length - 1 ? (
                          ""
                        ) : (
                          <Box
                            sx={{
                              opacity: "0.1",
                              borderBottom: "1px solid #000000",
                              paddingBottom: ".5rem",
                            }}
                          ></Box>
                        )}
                      </Box>
                      {activeDropdownNested && ele?.sub_tabs?.length > 0 ? (
                        <Box
                          component={"div"}
                          className="dropDownHeaderNested"
                          sx={{ top: `${40 * (sub_tabs?.length - 1)}px` }}
                        >
                          <Box className="dropDownHeaderTopStrip"></Box>
                          {ele.sub_tabs?.map((ele2, indxs) => {
                            return (
                              <Box
                                key={indxs}
                                sx={{ padding: ".5rem 1rem" }}
                                className="links menuButtonNested"
                              >
                                <Link
                                  onClick={() => {
                                    setActive(ind);
                                    setActiveDropdown(null);
                                    setActiveDropdownNested(null);
                                  }}
                                  href={`/${
                                    Name === "Indices"
                                      ? `indices/${ele2.slug}`
                                      : ele2.Name.toLowerCase()
                                  }`}
                                  replace
                                  className="links menuButtonNested"
                                  // sx={{
                                  //   fontSize: "0.938rem",
                                  //   letterSpacing: "-0.01em",
                                  // }}
                                >
                                  {ele2.Name}
                                </Link>
                                {indxs === ele.sub_tabs?.length - 1 ? (
                                  ""
                                ) : (
                                  <Box
                                    sx={{
                                      opacity: "0.1",
                                      borderBottom: "1px solid #000000",
                                      paddingBottom: ".5rem",
                                    }}
                                  ></Box>
                                )}
                              </Box>
                            );
                          })}
                        </Box>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </Box>
            ) : (
              ""
            )}
          </Box>
        );
      } else if (sub_tabs) {
        return (
          <Box key={ind}>
            <Box
              className={`DF ${
                active === ind ? "menuButtonActive" : "menuButton"
              }`}
            >
              <Link
                onMouseEnter={() => setActiveDropdown(null)}
                onClick={() => setActive(ind)}
                // {...{
                key={ind}
                href={`/${Name.toLowerCase()
                  .split(" ")
                  .join("-")
                  .split("&")
                  .join("and")}`}
                className={
                  active === ind
                    ? "menuButtonActive2 cursorPointer DF JCC AIC"
                    : "menuButton2 links DF JCC AIC dropDownHeaderHeading"
                }
                replace
                // }}
              >
                <Typography>{Name}</Typography>
              </Link>
              <Box
                sx={{ marginLeft: ".4rem" }}
                component={"span"}
                className={`DF JCC AIC cursorPointer ${
                  active === ind ? "dropdownArrowHeader MR-10" : ""
                }`}
              >
                <KeyboardArrowDownIcon
                  onClick={() => {
                    if (activeDropdown === ind) {
                      setActiveDropdown(null);
                    } else {
                      setActiveDropdown(ind);
                    }
                  }}
                />
              </Box>
            </Box>

            {activeDropdown === ind ? (
              <Box
                onMouseLeave={() => setActiveDropdown(null)}
                component={"div"}
                className="dropDownHeader"
              >
                <Box className="dropDownHeaderTopStrip"></Box>
                {sub_tabs?.map((ele, indx) => {
                  return (
                    <Box
                      key={indx}
                      sx={{ padding: ".5rem 1rem" }}
                      className="links menuButtonNested"
                    >
                      <Link
                        onClick={() => {
                          setActive(ind);
                          setActiveDropdown(null);
                        }}
                        href={`/${Name.toLowerCase()
                          .split(" ")
                          .join("-")
                          .split("&")
                          .join("and")}/${ele.Name.toLowerCase()
                          .split(" ")
                          .join("-")}`}
                        replace
                        className="links menuButtonNested"
                        // sx={{ fontSize: "0.938rem", letterSpacing: "-0.01em" }}
                      >
                        {ele.Name}
                      </Link>
                      {indx === sub_tabs.length - 1 ? (
                        ""
                      ) : (
                        <Box
                          sx={{
                            opacity: "0.1",
                            borderBottom: "1px solid #000000",
                            paddingBottom: ".5rem",
                          }}
                        ></Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            ) : (
              ""
            )}
          </Box>
        );
      } else {
        return (
          <Link
            onClick={() => {
              setActiveDropdown(null);
              setActive(ind);
            }}
            // {...{
            key={ind}
            href={`/${
              Name === "Home"
                ? "/"
                : Name.toLowerCase().split(" ").join("-").split("&").join("and")
            }`}
            replace
            className={
              active === ind ? "menuButtonActive DF JCC AIC" : "menuButton"
            }
            // }}
          >
            <Typography>{Name}</Typography>
          </Link>
        );
      }
    });
  };

  return (
    <>
      <AppBar
        className={`${header} userSelectNone`}
        sx={{ backgroundColor: "white" }}
        elevation={0}
      >
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </>
  );
}
