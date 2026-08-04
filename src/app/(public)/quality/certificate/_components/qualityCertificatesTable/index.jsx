"use client"
import CommonTable from '@/components/common/CommonTable';
import styles from "@/app/common.module.css";
import React from 'react';
import { OutlineButtonLink } from "@/components/ui/Button";

const DownloadButton = () => (
    <OutlineButtonLink title="Download" action="_blank" goto="#" />
);

const RadioDownload = ({ name, options, instant = false }) => {
    const [selectedUrl, setSelectedUrl] = React.useState(null);

    return (
        <div className="flex flex-col gap-2">
            {options.map(opt => (
                <label key={opt.label} className="flex items-center gap-2 cursor-pointer text-sm text-[#003366] hover:text-[#00aaff] transition-colors">
                    <input 
                        type="radio" 
                        name={name} 
                        value={opt.label} 
                        onChange={(e) => {
                            if (instant && e.target.checked) {
                                window.open(opt.url, "_blank");
                            } else {
                                setSelectedUrl(opt.url);
                            }
                        }} 
                        className="cursor-pointer accent-[#004aa1]"
                    />
                    {opt.label}
                </label>
            ))}
            {!instant && selectedUrl && (
                <div className="mt-2 w-[130px]">
                    <OutlineButtonLink 
                        goto={selectedUrl} 
                        action="_blank" 
                        title="Download" 
                    />
                </div>
            )}
        </div>
    );
};

const qualityCertificates = [
    {
        title: "SYSTEM CERTIFICATES",
        columns: [
            "SL. NO.",
            "CERTIFYING BODY",
            "ACCREDITATION OF CERTIFYING BODY",
            "CERTIFICATE",
            "STANDARD",
            "DOWNLOAD PDF",
        ],
        rows: [
            {
                no: 1, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI, UK)", accreditation: "IAF, International Accreditation Forum, UKAS (UK's National Accreditation Body)", certificate: "QUALITY MANAGEMENT SYSTEM", standard: "ISO 9001:2015", downloadpdf: <RadioDownload name="row1" options={[
                    { label: "KHARDHA (KW)", url: "/dummy-1-khardha.pdf" },
                    { label: "SRIKALAHASTHI (SW)", url: "/dummy-1-srikalahasthi.pdf" }
                ]} />
            },
            {
                no: 2, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI, UK)", accreditation: "IAF, International Accreditation Forum, ANAB", certificate: "ENVIRONMENT MANAGEMENT SYSTEM", standard: "ISO 14001:2015", downloadpdf: <RadioDownload name="row2" options={[
                    { label: "KHARDHA (KW)", url: "/dummy-2-khardha.pdf" },
                    { label: "SRIKALAHASTHI (SW)", url: "/dummy-2-srikalahasthi.pdf" }
                ]} />
            },
            {
                no: 3, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI, UK)", accreditation: "UKAS (UK's National Accreditation Body)", certificate: "ENERGY MANAGEMENT SYSTEM", standard: "ISO 50001:2018 - KHARDHA (KW)", downloadpdf: <RadioDownload name="row3" options={[
                    { label: "KHARDHA (KW)", url: "/dummy-3-khardha.pdf" }
                ]} />
            },
            {
                no: 4, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI, UK)", accreditation: "UKAS (UK's National Accreditation Body)", certificate: "OCCUPATIONAL HEALTH AND SAFETY MANAGEMENT SYSTEM", standard: "ISO 45001:2018", downloadpdf: <RadioDownload name="row4" options={[
                    { label: "KHARDHA (KW)", url: "/dummy-4-khardha.pdf" },
                    { label: "SRIKALAHASTHI (SW)", url: "/dummy-4-srikalahasthi.pdf" }
                ]} />
            },
            {
                no: 5, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI, UK)", accreditation: "SAAS, Social Accountability Accreditation Services", certificate: "SOCIAL ACCOUNTABILITY SYSTEM", standard: "SA 8000:2014 - KHARDHA (KW)", downloadpdf: <RadioDownload name="row5" options={[
                    { label: "KHARDHA (KW)", url: "/dummy-5-khardha.pdf" }
                ]} />
            },
        ],
    },
    {
        title: "PRODUCT CERTIFICATES",
        columns: [
            "SL. NO.",
            "CERTIFYING BODY",
            "ACCREDITATION OF CERTIFYING BODY",
            "CERTIFICATE",
            "STANDARD",
            "RANGE",
            "SCOPE",
            "DOWNLOAD PDF",
        ],
        rows: [
            {
                no: 1, certifyingbody: "BRITISH STANDARD INSTITUTE (BSI, UK)", accreditation: "", certificate: "KITEMARK", standard: "EN545 & ISO2531, EN598 & ISO7186", range: "DN80 - DN1000", scope: "For drinking water and sewerage application", downloadpdf: <RadioDownload name="prod_row1" options={[
                    { label: "KHARDHA (KW)", url: "/dummy-prod-1-khardha.pdf" },
                    { label: "SRIKALAHASTHI (SW)", url: "/dummy-prod-1-srikalahasthi.pdf" }
                ]} />
            },
            {
                no: 2, certifyingbody: "DEUTSCHER VEREIN DES GAS- UND WASSERFACHES (DVGW, GERMANY)", accreditation: "DAKKS, National Accreditation Body of Germany", certificate: "DVGW Cert", standard: "EN545", range: "DN80 - DN1000", scope: "Drinking water application", downloadpdf: ""
            },
        ],
    },
    {
        title: "LICENSE WITH ENDORSEMENT",
        columns: [
            "SL. NO.",
            "LICENSE ISSUED BY",
            "PRODUCT",
            "PLANT",
            "STANDARD",
            "DOWNLOAD",
        ],
        rows: [
            {
                no: 1, licenseissuedby: "BIS", product: "DI Pipe", plant: "Khardah", standard: "IS 8329:2000", download: "License With Endorsement"
            },
            {
                no: 2, licenseissuedby: "BIS", product: "DI Fittings", plant: "Khardah", standard: "IS 9523:2000", download: "License With Endorsement"
            },
        ],
    },
];

const QualityCertificatesTable = () => {
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