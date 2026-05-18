import HeroSection from '@/components/common/heroSection';
import React from 'react'
import RegistrarGrievance from './_components/investorCommCard';
import EventInformation from './_components/authorisedKMP';
import StockExchangeInfo from './_components/stockExchange';
import { getCommonBanner } from '@/services/commonBanner/commonBanner.api';
import { INVESTOR_PAGE_HERO_CATEGORY_MAP } from '../../_components/investorsHero.data';

const page = async () => {
  const heroBanner = await getCommonBanner(
    INVESTOR_PAGE_HERO_CATEGORY_MAP.investorInfoInvestorRelation.category
  );
  const heroData = {
    title: heroBanner?.data?.title ?? "Investor Relations",
    image: heroBanner?.data?.image ?? "",
    banner: "/images/board/policies_banner_large.jpg",
  };

  return (
    <>
      <HeroSection data={heroData} />
      <RegistrarGrievance />
      <EventInformation />
      <StockExchangeInfo />
    </>
  )
}

export default page;
