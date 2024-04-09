import { Box } from '@mui/material'
import React from 'react'

export default function Loader() {
  return (
    <Box className="preloader">
        <Box className="loader">
          <Box className="loader__bar"></Box>
          <Box className="loader__bar"></Box>
          <Box className="loader__bar"></Box>
          <Box className="loader__bar"></Box>
          <Box className="loader__bar"></Box>
          <Box className="loader__ball"></Box>
        </Box>
      </Box>
  )
}
