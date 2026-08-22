"use client"
import CommonTable from '@/components/common/CommonTable';
import styles from "@/app/common.module.css";
import React from 'react';
import { OutlineButtonLink } from "@/components/ui/Button";

// One download button per attached PDF. Rows can carry more than one file
// (e.g. Khardah and Srikalahasthi), so the plant/title label stays alongside the
// button to tell them apart - the API leaves it blank when there is only one.
const PdfDownloadList = ({ options }) => (
    <div className="flex flex-col gap-3">
        {options.map((opt, index) => (
            <div key={opt.url || index} className="flex flex-col gap-1">
                {opt.label?.trim() && (
                    <span className="whitespace-nowrap">{opt.label.trim()}</span>
                )}
                <OutlineButtonLink
                    title="Download"
                    goto={opt.url}
                    action="_blank"
                    download
                    className=""
                />
            </div>
        ))}
    </div>
);

const QualityCertificatesTable = ({ data = [] }) => {
    
    // Map system certificates
    const systemCertsData = data.find(c => c.category === 'system-certificates');
    const systemRows = systemCertsData?.items?.map((item, index) => {
        const options = item.pdfs?.map(pdf => ({ label: pdf.plant_name, url: pdf.pdf_file })) || [];
        return [
            index + 1,
            item.certifying_body,
            item.accreditation,
            item.certificate,
            item.standard,
            options.length > 0 ? <PdfDownloadList options={options} /> : ""
        ];
    }) || [];

    // Map product certificates
    const productCertsData = data.find(c => c.category === 'product-certificates');
    const productRows = productCertsData?.items?.map((item, index) => {
        const options = item.pdfs?.map(pdf => ({ label: pdf.plant_name, url: pdf.pdf_file })) || [];
        return [
            index + 1,
            item.certifying_body,
            item.accreditation,
            item.certificate,
            item.standard,
            item.range,
            item.scope,
            options.length > 0 ? <PdfDownloadList options={options} /> : ""
        ];
    }) || [];

    // Map license with endorsement
    const licenseCertsData = data.find(c => c.category === 'license-with-endorsement');
    const licenseRows = licenseCertsData?.items?.map((item, index) => {
        const options = item.pdfs?.map(pdf => ({ label: pdf.title, url: pdf.pdf_file })) || [];
        return [
            index + 1,
            item.license_issued_by,
            item.product,
            item.plant,
            item.standard,
            options.length > 0 ? <PdfDownloadList options={options} /> : ""
        ];
    }) || [];

    return (
        <section className='bg-[#f9f9f9]'>
            <div className={styles.containerLg}>
                <div className={styles.sectionContent}>
                    {systemRows.length > 0 && (
                        <CommonTable
                            title="SYSTEM CERTIFICATES"
                            columns={[
                                "SL. NO.",
                                "CERTIFYING BODY",
                                "ACCREDITATION OF CERTIFYING BODY",
                                "CERTIFICATE",
                                "STANDARD",
                                "DOWNLOAD PDF",
                            ]}
                            rows={systemRows}
                        />
                    )}
                    {productRows.length > 0 && (
                        <CommonTable
                            title="PRODUCT CERTIFICATES"
                            columns={[
                                "SL. NO.",
                                "CERTIFYING BODY",
                                "ACCREDITATION OF CERTIFYING BODY",
                                "CERTIFICATE",
                                "STANDARD",
                                "RANGE",
                                "SCOPE",
                                "DOWNLOAD PDF",
                            ]}
                            rows={productRows}
                        />
                    )}
                    {licenseRows.length > 0 && (
                        <CommonTable
                            title="LICENSE WITH ENDORSEMENT"
                            columns={[
                                "SL. NO.",
                                "LICENSE ISSUED BY",
                                "PRODUCT",
                                "PLANT",
                                "STANDARD",
                                "DOWNLOAD",
                            ]}
                            rows={licenseRows}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export default QualityCertificatesTable