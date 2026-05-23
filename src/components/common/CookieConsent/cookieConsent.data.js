export const COOKIE_STORAGE_KEY = "ecl-cookie-consent";
export const COOKIE_SESSION_DISMISS_KEY = "ecl-cookie-banner-dismissed";

export const cookieTabs = [
  {
    key: "necessary",
    label: "Necessary",
  },
  {
    key: "privacy",
    label: "We value your privacy",
  },
  {
    key: "customise",
    label: "Customise Consent Preferences",
  },
];

export const defaultCookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  performance: false,
  advertisement: false,
  other: false,
};

export const bannerDescription =
  "We use cookies to help you navigate efficiently and perform certain functions. To learn more about how we use cookies and how you can change your cookie settings, please refer to our";

export const necessaryCookieContent = {
  title: "Necessary",
  description:
    'Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.',
};

export const privacyCookieContent = {
  title: "Your Privacy",
  paragraphs: [
    "We use cookies to enhance your browsing experience, show you forms, serve personalised ads or content, and analyse our traffic.",
    'By clicking "Accept All", you consent to our use of cookies.',
  ],
};

export const customConsentIntro = [
  "We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent category below.",
  'The cookies that are categorised as "Necessary" are stored on your browser as they are essential for enabling the basic functionalities of the site.',
  "We also use third-party cookies that help us analyse how you use this website, store your preferences, and provide the content and advertisements that are relevant to you. These cookies will only be stored in your browser with your prior consent.",
  "You can choose to enable or disable some or all of these cookies but disabling some of them may affect your browsing experience.",
];

export const optionalCookieCategories = [
  {
    key: "functional",
    title: "Functional",
    description:
      "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.",
  },
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
  },
  {
    key: "performance",
    title: "Performance",
    description:
      "Performance cookies are used to understand and analyse the key performance indexes of the website which helps in delivering a better user experience for the visitors.",
  },
  {
    key: "advertisement",
    title: "Advertisement",
    description:
      "Advertisement cookies are used to provide visitors with customised advertisements based on the pages you visited previously and to analyse the effectiveness of the ad campaigns.",
  },
  {
    key: "other",
    title: "Other Cookies",
    description:
      "Other cookies are those that are used for plugin usage, web page development and testing.",
  },
];
