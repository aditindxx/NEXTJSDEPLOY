import React from "react";
import { POST_CONTACT_US } from "../../Apis/EndPoints";
import { useState } from "react";
import { Box, Button, FormControl, Typography, Checkbox } from "@mui/material";
import ReCaptchaV2 from "react-google-recaptcha";
import { toast } from "react-toastify";
import { postMethodApi } from "../../Utils/Methods";
import useStyles from "../../Assets/Styles/Common/Common";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";

export default function ContactUsForm(props) {
  const { f20text } = useStyles();
  const [contactInfo, setContactInfo] = useState({
    name: "",
    Company: "",
    Email: "",
    Phone: "",
    checkboxCookie: false,
    page_name: window.location.href.split("/").slice(-1)[0],
    ip_address: "",
  });
  const router = useRouter();
  // const location = useLocation();

  const handleChange = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setContactInfo({
      ...contactInfo,
      [event.target.name]:
        event.target.name !== "checkboxCookie"
          ? sanitizedValue
          : event.target.checked,
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

    if (props.hidemobileinput === "mobile") {
      contactInfo.Phone = "0000000000";
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
          setContactInfo({
            name: "",
            Company: "",
            Email: "",
            Phone: "",
            checkboxCookie: false,
          });
          navigate("/thank-you");
        }
      })
      .catch((error) => {
        toast.error("Some error occur !!");
        return;
      });
  };

  return (
    <Box
      component={"div"}
      className={` W31-08P DF AIC JCC mobW60 smallMobW100 mobMB30 smallMobPL20 smallMobPR20 ${props.classes}`}
    >
      <FormControl className="DF FFC JCSA formBox PB60 hgt800H100 hgtMaxH80 smallMobPB0 PT40 mobPT0 mobPB60">
        <Typography
          variant="h1"
          className="headingContactUs DF AIC JCC mobPT30"
        >
          {"Contact Us"}
        </Typography>
        <input
          name="name"
          id="name"
          placeholder="Name"
          className={`${f20text} MT10 smallMobMT10 PL1 FontFamilyInter inputBoxContactus PL1 PB10`}
          onChange={handleChange}
          value={contactInfo.name}
        />
        <input
          name="Company"
          id="Company"
          placeholder="Company Name"
          className={`${f20text} MT20 PL1 verySmallMobMT10 FontFamilyInter inputBoxContactus PL1 PB10`}
          onChange={handleChange}
          value={contactInfo.Company}
        />
        {props.hidemobileinput === "mobile" || (
          <input
            type="number"
            name="Phone"
            id="Phone"
            placeholder="Mobile No."
            className={`${f20text} MT20 PL1 verySmallMobMT10 FontFamilyInter inputBoxContactus PL1 PB10`}
            onChange={handleChange}
            value={contactInfo.Phone}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 15);
            }}
          />
        )}
        <input
          type="email"
          name="Email"
          id="Email"
          className={`${f20text} MT20 PL1 verySmallMobMT10 FontFamilyInter inputBoxContactus PL1 PB10`}
          placeholder="Email"
          onChange={handleChange}
          value={contactInfo.Email}
        />
        <Box className="reCaptcha">
          <ReCaptchaV2
            // sitekey={"6LfoBRUgAAAAAL6e1-thG56JCxpCRfDs_r5zoDry"}
            sitekey={"6Ld5c_UoAAAAAHqS4gazOrVdYHcxJ6t5K-9MfKfY"}
            // onChange={handleToken}
            // onExpire={handleExpire}
            className="MB20 MT25 verySmallMobMB10"
          />
        </Box>
        <Box component={"div"} className="DF AIFS MB25 verySmallMobMB10">
          <Checkbox
            style={{ color: "white", padding: "0 1rem 0 0" }}
            className=""
            name="checkboxCookie"
            //  defaultChecked = {false}
            value={contactInfo.checkboxCookie}
            onChange={handleChange}
          ></Checkbox>
          <Typography
            style={{ color: "white", fontSize: "12px", lineHeight: "normal" }}
            className="Contactusformtermsofusage"
          >
            I accept Indxx&apos;s terms of usage, acknowledge the Data Privacy
            Policy, and authorize to contact.{" "}
          </Typography>
        </Box>

        <Button
          className="submitBtnContactUs FontFamilyInter "
          variant="outlined"
          onClick={createContactInfo}
        >
          {"submit"}
        </Button>
      </FormControl>
    </Box>
  );
}
