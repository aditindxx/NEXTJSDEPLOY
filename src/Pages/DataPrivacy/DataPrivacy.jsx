"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Divider from "../../Components/Widgets/Divider";
// import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import DataPrivacyBanner from "../../Assets/Images/dataprivacybanner.png";
import { getMethodApi } from "../../Utils/Methods";
import { GET_CONFIG } from "../../Apis/EndPoints";
import Loader from "../../Components/Loader/Loader";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DataPrivacy() {
  const [expanded, setExpanded] = useState(false);
  const [seoData, setSeoData] = useState("");
  const [loader1, setLoader1] = useState(true);
  const pathname = usePathname();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const executiveDescription = useRef();

  useEffect(() => {
    getMethodApi(GET_CONFIG).then((response) => {
      if (response.status === 200) {
        setSeoData(response.data);
        setLoader1(false);
      }
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {/* Seo */}
      <title>
        {seoData?.PP_Title ? seoData.PP_Title[0].value : "Data Privacy | Indxx"}
      </title>
      <link
          rel="canonical"
          href={`https://www.indxx.com${pathname}`}
          key="canonical"
        />
      <meta
        name="description"
        content={
          seoData?.PP_Description
            ? seoData.PP_Description[0].value
            : "This Privacy Policy describes how we collect, use, store, share and protect the information collected through our website."
        }
      />
      <meta
        name="keywords"
        content={
          seoData?.PP_Keywords
            ? seoData.PP_Keywords[0].value
            : "Indxx Data Privacy Policy"
        }
      />

      <Box
        className="dataprivacyimg DF AIC"
        sx={{
          backgroundImage: `url(${DataPrivacyBanner.src})`,
        }}
      >
        <Typography variant={"h1"} className="dataprivacyimgpara">
          {"Data Privacy"}
        </Typography>
      </Box>

      <Box className="container MT7-5R">
        <Typography variant="p" component={"p"} className="privacyHeading">
          {"PRIVACY POLICY"}
        </Typography>

        <Divider
          classes={`MT20 MB10`}
          colorOne={"#395FD2"}
          colorTwo={"#ED3125"}
        />

        <Box className="MT6-25R">
          <Typography
            variant="p"
            component={"p"}
            className="privacyTextHeading"
          >
            {"Effective Date: 12-01-2021"}
          </Typography>

          <Box className="MB1-25R">
            <Typography
              variant="span"
              component={"span"}
              className="privacyText"
            >
              {`We are committed to protecting Your privacy. This Privacy Policy describes how We collect, use, store, share and protect the information collected through `}
            </Typography>
            <Link
              href={"https://www.indxx.com/"}
              target="_blank"
              className="links"
            >
              <Typography
                component={"span"}
                className="colorRed cursorPointer cursorPointer fw600 fs1-125R"
              >
                {"https://www.indxx.com/ "}
              </Typography>
            </Link>
            <Typography
              variant="span"
              component={"span"}
              className="privacyText"
            >
              {"the “Website”)."}
            </Typography>
          </Box>

          <Box className="MB1-25R">
            <Typography
              variant="span"
              component={"span"}
              className="privacyText"
            >
              {`In this Privacy Policy, "We", "Us", and "Our" refer to Indxx.com. For more information about Us, see “Our Details” at the end of this Policy.`}
            </Typography>
          </Box>

          <Box className="MB1-25R">
            <Typography
              variant="span"
              component={"span"}
              className="privacyText"
            >
              {`This Privacy Policy is incorporated into and subject to Our `}
            </Typography>

            <Typography
              component={"span"}
              className="colorRed cursorPointer cursorPointer fw600 fs1-125R"
            >
              {"Terms and Conditions. "}
            </Typography>
            <Typography
              variant="span"
              component={"span"}
              className="privacyText"
            >
              {
                "Capitalized words used but not defined in this Privacy Policy have the meaning given to them in the Terms and Conditions."
              }
            </Typography>
          </Box>

          <Box className="MB1-25R">
            <Typography
              variant="span"
              component={"span"}
              className="privacyText"
            >
              {`Please be advised that the practices described in this Privacy Policy apply only to information gathered online through the Website. This Privacy Policy applies where We are acting as a data controller with respect to the Personal Data of visitors, users, clients and customers (“You,” or “Your”); in other words, where We determine the purposes and means of the processing of that Personal Data.`}
            </Typography>
          </Box>

          <Box className="MB1-25R">
            <Typography component={"span"} className="colorRed fw600 fs1-125R">
              {"PLEASE READ THIS PRIVACY POLICY CAREFULLY "}
            </Typography>
            <Typography
              variant="span"
              component={"span"}
              className="privacyText"
            >
              {`because it affects Your rights under the law. You confirm that You have read and agreed to be bound by this Privacy Policy. If You do not agree with this Privacy Policy, You cannot use, access, create or publish in the Website. This Privacy Policy may change as We continuously improve the Website, so please check it periodically. `}
            </Typography>
          </Box>

          <Box className="MB1-25R">
            <Typography
              variant="span"
              component={"span"}
              className="privacyText"
            >
              {`We reserve the right to modify or amend the Privacy Policy from time to time without notice. Your continued use of the Website following the posting of changes to these terms will mean You accept those changes. If We intend to apply the modifications or amendments to this Privacy Policy retroactively or to Personal Data already in Our possession, We will provide You with notice of the modifications or amendments.`}
            </Typography>
          </Box>

          <Box className="MB1-25R" ref={executiveDescription}>
            <Typography
              variant="span"
              component={"span"}
              className="privacyText"
            >
              {`Our Website incorporates privacy controls which affect how We will process Your Personal Data. By using the privacy controls, You can specify whether You would like to receive direct marketing communications and limit the publication of Your information. You can access the privacy controls via URL`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box component="div" className="container MT80">
        <Box className="DF newsInsightContainer mobFFC boxshadow4sides announcementouterbox IStretchF DF FFC JCSB">
          <Box sx={{ m: 2 }} className="M34 MB0">
            <Box className="newsandresearchreddiv linehtN">{"Contents"}</Box>
          </Box>

          <Box sx={{ mb: 5 }} className="M34LR">
            <Accordion
              className=" removeaccordion"
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  1. Your Data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Indxx.com strives to provide you with the best possible
                    service. In order to provide this service we may need to
                    collect information from you from time to time. At all times
                    we try to only collect the information we need for the
                    particular function or activity we are carrying out and use
                    it in accordance with this privacy policy.
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    We collect two basic types of information from You from Your
                    use of the Website: Personal Data and Non-Personal Data.
                  </Typography>
                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  2. Personal Data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="span"
                    component={"span"}
                    className="fs1-125R fw600 linehtN Lspac"
                  >
                    &quot;Personal Data&quot;
                  </Typography>
                  <Typography
                    variant="span"
                    component={"span"}
                    className="fs1-125R fw400 linehtN Lspac"
                  >
                    means any information relating to an identified or
                    identifiable natural person; an identifiable natural person
                    is one who can be identified, directly or indirectly, in
                    particular by reference to an identifier such as a name, an
                    identification number, location data, an online identifier
                    or to one or more factors specific to the physical,
                    physiological, genetic, mental, economic, cultural or social
                    identity of that natural person.
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    As a general matter, You can browse the Website without
                    submitting Your Personal Data to Us. However, there are a
                    number of circumstances in which You may supply Us with Your
                    Personal Data.
                  </Typography>
                </Box>

                <Accordion className=" removeAccordionBorder">
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="fs1-125R fw600 linehtN Lspac">
                      2.1 Data We Collect
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="ML40">
                    <Box>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 MB1 linehtN Lspac"
                      >
                        We collect the following Personal Data from You:
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 linehtN Lspac"
                      >
                        Full Name;
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 linehtN Lspac"
                      >
                        E-mail;
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 linehtN Lspac"
                      >
                        Phone Number;
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 linehtN Lspac"
                      >
                        Date of Birth;
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Accordion className=" removeAccordionBorder">
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="fs1-125R fw600 linehtN Lspac">
                      2.2 How We Collect Data
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="ML40">
                    <Box>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 MB1 linehtN Lspac"
                      >
                        The following are the most common ways in which You give
                        Your Personal Data:
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 linehtN Lspac"
                      >
                        Participating in communities, chat rooms and comment
                        threads, other fora, and other interactive services in
                        the Website;
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 linehtN Lspac"
                      >
                        Submission of User Content on any part of the Website
                        that permit it;
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 linehtN Lspac"
                      >
                        Any other place in the Website where You knowingly
                        volunteer to give Personal Data.
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 linehtN Lspac"
                      >
                        Registration for a Subscription;
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 linehtN Lspac"
                      >
                        Signing up to receive e-mail newsletters or e-mail
                        alerts from Us;
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 linehtN Lspac"
                      >
                        Requesting for service or other assistance;
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className=" fs1-125R fw400 linehtN Lspac"
                      >
                        Participating in special events and promotions in the
                        Website;
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Typography
                  component={"p"}
                  className="fs1-125R fw400 colorRed cursorPointer linehtN Lspac"
                  onClick={() => executiveDescription.current.scrollIntoView()}
                >
                  {"Back to table of contents"}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  3. Personal Data On Or From Social Media
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    When You interact with the Website or Your Account through a
                    social media platform, such as Facebook, Twitter, Tumblr,
                    LinkedIn, YouTube, or Pinterest, We may collect the Personal
                    Data that You make available to Us on that page including
                    Your account ID or handle. We will comply with the privacy
                    policies of the corresponding social media platform and We
                    will only collect and store such Personal Data that We are
                    permitted to collect by these social media platforms.
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Please do NOT supply any other person&apos;s Personal Data to Us,
                    unless We prompt You to do so.
                  </Typography>
                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  4. Use of Personal Data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    We do NOT sell or license Your Personal Data to any third
                    party.
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    We may process any of Your Personal Data identified in this
                    Privacy Policy where necessary for the establishment,
                    exercise or defense of legal claims, whether in court
                    proceedings or in an administrative or out-of-court
                    procedure. The legal basis for this processing is Our
                    legitimate interests, namely the protection and assertion of
                    Our legal rights, Your legal rights and the legal rights of
                    others.
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    In addition to the specific purposes for which We may
                    process Your Personal Data set out in this clause, We may
                    also process any of Your Personal Data where such processing
                    is necessary for compliance with a legal obligation to which
                    We are subject, or in order to protect Your vital interests
                    or the vital interests of another natural person.
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Specifically, We use Your Personal Data for the following:
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="fs1-125R fw400 linehtN Lspac"
                  >
                    responding to Your queries and requests;
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="fs1-125R fw400 linehtN Lspac"
                  >
                    investigating complaints;
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="fs1-125R fw400 linehtN Lspac"
                  >
                    enforcing Our Terms and Conditions;
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="fs1-125R fw400 linehtN Lspac"
                  >
                    as otherwise required or authorized by law or government
                    agency.
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="fs1-125R fw400 linehtN Lspac"
                  >
                    improving and developing Our Website;
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="fs1-125R fw400 linehtN Lspac"
                  >
                    verifying Your identity;
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="fs1-125R fw400 linehtN Lspac"
                  >
                    recognizing You when Your return to Our website;
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="fs1-125R fw400 linehtN Lspac"
                  >
                    providing tips, news and/or updates;
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  5. Retaining and Deleting Personal Data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Personal Data that We process for any purpose shall not be
                    kept for longer than is necessary for that purpose or those
                    purposes.
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    We will retain Your Personal Data for a maximum period of 1
                    month.
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    In some cases, it is not possible for Us to specify in
                    advance the periods for which Your Personal Data will be
                    retained. In such cases, We will determine the period of
                    retention based on our legitimate interests, namely the
                    proper administration of Our Website and business.
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Notwithstanding the other provisions of this Section, We may
                    retain Your Personal Data where such retention is necessary
                    for compliance with a legal obligation to which We are
                    subject, or in order to protect Your vital interests or the
                    vital interests of another natural person.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  6. Data Security
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    We follow generally accepted industry standards to protect
                    the information submitted to Us, both during transmission
                    and once We receive it. We maintain appropriate
                    administrative, technical and physical safeguards to protect
                    Personal Data against accidental or unlawful destruction,
                    accidental loss, unauthorized alteration, unauthorized
                    disclosure or access, misuse, and any other unlawful form of
                    processing of the Personal Data in Our possession. This
                    includes, for example, firewalls, password protection and
                    other access and authentication controls.
                  </Typography>

                  <Typography
                    variant="span"
                    component={"span"}
                    className="fs1-125R fw400 linehtN Lspac"
                  >
                    {"We use "}
                  </Typography>
                  <Typography
                    variant="span"
                    component={"span"}
                    className="fs1-125R fw600 linehtN Lspac"
                  >
                    HTTPS
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    HTTPS (Hypertext Transfer Protocol Secure) is an internet
                    communication protocol that protects the integrity and
                    confidentiality of data between your computer and
                    www.indxx.com/. The use of HTTPS makes sure your
                    communication with us is:
                  </Typography>

                  <Box className="MT1">
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"Encrypted — "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      The data you exchange with us is secure from
                      eavesdroppers. That means that when you are browsing
                      www.indxx.com/, nobody can track your activities across
                      multiple pages, or steal the data exchange between your
                      computer and www.indxx.com/.
                    </Typography>
                  </Box>

                  <Box className="MT1">
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"Integral — "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      The use of HTTPS preserves the integrity of data. Your
                      data cannot be modified or corrupted during transfer.
                    </Typography>
                  </Box>

                  <Box className="MT1">
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"Authenticated — "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      HTTPS protocol authenticates your communication with us.
                      This ensures that you are always communicating with our
                      servers.
                    </Typography>
                  </Box>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    However, no method of transmission over the Internet, or
                    method of electronic storage, is 100% secure. We cannot
                    ensure or warrant the security of any information You
                    transmit to Us or store on the Website, and You do so at
                    Your own risk. We also cannot guarantee that such
                    information may not be accessed, disclosed, altered, or
                    destroyed by breach of any of Our physical, technical, or
                    managerial safeguards. If You believe Your Personal Data has
                    been compromised, please contact Us at abhardwaj@indxx.com.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    If We learn of a security systems breach, then We attempt to
                    notify You electronically so that You can take appropriate
                    protective steps. We may post a notice through the Website
                    if a security breach occurs.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel7"}
              onChange={handleChange("panel7")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  7. Non-Personal Data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    Non-Personal Data includes information that does not
                    personally identify You, but may include tracking and usage
                    information about Your location, demographics, use of the
                    Website and the internet.
                  </Typography>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    When You interact with the Website, We may collect
                    Non-Personal Data and Our servers may automatically keep an
                    activity log of Your use of the Website.
                  </Typography>
                </Box>

                <Accordion className=" removeAccordionBorder">
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="fs1-125R fw600 linehtN Lspac">
                      7.1 Generally, We collect and store the following
                      Non-Personal Data:
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="ML40">
                    <Box>
                      <Typography
                        variant="p"
                        component={"p"}
                        className="fs1-125R fw400 MB1 linehtN Lspac"
                      >
                        Demographic information such as age, gender, and
                        five-digit zip code as part of collecting Personal Data;
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className="fs1-125R fw400 MB1 linehtN Lspac"
                      >
                        Device information about Your computer, mobile device,
                        or other device that You use to access the Website. This
                        information may include IP address, geolocation
                        information, unique device identifiers, browser type,
                        browser language, and other transactional information;
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className="fs1-125R fw400 MB1 linehtN Lspac"
                      >
                        Usage information about Your use of the Website. This
                        information includes a reading history of the pages You
                        view.
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className="fs1-125R fw400 MB1 linehtN Lspac"
                      >
                        Additional “traffic information” such as time of access,
                        date of access, software crash reports, application
                        errors, session identification number, access times, and
                        referring site addresses.
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className="fs1-125R fw400 MB1 linehtN Lspac"
                      >
                        Your search terms and search results.
                      </Typography>
                      <Typography
                        variant="p"
                        component={"p"}
                        className="fs1-125R fw400 MB1 linehtN Lspac"
                      >
                        Other information regarding Your use of the Website.
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Typography
                  component={"p"}
                  className="fs1-125R fw400 colorRed cursorPointer linehtN Lspac"
                  onClick={() => executiveDescription.current.scrollIntoView()}
                >
                  {"Back to table of contents"}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel8"}
              onChange={handleChange("panel8")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  8. Use of Non-Personal Data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    We may disclose or share Non-Personal Data (or other
                    information, other than Personal Data) in any other manner
                    that We deem appropriate or necessary.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    Among other things, We will disclose Non-Personal Data to
                    third parties to help Us determine how users use parts of
                    the Website and who Our users are so We can improve the
                    Website.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    We will also disclose Non-Personal Data to Our partners and
                    other third parties about how Our users collectively use the
                    Website.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointerlinehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel9"}
              onChange={handleChange("panel9")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  9. Personal & Non-Personal Data From Other Sources
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    We may also collect and store information about You that We
                    receive from other sources to, among other things, enable Us
                    to update and correct the information contained in Our
                    database and to better customize Your experience on the
                    Website.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel10"}
              onChange={handleChange("panel10")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  10. Enquiry Data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="span"
                    component={"span"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    We may process information contained in any enquiry You
                    submit to Us regarding Our Goods and/or Services (&quot;
                  </Typography>
                  <Typography
                    variant="span"
                    component={"span"}
                    className="MB1 fs1-125R fw600 linehtN Lspac"
                  >
                    Enquiry Data
                  </Typography>
                  <Typography
                    variant="span"
                    component={"span"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    &quot;). The Enquiry Data may be processed for the purposes of
                    offering, marketing and selling relevant Goods and/or
                    Services to You. The legal basis for this processing is
                    consent.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel11"}
              onChange={handleChange("panel11")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  11. Your Data Privacy Rights
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="p"
                  component={"p"}
                  className="MB1 fs1-125R fw400 linehtN Lspac"
                >
                  If You are a citizen of the EU, We have summarized the rights
                  that You have under the General Data Protection Regulation
                  (GDPR) in this Section. Some of the rights are complex, and
                  not all of the details have been included in Our summaries.
                  Accordingly, You should read the relevant laws and guidance
                  from the regulatory authorities for a full explanation of
                  these rights.
                </Typography>

                <Box>
                  <Box>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"Right to Access. "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      &apos;You have the right to confirmation as to whether or not
                      We process Your Personal Data and, where We do, access to
                      the Personal Data, together with certain additional
                      information. That additional information includes details
                      of the purposes of the processing, the categories of
                      Personal Data concerned and the recipients of the Personal
                      Data. Providing the rights and freedoms of others are not
                      affected, We will supply to You a copy of Your Personal
                      Data. The first copy will be provided free of charge, but
                      additional copies may be subject to a reasonable fee.&apos;
                    </Typography>
                  </Box>

                  <Box className="MT1">
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"Right to Rectification. "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      You have the right to have any inaccurate Personal Data
                      about You rectified and, taking into account the purposes
                      of the processing, to have any incomplete Personal Data
                      about You completed.
                    </Typography>
                  </Box>

                  <Box className="MT1">
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"Right to Erasure. "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      In some circumstances You have the right to the erasure of
                      Your Personal Data without undue delay. Those
                      circumstances include: the Personal Data are no longer
                      necessary in relation to the purposes for which they were
                      collected or otherwise processed; You withdraw consent to
                      consent-based processing; You object to the processing
                      under certain rules of applicable data protection law; the
                      processing is for direct marketing purposes; and the
                      Personal Data have been unlawfully processed.
                    </Typography>
                  </Box>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    However, there are exclusions of the right to erasure. The
                    general exclusions include where processing is necessary:
                    for exercising the right of freedom of expression and
                    information; for compliance with a legal obligation; or for
                    the establishment, exercise or defense of legal claims.
                  </Typography>

                  <Box className="MT1">
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"Right to Restrict Processing. "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      In some circumstances You have the right to restrict the
                      processing of Your Personal Data. Those circumstances are:
                      You contest the accuracy of the Personal Data; processing
                      is unlawful but You oppose erasure; We no longer need the
                      Personal Data for the purposes of Our processing, but You
                      require Personal Data for the establishment, exercise or
                      defense of legal claims; and You have objected to
                      processing, pending the verification of that objection.
                      Where processing has been restricted on this basis, We may
                      continue to store Your Personal Data. However, We will
                      only otherwise process it: with Your consent; for the
                      establishment, exercise or defense of legal claims; for
                      the protection of the rights of another natural or legal
                      person; or for reasons of important public interest.
                    </Typography>
                  </Box>

                  <Box className="MT1">
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"Right to Object to Processing. "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      You have the right to object to Our processing of Your
                      Personal Data on grounds relating to Your particular
                      situation, but only to the extent that the legal basis for
                      the processing is that the processing is necessary for:
                      the performance of a task carried out in the public
                      interest or in the exercise of any official authority
                      vested in Us; or the purposes of the legitimate interests
                      pursued by Us or by a third party. If You make such an
                      objection, We will cease to process the Personal Data
                      unless We can demonstrate compelling legitimate grounds
                      for the processing which override Your interests, rights
                      and freedoms, or the processing is for the establishment,
                      exercise or defense of legal claims.
                    </Typography>
                  </Box>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    You have the right to object to Our processing of Your
                    Personal Data for direct marketing purposes (including
                    profiling for direct marketing purposes). If You make such
                    an objection, We will cease to process Your Personal Data
                    for this purpose.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    You have the right to object to Our processing of Your
                    Personal Data for scientific or historical research purposes
                    or statistical purposes on grounds relating to Your
                    particular situation, unless the processing is necessary for
                    the performance of a task carried out for reasons of public
                    interest.
                  </Typography>

                  <Box className="MT1">
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"Right to Data Portability. "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      To the extent that the legal basis for Our processing of
                      Your Personal Data is consent, or that the processing is
                      necessary for the performance of a contract to which You
                      are party or in order to take steps at Your request prior
                      to entering into a contract, and such processing is
                      carried out by automated means, You have the right to
                      receive Your Personal Data from Us in a structured,
                      commonly used and machine-readable format. However, this
                      right does not apply where it would adversely affect the
                      rights and freedoms of others.
                    </Typography>
                  </Box>

                  <Box className="MT1">
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"Right to Complain to a Supervisory Authority. "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      If You consider that Our processing of Your Personal Data
                      infringes data protection laws, You have a legal right to
                      lodge a complaint with a supervisory authority responsible
                      for data protection. You may do so in the EU member state
                      of Your habitual residence, Your place of work or the
                      place of the alleged infringement.
                    </Typography>
                  </Box>

                  <Box className="MT1">
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"Right to Withdraw Consent. "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      To the extent that the legal basis for Our processing of
                      Your Personal Data is consent, You have the right to
                      withdraw that consent at any time. Withdrawal will not
                      affect the lawfulness of processing before the withdrawal.
                    </Typography>
                  </Box>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    You may exercise any of Your rights in relation to Your
                    Personal Data through written notice to Us. See Our Contact
                    Details at the end of this Policy.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel12"}
              onChange={handleChange("panel12")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  12. Data Protection
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    If You are located in the European Economic Area, Your
                    Personal Data will be processed by Indxx.com. As part of
                    providing the Website, this Personal Data may be transferred
                    to other regions, including to Canada and the United States.
                    Such transfers will be completed in compliance with relevant
                    Data Protection Legislation.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    When Indxx.com processes Personal Data in the course of
                    providing the Website, Indxx.com will:
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    process the Personal Data as a Data Processor, only for the
                    purpose of providing the Website in accordance with
                    documented instructions from You (provided that such
                    instructions are commensurate with the functionalities of
                    the Website), and as may subsequently be agreed to by You.
                    If Indxx.com is required by law to Process the Personal Data
                    for any other purpose, Indxx.com will provide You with prior
                    notice of this requirement, unless Indxx.com is prohibited
                    by law from providing such notice; notify You if, in
                    Indxx.com’s opinion, Your instruction for the processing of
                    Personal Data infringes applicable Data Protection
                    Legislation; notify You promptly, to the extent permitted by
                    law, upon receiving an inquiry or complaint from You or a
                    Supervisory Authority relating to Indxx.com’s Processing of
                    the Personal Data; implement and maintain appropriate
                    technical and organizational measures to protect the
                    Personal Data against unauthorized or unlawful processing
                    and against accidental loss, destruction, damage, theft,
                    alteration or disclosure. These measures shall be
                    appropriate to the harm which might result from any
                    unauthorized or unlawful processing, accidental loss,
                    destruction, damage or theft of Personal Data and
                    appropriate to the nature of the Personal Data which is to
                    be protected; provide You, upon request, with up-to-date
                    attestations, reports or extracts thereof where available
                    from a source charged with auditing Indxx.com’s data
                    protection practices (e.g. external auditors, internal
                    audit, data protection auditors), or suitable
                    certifications, to enable You to assess compliance with the
                    terms of this Privacy Policy; notify You promptly upon
                    becoming aware of and confirming any accidental,
                    unauthorized, or unlawful processing of, disclosure of, or
                    access to the Personal Data; ensure that its personnel who
                    access the Personal Data are subject to confidentiality
                    obligations that restrict their ability to disclose the
                    Personal Data; and upon termination of the Terms, Indxx.com
                    will promptly initiate its purge process to delete or
                    anonymize the Personal Data. If You request a copy of such
                    Personal Data within 60 days of termination, Indxx.com will
                    provide You with a copy of such Personal Data.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel13"}
              onChange={handleChange("panel13")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  13. International Transfer Of The Personal Data of EU Citizens
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    In this Section, We provide information about the
                    circumstances in which Personal Data of citizens of the
                    European Union may be transferred to countries outside the
                    European Economic Area (EEA).
                  </Typography>

                  <Box>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="MB1 fs1-125R fw400 linehtN Lspac"
                    >
                      We have offices and facilities in United States and
                      India.The European Commission has made an &quot;adequacy
                      decision&quot; with respect to the data protection laws of
                      United States and India. Transfers to United States and
                      India will be protected by appropriate safeguards, namely
                      the use of standard data protection clauses adopted or
                      approved by the European Commission. A copy of the use of
                      standard protection clauses adopted or approved by the
                      European Commission can be obtained through:
                    </Typography>
                    <Link
                      href={
                        "https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en"
                      }
                      target="_blank"
                      className="colorRed cursorPointer TDN"
                    >
                      <Typography
                        component={"span"}
                        className="fs1-125R fw400 MT1 linehtN Lspac"
                      >
                        {" ec.europa.eu"}
                      </Typography>
                    </Link>
                  </Box>

                  <Box>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="MB1 fs1-125R fw400 linehtN Lspac"
                    >
                      The hosting facilities for Our Website are situated in
                      India. The European Commission has made an &quot;adequacy
                      decision&quot; with respect to the data protection laws of
                      India. Transfers to India will be protected by appropriate
                      safeguards, namely the use of standard data protection
                      clauses adopted or approved by the European Commission. A
                      copy of the use of standard protection clauses adopted or
                      approved by the European Commission can be obtained
                      through:
                    </Typography>

                    <Link
                      href={
                        "https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en"
                      }
                      target="_blank"
                      className="colorRed cursorPointer TDN"
                    >
                      <Typography
                        component={"span"}
                        className="fs1-125R fw400 MT1 linehtN Lspac"
                      >
                        {" ec.europa.eu"}
                      </Typography>
                    </Link>
                  </Box>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    You acknowledge that Personal Data that You submit for
                    publication through Our Website or Services may be
                    available, via the internet, around the world. We cannot
                    prevent the use (or misuse) of such Personal Data by others.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    The legal basis for this processing is Our legitimate
                    interests, namely the proper administration of Our Website
                    and business and communications with users.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel14"}
              onChange={handleChange("panel14")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  14. Your Choices
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    In general, if You register on the Website, You may update
                    the information You have provided to Us.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    When You register on the Website, You may be able to
                    indicate Your preferences regarding marketing
                    communications. You may be able to change those preferences
                    and select the categories of communications that interest
                    You.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    You will not be able to opt-out of receiving certain
                    service-related or transactional communications relating to
                    the Website unless You cancel Your registration or
                    subscription.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    Even after Your account is cancelled, We may retain Your
                    information for the purposes set forth in this Privacy
                    Policy.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel15"}
              onChange={handleChange("panel15")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  15. Your Right to Access
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    We provide You with reasonable access to the Personal Data
                    that You may provide through the Website.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel16"}
              onChange={handleChange("panel16")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  16. Your Right to Withdraw Consent
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    At any time, You may legitimately object to the processing
                    of Your Personal Data, except if otherwise provided by
                    applicable law. You may decline to share certain Personal
                    Data with Us, in which case We may not be able to provide to
                    You some of the features and functionality of the Website.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel17"}
              onChange={handleChange("panel17")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  17. Your Right to Update, Correct or Delete
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    You may update, correct, or delete Your Account Data and
                    preferences at any time by accessing Your Account settings
                    page on the Website. If You wish to access or amend any
                    other Personal Data We hold about You, or to request that We
                    delete any information about You that We have obtained from
                    an Integrated Service, You may contact Us. Please note that
                    while any changes You make will be reflected in active user
                    databases instantly or within a reasonable period of time,
                    We may retain all information You submit for backups,
                    archiving, prevention of fraud and abuse, analytics,
                    satisfaction of legal obligations, or where We otherwise
                    reasonably believe that We have a legitimate reason to do
                    so.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    We will however retain Your information needed for
                    administrative and transactional communications.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel18"}
              onChange={handleChange("panel18")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  18. California Privacy Rights
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    If You are a California resident, California Civil Code
                    Section 1798.83 permits You to request and obtain from We,
                    information regarding the disclosure of Your Personal Data
                    to the third parties for direct marketing purposes in the
                    preceding calendar year, free of charge, once a year.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    We do not share Your Personal Data with third parties for
                    those parties&apos; direct marketing use. For more information
                    about Our privacy and data collection policies, You may wish
                    to review Our Privacy Policy.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    California residents, who are under 18 and are registered
                    users of We, are allowed to request and have removed, any
                    content or information that they have posted publicly.
                    However, in cases where the law does not require or allow
                    the removal of information, this may not be applicable. This
                    is under California Business and Professions Code Section
                    22581.
                  </Typography>

                  <Box>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"California Tracking Disclosure:  "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      We track the personally identifying information of Our
                      users and visitors over time and across third party
                      websites to provide targeted advertising. We respond to Do
                      Not Track (DNT) signals. We act when:
                    </Typography>
                  </Box>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    Our Website is operated from California, or
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Our users may be consumers residing in California.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Some other third-party websites may also keep track of Your
                    browsing activities so that they can tailor the information
                    or advertising they present to You. If You wish to opt out
                    of this tracking, You can enable privacy settings in Your
                    browser.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel19"}
              onChange={handleChange("panel19")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  19. No Personal Data From Children
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    We do not knowingly collect Personal Data from children
                    under 13 years of age in the USA or 16 years of age in the
                    European Union. The Website is not directed to children
                    under the age of 13 in the USA or 16 in the European Union.
                    We will not knowingly allow children under 13 in the USA or
                    16 in the European Union to register for or become users of
                    the Website.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    If You are under 13 in the USA or 16 in the European Union
                    years of age, You should not provide Personal Data to Us.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    If We discover that a child under the age of 13 in the USA
                    or 16 in the European Union has provided Us with Personal
                    Data and We do not have parental consent, We will
                    immediately delete that child’s information.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel20"}
              onChange={handleChange("panel20")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  20. Links To Or From Another Website
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    The Website may contain links to other sites operated by Our
                    affiliates or third parties. Please be advised that the
                    practices described in this Privacy Policy do not apply to
                    information gathered through these other sites. We are not
                    responsible for the actions and privacy policies of third
                    parties and other sites.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel21"}
              onChange={handleChange("panel21")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  21. Public Areas
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Please remember that any information You share in public
                    areas, such as message boards or feedback sections, becomes
                    public and anyone may take and use that information. Please
                    be careful about what You disclose and do not post any
                    Personal Data that You expect to keep private. Please
                    consult the applicable guidelines, if any, for use of Our
                    chat rooms and other community areas for more information.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel22"}
              onChange={handleChange("panel22")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  22. Interest Based Advertising
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    To help ensure that You receive ads that are relevant to
                    Your interests on the Website, Our advertisers’ services,
                    and elsewhere on the Internet, We and third parties
                    (including service providers, advertisers, and advertising
                    companies) may collect information about Your online
                    activities over time and across different sites, apps, and
                    devices. We and third parties may use that information to
                    help understand audience segments. Advertisers may use the
                    segments to determine the audience groups to which they wish
                    to deliver particular ads. Through this process, We do not
                    use information that directly identifies You.
                  </Typography>

                  <Box>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw600 linehtN Lspac"
                    >
                      {"Opt Out. "}
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="fs1-125R fw400 linehtN Lspac"
                    >
                      You can opt out of receiving interest-based advertising on
                      Your computer or laptop from some companies, including Us
                      and Our service providers.
                    </Typography>
                  </Box>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    If You wish to opt out of receiving interest-based
                    advertising on Your mobile device, please see the
                    advertising preferences information on support.apple.com for
                    iOS devices or support.google.com for Android devices.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Opting out does not mean You will no longer receive
                    advertising. It means that the company or companies from
                    which You opted out will no longer deliver ads tailored to
                    Your web preferences and usage patterns.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel23"}
              onChange={handleChange("panel23")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  23. Changes And Updates
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    Please revisit this page periodically to stay aware of any
                    changes to this Privacy Policy, which We may update from
                    time to time. If We modify the Privacy Policy, We will make
                    it available through the Website, and indicate the date of
                    the latest revision. Any material changes will be posted on
                    this Website and will come into effect 10 Days after their
                    posting.
                  </Typography>

                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 MT1 fs1-125R fw400 linehtN Lspac"
                  >
                    In the event that the modifications materially alter Your
                    rights or obligations hereunder, We will make reasonable
                    efforts to notify You of the change. For example, We may
                    send a message to Your email address, if We have one on
                    file, or generate a pop-up or similar notification when You
                    access the Website for the first time after such material
                    changes are made. If You do not refuse the changes in
                    writing before they become effective, this shall mean that
                    You have consented to the Privacy Policy as changed. Your
                    continued use of the Website after the revised Privacy
                    Policy has become effective indicates that You have read,
                    understood and agreed to the current version of the Privacy
                    Policy.
                  </Typography>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className=" removeAccordionBorder"
              expanded={expanded === "panel24"}
              onChange={handleChange("panel24")}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="fs1-125R fw600 linehtN Lspac">
                  24. Our Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography
                    variant="p"
                    component={"p"}
                    className="MB1 fs1-125R fw400 linehtN Lspac"
                  >
                    If you have questions or concerns regarding this policy or
                    if you need to make a request please contact us at:
                  </Typography>

                  <Box className="DF">
                    <Typography
                      variant="span"
                      component={"span"}
                      className="MB1 fs1-125R fw600 W40 linehtN Lspac"
                    >
                      E-mail:
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="MB1 fs1-125R fw400 linehtN Lspac"
                    >
                      info@indxx.com
                    </Typography>
                  </Box>

                  <Box className="DF">
                    <Typography
                      variant="span"
                      component={"span"}
                      className="MB1 fs1-125R fw600 W40 linehtN Lspac"
                    >
                      Contact URL:
                    </Typography>
                    <Typography
                      variant="span"
                      component={"span"}
                      className="MB1 fs1-125R fw400 linehtN Lspac"
                    >
                      https://www.indxx.com/contactus
                    </Typography>
                  </Box>

                  <Typography
                    component={"p"}
                    className="fs1-125R fw400 MT1 colorRed cursorPointer linehtN Lspac"
                    onClick={() =>
                      executiveDescription.current.scrollIntoView()
                    }
                  >
                    {"Back to table of contents"}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <hr className="greyline" />
          </Box>
        </Box>
      </Box>
      {loader1 ? <Loader /> : ""}
    </>
  );
}
