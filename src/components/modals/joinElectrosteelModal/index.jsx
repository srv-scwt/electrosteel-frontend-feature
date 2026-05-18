"use client";
import React from "react";
import styles from "@/app/common.module.css";
import commonStyles from "./style.module.css";
import { AiOutlineClose } from "react-icons/ai";

const JoinElectrosteelFamilyModal = ({ onClose }) => {
  return (
    <div
      className={`${commonStyles.modalMainWrapper} fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-3`}
    >
      <div
        className={`${commonStyles.modalBox} bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-[12px] p-6 relative`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
        >
          <AiOutlineClose />
        </button>

        <h3 className="text-xl font-semibold mb-3">
          RECRUITMENT FRAUD ALERT
        </h3>

        <p className="mb-3">
          This is an important notice regarding unsolicited fraudulent
          communications made to members of the public purporting to be from
          Electrosteel Recruitment Team.
        </p>

        <p className="mb-3">
          We have been made aware of various correspondences, being circulated
          via e-mail, falsely stating that they are issued by, or in association
          with Electrosteel or its officials. These scams, which may seek to
          obtain money and/or in many cases personal details from the
          recipients, are fraudulent.
        </p>

        <p className="mb-3">
          Please be assured that Electrosteel Group is a professional
          organization with established systems & procedures for recruitment &
          selection. We do not charge any security amount / or fees from job
          candidates at any stage of the hiring process. Any such communication
          is contrary to the Group policy.
        </p>

        <p className="mb-3">
          Electrosteel Group will not accept any liability for the content of
          any such fraudulent or unauthorized activities or for the consequences
          of any action taken on the basis of e-mails from the company ID.
        </p>

        <p className="mb-3">
          The integrity of your personal information and your safety are very
          important to us. If you have any doubts about the legitimacy of any
          offer or unsolicited approach by any individual(s) purporting to be
          recruiting for Electrosteel, please email us at{" "}
          <a
            href="mailto:atanu.chowdhury@electrosteel.com"
            className="text-blue-600 underline"
          >
            atanu.chowdhury@electrosteel.com
          </a>{" "}
          with 'Fraud' in the subject line.
        </p>

        <h3 className="mt-6 text-lg font-semibold">
          How to identify hoax email job offers?
        </h3>

        <div className={styles.customUlListing}>
          <ul>
            <li>
              Fraudulent emails come from a free, public domain email account
              (such as gmail.com or hotmail.com) and not a company email id such
              as electrosteel.com.
            </li>
            <li>They request a cash deposit or payment in some form.</li>
            <li>
              They ask for personal details such as bank account, PAN, or
              address.
            </li>
            <li>
              If the email begins with "Dear Sir" or "Dear User", it’s likely
              not legitimate.
            </li>
            <li>
              False letterheads or fake Electrosteel trademarks are often used.
            </li>
            <li>
              Genuine offers are only made after official interviews with
              company representatives.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JoinElectrosteelFamilyModal;
