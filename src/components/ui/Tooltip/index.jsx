import React from 'react'
import { TiInfoLarge } from "react-icons/ti";

const Tooltip = ({ message }) => {
    return (
        <div className="relative group cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-[#d3e7fe] shadow text-base flex items-center justify-center font-bold">
                <TiInfoLarge color='#004aa1' size={24} />

            </div>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-8  bg-white text-[#004aa1] text-xs px-3 py-2 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-300">
                <p className="tooltip-text">{message}</p>
            </div>
        </div>
    )
}

export default Tooltip