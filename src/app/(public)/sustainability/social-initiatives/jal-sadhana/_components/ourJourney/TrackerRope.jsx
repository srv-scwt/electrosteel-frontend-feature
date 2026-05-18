"use client"
import React, { useEffect, useState } from 'react'

const TrackerRope = ({fillPercentage}) => {
    
    const [per , setPer] = useState(100)
    // useEffect(() => {
    //     const newValue = 25 * fillPercentage.length
    //     setPer(newValue)
    // },[fillPercentage])
  return (
    <>
         <svg
            width="100%"
            height="100%"
            // viewBox="0 0 1920 402"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g width={"100%"} clipPath="url(#clip0_1177_6186)">
              <mask
                id="mask0_1177_6186"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="-3"
                y="108"
                width="100%"
                height="185"
              >
                <path
                  d="M0 183.732C67.2424 127.834 250.084 51.1213 443.51 191.457C636.937 331.792 861.604 256.153 949.759 200.791"
                  stroke="#298ED3"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M1900 217.739C1832.76 273.637 1649.92 350.349 1456.49 210.014C1263.06 69.6786 1038.4 145.318 950.241 200.68"
                  stroke="#298ED3"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </mask>
              <g mask="url(#mask0_1177_6186)">
                <rect y="63" width={`${fillPercentage}%`} height="235" fill="#2F9BDD" />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1177_6186">
                <rect width="100%" height="402" fill="white" />
              </clipPath>
            </defs>
          </svg>
    </>
  )
}

export default TrackerRope