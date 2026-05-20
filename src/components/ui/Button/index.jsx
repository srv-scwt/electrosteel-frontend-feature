"use client"
import Link from "next/link";
import React from "react";
import { FiDownload } from "react-icons/fi";
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2";
import { IoReload } from "react-icons/io5";

const normalizeHref = (goto, fallback = "#") => {
  if (typeof goto === "string") {
    const trimmedGoto = goto.trim();
    return trimmedGoto || fallback;
  }

  return goto ?? fallback;
};

const ButtonLink = ({ goto, title, className , iconActive = true }) => {
  return (
    <>
      <Link href={normalizeHref(goto)} className={`btn btn-primary ${className}`}>
        <span>{title}</span>
                 {/* {title?.toLowerCase() === "load more" ? <IoReload size={20} /> :     <HiOutlineArrowLongRight size={20} />} */}
        {iconActive ?  <HiOutlineArrowLongRight size={20} /> : "" }
      </Link>
    </>
  );
};
const Button = ({ action, title , className, iconActive = true  }) => {
  return <button onClick={action} className={className}>
     <span>{title}</span>
     {iconActive ?  <HiOutlineArrowLongRight size={20} /> : "" }
  </button>;
};


const OutlineButtonLink = ({ goto, title, className , action }) => {
  return (
    <>
      <Link href={normalizeHref(goto)} target={action} className={`btn-outline-text ${className}`}>
        <span>{title}</span>
         {title?.toLowerCase() === "download" ? <FiDownload size={20} /> :     <HiOutlineArrowLongRight size={20} />}
      </Link>
    </>
  );
};


const OutlineBackButtonLink = ({ goto, title, className }) => {
  return (
    <>
      <Link href={normalizeHref(goto)} className={`btn-outline-text ${className}`}>
      <HiOutlineArrowLongLeft size={20} />
        <span>{title}</span>
      </Link>
    </>
  );
};

const OutlineButton = ({ action, title , className }) => {
  return (
    <>
      <button onClick={() => action()} className={`btn-outline-text ${className}`}>
        <span>{title}</span>
        {title?.toLowerCase() === "download" ? <FiDownload size={20} /> :     <HiOutlineArrowLongRight size={20} />}
      </button>
    </>
  );
};



const ButtonLinkOutlineWithBorder = ({ goto, title, className , iconActive = true }) => {
  return (
    <>
      <Link href={normalizeHref(goto)} className={`btn btn-Outlined !w-max gap-2 btn-text ${className}`}>
        <span>{title}</span>
        {iconActive ?  <HiOutlineArrowLongRight size={20} /> : "" }
      </Link>
    </>
  );
};


const ButtonWithIcon = ({ icon: Icon , iconRight:IconRight, text, className = "", action }) => {
  return (
    <button
      className={`btn-text w-max px-4 py-2 flex items-center cursor-pointer gap-2 ${className}`}
      onClick={action}
    >
      {Icon && <Icon size={18} />} 
      <span>{text}</span>
      {IconRight && <IconRight size={18} />} 
    </button>
  );
};

export { ButtonLink, Button, OutlineButtonLink, OutlineButton , OutlineBackButtonLink, ButtonLinkOutlineWithBorder , ButtonWithIcon };
