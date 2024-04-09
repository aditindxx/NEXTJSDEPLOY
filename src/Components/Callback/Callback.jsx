"use client";
import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Checkbox,
} from "@mui/material";
import ReCaptchaV2 from "react-google-recaptcha";
import Link from "next/link";
import DOMPurify from "dompurify";
import { ToastContainer, toast } from "react-toastify";
import { postMethodApi } from "@/Utils/Methods";
import { POST_CONTACT_US } from "@/Apis/EndPoints";
import { usePathname, useRouter } from "next/navigation";

export default function Callback() {
  const pathname = usePathname();
  const router = useRouter();
  const [contactInfo, setContactInfo] = useState({
    name: "",
    Company: "",
    Email: "",
    Message: "",
    Phone: "",
    ip_address: "",
    checkboxCookie: false,
    page_name: pathname?.split("/")?.slice(-1)[0],
  });

  const handleChange = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setContactInfo({
      ...contactInfo,
      [event.target.name]: sanitizedValue,
    });
  };

  const createContactInfo = () => {
    contactInfo.ip_address = localStorage.getItem("IPAddress");

    if (contactInfo.name.trim() === "") {
      toast.error("Name is required !!");
      return;
    }

    if (contactInfo.Company.trim() === "") {
      toast.error("Company name is required !!");
      return;
    }

    if (contactInfo.Email.trim() === "") {
      toast.error("Email is required !!");
      return;
    }

    if (
      !contactInfo.Email.split("").includes("@") ||
      !contactInfo.Email.split("").includes(".")
    ) {
      toast.error("Enter proper email !!");
      return;
    }

    if (contactInfo.Message.trim() === "") {
      toast.error("Message is required !!");
      return;
    }

    if (
      contactInfo.checkboxCookie === "" ||
      contactInfo.checkboxCookie === undefined ||
      contactInfo.checkboxCookie === false
    ) {
      toast.error("Please accept Terms of Usage !!");
      return;
    }

    postMethodApi(POST_CONTACT_US, contactInfo)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Contact Information is sent !!");
          router.push("/thank-you");
          // console.log(contactInfo);
          setContactInfo({
            name: "",
            Company: "",
            Email: "",
            Phone: "",
            Message: "",
            ip_address: "",
            checkboxCookie: false,
          });
        }
      })
      .catch((error) => {
        router.push("/thank-you");
        // toast.error("Some error occur !!");
        return;
      });
  };

  return (
    <Box
      sx={{ width: "57.15%" }}
      className="boxshadow4sides bordr10px getintouchform"
    >
      <Box sx={{ p: 3.26 }}>
        <Typography variant={"h1"} className="contactusformheading">
          {"Request a call back"}
        </Typography>

        <Box sx={{ mt: 3.25 }} className="DF JCSB FWW getintouchinputfield">
          <TextField
            name="name"
            label="Name*"
            className="accordionbggrey textfieldstyle"
            sx={{ color: "#636363" }}
            id="linehtN"
            size="small"
            InputProps={{
              style: {
                height: "50px",
                color: "#636363",
              },
            }}
            onChange={handleChange}
            value={contactInfo.name}
          />

          <TextField
            name="Company"
            label="Company*"
            className="accordionbggrey textfieldstyle"
            sx={{ color: "#636363" }}
            id="linehtN"
            size="small"
            InputProps={{
              style: {
                height: "50px",
                color: "#636363",
              },
            }}
            onChange={handleChange}
            value={contactInfo.Company}
          />

          <TextField
            name="Email"
            label="Email*"
            className="accordionbggrey textfieldstyle"
            sx={{ color: "#636363" }}
            id="linehtN"
            size="small"
            InputProps={{
              style: {
                height: "50px",
                color: "#636363",
              },
            }}
            onChange={handleChange}
            value={contactInfo.Email}
          />

          <TextField
            name="Phone"
            label="Phone"
            type="number"
            className="accordionbggrey textfieldstyle"
            sx={{ color: "#636363" }}
            id="linehtN"
            size="small"
            InputProps={{
              style: {
                height: "50px",
                color: "#636363",
              },
            }}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 15);
            }}
            onChange={handleChange}
            value={contactInfo.Phone}
          />
        </Box>

        <TextField
          name="Message"
          label="Message*"
          className="accordionbggrey textfieldstylefull"
          id="outlined-multiline-static linehtN"
          multiline
          rows={4}
          size="small"
          sx={{ height: 100, color: "#636363" }}
          InputProps={{
            style: {
              height: "100px",
              color: "#636363",
            },
          }}
          onChange={handleChange}
          value={contactInfo.Message}
        />

        <Box className="reCaptcha">
          <ReCaptchaV2
            sitekey={"6Ld5c_UoAAAAAHqS4gazOrVdYHcxJ6t5K-9MfKfY"}
            // onChange={handleToken}
            // onExpire={handleExpire}
            className="MB20"
          />
        </Box>

        <Box component={"div"} className="DF AIC MB20 verySmallMobMB10">
          <Checkbox
            style={{ padding: "2px 1rem 0px 0rem" }}
            className=""
            name="checkboxCookie"
            defaultChecked={false}
            value={contactInfo.checkboxCookie}
            onChange={handleChange}
          ></Checkbox>
          <Typography className="Contactustermsofusage linehtN colorBlack">
            {"I accept Indxx's terms of usage, acknowledge the "}
            <Link href={"/data-privacy"} className="colorBlack">
              {"Data Privacy"}
            </Link>
            {" Policy, and authorize to contact."}
          </Typography>
        </Box>

        <Button
          className="sendmsgBtn mobMT20 mobMAuto linehtN"
          onClick={createContactInfo}
        >
          {"Submit"}
        </Button>
      </Box>
    </Box>
  );
}
