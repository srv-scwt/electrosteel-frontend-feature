import HeroSection from '@/components/common/heroSection'
import Container from '@/components/common/container'
import MyContentSection from '@/components/common/MyContentSection'
import React from 'react'
//import SomethingWentWrong from '@/components/common/SomethingWentWrong';

const page = async () => {
  // Shape matches what HeroSection reads: image (string), banner (fallback
  // string), title, and the optional imageFit / opacity class overrides.
  const bannerData = {
    title: "Privacy Statement",
    image: "/images/menubar/20240207_111708.jpg",
    banner: "/images/board/policies_banner_large.jpg",
  };

  // ContentSection renders `title` and `description` as sanitized HTML.
  const privacyStatementData = {
    title: `<h2>Objective</h2>`,
    description: `
      <p>This Privacy Statement outlines the privacy and data protection principles followed by Electrosteel Castings Limited (hereinafter referred to as "ECL", "we", "our", or "us") concerning the personal information of its customers, business partners, employees, vendors, applicants, contractors, website visitors, and other individuals whose personal information shall be processed by ECL ("Data Subjects").</p>

      <p>This Privacy Statement explains how ECL collects, uses, stores, shares for certain purpose to comply with its prevailing laws and protects personal information collected through its websites, digital platforms, business communications, and other interactions.</p>

      <h4>Scope of this Privacy Statement</h4>
      <p>This Privacy Statement applies to all personal information collected or processed by ECL through:</p>
      <ul>
        <li>ECL websites and digital platforms</li>
        <li>Business communications and correspondence</li>
        <li>Online forms and inquiries</li>
        <li>Marketing and promotional activities</li>
        <li>Recruitment and employment processes</li>
        <li>Vendor and partner interactions</li>
      </ul>
      <p>ECL websites may contain links to third-party websites for convenience and informational purposes. ECL does not control such third-party websites or their privacy practices and shall not be responsible for their content, policies, or practices. Users are encouraged to review the privacy policies of such external websites before sharing any personal information.</p>
      <p>Our websites are not intended for children under the age of 18. By using our website, you confirm that you are at least 18 years of age or are accessing the website under parental or guardian supervision.</p>

      <h4>Personal Information Collected by ECL</h4>
      <p>ECL shall collect personal information including but not limited to:</p>
      <ul>
        <li>First Name and Last Name</li>
        <li>Email Address</li>
        <li>Phone Number</li>
        <li>Organization Name</li>
        <li>Job Title</li>
        <li>Country, State, and City</li>
        <li>IP Address and Device Information</li>
        <li>Any information voluntarily shared through forms, emails, or business communication</li>
      </ul>

      <h4>Information Provided Directly by You</h4>
      <p>We shall collect personal information when you:</p>
      <ul>
        <li>Submit inquiries through our website</li>
        <li>Download brochures or documents</li>
        <li>Subscribe to newsletters or updates</li>
        <li>Contact us through email, phone, or forms</li>
        <li>Participate in recruitment or vendor registration processes</li>
      </ul>

      <h4>Information Automatically Collected</h4>
      <p>When you access ECL websites, certain information shall be automatically collected through cookies and similar technologies, including:</p>
      <ul>
        <li>IP address</li>
        <li>Browser type</li>
        <li>Device information</li>
        <li>Website usage behaviour</li>
        <li>Referring pages</li>
        <li>Date and time of access</li>
      </ul>
      <p>This information helps us improve website functionality, security, performance, and user experience.</p>

      <h4>Information from Third-Party Sources</h4>
      <p>ECL may receive limited information through:</p>
      <ul>
        <li>Social media platforms</li>
        <li>Marketing partners</li>
        <li>Publicly available databases</li>
        <li>Recruitment and professional networking platforms</li>
      </ul>

      <h4>How We Use Your Information</h4>
      <p>Personal information collected by ECL may be used for the following purposes:</p>
      <ul>
        <li>Responding to inquiries and requests</li>
        <li>Providing products, services, and support</li>
        <li>Business communication and administration</li>
        <li>Recruitment and employment processing</li>
        <li>Vendor and partner management</li>
        <li>Marketing and promotional activities</li>
        <li>Website analytics and performance monitoring</li>
        <li>Legal and regulatory compliance</li>
        <li>Enhancing user experience and website functionality</li>
        <li>Conducting market research and business analysis</li>
      </ul>
      <p>Where required by applicable law, ECL will obtain consent before processing personal information.</p>

      <h4>Sharing of Personal Information</h4>
      <p>ECL may share personal information with:</p>
      <ul>
        <li>Group companies, affiliates, and subsidiaries</li>
        <li>Authorized service providers and vendors</li>
        <li>Business partners and consultants</li>
        <li>Government authorities and regulators where legally required</li>
        <li>Law enforcement agencies or courts under applicable law</li>
      </ul>
      <p>All third parties receiving personal information from ECL are required to maintain confidentiality and process such information only for authorized purposes.</p>
      <p>ECL does not sell personal information to third parties.</p>

      <h4>Cookies and Tracking Technologies</h4>
      <p>ECL websites use cookies and similar technologies to:</p>
      <ul>
        <li>Improve website functionality</li>
        <li>Analyse website traffic and performance</li>
        <li>Record user preferences</li>
        <li>Enhance security</li>
        <li>Support marketing and analytics activities</li>
      </ul>
      <p>Users may choose to disable cookies through browser settings; however, certain website functionalities may be affected.</p>

      <h4>Data Protection and Security</h4>
      <p>ECL implements appropriate technical, administrative, and physical safeguards to protect personal information against unauthorized access, misuse, disclosure, alteration, or destruction.</p>
      <p>Access to personal information is restricted to authorized personnel and service providers who require such access for legitimate purposes.</p>

      <h4>Data Retention</h4>
      <p>ECL retains personal information only for as long as necessary to:</p>
      <ul>
        <li>Fulfil the purpose for which it was collected</li>
        <li>Meet legal, contractual, and regulatory obligations</li>
        <li>Resolve disputes and enforce agreements</li>
      </ul>
      <p>Once retention is no longer necessary, information will be securely deleted or anonymized.</p>

      <h4>Your Rights</h4>
      <p>Subject to applicable laws, Data Subjects may have the right to:</p>
      <ul>
        <li>Access personal information</li>
        <li>Correct inaccurate or incomplete information</li>
        <li>Request to erasure the personal data</li>
        <li>Restrict or object to processing</li>
        <li>Withdraw consent</li>
        <li>Request data portability</li>
        <li>Lodge complaints before the competent authorities</li>
      </ul>
      <p>Requests related to personal data may be submitted through the contact details mentioned below.</p>

      <h4>International Transfer of Personal Information</h4>
      <p>ECL may transfer personal information across jurisdictions where necessary for business operations, support services, or statutory compliance. Such transfers shall be carried out with appropriate safeguards and in accordance with applicable data protection laws.</p>

      <h4>Anti-Spam Policy</h4>
      <p>ECL is committed to preventing unsolicited communications and spam. Users may opt out of marketing communications at any time by using the unsubscribe options available in such communications.</p>

      <h4>Changes to this Privacy Statement</h4>
      <p>ECL reserves the right to update or modify this Privacy Statement from time to time. Updated versions will be published on this page with the revised effective date.</p>

      <h4>Contact Us</h4>
      <p>For any questions, concerns, or requests regarding this Privacy Statement or personal data processing, please contact:</p>
      <p>
        <strong>Electrosteel Castings Limited</strong><br />
        G.K. TOWER 19, Camac Street<br />
        Kolkata - 700 017<br />
        Ph. <a href="tel:+91-33-22839990">+91-33-22839990</a> / <a href="tel:+91-33-71034400">71034400</a><br />
        Fax <a href="tel:+91-33-22894336">+91-33-22894336</a> (Directors)<br />
        <a href="tel:+91-33-22894337">+91-33-22894337</a> (Sales)<br />
        <a href="tel:+91-33-2289-4338">+91-33-2289-4338</a> (Export)<br />
        <a href="tel:+91-33-22894339">+91-33-22894339</a> (Finance)
      </p>
      <p>
        If you have concerns regarding data privacy or wish to exercise your rights under applicable data protection laws, please contact the ECL Data Privacy Team at:<br />
        Email: <a href="mailto:dpo@electrosteel.com">dpo@electrosteel.com</a>
      </p>
      <p><strong>Effective Date:</strong> 18 May 2026</p>
    `,
  };

  return (
    <>
      <HeroSection data={bannerData} />

      <div className='mt-8'>
        <Container>
          <MyContentSection data={privacyStatementData} />
        </Container>
      </div>
    </>
  )
}

export default page
