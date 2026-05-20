import HeroSection from '@/components/common/heroSection'
import React from 'react'
import GlobalMapSection from './_components/globalMapSection'
import RegisteredAndCorporateOffice from '../../connect/offices/_components/registeredAndCorporateOffice'
import OfficeInIndia from '../../connect/offices/_components/officeInIndia'
import OperationalUnitsIndia from './_components/operationalUnitsIndia'
import OptionalUnitsOverseas from './_components/optionalUnitsOverseas'

import { countrieData, IndiaOffice, OfficeData, OperationalUnits, OverseasData, OverseasUnits } from './_components/m.data'
import CountriesAbout from './_components/countriesAbout'
import { getGlobalPresence } from '@/services/global-presence.api'
import SomethingWentWrong from '@/components/common/SomethingWentsWrong'

const heroData = {
  title: "Global Presence",
  banner: "/images/board/steptodown.png"
}

const page = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const selectedCountryParam = Array.isArray(resolvedSearchParams?.country)
    ? resolvedSearchParams.country[0]
    : resolvedSearchParams?.country
    ;

  const CountriesData = await getGlobalPresence("global-presence-in-130-countries");
  const RegisteredData = await getGlobalPresence("global-registered-office");
  const CorporateData = await getGlobalPresence("global-corporate-office");
  const indiaData = await getGlobalPresence("global-offices-india");
  const officesOverseasData = await getGlobalPresence("global-offices-overseas");
  const unitsData = await getGlobalPresence("global-operational-units");
  const overseasData = await getGlobalPresence("global-overseas");
  console.log(overseasData);
  

  const registeredOffice = RegisteredData?.data?.data?.[0];
  const corporateOffice = CorporateData?.data?.data?.[0];

  const OfficeData = [
    {
      title: registeredOffice?.title,
      address: registeredOffice?.address,
      contact: registeredOffice?.contact,
      mapLink: registeredOffice?.map_link,
    },
    {
      title: corporateOffice?.title,
      address: corporateOffice?.address,
      contact: corporateOffice?.contact,
      mapLink: corporateOffice?.map_link,
    },
  ].filter((item) => item?.title);

  if (!CountriesData || CountriesData.error ) return <SomethingWentWrong />

  return (
    <>
      <HeroSection data={heroData} />
      <CountriesAbout data={CountriesData?.data} />
      <RegisteredAndCorporateOffice data={OfficeData} />
      <OfficeInIndia
        selectedCountryParam={selectedCountryParam}
        indiaData={indiaData?.data}
        officesOverseasData={officesOverseasData?.data}
      />
      <OperationalUnitsIndia operationalUnits={unitsData?.data?.data || []} heading={unitsData?.heading} />
      <OptionalUnitsOverseas operationalUnits={overseasData?.data?.data || []} heading={overseasData?.heading} />
    </>
  )
}

export default page
