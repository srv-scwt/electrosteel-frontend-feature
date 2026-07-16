"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X, ChevronRight, ChevronUp } from "lucide-react";
import Link from "next/link";
import Container from "../container";
import styles from "./style.module.css";
import { FaSearch } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  aboutUsData,
  careersData,
  connectData,
  digitalData,
  facilitiesData,
  csrData,
  investorData,
  productsData,
  newsRoomData,
  qualityData,
  sustainabilityData,
  offices,
} from "./header.data";
import { IoSearch } from "react-icons/io5";
import { GoSearch } from "react-icons/go";

const navLinks = [
  { name: "ABOUT", href: "/", tagType: "button", children: aboutUsData },
  {
    name: "PRODUCTS",
    href: "/products",
    tagType: "button",
    children: productsData,
  },
  {
    name: "INVESTORS",
    href: "/investors",
    tagType: "button",
    children: investorData,
  },
   {
    name: "NEWS ROOM",
    href: "/news-room",
    tagType: "button",
    children: newsRoomData,
  },
   { name: "CAREER", href: "/career", tagType: "button", children: careersData },
  {
    name: "CONNECT",
    href: "/connect",
    tagType: "button",
    children: connectData,
  },
  {
    name: "SUSTAINABILITY",
    href: "/sustainability",
    tagType: "button",
    children: sustainabilityData,
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [flagDrawer, setFlagDrawer] = useState(false);
  const [categoryDrawer, setCategoryDrawer] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkHover = (linkName) => {
    if (!isMobile) {
      setHoveredLink(linkName);
    }
  };

  const handleLinkLeave = () => {
    if (!isMobile) {
      setHoveredLink(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setHoveredLink(null);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus on search input when opening
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [showAllFlags, setShowAllFlags] = useState(false);

  return (
    <header
      className={`${styles.headerContainer} bg-white sticky top-0 w-full text-white shadow-md z-100 transition-all duration-300`}
    >
      <Container>
        <div className="flex justify-between items-center">
          {/* Left Logo */}
          <div className={`flex items-center self-end`}>
            <Link href={"/"}>
              <div className={styles.logo}>
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  className="absolute object-contain w-[100%] h-[100%] transition-all duration-300"
                />
              </div>
            </Link>
            <button
              className={`flex items-center cursor-pointer space-x-1 ${styles.flagWrapper} ${styles.logoFlag}`}
              onMouseEnter={() => setFlagDrawer(true)}
              onMouseLeave={() => setFlagDrawer(false)}
            >
              <Image
                src="/images/animated-india-flag-2b.gif"
                alt="India"
                width={isScrolled ? 24 : 28}
                height={isScrolled ? 17 : 20}
                className="transition-all duration-300"
              />
              {flagDrawer ? (
                <ChevronUp
                  size={isScrolled ? 14 : 16}
                  className="text-black transition-all duration-300"
                />
              ) : (
                <ChevronDown
                  size={isScrolled ? 14 : 16}
                  className="text-black transition-all duration-300"
                />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <nav>
            <ul className={`hidden lg:flex ${styles.navLinksContainer}`}>
              {navLinks.map((link) =>
                link.tagType === "link" ? (
                  <li key={link.name} className={`flex `}>
                    <Link
                      href={link.href}
                      onMouseEnter={() => handleLinkHover(link.name)}
                      onMouseLeave={handleLinkLeave}
                      className={`${styles.navLinksText} ${styles.navLinkActive} ${["/sustainability", "/news-room", "/connect"].some((item) => link.href.includes(item)) ? "bg-[#fcfcfc59] rounded-t-[8px]" : ""}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ) : (
                  <li key={link.name} className={`flex relative`}>
                    <button
                      onMouseEnter={() => handleLinkHover(link.name)}
                      onMouseLeave={handleLinkLeave}
                      onClick={() => handleLinkHover(link.name)}
                      className={`${styles.navLinksText} ${hoveredLink == link.name ? styles.active : ""}`}
                    >
                      {link.name}
                    </button>
                         {link.href === "/sustainability" && <Image className="absolute bottom-0 right-0" width={30} height={60} alt="plant" src="/images/plantgrow.gif" />}
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* Right Section */}
          <div className={`${styles.rightIcons} flex items-center `}>
            <Link href={"/#overview"} className={`focus:outline-none`}>
              <Image
                src="/images/lion.png"
                alt="icon"
                width={44}
                height={20}
                className="transition-all object-fill object-center duration-300"
              />
            </Link>
            <button
              onClick={toggleSearch}
              className={`${styles.searchBtn} focus:outline-none`}
              aria-label="Search"
            >
              {/* <FaSearch size={22} color="#1E2934" /> */}
              <GoSearch color="#1E2934" />
              {/* <Image
                src="/images/search.png"
                alt="Search"
                width={32}
                height={32}
                className="transition-all object-fill object-center duration-300"
              /> */}
            </button>
            <button
              onClick={() => setCategoryDrawer(!categoryDrawer)}
              onMouseEnter={() => setCategoryDrawer(true)}
              onMouseLeave={() => setCategoryDrawer(false)}
              className={`flex ${styles.buttonIconPadding} items-center self-end justify-self-end space-x-1 focus:outline-none`}
            >
              <Image
                src="/images/file-download.svg"
                alt="icon"
                width={19}
                height={22}
                className="transition-all object-fill object-center duration-300"
              />
              {categoryDrawer ? (
                <ChevronUp
                  size={isScrolled ? 12 : 14}
                  className="text-black transition-all duration-300"
                />
              ) : (
                <ChevronDown
                  size={isScrolled ? 12 : 14}
                  className="text-black transition-all duration-300"
                />
              )}
            </button>
            <div className={styles.hamburger}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X size={28} className="text-[#003366]" />
                ) : (
                  <Menu size={28} className="text-[#003366]" />
                )}
              </button>
            </div>
          </div>
          <div className={`${styles.hamburger2} items-center self-end gap-2`}>
            <button
              className={`flex items-center space-x-1 ${styles.flagWrapper2} ${styles.flagHamburger}`}
              // onClick={() => setFlagDrawer(!flagDrawer)}
              onMouseEnter={() => setFlagDrawer(true)}
              onMouseLeave={() => setFlagDrawer(false)}
            >
              <Image
                src="/images/animated-india-flag-2b.gif"
                alt="India"
                width={isScrolled ? 24 : 28}
                height={isScrolled ? 17 : 20}
                className="transition-all duration-300"
              />
              {flagDrawer ? (
                <ChevronUp
                  size={isScrolled ? 14 : 16}
                  className="text-black transition-all duration-300"
                />
              ) : (
                <ChevronDown
                  size={isScrolled ? 14 : 16}
                  className="text-black transition-all duration-300"
                />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="py-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={28} className="text-[#003366]" />
              ) : (
                <Menu size={28} className="text-[#003366]" />
              )}
            </button>
          </div>
        </div>
      </Container>
      {/* Search Overlay */}
      <div
        className={`fixed top-0 right-0 ${
          styles.headerSearchContainer
        } w-[100vw] cursor-pointer max-w-full bg-white z-50 flex items-center shadow-lg transform transition-transform duration-500 ease-in-out ${
          isSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Container>
          <div className="flex items-center w-full">
            <form onSubmit={handleSearch} className="flex-1 flex items-center">
              <input
                id="search-input"
                type="text"
                placeholder="Search by keywords"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 text-gray-800 focus:outline-none text-lg"
              />
              <button
                type="submit"
                className={`ml-4 !cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none`}
              >
                {/* <FaSearch size={20} color="#1E2934" /> */}
                <GoSearch size={24} color="#1E2934" />
              </button>
            </form>
            <button
              onClick={toggleSearch}
              className="ml-4 !cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label="Close search"
            >
              <X size={24} />
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <nav>
          <ul className="bg-[#ffffff] px-4 py-4 space-y-4 max-h-screen overflow-y-auto">
            {navLinks?.map((link, index) => (
              <li key={link?.name} className="mb-2">
                {link?.children ? (
                  <>
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex justify-between items-center text-sm font-medium text-[#545454] hover:text-yellow-400 py-2"
                    >
                      {link?.name}
                      <span>{openIndex === index ? "−" : "+"}</span>
                    </button>

                    {/* Accordion Content */}
                    {openIndex === index && (
                      <ul className="ml-4 border-l border-gray-200 pl-2">
                        {link?.children?.map((section, sectionIndex) => (
                          <li key={sectionIndex} className="mb-4">
                            <label className="block text-sm font-semibold text-[#333] mb-2">
                              {section?.section}
                            </label>
                            <div className="space-y-1">
                              {section?.links?.map((item, itemIndex) => (
                                <div key={`${sectionIndex}-${itemIndex}`}>
                                  {/* MAIN LINK */}
                                  <Link
                                    href={item?.url ?? ""}
                                    onClick={closeMenu}
                                    className="block text-sm font-medium text-[#545454] hover:text-yellow-400 py-1 pl-2"
                                  >
                                    {item?.label}
                                  </Link>

                                  {/* SUB NAVIGATION */}
                                  {item?.subLinks && (
                                    <ul className="ml-5 mt-2 space-y-1 border-l border-gray-300 pl-3">
                                      {item.subLinks.map((sub, subIndex) => (
                                        <li key={subIndex}>
                                          <Link
                                            href={sub.url}
                                            className="text-sm text-[#545454] hover:text-yellow-400 block py-1"
                                            onClick={closeMenu}
                                          >
                                            {sub.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block text-sm font-medium text-[#545454] hover:text-yellow-400 py-2"
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
            <div className="pt-4 border-t border-gray-600 mt-4 md:hidden">
              <div className="flex items-center space-x-4">
                <Link href={"/#overview"} className={`focus:outline-none`}>
                  <Image
                    src="/images/lion.png"
                    alt="icon"
                    width={30}
                    height={28}
                    className="transition-all object-fill object-center duration-300"
                  />
                </Link>
                <button onClick={toggleSearch}>
                  <Image
                    src="/images/search.png"
                    alt="Search"
                    width={24}
                    height={20}
                  />
                </button>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setCategoryDrawer(!categoryDrawer)}
                    className="flex items-center space-x-1 focus:outline-none"
                  >
                    <Image
                      src="/images/file-download.svg"
                      alt="icon"
                      width={17}
                      height={17}
                    />
                    {categoryDrawer ? (
                      <ChevronUp
                        size={12}
                        className="text-black transition-all duration-300"
                      />
                    ) : (
                      <ChevronDown
                        size={12}
                        className="text-black transition-all duration-300"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </ul>
        </nav>
      )}

      {/* Officies */}
      {/* {flagDrawer && (
        <div
          className={`${styles.flagContainer} absolute w-[100%] sm:max-w-max left-0 md:left-[75px]  bg-[#ffffff] text-white z-50 shadow-lg`}
        >
          <div className={styles.sectionContentFlag}>
            <h4>OUR OVERSEAS OFFICES</h4>
          </div>
          <div className="grid gap-2 grid-cols-4 lg:grid-cols-5">
            {offices.map((office, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 w-[100px] ${styles.flagImage}`}
              >
                <Image
                  src={office.flag}
                  width={30}
                  height={30}
                  alt={office.country}
                />
                <div className={styles.sectionContentFlag}>
                  <h5 className="text-gray-700 text-sm font-medium">
                    {office.country}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {flagDrawer && (
        <div
          className={`${styles.flagContainer} absolute w-[100%] top-[70%] lg:top-[90%] sm:max-w-max right-0 lg:left-0 md:left-[75px] bg-[#ffffff] text-white z-50 shadow-lg`}
          onMouseEnter={() => setFlagDrawer(true)}
          onMouseLeave={() => setFlagDrawer(false)}
        >
          <div className={styles.sectionContentFlag}>
            <h4>OUR OVERSEAS OFFICES</h4>
          </div>

          <div className="grid gap-2 grid-cols-4 lg:grid-cols-5 items-center">
            {(showAllFlags ? offices : offices.slice(0, 5)).map(
              (office, idx) => (
                <Link href={office.link}>
                  <div
                    key={idx}
                    className={`flex items-center gap-2 w-[100px] ${styles.flagImage}`}
                    onClick={() => setFlagDrawer(!flagDrawer)}
                  >
                    <Image
                      src={office.flag}
                      width={30}
                      height={30}
                      alt={office.country}
                    />
                    <div className={styles.sectionContentFlag}>
                      <h5 className="text-gray-700 text-sm font-medium">
                        {office.country}
                      </h5>
                    </div>
                  </div>
                </Link>
              ),
            )}

            {/* View More Button */}
            {offices.length > 5 && (
              <button
                onClick={() => setShowAllFlags(!showAllFlags)}
                className="flex items-center fontF-secondary gap-1 text-sm text-blue-600 font-medium hover:text-blue-800"
              >
                {showAllFlags ? (
                  <>
                    View Less <FiChevronUp />
                  </>
                ) : (
                  <>
                    View More <FiChevronDown />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
      {/* Officies */}
      {categoryDrawer && (
        <div
          className={`${styles.categoryContainer} w-[265px] absolute left-[15px] md:left-auto md:right-[15px] bg-[#00418E] text-white py-4 px-6 z-50 rounded-[12px] shadow-lg`}
          // onClick={() => setCategoryDrawer(false)}
          onMouseEnter={() => setCategoryDrawer(true)}
          onMouseLeave={() => setCategoryDrawer(false)}
        >
          <h4 className="navlistheadernametext mt-4 lg:mt-0 mb-3">
            {/* Resource and download */}
            Assets
          </h4>
          <ul className="space-y-2 navlistnametext">
            <li className="flex items-start">
              <Link
                href={"/resource-and-download/policy"}
                className="hover:text-yellow-400 flex items-start"
                onClick={() => setCategoryDrawer(false)}
              >
                <ChevronRight size={16} className={styles.angleIcon} />
                <span className="ml-1">Policy</span>
              </Link>
            </li>
            <li className="flex items-start">
              <Link
                href={"/resource-and-download/certificate"}
                className="hover:text-yellow-400 flex items-start"
                onClick={() => setCategoryDrawer(false)}
              >
                <ChevronRight size={16} className={styles.angleIcon} />
                <span className="ml-1">Certificate</span>
              </Link>
            </li>
            <li className="flex items-start">
              <Link
                href={"/resource-and-download/brouchre"}
                className="hover:text-yellow-400 flex items-start"
                onClick={() => setCategoryDrawer(false)}
              >
                <ChevronRight size={16} className={styles.angleIcon} />
                <span className="ml-1">Brochure</span>
              </Link>
            </li>
            <li className="flex items-start">
              <Link
                href={"/resource-and-download/other"}
                className="hover:text-yellow-400 flex items-start"
                onClick={() => setCategoryDrawer(false)}
              >
                <ChevronRight size={16} className={styles.angleIcon} />
                <span className="ml-1">Other</span>
              </Link>
            </li>
          </ul>
          {/* <div className={styles.sectionContentCategory}>
            <h4>Select Category Of User</h4>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-center justify-between">
              <ToggleButton id="audio" label="Audio" />
            </div>
            <div className="flex items-center justify-between">
              <ToggleButton id="mouseTrail" label="Mouse Trail" />
            </div>
          </div>
          <p className="text-xs mt-2">
            Note: Toggle above buttons to switch ON/OFF audio or mouse trail
            functionality
          </p>
          <p className="text-xs">
            Note: If you close this popup, you can still open it by clicking the
            gear icon on the extreme right hand top corner
          </p> */}
        </div>
      )}
      {/* Dropdown Menus */}
      {!isMobile && (
        <>
          {/* ABOUT Dropdown */}
          {hoveredLink === "ABOUT" && (
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[95%] lg:w-[90%] bg-[#00418E] text-white py-8 lg:py-12 px-6 lg:px-12 z-50 rounded-[12px] shadow-lg"
              onMouseEnter={() => handleLinkHover("ABOUT")}
              onMouseLeave={handleLinkLeave}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-12 gap-6 xl:gap-10">
                {/* Left Section */}
                <div className="xl:col-span-3">
                  <Image
                    src="/images/menu-img1.png"
                    alt="menuimg"
                    width={336}
                    height={273}
                    className="w-full h-auto mb-5"
                  />
                  <h3 className="navheadertext mb-3">About Us</h3>
                  <h2 className="navsubtext">
                    <span className="text-yellow-400">
                      Pioneers in introducing
                    </span>{" "}
                    <br />
                    Ductile Iron Pipes in India
                  </h2>
                </div>

                {/* Profile */}
                <div className="xl:col-span-3">
                  <div>
                    <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                      Profile
                    </h4>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/about"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">About Us</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/about/profile/vision-mission"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          {" "}
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Vision & Mission</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/about/profile/milestones"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Milestones</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                      Leadership
                    </h4>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/about/leadership/board-of-directors"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Board of Directors</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/about/leadership/board-committees"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Board Committees</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/about/leadership/legends-of-ecl"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Legends of ECL</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* People */}
                <div className="xl:col-span-3">
                  <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                    <Link
                      href={"/about/people"}
                      className="hover:text-yellow-400 flex items-start"
                    >
                      People
                    </Link>
                  </h4>
                  <ul className="space-y-2 navlistnametext">
                    <li className="flex items-start">
                      <Link
                        href={"/about/people#overview"}
                        className="hover:text-yellow-400 flex items-start"
                      >
                        <ChevronRight size={16} className={styles.angleIcon} />
                        <span className="ml-1">OverView</span>
                      </Link>
                    </li>
                    <li className="">
                      <div className="flex items-start">
                        <Link
                          href={"/about/people#life-at-ecl"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Life at ECL</span>
                        </Link>
                      </div>
                      <ul className="space-y-2 navlistnametext pl-5 mt-3">
                        <li className="flex items-start">
                          <Link
                            href={"/about/people#employee-engagement"}
                            className="hover:text-yellow-400 flex items-start"
                          >
                            <ChevronRight
                              size={16}
                              className={styles.angleIcon}
                            />
                            <span className="ml-1">Employee Engagement</span>
                          </Link>
                        </li>
                        <li className="flex items-start">
                          <Link
                            href={"/about/people#campus-hire-stories"}
                            className="hover:text-yellow-400 flex items-start"
                          >
                            <ChevronRight
                              size={16}
                              className={styles.angleIcon}
                            />
                            <span className="ml-1">Campus Hire Stories</span>
                          </Link>
                        </li>
                        <li className="flex items-start">
                          <Link
                            href={"/about/people#employee-testimonials"}
                            className="hover:text-yellow-400 flex items-start"
                          >
                            <ChevronRight
                              size={16}
                              className={styles.angleIcon}
                            />
                            <span className="ml-1">Employee Testimonials</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="">
                      <div className="flex items-start">
                        <Link
                          href={"/about/rewards-recognition"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Rewards and Recognitions</span>
                        </Link>
                      </div>
                      <ul className="space-y-2 navlistnametext pl-5 mt-3">
                        <li className="flex items-start">
                          <Link
                            href={"/about/rewards-recognition#pragati"}
                            className="hover:text-yellow-400 flex items-start"
                          >
                            <ChevronRight
                              size={16}
                              className={styles.angleIcon}
                            />
                            <span className="ml-1">Pragati</span>
                          </Link>
                        </li>
                        <li className="flex items-start">
                          <Link
                            href={"/about/rewards-recognition#pratibha-pride"}
                            className="hover:text-yellow-400 flex items-start"
                          >
                            <ChevronRight
                              size={16}
                              className={styles.angleIcon}
                            />
                            <span className="ml-1">Pratibha & Pride</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                {/* Global Presence */}
                <div className="xl:col-span-3">
                  <div>
                    <Link
                      href={"/about/global-presence"}
                      className="hover:opacity-85 flex items-start"
                    >
                      <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                        global presence
                      </h4>
                    </Link>
                    <ul className="space-y-2 navlistnametext">
                      <li className="">
                        <div className="flex items-start">
                          <Link
                            href={"/about/global-presence#offices"}
                            className="hover:text-yellow-400 flex items-start"
                          >
                            <ChevronRight
                              size={16}
                              className={styles.angleIcon}
                            />
                            <span className="ml-1">Offices</span>
                          </Link>
                        </div>
                        <ul className="space-y-2 navlistnametext pl-5 mt-3">
                          <li className="flex items-start">
                            <Link
                              href={"/about/global-presence#offices-india"}
                              className="hover:text-yellow-400 flex items-start"
                            >
                              <ChevronRight
                                size={16}
                                className={styles.angleIcon}
                              />
                              <span className="ml-1">India</span>
                            </Link>
                          </li>
                          <li className="flex items-start">
                            <Link
                              href={"/about/global-presence#offices-overseas"}
                              className="hover:text-yellow-400 flex items-start"
                            >
                              <ChevronRight
                                size={16}
                                className={styles.angleIcon}
                              />
                              <span className="ml-1">Overseas</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="">
                        <div className="flex items-start">
                          <Link
                            href={"/about/global-presence#operational-units"}
                            className="hover:text-yellow-400 flex items-start"
                          >
                            <ChevronRight
                              size={16}
                              className={styles.angleIcon}
                            />
                            <span className="ml-1">Operational Units</span>
                          </Link>
                        </div>
                        <ul className="space-y-2 navlistnametext pl-5 mt-3">
                          <li className="flex items-start">
                            <Link
                              href={
                                "/about/global-presence#operational-units-india"
                              }
                              className="hover:text-yellow-400 flex items-start"
                            >
                              <ChevronRight
                                size={16}
                                className={styles.angleIcon}
                              />
                              <span className="ml-1">India</span>
                            </Link>
                          </li>
                          <li className="flex items-start">
                            <Link
                              href={
                                "/about/global-presence#operational-units-overseas"
                              }
                              className="hover:text-yellow-400 flex items-start"
                            >
                              <ChevronRight
                                size={16}
                                className={styles.angleIcon}
                              />
                              <span className="ml-1">Overseas</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                      Innovation and Technology
                    </h4>
                    <ul className="space-y-2 navlistnametext">
                      <li className="">
                        <div className="flex items-start">
                          <Link
                            href={
                              "/about/innovation-and-technology/product-innovation"
                            }
                            className="hover:text-yellow-400 flex items-start"
                          >
                            <ChevronRight
                              size={16}
                              className={styles.angleIcon}
                            />
                            <span className="ml-1">Product Innovation</span>
                          </Link>
                        </div>
                      </li>
                      <li className="">
                        <div className="flex items-start">
                          <Link
                            href={
                              "/about/innovation-and-technology/prestigious-projects"
                            }
                            className="hover:text-yellow-400 flex items-start"
                          >
                            <ChevronRight
                              size={16}
                              className={styles.angleIcon}
                            />
                            <span className="ml-1">Prestigious Projects</span>
                          </Link>
                        </div>
                      </li>
                      <li className="">
                        <div className="flex items-start">
                          <Link
                            href={
                              "/about/innovation-and-technology/process-innovation"
                            }
                            className="hover:text-yellow-400 flex items-start"
                          >
                            <ChevronRight
                              size={16}
                              className={styles.angleIcon}
                            />
                            <span className="ml-1">Process Innovation</span>
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other dropdowns would follow similar responsive patterns */}
          {/* PRODUCTS Dropdown */}
          {hoveredLink === "PRODUCTS" && (
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[95%] lg:w-[90%] bg-[#00418E] text-white py-8 lg:py-6 px-6 lg:px-12 z-50 rounded-[12px] shadow-lg"
              onMouseEnter={() => handleLinkHover("PRODUCTS")}
              onMouseLeave={handleLinkLeave}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-12 gap-6 xl:gap-10">
                {/* Left Section */}
                <div className="xl:col-span-3">
                  <Image
                    src="/images/menu-img1.png"
                    alt="menuimg"
                    width={336}
                    height={273}
                    className="w-full h-auto mb-5"
                  />
                  <h3 className="navheadertext mb-3">Products</h3>
                  <h2 className="navsubtext">
                    Internationally Accredited <br />
                    <span className="text-yellow-400">
                      Superior Quality DI Pipes
                    </span>{" "}
                    & Fittings
                  </h2>
                </div>

                {/* DI Pipes */}
                <div className="xl:col-span-3">
                  <div>
                    <Link
                      href={"/products/ductile-iron-pipes"}
                      className="hover:opacity-85 flex items-start"
                    >
                      <h4 className="navlistheadernametext mt-4 mb-3">
                        Ductile Iron Pipes
                      </h4>
                    </Link>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/products/ductile-iron-pipes#product-details"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Product Details</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/products/ductile-iron-pipes#applications"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Applications</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/products/ductile-iron-pipes#jointing-systems"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Jointing Systems</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/products/ductile-iron-pipes#protection-system"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Protection System</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Ductile Iron Flange Pipe */}
                  <div>
                    <Link
                      href={"/products/ductile-iron-flange-pipe"}
                      className="hover:opacity-85 flex items-start"
                    >
                      <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                        Ductile Iron Flange Pipe
                      </h4>
                    </Link>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={
                            "/products/ductile-iron-flange-pipe#product-details"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Product Details</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/products/ductile-iron-flange-pipe#applications"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Applications</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/products/ductile-iron-flange-pipe#advantages"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Advantages</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* DI Fittings */}
                <div className="xl:col-span-3">
                  <div>
                    <Link
                      href={"/products/ductile-iron-fittings"}
                      className="hover:opacity-85 flex items-start"
                    >
                      <h4 className="navlistheadernametext mt-4 mb-3">
                        Ductile Iron Fittings
                      </h4>
                    </Link>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={
                            "/products/ductile-iron-fittings#product-details"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Product Details</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/products/ductile-iron-fittings#applications"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Applications</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/products/ductile-iron-fittings#jointing-systems"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Jointing Systems</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/products/ductile-iron-fittings#protection-system"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Protection System</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* <div>
                    <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                      Di Valves
                    </h4>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <ChevronRight size={16} className={styles.angleIcon} />
                        <span className="ml-1">Product Details</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight size={16} className={styles.angleIcon} />
                        <span className="ml-1">Applications</span>
                      </li>
                    </ul>
                  </div> */}
                  <div>
                    <Link
                      href={"/products/valves"}
                      className="hover:opacity-85 flex items-start"
                    >
                      <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                        Valves
                      </h4>
                    </Link>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/products/valves#overview"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Overview</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/products/valves#product-details"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Product Details</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/products/valves#applications"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Applications</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/products/valves#protection-system"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Protection System</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* Rubbber Products */}
                  <div>
                    <Link
                      href={"/products/rubber-products"}
                      className="hover:opacity-85 flex items-start"
                    >
                      <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                        Rubber Products
                      </h4>
                    </Link>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/products/rubber-products#overview"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Overview</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/products/rubber-products#productdetails"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Product Details</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/products/rubber-products#appications"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Applications</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/products/rubber-products#advantages"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Advantages</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Others */}
                <div className="xl:col-span-3">
                  <div>
                    <Link
                      href={"/products/cast-iron-pipes"}
                      className="hover:opacity-85 flex items-start"
                    >
                      <h4 className="navlistheadernametext mt-4 mb-3">
                        Cast iron pipes
                      </h4>
                    </Link>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/products/cast-iron-pipes#overview"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Overview</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Link
                      href={"/products/paint"}
                      className="hover:opacity-85 flex items-start"
                    >
                      <h4 className="navlistheadernametext mt-4 mb-3">Paint</h4>
                    </Link>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/products/paint#overview"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Overview</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/products/paint#product-range"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Product Range </span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/products/paint#world-class-raw-materials-and-global-approvals"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">
                            World-Class Raw Materials and GLOBAL Approvals{" "}
                          </span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/products/paint#current-manufacturing-facilities"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">
                            Current Manufacturing Facilities{" "}
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Link
                      href={"/products/others-products"}
                      className="hover:opacity-85 flex items-start"
                    >
                      <h4 className="navlistheadernametext mt-4 mb-3">
                        Others
                      </h4>
                    </Link>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/products/others-products#metallurgical-coke"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Metallurgical Coke</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/products/others-products#sponge-iron"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Sponge Iron</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/products/others-products#silico-manganese-ferro-alloy"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">
                            Silico Manganese Ferro Alloy
                          </span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/products/others-products#spl-gold-cement"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">SPL Gold Cement</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/products/others-products#ferro-silicon"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Ferro Silicon</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/products/others-products#pig-iron"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Pig Iron</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUSTAINABILITY Dropdown */}
          {hoveredLink === "SUSTAINABILITY" && (
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[95%] lg:w-[90%] bg-[#00418E] text-white py-8 lg:py-6 px-6 lg:px-12 z-50 rounded-[12px] shadow-lg"
              onMouseEnter={() => handleLinkHover("SUSTAINABILITY")}
              onMouseLeave={handleLinkLeave}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-12 gap-6 xl:gap-10">
                {/* Left Section */}
                <div className="xl:col-span-3">
                  <Image
                    src="/images/menu-img1.png"
                    alt="menuimg"
                    width={336}
                    height={273}
                    className="w-full h-auto mb-5"
                  />
                  <h3 className="navheadertext mb-3">SUSTAINABILITY</h3>
                  <h2 className="navsubtext">
                    <span className="text-yellow-400">
                      Innovative solution.
                    </span>{" "}
                    Mindful practices.
                  </h2>
                </div>

                {/* Environment Initiatives */}
                <div className="xl:col-span-3">
                  <div>
                    <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                      Environment Initiatives
                    </h4>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/sustainability/environment-initiatives"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight size={16} className={styles.angleIcon} />
                          <span className="ml-1">Overview</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/sustainability/environment-initiatives#emission"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight size={16} className={styles.angleIcon} />
                          <span className="ml-1">Emission</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/sustainability/environment-initiatives#water"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight size={16} className={styles.angleIcon} />
                          <span className="ml-1">Water</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/sustainability/environment-initiatives#waste"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight size={16} className={styles.angleIcon} />
                          <span className="ml-1">Waste</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/sustainability/environment-initiatives#energy"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight size={16} className={styles.angleIcon} />
                          <span className="ml-1">Energy</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Social Initiatives */}
                <div className="xl:col-span-3">
                  <div>
                    <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                      Social Initiatives
                    </h4>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link href="/sustainability/social-initiatives/safety" className="hover:text-yellow-400 flex items-start">
                          <ChevronRight size={16} className={styles.angleIcon} />
                          <span className="ml-1">Safety</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/sustainability/social-initiatives/employee-welfare"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Employee Welfare</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/sustainability/social-initiatives/external-social-support"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">External Social Support</span>
                        </Link>
                      </li>

                      <li className="flex items-start">
                        <Link
                          href={
                            "/sustainability/social-initiatives/commitment-going-forward"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">
                            Our Commitments
                          </span>
                        </Link>
                      </li>
                      <li className="">
                        <div className="flex items-start">
                          <Link
                            href={
                              "/sustainability/social-initiatives/jal-sadhana"
                            }
                            className="hover:opacity-85 flex items-start"
                          >
                            <ChevronRight
                              size={16}
                              className={styles.angleIcon}
                            />
                            <span className="ml-1">Jal Sadhana</span>
                          </Link>
                        </div>
                        <ul className="space-y-2 navlistnametext pl-5 mt-3">
                          <li className="flex items-start">
                            <Link
                              href={
                                "/sustainability/social-initiatives/jal-sadhana#overview"
                              }
                              className="hover:text-yellow-400 flex items-start"
                            >
                              <ChevronRight
                                size={16}
                                className={styles.angleIcon}
                              />
                              <span className="ml-1">Overview</span>
                            </Link>
                          </li>
                          <li className="flex items-start">
                            <Link
                              href={
                                "/sustainability/social-initiatives/jal-sadhana#jal-sevak-samman"
                              }
                              className="hover:text-yellow-400 flex items-start"
                            >
                              <ChevronRight
                                size={16}
                                className={styles.angleIcon}
                              />
                              <span className="ml-1">Jal Sevak Samman</span>
                            </Link>
                          </li>
                          <li className="flex items-start">
                            <Link
                              href={
                                "/sustainability/social-initiatives/jal-sadhana#jal-stuti"
                              }
                              className="hover:text-yellow-400 flex items-start"
                            >
                              <ChevronRight
                                size={16}
                                className={styles.angleIcon}
                              />
                              <span className="ml-1">Jal Stuti</span>
                            </Link>
                          </li>
                          <li className="flex items-start">
                            <Link
                              href={
                                "/sustainability/social-initiatives/jal-sadhana#jal-manthan"
                              }
                              className="hover:text-yellow-400 flex items-start"
                            >
                              <ChevronRight
                                size={16}
                                className={styles.angleIcon}
                              />
                              <span className="ml-1">Jal Manthan</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="flex items-start">
                        <Link href="/sustainability/social-initiatives/training" className="hover:text-yellow-400 flex items-start">
                          <ChevronRight size={16} className={styles.angleIcon} />
                          <span className="ml-1">Training</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Governance Initiatives */}
                <div className="xl:col-span-3">
                  <div>
                    <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                      Governance Initiatives
                    </h4>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link href="/sustainability/governance-initiatives/policy-commitments" className="hover:text-yellow-400 flex items-start">
                          <ChevronRight size={16} className={styles.angleIcon} />
                          <span className="ml-1">Policy Commitments</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* INVESTORS Dropdown */}
          {hoveredLink === "INVESTORS" && (
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[95%] lg:w-[90%] bg-[#00418E] text-white py-8 lg:py-6 px-6 lg:px-12 z-50 rounded-[12px] shadow-lg"
              onMouseEnter={() => handleLinkHover("INVESTORS")}
              onMouseLeave={handleLinkLeave}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-12 gap-6 xl:gap-10">
                {/* Left Section */}
                <div className="xl:col-span-3">
                  <Image
                    src="/images/menu-img1.png"
                    alt="menuimg"
                    width={336}
                    height={273}
                    className="w-full h-auto mb-5"
                  />
                  <h3 className="navheadertext mb-3">INVESTORS</h3>
                  <h2 className="navsubtext">
                    <span className="text-yellow-400">
                      Empowering visionary investors
                    </span>{" "}
                    to be part of innovative digital transformations
                  </h2>
                </div>

                {/* Environment Initiatives */}
                <div className="xl:col-span-3">
                  <div>
                    <h4 className="navlistheadernametext mt-4 mb-3">
                      Financials
                    </h4>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/investors/financials/quarterly-results"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Quarterly Results</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="navlistheadernametext mt-4 mb-3">
                      Reports & Accounts
                    </h4>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/reports-and-accounts/annual-reports"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Annual Reports</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/reports-and-accounts/accounts-of-subsidiaries"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Accounts of Subsidiaries</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/reports-and-accounts/accounts-of-joints-venture"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">
                            Accounts of Joints Venture
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Link
                      href={"/investors/code-of-conduct-and-policies"}
                      className="hover:opacity-85 flex items-start"
                    >
                      <h4 className="navlistheadernametext mt-4 mb-3">
                        Code of conduct And Policies
                      </h4>
                    </Link>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/code-of-conduct-and-policies#overview"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Overview</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="navlistheadernametext mt-4 mb-3">
                      Amalgamation
                    </h4>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/investors/amalgamation/nclt-meetings"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">NCLT Meetings</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/investors/amalgamation/nclt-final-order"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">NCLT Final order</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/investors/amalgamation/regulation-37-of-lord"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Regulation 37 of LODR</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/amalgamation/srikalahasthi-pipes-ltd"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Srikalahasthi Pipes Ltd</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Shareholder Information */}
                <div className="xl:col-span-3">
                  <div>
                    <h4 className="navlistheadernametext mt-4 mb-3">
                      Shareholder Information
                    </h4>
                    <ul className="space-y-1 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/shareholder-information/shareholding-pattern"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Shareholding Pattern</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/shareholder-information/newspaper-publication"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Newspaper Publications</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/shareholder-information/corporate-governance"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">
                            Corporate Governance Quarterly Compliance
                          </span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/investors/shareholder-information/mergers"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Mergers</span>
                        </Link>
                      </li>
                      <li className="">
                        <div className="flex items-start">
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">
                            General meeting and postal ballots
                          </span>
                        </div>
                        <ul className="space-y-2 navlistnametext pl-5 mt-3">
                          <li className="flex items-start">
                            <Link
                              href={
                                "/investors/shareholder-information/notices"
                              }
                              className="hover:text-yellow-400 flex items-start"
                            >
                              <ChevronRight
                                size={16}
                                className={styles.angleIcon}
                              />
                              <span className="ml-1">Notice</span>
                            </Link>
                          </li>
                          <li className="flex items-start">
                            <Link
                              href={
                                "/investors/shareholder-information/160-notices"
                              }
                              className="hover:text-yellow-400 flex items-start"
                            >
                              <ChevronRight
                                size={16}
                                className={styles.angleIcon}
                              />
                              <span className="ml-1">160 Notice</span>
                            </Link>
                          </li>
                          <li className="flex items-start">
                            <Link
                              href={
                                "/investors/shareholder-information/voting-results"
                              }
                              className="hover:text-yellow-400 flex items-start"
                            >
                              <ChevronRight
                                size={16}
                                className={styles.angleIcon}
                              />
                              <span className="ml-1">Voting Results</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/shareholder-information/iepf-suspense-account"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">
                            Transfer of share to DEMAT Account of IEPF authority
                          </span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/shareholder-information/unclaimed-dividends"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Unclaimed Dividends</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/shareholder-information/extract-of-annual-return"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Extract of annual return</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/shareholder-information/disclosures-to-stock-exchange"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">
                            Disclosures to stock exchange
                          </span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/shareholder-information/other-disclosures"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Other Disclosure</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/shareholder-information/annual-return"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Annual Return</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Investor Info */}
                <div className="xl:col-span-3">
                  <div>
                    <h4 className="navlistheadernametext mt-4 mb-3">
                      Investor Info
                    </h4>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/investors/investor-info/investor-relations"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Investor relations</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/investors/investor-info/credit-ratings"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Credit ratings</span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={
                            "/investors/investor-info/investor-presentation-and-other-documents"
                          }
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">
                            Investor presentation and other documents
                          </span>
                        </Link>
                      </li>
                      <li className="flex items-start">
                        <Link
                          href={"/connect/shareholder-enquiry"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Shareholder Enquiry</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="navlistheadernametext mt-4 lg:mt-7 mb-3">
                      <Link
                        href={"/investors/csr"}
                        className="hover:text-yellow-400 flex items-start"
                      >
                        Board approved CSR projects
                      </Link>
                    </h4>
                    <ul className="space-y-2 navlistnametext">
                      <li className="flex items-start">
                        <Link
                          href={"/investors/csr"}
                          className="hover:text-yellow-400 flex items-start"
                        >
                          <ChevronRight
                            size={16}
                            className={styles.angleIcon}
                          />
                          <span className="ml-1">Overview</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other dropdown menus would follow the same responsive pattern */}
          {/* Only showing a couple for brevity, but all should be implemented similarly */}

          {/* NEWS ROOM Dropdown */}
          {hoveredLink === "NEWS ROOM" && (
            <div
              className={`${styles.smallSubNav} absolute left-1/1 transform -translate-x-1/1 bg-[#00418E] text-white py-4 px-6 w-60 z-50 rounded-[12px] shadow-lg`}
              onMouseEnter={() => handleLinkHover("NEWS ROOM")}
              onMouseLeave={handleLinkLeave}
            >
              <ul className="space-y-3 navlistnametext">
                <li className="flex items-start">
                  <Link
                    href={"/newsroom/latest-at-electrosteel"}
                    className="hover:text-yellow-400 flex items-start"
                  >
                    <ChevronRight size={16} className={styles.angleIcon} />
                    <span className="ml-1">Latest @ Electrosteel</span>
                  </Link>
                </li>
                <li className="flex items-start">
                  <Link
                    href={"/newsroom/press-and-media"}
                    className="hover:text-yellow-400 flex items-start"
                  >
                    <ChevronRight size={16} className={styles.angleIcon} />
                    <span className="ml-1">Press and Media</span>
                  </Link>
                </li>
                <li className="flex items-start">
                  <Link
                    href={"/newsroom/electrosteel-on-social"}
                    className="hover:text-yellow-400 flex items-start"
                  >
                    <ChevronRight size={16} className={styles.angleIcon} />
                    <span className="ml-1">Electrosteel on Social</span>
                  </Link>
                </li>
                <li className="flex items-start">
                  <Link
                    href={"/newsroom/newsletters"}
                    className="hover:text-yellow-400 flex items-start"
                  >
                    <ChevronRight size={16} className={styles.angleIcon} />
                    <span className="ml-1">Newsletters</span>
                  </Link>
                </li>
                <li className="flex items-start">
                  <Link
                    href={"/newsroom/blog"}
                    className="hover:text-yellow-400 flex items-start"
                  >
                    <ChevronRight size={16} className={styles.angleIcon} />
                    <span className="ml-1">Blogs</span>
                  </Link>
                </li>
                {/* <li className="flex items-start">
                  <Link
                    href={"/newsroom/gallery"}
                    className="hover:text-yellow-400 flex items-start"
                  >
                  <ChevronRight size={16} className={styles.angleIcon} />
                  <span className="ml-1">Gallery</span>
                  </Link>
                </li> */}

                <li className="">
                  <div className="flex items-start">
                    <Link
                      href={"/newsroom/gallery"}
                      className="hover:text-yellow-400 flex items-start"
                    >
                      <ChevronRight size={16} className={styles.angleIcon} />
                      <span className="ml-1">Gallery</span>
                    </Link>
                  </div>
                  <ul className="space-y-2 navlistnametext pl-5 mt-3">
                    <li className="flex items-start">
                      <Link
                        href={"/newsroom/gallery#photo"}
                        className="hover:text-yellow-400 flex items-start"
                      >
                        <ChevronRight size={16} className={styles.angleIcon} />
                        <span className="ml-1">Photo </span>
                      </Link>
                    </li>
                    <li className="flex items-start">
                      <Link
                        href={"/newsroom/gallery#video"}
                        className="hover:text-yellow-400 flex items-start"
                      >
                        <ChevronRight size={16} className={styles.angleIcon} />
                        <span className="ml-1">Video </span>
                      </Link>
                    </li>
                    <li className="flex items-start">
                      <Link
                        href={"/newsroom/gallery#news"}
                        className="hover:text-yellow-400 flex items-start"
                      >
                        <ChevronRight size={16} className={styles.angleIcon} />
                        <span className="ml-1">News</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* events */}
                <li className="flex items-start">
                  <Link
                    href={"/newsroom/events"}
                    className="hover:text-yellow-400 flex items-start"
                  >
                    <ChevronRight size={16} className={styles.angleIcon} />
                    <span className="ml-1">Events</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* CAREER Dropdown */}
          {hoveredLink === "CAREER" && (
            <div
              className={`${styles.smallSubNav2} absolute left-1/1 transform -translate-x-1/1 bg-[#00418E] text-white py-4 px-6 w-60 z-50 rounded-[12px] shadow-lg`}
              onMouseEnter={() => handleLinkHover("CAREER")}
              onMouseLeave={handleLinkLeave}
            >
              <ul className="space-y-3 navlistnametext">
                <li className="flex items-start">
                  <Link href={"/career"} className="hover:text-yellow-400 flex items-start">
                    <ChevronRight size={16} className={styles.angleIcon} />
                    <span className="ml-1">Overview</span>
                  </Link>
                </li>
                <li className="flex items-start">
                  <Link href={"/career#join-us"} className="hover:text-yellow-400 flex items-start">
                    <ChevronRight size={16} className={styles.angleIcon} />
                    <span className="ml-1">Join Us</span>
                  </Link>
                </li>
                <li className="flex items-start">
                  <Link href={"/career#khoj"} className="hover:text-yellow-400 flex items-start">
                    <ChevronRight size={16} className={styles.angleIcon} />
                    <span className="ml-1">Khoj- The Campus Drive</span>
                  </Link>
                </li>
                <li className="flex items-start">
                  <Link href={"/career#career-enquiry"} className="hover:text-yellow-400 flex items-start">
                    <ChevronRight size={16} className={styles.angleIcon} />
                    <span className="ml-1">Career Enquiry</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* CONNECT Dropdown */}
          {hoveredLink === "CONNECT" && (
            <div
              className={`${styles.smallSubNav3} absolute left-1/1 transform -translate-x-1/1 bg-[#00418E] text-white py-4 px-6 w-60 z-50 rounded-[12px] shadow-lg`}
              onMouseEnter={() => handleLinkHover("CONNECT")}
              onMouseLeave={handleLinkLeave}
            >
              <ul className="space-y-3 navlistnametext">
                <li className="flex items-start">
                  <Link
                    href={"/connect/business-enquiry"}
                    className="hover:text-yellow-400 flex items-start"
                  >
                    <ChevronRight size={16} className={styles.angleIcon} />
                    <span className="ml-1">Business Enquiry</span>
                  </Link>
                </li>
                <li className="flex items-start">
                  <Link
                    href={"/connect/shareholder-enquiry"}
                    className="hover:text-yellow-400 flex items-start"
                  >
                    <ChevronRight size={16} className={styles.angleIcon} />
                    <span className="ml-1">Shareholder Enquiry</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </header>
  );
}
