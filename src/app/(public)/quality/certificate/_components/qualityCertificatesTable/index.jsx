"use client"
import CommonTable from '@/components/common/CommonTable';
import styles from "@/app/common.module.css";
import React from 'react';
import { OutlineButtonLink } from "@/components/ui/Button";

const DownloadButton = () => (
    <OutlineButtonLink title="Download" action="_blank" goto="#" />
);

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
                no: 1, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI, UK)", accreditation: "IAF, International Accreditation Forum, UKAS (UK's National Accreditation Body)", certificate: "QUALITY MANAGEMENT SYSTEM", standard: "ISO 9001:2015", downloadpdf: <DownloadButton />
            },
            {
                no: 2, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI, UK)", accreditation: "IAF, International Accreditation Forum, ANAB", certificate: "ENVIRONMENT MANAGEMENT SYSTEM", standard: "ISO 14001:2015", downloadpdf: <DownloadButton />
            },
            {
                no: 3, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI, UK)", accreditation: "UKAS (UK's National Accreditation Body)", certificate: "ENERGY MANAGEMENT SYSTEM", standard: "ISO 50001:2018 - KHARDHA (KW)", downloadpdf: <DownloadButton />
            },
            {
                no: 4, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI, UK)", accreditation: "UKAS (UK's National Accreditation Body)", certificate: "OCCUPATIONAL HEALTH AND SAFETY MANAGEMENT SYSTEM", standard: "ISO 45001:2018", downloadpdf: <DownloadButton />
            },
            {
                no: 5, certifyingbody: "BRITISH STANDARDS INSTITUTION (BSI, UK)", accreditation: "SAAS, Social Accountability Accreditation Services", certificate: "SOCIAL ACCOUNTABILITY SYSTEM", standard: "SA 8000:2014 - KHARDHA (KW)", downloadpdf: <DownloadButton />
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
                no: 1, certifyingbody: "BRITISH STANDARD INSTITUTE (BSI, UK)", accreditation: "KITEMARK", certificate: "EN545 & ISO2531, EN598 & ISO7186", standard: "DN80 - DN1000", range: "For drinking water and sewerage application", scope: <DownloadButton />, downloadpdf: ""
            },
            {
                no: 2, certifyingbody: "DEUTSCHER VEREIN DES GAS- UND WASSERFACHES (DVGW, GERMANY)", accreditation: "DAKKS, National Accreditation Body of Germany", certificate: "DVGW Cert", standard: "EN545", range: "DN80 - DN1000", scope: "Drinking water application", downloadpdf: <DownloadButton />
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