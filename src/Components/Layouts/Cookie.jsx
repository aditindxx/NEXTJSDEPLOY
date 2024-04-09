"use client";
import React from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { postMethodApi } from "../../Utils/Methods";
import { POST_COOKIECHECK, POST_COOKIESAVE } from "../../Apis/EndPoints";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

export default function Cookie() {
  const [showCookie, setshowCookie] = useState("none");

  useEffect(() => {
    fetch("https://geolocation-db.com/json/")
      .then((response) => response.json())
      .then((response) => localStorage.setItem("IPAddress", response.IPv4));
    setTimeout(() => {
      checkcookiestatus();
    }, 4000);
  }, []);

  const checkcookiestatus = () => {
    postMethodApi(POST_COOKIECHECK, {
      ip_address: localStorage.getItem("IPAddress"),
    })
      .then((res) => {
        if (res.status === 200 && res.data.status === true) {
          setshowCookie("none");
        } else if (res.status === 200 && res.data.status === false) {
          setshowCookie("block");
        }
      })
      .catch((error) => {
        return;
      });
  };

  const cookieaccepted = () => {
    setshowCookie("none");
    postMethodApi(POST_COOKIESAVE, {
      ip_address: localStorage.getItem("IPAddress"),
    })
      .then((res) => {
        if (res.status === 201) {
        }
      })
      .catch((error) => {
        return;
      });
  };

  return (
    // <Box className="container">
    <Box
      className="CookieBox container PL30 PR30 PT20 PB20"
      sx={{ display: `${showCookie}` }}
    >
      <Box>
        <Typography variant="p" component={"p"} className="CookieText">
          {
            "We use cookies to ensure you get the best experience on our website. "
          }
        </Typography>
        <Typography variant="p" component={"p"} className="CookieText">
          {"By clicking ‘Accept All’, you agree to our use of cookies."}
        </Typography>
      </Box>
      <Box component={"div"} className="DF JCSB AIC MT25 verySmallMobMT5">
        <Typography variant="p" component={"p"} className="CookieTextReadMore">
          {"Read our "}
          <Link href={"cookiepolicy"} className="CookieTextReadMore">
            {"cookie policy"}
          </Link>
        </Typography>
        <Button className="acceptbtn " onClick={() => cookieaccepted()}>
          {"Accept All"}
        </Button>
      </Box>
    </Box>
  );
}
