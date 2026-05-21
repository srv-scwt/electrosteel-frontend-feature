import { INVESTOR_PAGE_HERO_CATEGORY_MAP } from "./investorsHero.data";

export const InvestorCategoryObject = {
  financialsQuarterly: "quarterly",
  annualReports: "annual-reports",
  accountsOfSubsidiaries: "accounts-of-subsidiaries",
  accountsOfJointsVenture: "accounts-of-joints-venture",
  codeOfConductAndPoliciesOverview: "code-of-conduct-and-policies",

  amalgamationNcltMeetings: "nclt-meetings",
  amalgamationNcltFinalOrder: "nclt-final-order",
  amalgamationRegulation37OfLodr: "regulation-37-of-lodr",
  amalgamationSrikalahasthiPipesLtd: "srikalahasthi-pipes-ltd",

  shareholderInformationShareholdingPattern: "shareholding-pattern",
  shareholderInformationNewspaperPublications: "newspaper-publications",
  shareholderInformationCorporateGovernanceQuarterlyCompliance:
    "corporate-governance-quarterly-compliance",
  shareholderInformationMergers: "mergers",
  shareholderInformationTransferOfShareToDematAccountOfIepfAuthority:
    "transfer-of-share-to-demat-account-of-iepf-authority",
  shareholderInformationUnclaimedDividends: "unclaimed-dividends-archieve",
  shareholderInformationExtractOfAnnualReturn: "extract-of-annual-return",
  shareholderInformationDisclosuresToStockExchange:
    "disclosures-to-stock-exchange",
  shareholderInformationOtherDisclosure: "other-disclosure",
  shareholderInformationAnnualReturn: "annual-return",

  generalMeetingAndPostalBallotsNotice: "notice",
  generalMeetingAndPostalBallots160Notice: "160-notice",
  generalMeetingAndPostalBallotsVotingResults: "voting-results",

  investorInfoAndCreditRatings : "credit-ratings",
  investorInfoAndInvestorPresentation : "investor-presentation",

  boardApprovedCSRProjects : "board-approved-csr-projects"

};

export const InvestorPageConfigObject = {
  financialsQuarterly: {
    title: "Quarterly Results",
    category: InvestorCategoryObject.financialsQuarterly,
    filterTitle: "Find Quarterly Results",
    titleYearExceptional: "Quarterly <span>Results</span>",
    latestLink: "/investors/financials/quarterly-results",
    archieveLink: "/investors/financials/quarterly-results/archive",
    yearFieldDropdown: true,
    headingField: false,
    latestFeild: true,
  },

  annualReports: {
    title: "Annual Reports",
    category: InvestorCategoryObject.annualReports,
    filterTitle: "Find Annual Report",
    titleYearExceptional: "Annual <span>Reports</span>",
    latestLink: "/investors/reports-and-accounts/annual-reports",
    archieveLink: "/investors/reports-and-accounts/archive-annual-report",
    yearFieldDropdown: true,
    headingField: false,
    latestFeild: true,
  },

  accountsOfSubsidiaries: {
    title: "Accounts of Subsidiaries",
    category: InvestorCategoryObject.accountsOfSubsidiaries,
    filterTitle: "Find Accounts of Subsidiaries",
    titleYearExceptional: "Accounts of <span>Subsidiaries</span>",
    // latestLink: "/investors/reports-and-accounts/accounts-of-subsidiaries",
    // archieveLink: "/investors/reports-and-accounts/accounts-of-subsidiaries/archive",
    yearFieldDropdown: true,
    headingField: false,
    latestFeild: false,
  },

  accountsOfJointsVenture: {
    title: "Accounts of Joint Venture",
    category: InvestorCategoryObject.accountsOfJointsVenture,
    filterTitle: "Find Accounts of Joint Venture",
    titleYearExceptional: "Accounts of Joint <span>Venture</span>",
    // latestLink: "/investors/reports-and-accounts/accounts-of-joints-venture",
    // archieveLink: "/investors/reports-and-accounts/accounts-of-joints-venture/archive",
    yearFieldDropdown: true,
    headingField: false,
    latestFeild: false,
  },

  codeOfConductAndPoliciesOverview: {
    title: "Code of Conduct and Policies",
    category: InvestorCategoryObject.codeOfConductAndPoliciesOverview,
    filterTitle: "Find Code of Conduct and Policies",
    titleYearExceptional: "Code of Conduct and <span>Policies</span>",
    yearFieldDropdown: false,
    headingField: true,
    latestFeild: false,
    showTitle: false,
    sectionTitle: true,
  },

  amalgamationNcltMeetings: {
    title: "NCLT Meetings",
    category: InvestorCategoryObject.amalgamationNcltMeetings,
    filterTitle: "Find NCLT Meetings",
    titleYearExceptional: "NCLT <span>Meetings</span>",
    yearFieldDropdown: false,
    headingField: false,
    latestFeild: false,
    showTitle: false,
  },

  amalgamationNcltFinalOrder: {
    title: "NCLT Final Order",
    category: InvestorCategoryObject.amalgamationNcltFinalOrder,
    filterTitle: "Find NCLT Final Order",
    titleYearExceptional: "NCLT Final <span>Order</span>",
    yearFieldDropdown: false,
    headingField: false,
    latestFeild: false,
        showTitle: false,
  },

  amalgamationRegulation37OfLodr: {
    title: "Regulation 37 of LODR",
    category: InvestorCategoryObject.amalgamationRegulation37OfLodr,
    filterTitle: "Find Regulation 37 of LODR",
    titleYearExceptional: "Regulation 37 of <span>LODR</span>",
    yearFieldDropdown: false,
    headingField: false,
    latestFeild: false,
          showTitle: false,
  },

  amalgamationSrikalahasthiPipesLtd: {
    title: "Srikalahasthi Pipes Ltd",
    category: InvestorCategoryObject.amalgamationSrikalahasthiPipesLtd,
    filterTitle: "Find Srikalahasthi Pipes Ltd",
    titleYearExceptional: "Srikalahasthi Pipes <span>Ltd</span>",
    latestLink: "/investors/amalgamation/srikalahasthi-pipes-ltd",
    archieveLink: "/investors/amalgamation/srikalahasthi-pipes-ltd/archive",
    yearFieldDropdown: true,
    headingField: false,
    latestFeild: true,
        sectionTitle: true,
  },

  shareholderInformationShareholdingPattern: {
    title: "Shareholding Pattern",
    category: InvestorCategoryObject.shareholderInformationShareholdingPattern,
    filterTitle: "Find Shareholding Pattern",
    titleYearExceptional: "Shareholding <span>Pattern</span>",
    latestLink: "/investors/shareholder-information/shareholding-pattern",
    archieveLink:
      "/investors/shareholder-information/shareholding-pattern/archive",
    yearFieldDropdown: true,
    headingField: false,
      latestFeild: false,
  },

  shareholderInformationNewspaperPublications: {
    title: "Newspaper Publications",
    category: InvestorCategoryObject.shareholderInformationNewspaperPublications,
    filterTitle: "Find Newspaper Publications",
    titleYearExceptional: "Newspaper <span>Publications</span>",
    latestLink: "/investors/shareholder-information/newspaper-publication",
    archieveLink:
      "/investors/shareholder-information/newspaper-publication/archive",
    yearFieldDropdown: true,
    headingField: false,
      latestFeild: false,
  },

  shareholderInformationCorporateGovernanceQuarterlyCompliance: {
    title: "Corporate Governance - Quarterly Compliance",
    category:
      InvestorCategoryObject.shareholderInformationCorporateGovernanceQuarterlyCompliance,
    filterTitle: "Find Quarterly Compliance",
    titleYearExceptional:
      "Corporate Governance - Quarterly <span>Compliance</span>",
    latestLink: "/investors/shareholder-information/corporate-governance",
    archieveLink:
      "/investors/shareholder-information/corporate-governance/archive",
    yearFieldDropdown: true,
    headingField: false,
     latestFeild: false,
  },

  shareholderInformationMergers: {
    title: "Mergers",
    category: InvestorCategoryObject.shareholderInformationMergers,
    filterTitle: "Find Mergers",
    titleYearExceptional: "Mergers",
    yearFieldDropdown: false,
    headingField: true,
    latestFeild: false,
  },

  shareholderInformationTransferOfShareToDematAccountOfIepfAuthority: {
    title: "Transfer of Shares to DEMAT Account of IEPF Authority",
    category:
      InvestorCategoryObject.shareholderInformationTransferOfShareToDematAccountOfIepfAuthority,
    filterTitle:
      "Find Transfer of Shares to DEMAT Account of IEPF Authority",
    titleYearExceptional:
      "Transfer of Shares to DEMAT Account of IEPF <span>Authority</span>",
    yearFieldDropdown: false,
    headingField: false,
    latestFeild: false,
  },

  shareholderInformationUnclaimedDividends: {
    title: "Unclaimed Dividends",
    category: InvestorCategoryObject.shareholderInformationUnclaimedDividends,
    filterTitle: "Find Unclaimed Dividends",
    titleYearExceptional: "",
    latestLink: "/investors/shareholder-information/unclaimed-dividends",
    archieveLink:
      "/investors/shareholder-information/unclaimed-dividends-archive",
    yearFieldDropdown: true,
    headingField: false,
    latestFeild: true,
    showYearField: false,
    // sectionTitle: false
  },

  shareholderInformationExtractOfAnnualReturn: {
    title: "Extract of Annual Return",
    category:
      InvestorCategoryObject.shareholderInformationExtractOfAnnualReturn,
    filterTitle: "Find Extract of Annual Return",
    titleYearExceptional: "Extract of Annual <span>Return</span>",
    yearFieldDropdown: false,
    headingField: true,
    latestFeild: false,
  },

  shareholderInformationDisclosuresToStockExchange: {
    title: "Disclosures to Stock Exchange",
    category:
      InvestorCategoryObject.shareholderInformationDisclosuresToStockExchange,
    filterTitle: "Find Disclosures to Stock Exchange",
    titleYearExceptional: "Disclosures to Stock <span>Exchange</span>",
    yearFieldDropdown: false,
    headingField: true,
    latestFeild: false,
  },

  shareholderInformationOtherDisclosure: {
    title: "Other Disclosures",
    category: InvestorCategoryObject.shareholderInformationOtherDisclosure,
    filterTitle: "Find Other Disclosures",
    titleYearExceptional: "Other <span>Disclosures</span>",
    yearFieldDropdown: false,
    headingField: true,
    latestFeild: false,
  },

  shareholderInformationAnnualReturn: {
    title: "Annual Return",
    category: InvestorCategoryObject.shareholderInformationAnnualReturn,
    filterTitle: "Find Annual Return",
    titleYearExceptional: "Annual <span>Return</span>",
    yearFieldDropdown: false,
    headingField: true,
    latestFeild: false,
  },

  generalMeetingAndPostalBallotsNotice: {
    title: "Notice",
    category: InvestorCategoryObject.generalMeetingAndPostalBallotsNotice,
    filterTitle: "Find Notice",
    titleYearExceptional: "Notice",
    yearFieldDropdown: false,
    headingField: true,
    latestFeild: false,
  },

  generalMeetingAndPostalBallots160Notice: {
    title: "160 Notices",
    category: InvestorCategoryObject.generalMeetingAndPostalBallots160Notice,
    filterTitle: "Find 160 Notices",
    titleYearExceptional: "160 <span>Notices</span>",
    yearFieldDropdown: false,
    headingField: true,
    latestFeild: false,
  },

  generalMeetingAndPostalBallotsVotingResults: {
    title: "Voting Results",
    category:
      InvestorCategoryObject.generalMeetingAndPostalBallotsVotingResults,
    filterTitle: "Find Voting Results",
    titleYearExceptional: "Voting <span>Results</span>",
    latestLink: "/investors/shareholder-information/voting-results",
    archieveLink:
      "/investors/shareholder-information/voting-results/archive",
    yearFieldDropdown: true,
    headingField: false,
    latestFeild: true,
  },

  investorInfoAndCreditRatings: {
    title: "Credit Ratings",
    category: InvestorCategoryObject.investorInfoAndCreditRatings,
    filterTitle: "Find Credit Ratings",
    titleYearExceptional: "Credit <span>Ratings</span>",
    yearFieldDropdown: false,
    headingField: false,
    latestFeild: false,
  },

  investorInfoAndInvestorPresentation: {
    title: "Investor Presentation",
    category: InvestorCategoryObject.investorInfoAndInvestorPresentation,
    filterTitle: "Find Investor Presentation",
    titleYearExceptional: "Investor <span>Presentation</span>",
    yearFieldDropdown: false,
       headingField: false,
    latestFeild: false,
    showTitle : false,
    sectionTitle : true,
  },

  boardApprovedCSRProjects: {
    title: "Board Approved CSR Projects",
    category: InvestorCategoryObject.boardApprovedCSRProjects,
    filterTitle: "Find CSR Projects",
    titleYearExceptional: "Board Approved CSR <span>Projects</span>",
    yearFieldDropdown: true,
    headingField: false,
    latestFeild: false,
  },
};

const INVESTOR_CONFIG_HERO_MAP = {
  financialsQuarterly:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.financialsQuarterlyResults.category,
  annualReports:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.reportsAccountsAnnualReports.category,
  accountsOfSubsidiaries:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.reportsAccountsAccountsOfSubsidiaries.category,
  accountsOfJointsVenture:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.reportsAccountsAccountsOfJointsVenture.category,
  codeOfConductAndPoliciesOverview:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.codeOfConductAndPoliciesOverview.category,
  amalgamationNcltMeetings:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.amalgamationNcltMeetings.category,
  amalgamationNcltFinalOrder:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.amalgamationNcltFinalOrder.category,
  amalgamationRegulation37OfLodr:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.amalgamationRegulation37OfLodr.category,
  amalgamationSrikalahasthiPipesLtd:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.amalgamationSrikalahasthiPipesLtd.category,
  shareholderInformationShareholdingPattern:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.shareholderInformationShareholdingPattern.category,
  shareholderInformationNewspaperPublications:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.shareholderInformationNewspaperPublications.category,
  shareholderInformationCorporateGovernanceQuarterlyCompliance:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.shareholderInformationCorporateGovernanceQuarterlyCompliance.category,
  shareholderInformationMergers:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.shareholderInformationMergers.category,
  shareholderInformationTransferOfShareToDematAccountOfIepfAuthority:
    INVESTOR_PAGE_HERO_CATEGORY_MAP
      .shareholderInformationTransferOfShareToDematAccountOfIepfAuthority
      .category,
  shareholderInformationUnclaimedDividends:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.shareholderInformationUnclaimedDividends
      .category,
  shareholderInformationExtractOfAnnualReturn:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.shareholderInformationExtractOfAnnualReturn
      .category,
  shareholderInformationDisclosuresToStockExchange:
    INVESTOR_PAGE_HERO_CATEGORY_MAP
      .shareholderInformationDisclosuresToStockExchange.category,
  shareholderInformationOtherDisclosure:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.shareholderInformationOtherDisclosure
      .category,
  shareholderInformationAnnualReturn:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.shareholderInformationAnnualReturn.category,
  generalMeetingAndPostalBallotsNotice:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.shareholderInformationGeneralMeetingNotice
      .category,
  generalMeetingAndPostalBallots160Notice:
    INVESTOR_PAGE_HERO_CATEGORY_MAP
      .shareholderInformationGeneralMeeting160Notice.category,
  generalMeetingAndPostalBallotsVotingResults:
    INVESTOR_PAGE_HERO_CATEGORY_MAP
      .shareholderInformationGeneralMeetingVotingResults.category,
  investorInfoAndCreditRatings:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.investorInfoCreditRatings.category,
  investorInfoAndInvestorPresentation:
    INVESTOR_PAGE_HERO_CATEGORY_MAP
      .investorInfoInvestorPresentationAndOtherDocuments.category,
  boardApprovedCSRProjects:
    INVESTOR_PAGE_HERO_CATEGORY_MAP.boardApprovedCsrProjectsOverview.category,
};

Object.entries(INVESTOR_CONFIG_HERO_MAP).forEach(
  ([configKey, commonBannerPageName]) => {
    if (!InvestorPageConfigObject[configKey]) return;

    InvestorPageConfigObject[configKey].commonBannerPageName =
      commonBannerPageName;
  }
);

export const getInvestorArchivePageConfig = (config) => ({
  ...config,
  archieveLink: config?.latestLink,
  archieveLabel: "View Latest",
  isLatestValue: "0",
});

