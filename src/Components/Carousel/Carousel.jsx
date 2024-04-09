import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Interweave } from "interweave";
import React, { useState } from "react";
import { useEffect } from "react";

export default function Carousel({
  data,
  btnOne,
  carouselFun,
  btnTwo,
  indxxVideo,
  playVideo,
}) {
  const [index, setIndex] = useState(0);
  const [mousedOver, setMousedOver] = useState(false);
  const [movingPoint, setMovingPoint] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setMousedOver(true);
    }, 500);
  }, []);

  const changeCraousel = (ind) => {
    setIndex(ind);
  };

  useEffect(() => {
    let ind = index;
    if (mousedOver) {
      const timer = setInterval(() => {
        if (ind < data?.length) {
          changeCraousel(ind);
          ind++;
        } else {
          ind = 0;
        }
      }, 4000);
      return () => clearInterval(timer);
    }

    document.addEventListener("touchstart", (e) => {
      [...e.changedTouches].forEach((touch) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.style.top = `${touch.pageY}px`;
        dot.style.left = `${touch.pageX}px`;
        dot.id = touch.identifier;
        document.body.append(dot);
        setMovingPoint(touch.pageX);
        setMousedOver(false);
      });
    });

    document.addEventListener("touchmove", (e) => {
      [...e.changedTouches].forEach((touch) => {
        const dot = document.getElementById(touch.identifier);
        dot.style.top = `${touch.pageY}px`;
        dot.style.left = `${touch.pageX}px`;
        setMousedOver(false);
      });
    });

    document.addEventListener("touchend", (e) => {
      [...e.changedTouches].forEach((touch) => {
        const dot = document.getElementById(touch?.identifier);
        // setMousedOver(true);
        if (movingPoint > touch.pageX) {
          if (index < data?.length - 1) {
            setIndex(index + 1);
          }
        } else {
          if (index > 0) {
            setIndex(index - 1);
          }
        }
        setMousedOver(true);
        dot?.remove();
      });
    });

    document.addEventListener("touchcancel", (e) => {
      [...e.changedTouches].forEach((touch) => {
        const dot = document.getElementById(touch?.identifier);
        // setMousedOver(true);
        if (movingPoint > touch.pageX) {
          if (index < data?.length - 1) {
            setIndex(index + 1);
          }
        } else {
          if (index > 0) {
            setIndex(index - 1);
          }
        }
        setMousedOver(true);
        dot?.remove();
      });
    });
    // eslint-disable-next-line
  }, [movingPoint, mousedOver, data?.length]);

  return (
    <>
      <Box
        className={"carouselBig"}
        sx={{
          backgroundImage: `
        ${
          index === 0
            ? "linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.5) 100%),"
            : ""
        } url(${data ? data[index]?.image : ""})`,
          backgroundColor: "#032262",
        }}
      >
        <Box
          component={"div"}
          className={`DF FFC ${
            index === 3 ? "FGap40" : index === 4 ? "FGap50" : "FGap80"
          } JCC AIC carouselContentHeight smallMobGap2R`}
        >
          <Typography
            variant="p"
            className={`${
              data
                ? data[index]?.Title.length > 20 + 7
                  ? "carouselHeadingFSSmall"
                  : "carouselHeadingFSBig"
                : ""
            } carouselHeading PT30 fs4 verySmallMobPL10 verySmallMobPR10 container  ${
              data[index]?.Is_Analytics ? "carouselHeadingPaddingChange" : ""
            }`}
            id="linehtN"
          >
            <Interweave content={data ? data[index]?.Title : ""} />
          </Typography>
          <Box className={`${index === 0 ? "textCarousel" : "textCarousel2"} `}>
            <Interweave content={data ? data[index]?.Description : ""} />
          </Box>
          {data[index]?.Is_Analytics ? (
            <Box
              component={"div"}
              className="DF JCSB W75  mobFGap1 smallMobFWW smallMobJCSA"
            >
              {Object.entries(data[index]?.Is_Analytics)?.map(
                ([key, value], ind) => {
                  return (
                    <Box key={ind}>
                      <Box component={"p"} className="textNumberHeading">
                        {value}
                      </Box>
                      <Box component={"p"} className="textNumber">
                        {key}
                      </Box>
                    </Box>
                  );
                }
              )}
            </Box>
          ) : (
            ""
          )}

          <Box className="DF AIC JCC FGap2R MB50">
            {btnOne ? (
              <Box className="DF AIC JCC">
                <Button
                  className="carouselBtn"
                  variant="outlined"
                  onMouseOver={() => setMousedOver(false)}
                  onMouseOut={() => setMousedOver(true)}
                  onClick={() =>
                    data[index]?.navigate
                      ? carouselFun(
                          data[index]?.navigate
                            .split(" ")
                            .join("-")
                            .toLowerCase()
                        )
                      : ""
                  }
                >
                  {btnOne.charAt(0).toUpperCase() + btnOne.slice(1)}
                </Button>
              </Box>
            ) : null}

            {btnTwo && index === 0 ? (
              <Button
                className="carouselBtn"
                variant="outlined"
                onMouseOver={() => setMousedOver(false)}
                onMouseOut={() => setMousedOver(true)}
                onClick={() => {
                  indxxVideo.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "center",
                  });
                  setTimeout(() => {
                    playVideo();
                  }, 500);
                }}
              >
                {btnTwo.charAt(0).toUpperCase() + btnTwo.slice(1)}
              </Button>
            ) : null}
          </Box>

          {data?.length > 1 ? (
            <Box
              className="DF AIC JCC btnsGrpCarousel PB30"
              onMouseOver={() => setMousedOver(false)}
              onMouseOut={() => setMousedOver(true)}
            >
              {data?.map((ele, ind) => {
                return (
                  <Box
                    key={ind}
                    className={
                      ind === index ? "carouselActive" : "carouselInactive"
                    }
                    onClick={() => {
                      setIndex(ind);
                    }}
                  ></Box>
                );
              })}
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
