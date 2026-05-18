import HeroSection from '@/components/common/heroSection'
import React from 'react'
import SuperiorQualityProductSection from './_components/superiorqQualityProductsSection'
import QualityCertificatesTable from './_components/qualityCertificatesTable'

const pages = () => {
  return (
    <>
    <HeroSection data={{title: "Certificate", banner: "/images/board/quality_certificates_big.jpg"}} />
    <SuperiorQualityProductSection />
    <QualityCertificatesTable />
    </>
  )
}

export default pages