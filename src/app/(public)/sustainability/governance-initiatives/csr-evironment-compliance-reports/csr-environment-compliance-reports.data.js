export const CsrEnvironmentComplianceCategoryObject = {
  haldiaFerroAlloyPlant:
    "csr-evironment-compliance-reports-haldia-ferro-alloy-plant",
  srikalahasthiWorks: "csr-evironment-compliance-reports-srikalahasthi-works",
  khardahWorks: "csr-evironment-compliance-reports-khardah-works",
};

export const csrEnvironmentComplianceHero = {
  title: "Environment Compliance Reports",
  banner: "https://www.electrosteel.com/electrosteel-static-assets/1785920793517-New-Project---2026-08-05T143551.917.webp",
  commonBannerPageName: "governance-initiatives-environment-compliance-reports",
};

export const csrEnvironmentComplianceSubHeading =
  "Six-Monthly Environmental Clearance Compliance Reports";

export const csrEnvironmentComplianceSections = [
  {
    key: "haldiaFerroAlloyPlant",
    category: CsrEnvironmentComplianceCategoryObject.haldiaFerroAlloyPlant,
    title: "Haldia Ferro Alloy Plant",
    titleYearExceptional: "Haldia Ferro Alloy <span>Plant</span>",
    filterTitle: "Find Compliance Reports",
    subHeading: csrEnvironmentComplianceSubHeading,
    headingLink: {
      label: "Environmental Clearance of Ferro Alloy Plant at Haldia",
      href: "/images/ec-haldia.pdf",
    },
    yearQueryKey: "haldia-year",
  },

  {
    key: "srikalahasthiWorks",
    category: CsrEnvironmentComplianceCategoryObject.srikalahasthiWorks,
    title: "Srikalahasthi Works",
    titleYearExceptional: "Srikalahasthi <span>Works</span>",
    filterTitle: "Find Compliance Reports",
    subHeading: csrEnvironmentComplianceSubHeading,
    yearQueryKey: "srikalahasthi-year",
  },

  {
    key: "khardahWorks",
    category: CsrEnvironmentComplianceCategoryObject.khardahWorks,
    title: "Khardah Works",
    titleYearExceptional: "Khardah <span>Works</span>",
    filterTitle: "Find Compliance Reports",
    subHeading: csrEnvironmentComplianceSubHeading,
    yearQueryKey: "khardah-year",
  },
];
