"use client"
import CommonTable from '@/components/common/CommonTable';
import styles from "@/app/common.module.css";
import React from 'react';


const qualityCertificates = [
    // table row 1
    {
        title: "SYSTEM CERTIFICATES",
        columns: [
            "Sl. No.",
            "Certifying Body",
            "Accreditation of Certifying Body",
            "Certificate",
            "Standard",
            "Download PDF",
        ],
        rows: [
            {
                no: 1, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI,UK)", accreditation: "IAF, International Accreditation Forum UKAS, UK's National Accreditation Body", certificate: "QUALITY MANAGEMENT SYSTEM", standard: "ISO 9001:2015", downloadpdf: (
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name=""
                                value="KHARDHA"
                            />
                            KHARDHA (KW)
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name=""
                                value="SRIKALAHASTHI"
                            />
                            SRIKALAHASTHI (SW)
                        </label>
                        <button className="mt-2 w-[130px] bg-[#00418e] text-white px-3 py-2 rounded hover:bg-[#00306b] transition"
                        >
                            Download
                        </button>
                    </div>
                ),
            },
            {
                no: 2, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI,UK)", accreditation: "IAF, International Accreditation Forum ANAB", certificate: "ENVIRONMENT MANAGEMENT SYSTEM", standard: "ISO 14001: 2015", downloadpdf: (
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name=""
                                value="KHARDHA"
                            />
                            KHARDHA (KW)
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name=""
                                value="SRIKALAHASTHI"
                            />
                            SRIKALAHASTHI (SW)
                        </label>
                        <button className="mt-2 w-[130px] bg-[#00418e] text-white px-3 py-2 rounded hover:bg-[#00306b] transition"
                        >
                            Download
                        </button>
                    </div>
                ),
            },

            {
                no: 3, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI,UK)", accreditation: "UKAS, UK's National Accreditation Body", certificate: "ENERGY MANAGEMENT SYSTEM", standard: "ISO 50001:2018", downloadpdf: (
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name=""
                                value="KHARDHA"
                            />
                            KHARDHA (KW)
                        </label>
                        <button className="mt-2 w-[130px] bg-[#00418e] text-white px-3 py-2 rounded hover:bg-[#00306b] transition"
                        >
                            Download
                        </button>
                    </div>
                ),
            },

            {
                no: 4, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI,UK)", accreditation: "UKAS, UK's National Accreditation Body", certificate: "OCCUPATIONAL HEALTH AND SAFETY MANAGEMENT SYSTEM", standard: "ISO 45001 :2018", downloadpdf: (
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name=""
                                value="KHARDHA"
                            />
                            KHARDHA (KW)
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name=""
                                value="SRIKALAHASTHI"
                            />
                            SRIKALAHASTHI (SW)
                        </label>
                        <button className="mt-2 w-[130px] bg-[#00418e] text-white px-3 py-2 rounded hover:bg-[#00306b] transition"
                        >
                            Download
                        </button>
                    </div>
                ),
            },

            {
                no: 5, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI,UK)", accreditation: "SAAS, Social Accountability Accreditation Services", certificate: "SOCIAL ACCOUNTABILITY SYSTEM", standard: "SA 8000 :2014", downloadpdf: (
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name=""
                                value="KHARDHA"
                            />
                            KHARDHA (KW)
                        </label>
                        <button className="mt-2 w-[130px] bg-[#00418e] text-white px-3 py-2 rounded hover:bg-[#00306b] transition"
                        >
                            Download
                        </button>
                    </div>
                ),
            },

        ],
    },

    // table row 2
    {
        title: "PRODUCT CERTIFICATES",
        columns: [
            "Sl. No.",
            "Certifying Body",
            "Accreditation of Certifying Body",
            "Certificate",
            "Standard",
            "Range",
            "Scope",
            "Download PDF",
        ],
        rows: [
            {
                no: 1, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI,UK)", accreditation: "", certificate: "KITEMARK", standard: "EN545 & ISO2531 EN598 & ISO7186", range: "DN80 - DN1000", scope: "For drinking water and sewerage application", downloadpdf: (
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name=""
                                value="KHARDHA"
                            />
                            KHARDHA (KW)
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name=""
                                value="SRIKALAHASTHI"
                            />
                            SRIKALAHASTHI (SW)
                        </label>
                        <button className="mt-2 w-[130px] bg-[#00418e] text-white px-3 py-2 rounded hover:bg-[#00306b] transition"
                        >
                            Download
                        </button>
                    </div>
                ),
            },

            {
                no: 2, certifyingbody: "DEUTSCHER VEREIN DES GAS- UND WASSERFACHES (DVGW, GERMAN)", accreditation: "DAKKS, National accreditation body for the Federal Republic of GERMANY", certificate: "DVGW Cert", standard: "EN545", range: "DN80 - DN1000", scope: "Drinking water application", downloadpdf: (
                    <div className="flex flex-col gap-2">
                        <button className="mt-2 w-[130px] bg-[#00418e] text-white px-3 py-2 rounded hover:bg-[#00306b] transition"
                        >
                            Download
                        </button>
                    </div>
                ),
            },


        ],
    },

    // table row 3
    {
        title: "LICENSE WITH ENDORSEMENT",
        columns: [
            "Sl. No.",
            "License Issued By",
            "Product",
            "Plant",
            "Standard",
            "Download",
        ],
        rows: [
            {
                no: 1, licenseissuedby: "BIS", product: "DI Pipe", plant: "Khardah", standard: "IS 8329 : 2000", download: (
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name=""
                                value="KHARDHA"
                            />
                            License With Endorsement
                        </label>
                        <button className="mt-2 w-[130px] bg-[#00418e] text-white px-3 py-2 rounded hover:bg-[#00306b] transition"
                        >
                            Download
                        </button>
                    </div>
                ),
            },

            {
                no: 2, licenseissuedby: "BIS", product: "DI Fittings", plant: "Khardah", standard: "IS 9523 : 2000", download: (
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name=""
                                value="KHARDHA"
                            />
                            License With Endorsement
                        </label>
                        <button className="mt-2 w-[130px] bg-[#00418e] text-white px-3 py-2 rounded hover:bg-[#00306b] transition"
                        >
                            Download
                        </button>
                    </div>
                ),
            },

        ],
    },
];

// const headerCell =
//     "text-left md:p-4 sm:p-3 p-2 bg-[#f00] text-white border border-white sticky top-0";
// const cell = "text-left md:p-4 sm:p-3 p-2 border border-gray-200";


const QualityCertificatesTable = () => {

    const columns = ["Sl. No.", "Certifying Body", "Accreditation of Certifying Body", "Certificate", "Standard", "Download PDF"]
        ;

    return (
        <section className='bg-[#f9f9f9]'>
            <div className={styles.containerLg}>
                <div className={styles.sectionContent}>
                    {qualityCertificates.map((qualityCertificate) => (
                        <CommonTable
                            key={qualityCertificate.title}
                            title={qualityCertificate.title}
                            columns={qualityCertificate.columns}
                            rows={qualityCertificate.rows.map((r) => {
                                if (qualityCertificate.title === "PRODUCT CERTIFICATES") {
                                    return [
                                        r.no,
                                        r.certifyingbody,
                                        r.accreditation,
                                        r.certificate,
                                        r.standard,
                                        r.range,
                                        r.scope,
                                        r.downloadpdf,
                                    ];
                                } else if (qualityCertificate.title === "LICENSE WITH ENDORSEMENT") {
                                    return [
                                        r.no,
                                        r.licenseissuedby,
                                        r.product,
                                        r.plant,
                                        r.standard,
                                        r.download,
                                    ];
                                } else {
                                    // default SYSTEM CERTIFICATES
                                    return [
                                        r.no,
                                        r.certifyingbody,
                                        r.accreditation,
                                        r.certificate,
                                        r.standard,
                                        r.downloadpdf,
                                    ];
                                }
                            })}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default QualityCertificatesTable