"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import ThankYouEmail from "../../Assets/Icons/ThanYouEmail.svg";
import CadminTwitter from "../../Assets/Svgs/CadminTwitter.svg";
import CadminInstagram from "../../Assets/Svgs/CadminInstagram.svg";
import CadminLinkedin from "../../Assets/Svgs/CadminLinkedin.svg";
// import {
//   TwitterShareButton,
//   LinkedinShareButton,
// } from "react-share";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function ThankYou() {
  // const navigate = useNavigate();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {/* <head> */}
      <title>{"Thank You"}</title>
      <link
        rel="canonical"
        href={`https://www.indxx.com${pathname}`}
        key="canonical"
      />
      {/* </head> */}
      <Box component={"div"} className="thankyouBG ">
        <Box className="container DF FFC JCC AIC thankyouGPTopBottom">
          <Image
            className="thankyouemailicon"
            src={ThankYouEmail}
            alt="thank you email icon"
          />
          <Typography variant="h1" className="thankyouheading">
            Thank You!
          </Typography>
          <Typography variant="h2" className="thankyouheadingdescription">
            Your submission has been received.<br></br> We&apos;ll be in touch
            and contact you soon.
          </Typography>
          <Button
            className="thankyoubutton"
            onClick={() => {
              // navigate("/");
              router.replace("/");
            }}
          >
            Go to Home Page
          </Button>
          <Typography variant="h3" className="thankyousocialtext">
            Connect with us
          </Typography>
          <Box className="thankyousocialmediacontainer">
            {/* <LinkedinShareButton
          url={window.location.href}
          media={window.location.href}
          quote={"Dummy text!"}
        > */}
            <Image
              className="thankyousocialmediaicon cursorPointer"
              src={CadminLinkedin}
              alt="linkdin"
              onClick={() =>
                (window.location.href =
                  "https://www.instagram.com/lifeatindxx/?hl=en")
              }
            />
            {/* </LinkedinShareButton> */}
            <Image
              className="thankyousocialmediaicon cursorPointer"
              src={CadminInstagram}
              alt="instagram"
              onClick={() =>
                (window.location.href =
                  "https://www.instagram.com/lifeatindxx/?hl=en")
              }
            />
            {/* <TwitterShareButton
          url={window.location.href}
          media={window.location.href}
          quote={"Dummy text!"}
        > */}
            <Image
              className="thankyousocialmediaicon cursorPointer"
              src={CadminTwitter}
              alt="twitter"
              onClick={() =>
                (window.location.href =
                  "https://www.instagram.com/lifeatindxx/?hl=en")
              }
            />
            {/* </TwitterShareButton> */}
          </Box>
        </Box>
      </Box>
    </>
  );
}
