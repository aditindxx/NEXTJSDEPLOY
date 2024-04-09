"use client"
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Errorimg from "../../Assets/Images/404Img.png";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Page404() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Box component="div" className="container MT1">
      <Box className="MA TAC">
        <Image src={Errorimg} alt="error img" className="errorImage404"/>
      </Box>
      {/* <Box className="TAC"> */}
      <Typography className="ErropageRedheading TAC" variant="h1">
        The page you were looking for doesn&apos;t exist.
      </Typography>
      <Typography className="ErropageBlacktext TAC" variant="p" component={"p"}>
        You may have mistyped the address or the page may have moved.{" "}
      </Typography>
      <Typography className="ErropageRedtext TAC" variant="p" component={"p"}>
        {"Try our "}
        <Link href={"/"} className="ErropageLink">
          {"homepage"}
        </Link>
        {" or "}
        <Link href={"/news-and-research"} className="ErropageLink">
          {"research"}
        </Link>
        {" section instead."}
      </Typography>
      {/* </Box> */}
    </Box>
  );
}
