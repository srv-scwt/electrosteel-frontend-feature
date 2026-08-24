const aboutUsData = [
  {
    section: "Profile",
    links: [
      { label: "About Us", url: "/about" },
      { label: "Vision & Mission", url: "/about/profile/vision-mission" },
      { label: "Milestones", url: "/about/profile/milestones" },
    ],
  },
  {
    section: "Leadership",
    links: [
      { label: "Board of Directors", url: "/about/leadership/board-of-directors" },
      { label: "Board Committees", url: "/about/leadership/board-committees" },
      { label: "Legends of ECL", url: "/about/leadership/legends-of-ecl" },
    ],
  },
  {
    section: "People",
    links: [
      { label: "OverView", url: "/about/people" },
      {
        label: "Life at ECL",
        url: "/about/people#life-at-ecl",
        subLinks: [
          { label: "Employee Engagement", url: "/about/people#employee-engagement" },
          { label: "Campus Hire Stories", url: "/about/people#campus-hire-stories" },
          { label: "Employee Testimonials", url: "/about/people#employee-testimonials" },
        ],
      },
      {
        label: "Rewards and Recognitions",
        url: "/about/rewards-recognition",
        subLinks: [
          { label: "Pragati", url: "/about/rewards-recognition#pragati" },
          { label: "Pratibha & Pride", url: "/about/rewards-recognition#pratibha-pride" },
        ],
      },
    ],
  },
  {
    section: "global presence",
    links: [
      { label: "Overview", url: "/about/global-presence" },
      {
        label: "Offices",
        url: "/about/global-presence#offices",
        subLinks: [
          { label: "India", url: "/about/global-presence#offices-india" },
          { label: "Overseas", url: "/about/global-presence#offices-overseas" },
        ],
      },
      {
        label: "Operational Units",
        url: "/about/global-presence#operational-units",
        subLinks: [
          { label: "India", url: "/about/global-presence#operational-units-india" },
          { label: "Overseas", url: "/about/global-presence#operational-units-overseas" },
        ],
      },
    ],
  },
  {
    section: "Innovation and Technology",
    links: [
      { label: "Product Innovation", url: "/about/innovation-and-technology/product-innovation" },
      { label: "Prestigious Projects", url: "/about/innovation-and-technology/prestigious-projects" },
      { label: "Process Innovation", url: "/about/innovation-and-technology/process-innovation" },
    ],
  },
];

const productsData = [
  {
    section: "Ductile Iron Pipes",
    links: [
      { label: "Overview", url: "/products/ductile-iron-pipes" },
      { label: "Product Details", url: "/products/ductile-iron-pipes#product-details" },
      { label: "Applications", url: "/products/ductile-iron-pipes#applications" },
      { label: "Jointing Systems", url: "/products/ductile-iron-pipes#jointing-systems" },
      { label: "Protection System", url: "/products/ductile-iron-pipes#protection-system" },
    ],
  },
  {
    section: "Ductile Iron Flange Pipes",
    links: [
      { label: "Overview", url: "/products/ductile-iron-flange-pipes" },
      { label: "Product Details", url: "/products/ductile-iron-flange-pipes#product-details" },
      { label: "Applications", url: "/products/ductile-iron-flange-pipes#applications" },
      { label: "Advantages", url: "/products/ductile-iron-flange-pipes#advantages" },
    ],
  },
  {
    section: "Ductile Iron Fittings",
    links: [
      { label: "overview", url: "/products/ductile-iron-fittings" },
      { label: "Product Details", url: "/products/ductile-iron-fittings#product-details" },
      { label: "Applications", url: "/products/ductile-iron-fittings#applications" },
      { label: "Jointing Systems", url: "/products/ductile-iron-fittings#jointing-systems" },
      { label: "Protection System", url: "/products/ductile-iron-fittings#protection-system" },
    ],
  },
  {
    section: "Valves",
    links: [
      { label: "Overview", url: "/products/valves" },
      { label: "Product Details", url: "/products/valves#product-details" },
      { label: "Applications", url: "/products/valves#applications" },
      { label: "Protection System", url: "/products/valves#protection-system" },
    ],
  },
  {
    section: "Rubber Products",
    links: [
      { label: "Overview", url: "/products/rubber-products" },
      { label: "Overview", url: "/products/rubber-products#overview" },
      { label: "Product Details", url: "/products/rubber-products#productDetails" },
      { label: "Applications", url: "/products/rubber-products#applications" },
      { label: "Advantages", url: "/products/rubber-products#benefitsAdvantages" },
    ],
  },
  {
    section: "Cast iron pipes",
    links: [
      { label: "Overview", url: "/products/cast-iron-pipes" },
    ],
  },
  {
    section: "Industrial Paints",
    links: [
      { label: "Overview", url: "/products/industrial-paints" },
      { label: "Manufacturing Excellence", url: "/products/industrial-paints#current-manufacturing-facilities" },
      { label: "Product Categories", url: "/products/industrial-paints#product-range" },
      { label: "Applications", url: "/products/industrial-paints#applications" },
    ],
  },
  {
    section: "Others",
    links: [
      { label: "Overview", url: "/products/other-products" },
      { label: "Metallurgical Coke", url: "/products/other-products#metallurgical-coke-" },
      { label: "Sponge Iron", url: "/products/other-products#sponge-iron-" },
      { label: "Silico Manganese Ferro Alloy", url: "/products/other-products#silico-manganese-ferro-alloy-" },
      { label: "SPL Gold Cement", url: "/products/other-products#spl-gold-cement" },
      { label: "Ferro Silicon", url: "/products/other-products#ferro-silicon-" },
      { label: "Pig Iron", url: "/products/other-products#pig-iron" },
    ],
  },
];

const sustainabilityData = [
  {
    section: "Environment Initiatives",
    links: [
      { label: "Overview", url: "/sustainability/environment-initiatives" },
      { label: "Emission", url: "/sustainability/environment-initiatives#emission" },
      { label: "Water", url: "/sustainability/environment-initiatives#water" },
      { label: "Waste", url: "/sustainability/environment-initiatives#waste" },
      { label: "Energy", url: "/sustainability/environment-initiatives#energy" },
    ],
  },
  {
    section: "Social Initiatives",
    links: [
      { label: "Safety", url: "/sustainability/social-initiatives/safety" },
      { label: "Employee Welfare", url: "/sustainability/social-initiatives/employee-welfare" },
      { label: "External Social Support", url: "/sustainability/social-initiatives/external-social-support" },
      { label: "Our Commitments", url: "/sustainability/social-initiatives/commitment-going-forward" },
      {
        label: "Jal Sadhana",
        url: "/sustainability/social-initiatives/jal-sadhana",
        subLinks: [
          { label: "Overview", url: "/sustainability/social-initiatives/jal-sadhana#overview" },
          { label: "Jal Sevak Samman", url: "/sustainability/social-initiatives/jal-sadhana#jal-sevak-samman" },
          { label: "Jal Stuti", url: "/sustainability/social-initiatives/jal-sadhana#jal-stuti" },
          { label: "Jal Manthan", url: "/sustainability/social-initiatives/jal-sadhana#jal-manthan" },
        ],
      },
      { label: "Training", url: "/sustainability/social-initiatives/training" },
    ],
  },
  {
    section: "Governance Initiatives",
    links: [
      { label: "Policy Commitments", url: "/sustainability/governance-initiatives/policy-commitments" },
    ],
  },
  {
    section: "Environment compliance",
    links: [
      { label: "Overview", url: "/sustainability/evironment-compliance/csr-evironment-compliance-reports" },
    ],
  },
];

const investorData = [
  {
    section: "Financials",
    links: [
      { label: "Quarterly Results", url: "/investors/financials/quarterly-results" },
    ],
  },
  {
    section: "Reports & Accounts",
    links: [
      { label: "Annual Reports", url: "/investors/reports-and-accounts/annual-reports" },
      { label: "Accounts of Subsidiaries", url: "/investors/reports-and-accounts/accounts-of-subsidiaries" },
      { label: "Accounts of Joint Venture", url: "/investors/reports-and-accounts/accounts-of-joint-venture" },
    ],
  },
  {
    section: "Code of conduct And Policies",
    links: [
      { label: "Code of conduct And Policies", url: "/investors/code-of-conduct-and-policies" },
      { label: "Overview", url: "/investors/code-of-conduct-and-policies#overview" },
    ],
  },
  {
    section: "Amalgamation",
    links: [
      { label: "NCLT Meetings", url: "/investors/amalgamation/nclt-meetings" },
      { label: "NCLT Final order", url: "/investors/amalgamation/nclt-final-order" },
      { label: "Regulation 37 of LODR", url: "/investors/amalgamation/regulation-37-of-lord" },
      { label: "Srikalahasthi Pipes Ltd", url: "/investors/amalgamation/srikalahasthi-pipes-ltd" },
    ],
  },
  {
    section: "Shareholder Information",
    links: [
      { label: "Shareholding Pattern", url: "/investors/shareholder-information/shareholding-pattern" },
      { label: "Newspaper Publications", url: "/investors/shareholder-information/newspaper-publication" },
      { label: "Corporate Governance Quarterly Compliance", url: "/investors/shareholder-information/corporate-governance" },
      {
        label: "Mergers",
        url: "/investors/shareholder-information/mergers",
        subLinks: [
          { label: "Notice", url: "/investors/shareholder-information/notices" },
          { label: "160 Notice", url: "/investors/shareholder-information/160-notices" },
          { label: "Voting Results", url: "/investors/shareholder-information/voting-results" },
        ],
      },
      { label: "Transfer of share to DEMAT Account of IEPF authority", url: "/investors/shareholder-information/iepf-suspense-account" },
      { label: "Unclaimed Dividends", url: "/investors/shareholder-information/unclaimed-dividends" },
      { label: "Extract of annual return", url: "/investors/shareholder-information/extract-of-annual-return" },
      { label: "Disclosures to stock exchange", url: "/investors/shareholder-information/disclosures-to-stock-exchange" },
      { label: "Other Disclosure", url: "/investors/shareholder-information/other-disclosures" },
      { label: "Annual Return", url: "/investors/shareholder-information/annual-return" },
    ],
  },
  {
    section: "Investor Info",
    links: [
      { label: "Investor relations", url: "/investors/investor-info/investor-relations" },
      { label: "Credit ratings", url: "/investors/investor-info/credit-ratings" },
      { label: "Investor presentation and other documents", url: "/investors/investor-info/investor-presentation-and-other-documents" },
      { label: "Shareholder Enquiry", url: "/connect/shareholder-enquiry" },
    ],
  },
  {
    section: "Board approved CSR projects",
    links: [
      { label: "Board approved CSR projects", url: "/investors/csr" },
      { label: "Overview", url: "/investors/csr" },
    ],
  },
];

const newsRoomData = [
  {
    section: "",
    links: [
      { label: "Latest @ Electrosteel", url: "/newsroom/latest-at-electrosteel" },
      { label: "Electrosteel on Social", url: "/newsroom/electrosteel-on-social" },
      { label: "Newsletters", url: "/newsroom/newsletters" },
    ],
  },
];

const careersData = [
  {
    section: "",
    links: [
      { label: "Overview", url: "/career" },
      { label: "Join Us", url: "/career#join-us" },
      { label: "Khoj- The Campus Drive", url: "/career#khoj" },
      { label: "Career Enquiry", url: "/career/career-enquiry" },
    ],
  },
];

const connectData = [
  {
    section: "",
    links: [
      { label: "Business Enquiry", url: "/connect/business-enquiry" },
      { label: "Shareholder Enquiry", url: "/connect/shareholder-enquiry" },
    ],
  },
];

// comment
// const facilitiesData = [
//   {
//     section: "Manufacturing Facilities",
//     links: [
//       { label: "Khardah Works (KW)", url: "/facilities/khardah-works" },
//       {
//         label: "Srikalahasthi Works (SW)",
//         url: "/facilities/srikalahasthi-works",
//       },
//       { label: "Haldia Works (HW)", url: "/facilities/haldia-works" },
//       { label: "Bansberia Works (BW)", url: "/facilities/bansberia-works" },
//       { label: "Elavur Works (EW)", url: "/facilities/elavur-works" },
//     ],
//   },
//   {
//     section: "Offices",
//     links: [
//       { label: "Indian", url: "/facilities/offices/indian" },
//       { label: "Overseas", url: "/facilities/offices/overseas" },
//     ],
//   },
//   {
//     section: "Stock Yard & Subsidiaries",
//     links: [
//       { label: "Stock Yard", url: "/facilities/stock-yard" },
//       { label: "Subsidiaries", url: "/facilities/subsidiaries" },
//     ],
//   },
// ];

// const qualityData = [
//   {
//     section: "",
//     links: [
//       { label: "Quality Policy", url: "/quality-policy" },
//       { label: "Quality Certificates", url: "/quality-certificates" },
//     ],
//   },
// ];

// const csrData = [
//   {
//     section: "",
//     links: [
//       { label: "CSR Overview", url: "/csr-overview" },
//       { label: "Community Developement", url: "/community-development" },
//       { label: "Environment Compliance Reports", url: "/environment-compliance-reports" },
//     ],
//   },
// ];

// const investorData = [
//   {
//     section: "FINANCIALS",
//     links: [
//       { label: "Quarterly Results", url: "/financials/quarterly-results" },
//     ],
//   },
//   {
//     section: "REPORTS & ACCOUNTS",
//     links: [
//       { label: "Annual Reports", url: "/reports/annual-reports" },
//       { label: "Accounts of Subsidiaries", url: "/reports/accounts-of-subsidiaries" },
//       { label: "Accounts of Joint Venture", url: "/reports/accounts-of-joint-venture" },
//     ],
//   },
//   {
//     section: "CODE OF CONDUCT AND POLICIES",
//     links: [{ label: "", url: "" },],
//   },
//   {
//     section: "AMALGAMATION",
//     links: [
//       { label: "NCLT Meetings", url: "/amalgamation/nclt-meetings" },
//       { label: "NCLT Final Order", url: "/amalgamation/nclt-final-order" },
//       { label: "Regulation 37 of LODR", url: "/amalgamation/regulation-37-lodr" },
//       { label: "Srikalahasthi Pipes Ltd (Archive)", url: "/amalgamation/srikalahasthi-pipes-archive" },
//     ],
//   },
//   {
//     section: "GENERAL MEETING AND POSTAL BALLOTS",
//     links: [
//       { label: "Notices", url: "/general-meeting/notices" },
//       { label: "160 Notices", url: "/general-meeting/160-notices" },
//       { label: "Voting Results", url: "/general-meeting/voting-results" },
//       { label: "Transfer of shares to DEMAT Account of IEPF Authority", url: "/general-meeting/transfer-shares-to-demat" },
//       { label: "Unclaimed Dividends", url: "/general-meeting/unclaimed-dividends" },
//       { label: "Extract of Annual Return", url: "/general-meeting/extract-of-annual-return" },
//       { label: "Disclosures to Stock Exchange", url: "/general-meeting/disclosures-to-stock-exchange" },
//       { label: "Other Disclosures", url: "/general-meeting/other-disclosures" },
//       { label: "Annual Return", url: "/general-meeting/annual-return" },
//     ],
//   },
//   {
//     section: "SHAREHOLDER INFORMATION",
//     links: [
//       { label: "Shareholding Pattern", url: "/shareholder-info/shareholding-pattern" },
//       { label: "Newspaper Publications", url: "/shareholder-info/newspaper-publications" },
//       { label: "Corporate Governance - Quarterly Compliance", url: "/shareholder-info/corporate-governance-compliance" },
//       { label: "Mergers", url: "/shareholder-info/mergers" },
//     ],
//   },
//   {
//     section: "INVESTOR INFO",
//     links: [
//       { label: "Investor Relations", url: "/investor-info/investor-relations" },
//       { label: "Credit Ratings", url: "/investor-info/credit-ratings" },
//       { label: "Investor Presentation and Other Documents", url: "/investor-info/investor-presentation-other-documents" },
//       { label: "Shareholder Enquiry", url: "/investor-info/shareholder-enquiry" },
//     ],
//   },
//   {
//     section: "BOARD APPROVED CSR PROJECTS",
//     links: [
//       { label: "", url: "" },
//     ],
//   },
// ];

// const digitalData = [
//   {
//     section: "",
//     links: [
//       { label: "Latest @ Electrosteel", url: "/latest-at-electrosteel" },
//       { label: "Electrosteel on Social", url: "/electrosteel-on-social" },
//       { label: "Newsletters", url: "/newsletters" },
//       { label: "Events", url: "/events" },
//       { label: "Videos", url: "/digital-videos" },
//     ],
//   },
// ];



// const offices = [
//   { country: "FRANCE", flag: "/images/flag/france.png" , link: "/about/global-presence#offices-overseas?country=france"},
//   { country: "ITALY", flag: "/images/flag/italy.png" },
//   { country: "SPAIN", flag: "/images/flag/spain.png" },
//   { country: "GERMANY", flag: "/images/flag/germany.png" },
//   { country: "UNITED KINGDOM", flag: "/images/flag/uk.png" },
//   { country: "UNITED STATES", flag: "/images/flag/usa.png" },
//   { country: "ALGERIA", flag: "/images/flag/algeria.png" },
//   { country: "QATAR", flag: "/images/flag/qatar.png" },
//   { country: "BAHRAIN", flag: "/images/flag/bahrain.png" },
//   { country: "UAE, DUBAI", flag: "/images/flag/uae.png" },
// ];

const offices = [
  {
    country: "FRANCE",
    flag: "/images/flag/france.png",
    link: "/about/global-presence?country=france#offices-overseas",
  },
  {
    country: "ITALY",
    flag: "/images/flag/italy.png",
    link: "/about/global-presence?country=italy#offices-overseas",
  },
  {
    country: "SPAIN",
    flag: "/images/flag/spain.png",
    link: "/about/global-presence?country=spain#offices-overseas",
  },
  {
    country: "GERMANY",
    flag: "/images/flag/germany.png",
    link: "/about/global-presence?country=germany#offices-overseas",
  },
  {
    country: "UNITED KINGDOM",
    flag: "/images/flag/uk.png",
    link: "/about/global-presence?country=united-kingdom#offices-overseas",
  },
  {
    country: "UNITED STATES",
    flag: "/images/flag/usa.png",
    link: "/about/global-presence?country=united-states#offices-overseas",
  },
  {
    country: "ALGERIA",
    flag: "/images/flag/algeria.png",
    link: "/about/global-presence?country=algeria#offices-overseas",
  },
  {
    country: "QATAR",
    flag: "/images/flag/qatar.png",
    link: "/about/global-presence?country=qatar#offices-overseas",
  },
  {
    country: "BAHRAIN",
    flag: "/images/flag/bahrain.png",
    link: "/about/global-presence?country=bahrain#offices-overseas",
  },
  {
    country: "UAE, DUBAI",
    flag: "/images/flag/uae.png",
    link: "/about/global-presence?country=uae-dubai#offices-overseas",
  },
];

export {
  aboutUsData,
  productsData,
  // facilitiesData,
  // qualityData,
  // csrData, 
  sustainabilityData,
  investorData,
  newsRoomData,
  // digitalData, 
  careersData,
  connectData,
  offices,
};
