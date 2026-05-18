"use client";

import CarrerEnquiryModal from "@/components/modals/carrerEnquiryModal";
import HTMLRender from "@/components/ui/HTMLRender";
import { useState } from "react";
import style from "@/app/common.module.css"
export default function EnquiryModal() {
  const [open, setOpen] = useState(true);
const data = `
<h2>RECRUITMENT <span>FRAUD ALERT</span></h2>

<p>
This is an important notice regarding unsolicited fraudulent communications made to members of the public purporting to be from Electrosteel Recruitment Team.
</p>

<p>
We have been made aware of various correspondences, being circulated via e-mail, falsely stating that they are issued by, or in association with Electrosteel or its officials. These scams, which may seek to obtain money and/or in many cases personal details from the recipients of such correspondence, are fraudulent.
</p>

<p>
Please be assured that Electrosteel Group is a professional organization with established systems &amp; procedures for recruitment &amp; selection. We do not charge any security amount or fees from job candidates at any stage of the hiring process. Any such communication is contrary to the Group policy.
</p>

<p>
Electrosteel Group will not accept any liability for the content of any such fraudulent or unauthorized activities or for the consequences of any action taken on the basis of e-mails from the company ID.
</p>

<p>
Electrosteel Group takes seriously the issues of compliance and business ethics. It maintains these standards in every aspect of its business. Any offers, benefits, content, or instructions presented in such misleading emails impersonating Electrosteel Group DO NOT represent those of the Group.
</p>

<p>
The integrity of your personal information and your safety are very important to us. If you have any doubts about the legitimacy of any offer or unsolicited approach by any individual(s) purporting to be recruiting for Electrosteel or its subsidiaries, please email us at 
<strong>atanu.chowdhury@electrosteel.com</strong> with "Fraud" in the subject line. Also contact your local law enforcement, providing them with all information you may have received.
</p>

<h3>How to identify hoax email job offers?</h3>

<ul>
    <li>Fraudulent emails come from a free, public domain email account (such as gmail.com or hotmail.com) and not a company email ID such as electrosteel.com.</li>
    <li>They request a cash deposit in a bank account or payment in some form.</li>
    <li>They ask for personal details such as bank account, credit card number, personal address, or social security/PAN number.</li>
    <li>If the email begins with "Dear Sir" or "Dear User", the sender does not know you by name. A legitimate source will address you properly, typically using your last name.</li>
    <li>The legitimate office addresses of Electrosteel or its subsidiaries may be quoted.</li>
    <li>False letterheads are created using registered trademarks.</li>
    <li>Offers of employment will never be made prior to formal contact from the company, including an interview with company representatives.</li>
</ul>
`
  return (
    <div className="p-8">
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-[12px] transition"
      >
        Open Modal
      </button>

      <CarrerEnquiryModal open={open} onClose={() => setOpen(false)}>
      <HTMLRender htmlString={data} className={`${style.sectionContent} ${style.customUlListing}`}/>
      </CarrerEnquiryModal>
    </div>
  );
}
