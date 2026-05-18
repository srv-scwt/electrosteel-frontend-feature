import HeroSection from '@/components/common/heroSection'
import React from 'react'
import EnvironmentComplianceReports from './_components'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Environment Compliance Reports" , banner: "/images/board/csr_overview_banner_big.jpg"}} />
    <EnvironmentComplianceReports />
    </>
  )
}

export default page