"use client"
import { Box } from "@mui/material";
import { useEffect, useState } from "react"
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function ScrollButton() {

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setVisible(true)
          } 
          else if (scrolled <= 300){
            setVisible(false)
          }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        });
    }

    useEffect(()=>{

      window?.addEventListener('scroll', toggleVisible)
    },[])
  return (
    <>
    <Box variant="" className="scrollToTopBtn" style={{display: visible ? 'inline' : 'none'}} onClick={scrollToTop}><KeyboardDoubleArrowUpIcon/></Box>
    </>
  )
}
