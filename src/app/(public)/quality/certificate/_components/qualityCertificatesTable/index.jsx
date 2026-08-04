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
            options.length > 0 ? <RadioDownload name={`sys_row${index}`} options={options} /> : ""
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
            options.length > 0 ? <RadioDownload name={`prod_row${index}`} options={options} /> : ""
        ];
    }) || [];

    // Map license with endorsement
    const licenseCertsData = data.find(c => c.category === 'license-with-endorsement');
    const licenseRows = licenseCertsData?.items?.map((item, index) => {
        const options = item.pdfs?.map(pdf => ({ label: pdf.plant_name, url: pdf.pdf_file })) || [];
        return [
            index + 1,
            item.license_issued_by,
            item.product,
            item.plant,
            item.standard,
            options.length > 0 ? <RadioDownload name={`lic_row${index}`} options={options} /> : ""
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