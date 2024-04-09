"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import Divider from "../../Components/Widgets/Divider";
import Mailicon from "../../Assets/Icons/Mailicon.svg";
import Linkdin from "../../Assets/Icons/Linkdin.svg";
import Twitter from "../../Assets/Icons/Twitter.svg";
import Linkicon from "../../Assets/Icons/Link.svg";
import { useState } from "react";
import { getMethodApi } from "../../Utils/Methods";
import { Interweave } from "interweave";
import Loader from "../../Components/Loader/Loader";
import { GET_PRESS_RELEASE } from "../../Apis/EndPoints";
// import { useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";
// import {
//   TwitterShareButton,
//   LinkedinShareButton,
//   EmailShareButton,
// } from "react-share";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function PressRelease() {
  const [loader, setLoader] = useState(true);
  const [setTimeOutLoader, setSetTimeOutLoader] = useState(true);
  const [data, setData] = useState("");
  // const location = useLocation();
  const pathname = usePathname();

  useEffect(() => {
    let queryParam =
      pathname?.split("/")[
        pathname?.split("/")?.length - 1
      ];
    getMethodApi(GET_PRESS_RELEASE + queryParam).then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
    setLoader(false);

    setTimeout(() => {
      setSetTimeOutLoader(false);
    }, 2000);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const getdate = (date) => {
    const dateAlpha = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let splitdate = date.split("-");
    // splitdate = splitdate.split("-").join(",");
    // return splitdate[1];
    return (
      dateAlpha[parseInt(splitdate[1]) - 1] +
      " " +
      splitdate[2] +
      ", " +
      splitdate[0]
    );
  };


  const handleCopyUrl = () => {
    navigator.clipboard.writeText(pathname);
    toast.success("Copied to Clipboard.");
  };

  return (
    <>
        <title>{data?.meta_title ? data.meta_title : "Press Releases"}</title>
        <link
          rel="canonical"
          href={`https://www.indxx.com${pathname}`}
          key="canonical"
        />
        <meta
          name="description"
          content={
            data?.meta_description ? data.meta_description : "description"
          }
        />
        <meta
          name="keywords"
          content={data?.meta_keywords ? data.meta_keywords : "keywords"}
        />

      <Box
        sx={{ display: "flex", alignItems: "center" }}
        className="preesreleaseimg "
      >
        <Box component={"div"} className="container DF FFC JCC">
          <Typography
            variant={"text"}
            className="preesreleaseaboveheading MB20"
          >
            Press Release
          </Typography>
          <Typography variant={"h1"} className="preesreleaseheading">
            {data ? data["Title"] : ""}
          </Typography>
          <Typography variant={"p"} className="preesreleasebelowheading MT20">
            <span>{data ? data["Location"] : ""}</span>
            <span> - </span>
            <span>{data ? getdate(data["Date"]) : getdate("2001-01-01")}</span>
          </Typography>
        </Box>
      </Box>

      <Box component={"div"} className="container DF FFC JCC">
        <Typography variant={"p"} className="preesreleasedescrption">
          {data ? <Interweave content={data["Description"]} /> : ""}
        </Typography>
      </Box>
      <Box component={"div"} className="container">
        <Typography variant="h2" className="pressreleasesubheading">
          About Indxx
        </Typography>

        <Box component={"div"} className="DF ">
          <Divider
            classes={`MT30 MB30 `}
            colorOne={"#395FD2"}
            colorTwo={"#ED3125"}
          />
        </Box>

        <Typography variant={"p"} className="preesreleasesubdescrption">
          Founded in 2005, Indxx endeavors to deliver innovative solutions to
          the investment management community at large. These range from end-to
          end indexing solutions to index services and technology products.
          Indxx and products tracking our indices have been nominated for and
          received numerous awards, including ‘Index Provider of the Year’ at
          the With Intelligence Mutual Fund & ETF Awards 2022 & 2023, ‘Best
          Index Provider - Emerging Markets ETFs’ at the ETF Express US Awards
          in October 2020, and ‘Most Innovative ETF Index Provider’ for the
          Americas at the 14th Annual Global ETF Awards in July 2018.
        </Typography>
        <Box className="contactinformation">
          <Typography variant={"p"}>
            For more information about this announcement, please contact:
            <br></br>
            <br></br>
            Indxx Press & Media Relations<br></br>
            <br></br>
            Attention: Stoyan Bojinov <br></br>
            <br></br>sbojinov@arrocomm.com
          </Typography>
        </Box>
      </Box>
      <Box component={"div"} className="container DF FFC JCC">
        <Typography variant="p" className="pressreleasesubheading1">
          Share On Social Media:
        </Typography>
      </Box>

      <Box component={"div"} className="container DF iconcontainer">
        {/* <TwitterShareButton
          url={pathname}
          media={pathname}
          quote={"Dummy text!"}
        > */}
          <Image className="pressreleaseicon" src={Twitter} alt="twitter" />
        {/* </TwitterShareButton> */}
        {/* <LinkedinShareButton
          url={pathname}
          media={pathname}
          quote={"Dummy text!"}
        > */}
          <Image className="pressreleaseicon" src={Linkdin} alt="linkdin" />
        {/* </LinkedinShareButton> */}

        {/* <EmailShareButton
          url={pathname}
          media={pathname}
          quote={"Dummy text!"}
        > */}
          <Image className="pressreleaseicon" src={Mailicon} alt="Mailicon" />
        {/* </EmailShareButton> */}
        <Image
          className="pressreleaseicon cursorPointer"
          src={Linkicon}
          alt="Linkicon"
          onClick={handleCopyUrl}
        />
      </Box>
      {/* loader */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {setTimeOutLoader || loader ? <Loader /> : ""}
    </>
  );
}
