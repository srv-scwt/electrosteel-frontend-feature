import HeroSection from '@/components/common/heroSection';
import React from 'react'
import RegistrarGrievance from './_components/investorCommCard';
import EventInformation from './_components/authorisedKMP';
import StockExchangeInfo from './_components/stockExchange';
import { getCommonBanner } from '@/services/commonBanner/commonBanner.api';
import { INVESTOR_PAGE_HERO_CATEGORY_MAP } from '../../_components/investorsHero.data';
import { getInvestorRelationData } from '@/services/investors/investor-relation.api';
const INVESTOR_CATEGORY = {
  registrarAndShareTransferAgent: {
    sectionName: "Registrar and Share Transfer Agent",
    category: "investor-relation-registrar-and-share-transfer-agent",
  },

  grievanceRedressal: {
    sectionName: "Grievance Redressal",
    category: "investor-relation-grievance-redressal",
  },

  authorisedKMP: {
    sectionName: "Authorised KMP",
    category: "investor-relation-authorised-kmp",
  },

  stockExchangeInfo: {
    sectionName: "Stock Exchange Info",
    category: "investor-relation-stock-exchange-info",
  },
};
const page = async () => {
  const heroBanner = await getCommonBanner(INVESTOR_PAGE_HERO_CATEGORY_MAP.investorInfoInvestorRelation.category);
  const section1 = await getInvestorRelationData(INVESTOR_CATEGORY.registrarAndShareTransferAgent.category)
  const section2 = await getInvestorRelationData(INVESTOR_CATEGORY.grievanceRedressal.category)
  const section3 = await getInvestorRelationData(INVESTOR_CATEGORY.authorisedKMP.category)
  const section4 = await getInvestorRelationData(INVESTOR_CATEGORY.stockExchangeInfo.category)
  
  const heroData = {
    title: heroBanner?.data?.title ?? "Investor Relations",
    image: heroBanner?.data?.image ?? "",
  };

  return (
    <>
      <HeroSection data={heroData} />
      <RegistrarGrievance section1={section1?.data} section2={section2?.data}/>
      <EventInformation data={section3?.data} />
      <StockExchangeInfo data={section4?.data}/>
    </>
  )
}

export default page;
