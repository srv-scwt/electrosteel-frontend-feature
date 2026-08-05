const supportPartnersImage = [
  {
    label: "HR Areas",
    path: "/images/new-img1.svg",
    height: 300,
    width: 220,
  },
  {
    label: "Business Areas",
    path: "/images/new-img2.svg",
    height: 140,
    width: 130,
  },
  {
    label: "Certificates",
    path: "/images/new-img3.svg",
    height: 140,
    width: 120,
  },
  { label: "\u00A0", path: "/images/new-img4.svg", height: 140, width: 120 },
  { label: "\u00A0", path: "/images/new-img5.svg", height: 140, width: 90 },
];

const copyrightLinks = [
  { label: "Disclaimer", url: "/disclaimer" },
  { label: "Privacy Policy", url: "/privacy-policy" },
  { label: "Sitemap", url: "/sitemap" },
  // { label: "2025 Electrosteel Castings Limited", url: "/" }, 
];

const socialMedia = [
  {
    // title: "FOLLOW US ON",
    type: "social",
    links: [
      { platform: "LinkedIn", image:'/images/social1.png' , url: "/social/linkedin" },
      { platform: "Facebook", image:'/images/social3.png' , url: "/social/facebook" },
      { platform: "Instagram", image:'/images/social4.png' , url: "/social/instagram" },
      { platform: "Twitter", image:'/images/social2.png' , url: "/social/twitter" },
      { platform: "YouTube", image:'/images/social5.png' , url: "/social/youtube" },
    ],
  },
];
const footerData = [
  {
    title: "PRODUCTS",
    type: "list",
    items: [
      { label: "Ductile Iron Pipes", url: "/products/ductile-iron-pipes" },
      {
        label: "Ductile Iron Fittings",
        url: "/products/ductile-iron-fittings",
      },
      {
        label: "Ductile Iron Flange Pipes",
        url: "/products/ductile-iron-flange-pipes",
      },
      {
        label: "Restrained Joint Pipes",
        url: "/products/restrained-joint-pipes",
      },
      { label: "Cement", url: "/products/cement" },
      { label: "Ferro Alloys", url: "/products/ferro-alloys" },
    ],
  },
  {
    title: "REGISTERED OFFICE",
    type: "address",
    address: [
      {
        label: [
          "Rathod Colony",
          "P.O. Rajgangpur",
          "Dist - Sundergarh",
          "Odisha - 770017",
        ],
        url: "",
      },
    ],
    contacts: [
      { name: "K. K. Jha", phone: "+91 9771455335", url: "/" },
      { name: "Ganeshan", phone: "+91 8895852693", url: "/" },
    ],
  },
  {
    title: "CORPORATE OFFICE",
    type: "address",
    address: [
      {
        label: [
          "Electrosteel Castings Limited",
          "G.K. TOWER",
          "19, Camac Street",
          "Kolkata - 700 017",
        ],
        url: "/",
      },
    ],
    contacts: [
      { type: "Ph.", value: "+91-33-22839990/71034400", url: "tel:+91-33-22839990" },
      { type: "Fax", value: "+91-33-22894336 (Directors)", url: "tel:+91-33-22894336" },
      { type: "", value: "+91-33-22894337 (Sales)", url: "tel:+91-33-22894337" },
      { type: "", value: "+91-33-22894338 (Export)", url: "tel:+91-33-22894338" },
      { type: "", value: "+91-33-22894339 (Finance)", url: "tel:+91-33-22894339" },
    ],
  },
  // {
  //   title: "FOLLOW US ON",
  //   type: "social",
  //   links: [
  //     { platform: "LinkedIn", image:'/images/social1.png' , url: "/social/linkedin" },
  //     { platform: "Facebook", image:'/images/social2.png' , url: "/social/facebook" },
  //     { platform: "Instagram", image:'/images/social3.png' , url: "/social/instagram" },
  //     { platform: "Twitter", image:'/images/social4.png' , url: "/social/twitter" },
  //     { platform: "YouTube", image:'/images/social5.png' , url: "/social/youtube" },
  //   ],
  // },
];

export {footerData , copyrightLinks , supportPartnersImage, socialMedia}