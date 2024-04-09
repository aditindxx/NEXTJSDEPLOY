import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  toolbarOuter: {
    display: "flex",
    justifyContent: "space-between",
    height: "7.25rem",
    paddingLeft: "15.3125% !important",
    paddingRight: "3.187% !important",
    transition: "box-shadow 0.4s ease-in-out",
    "@media (max-width: 1400px)": {
      paddingLeft: "9% !important",
      paddingRight: "2.8% !important",
      transition: "width 2s",
    },
    "@media (max-width: 1250px)": {
      paddingLeft: "2% !important",
      paddingRight: "2% !important",
      transition: "width 2s",
    },
  },
  toolbarOuterWithoutSearch: {
    display: "flex",
    justifyContent: "space-between",
    height: "7.25rem",
    paddingLeft: "15.3125% !important",
    paddingRight: "10.187% !important",
    transition: "box-shadow 0.4s ease-in-out",
    "@media (max-width: 1400px)": {
      paddingLeft: "9% !important",
      paddingRight: "6% !important",
      transition: "width 2s",
    },
    "@media (max-width: 1250px)": {
      paddingLeft: "2% !important",
      paddingRight: "2% !important",
      transition: "width 2s",
    },
  },
  boxShadow: {
    boxShadow: "0 12px 24px rgba(0,0,0,0.25), 0 8px 8px rgba(0,0,0,0.20)",
    transition: "box-shadow 0.4s ease-in-out",
  },
  toolbarInner: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  menuButtonFooter: {
    // fontFamily: "",
    color: "white",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "1.125rem",
    lineHeight: "30px",
    transition: "font-size .2s ease",
  },
  footerLowerContainer: {
    height: "4.375rem",
    color: "white",
    paddingLeft: "15.3125% !important",
    paddingRight: "15.3125% !important",
    backgroundColor: "#395FD2",
    "@media (max-width: 1250px)": {
      paddingLeft: "5% !important",
      paddingRight: "5% !important",
    },
  },
  footerUpperContainer: {
    minHeight: "25.25rem",
    color: "white !important",
    padding: "4.438rem 6.75% 3.438rem 15.3125% !important",
    backgroundColor: "#3F4040",
    "@media (max-width: 1100px)": {
      padding: "4rem 5% 2rem 5% !important",
    },
    "@media (max-width: 900px)": {
      padding: "4rem 12% 2rem 10% !important",
    },
    "@media (max-width: 650px)": {
      padding: "4rem 5% 2rem 5% !important",
    },
  },
  footerUnderline: {
    width: "49px",
    height: "2px",
    background: "#D9D9D9",
  },
  footerHeading: {
    // fontFamily: "",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "1.5rem !important",
    lineHeight: "30px !important",
    display: "block",
  },
  text_18_24: {
    // fontFamily: "",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "1.125rem",
    lineHeight: "24px",
    display: "block",
  },
  text_18_footer: {
    // fontFamily: "",
    display: "block",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "1.125rem",
    lineHeight: "normal",
    width: "250px",
    letterSpacing: "-0.54px",
  },
  footerTextContactUs: {
    // fontFamily: "",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "1.125rem",
    lineHeight: "30px",
    display: "block",
  },
  footerHeadingBox: {
    height: "2.625rem",
  },
  header: {
    "@media (max-width: 1100px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    marginLeft: "0rem",
    cursor: "pointer",
    "@media (max-width: 1100px)": {
      marginLeft: "0.2rem",
      width: "6.5rem",
    },
  },

  expCard: {
    minHeight: "250px",
    background: "#395FD2 !important",
    borderRadius: "20px !important",
  },
  searchCard: {
    minHeight: "189px",
    background: "#395FD2 !important",
    borderRadius: "10px !important",
    marginBottom: "120px",
    "@media (max-width: 1100px)": {
      marginBottom: "60px",
    },
  },
  whatToExpectCard: {
    minHeight: "200px",
    background: "#395FD2 !important",
    borderRadius: "0px !important",
  },
  awardAndRecognitionCard: {
    minHeight: "650px",
    background: "#395FD2 !important",
    borderRadius: "0px !important",
  },

  expCardBtn: {
    background: "white !important",
    minWidth: "14rem",
    minHeight: "3.125rem",
    fontSize: "1.25rem !important",
    fontWeight: "400 !important",
    lineHeight: "26px !important",
    color: "#000000 !important",
    borderRadius: "5px !important",
    textTransform: "capitalize !important",
    "@media (max-width: 1400px)": {
      fontSize: "1rem !important",
    },
  },
  searchCardBtn: {
    background: "#ED3125 !important",
    minWidth: "225px",
    minHeight: "54px",
    fontSize: "1.125rem !important",
    fontWeight: "500 !important",
    color: "#FFF !important",
    borderRadius: "6px !important",
    textTransform: "capitalize !important",
    "@media (max-width: 1400px)": {
      fontSize: "1rem !important",
    },
  },
  drawerToolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "6.1% !important",
    paddingRight: "6.1% !important",
  },
  drawerContainer: {
    padding: "16px",
    minWidth: "8rem",
  },
  menuBtnsHdr: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "70%",
    whiteSpace: "nowrap",
  },
  menuIconMobContainer: {
    padding: "0px !important",
    color: "black !important",
  },
  f22text: {
    fontSize: "22px",
    lineHeight: "150%",
    letterSpacing: "-0.03em",
    color: "#FFFFFF",
  },
  f20text: {
    fontSize: "18px",
    lineHeight: "normal",
    letterSpacing: "-0.03em",
    color: "#FFFFFF",
    fontWeight: "700",
  },
  f23text: {
    fontSize: "22px",
    lineHeight: "150%",
    letterSpacing: "-0.03em",
    color: "#FFFFFF",
  },
  f15text: {
    fontSize: "15px",
    lineHeight: "200%",
    color: "#0532C6",
  },
  textField: {
    paddingLeft: "1rem !important",
  },
  textAreaContact: {
    border: "1px solid #0532c6 !important",
    minHeight: "30rem !important",
    width: "100%",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "1rem",
    paddingBottom: "2px",
    fontSize: "1rem",
    "&:focus": {
      outline: "none",
      border: "2px solid #0532c6 !important",
      paddingBottom: "0px",
    },
  },
  tel: {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

export default useStyles;
