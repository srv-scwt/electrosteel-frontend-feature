import HeroSection from '@/components/common/heroSection'
import React from 'react'
import GridTwoSection from '@/components/common/GridTwoSection';
import { getPrestigious } from '@/services/prestigious.api';
import SomethingWentWrong from '@/components/common/SomethingWentsWrong';

const heroData = {
  title: "Prestigious Projects",
  banner: "/images/process-innovation.jpg"
};
const data2 = {
  title: "<h2>Electrosteel and ISRO – </br> <span>reaching for the stars</span></h2>",
  image: "/images/about/p2.jpg",
  description: `<p>
Electrosteel is proud to have contributed to the Indian Space Research Organisation (ISRO)’s success story, by supplying DI Pipes for the Second Launch Pad at the Satish Dhawan Space Centre, Sriharikota.</br> </br> A rocket launch generates a tremendous amount of heat when the engines are fired up. A totally full-proof and zero defect fire-fighting facility is a must for the launch pad. DI Pipes of the highest quality are a critical component.</br></br> <p>After much research, the principal contractor, MECON (a Govt. of India enterprise) decided to implement the firefighting system with DI pipes from Electrosteel. Electrosteel was a natural choice, and we supplied the DI pipes and accessories for this system.</p> <h4>#technologythatcares</h4>   </P>`,
};
const data1 = {
  title: `
    <h2>Pipes to inhospitable <span>Kargil</span></h2>
  `,
  description: `
  <p>
    <p>
      Kargil brings out the deepest patriotic emotions in every Indian. After the Kargil war in 1999, there was a great need to improve the infrastructure for a more permanent army settlement – which included a steady drinking water supply.
    </p>
    </br>
    <p>
      Kargil brings out the deepest patriotic emotions in every Indian. After the Kargil war in 1999, there was a great need to improve the infrastructure for a more permanent army settlement – which included a steady drinking water supply.
    </p>

    <h4>#technologythatcares</h4>
    </p>
  `,
  image: "/images/about/p1.jpg",
};
const data3 = {
  title: `
    <h2>Via <span>Helicopter</span></h2>
  `,
  description: `
  <h3>No road? No problem!</h3>
    <p>
     How does one lay a very long stretch of pipe in mountainous terrain with no roads? Like the Alps.
    </p>
    <p>Call Electrosteel, they'll figure out a solution!</p>
    <p>The 'La Frasnee' Hydropower plant project in France – in the Jura Mountains near the French-Swiss border – used Electrosteel DI Pipes that were transported via helicopter.</p>
    <p>Watch this exciting video for a ring-side view!</p>
    <h4>#technologythatcares</h4>
  `,
  image: "/images/about/p3.jpg",
};
const data4 = {
  title: `
    <h2>The Ultimate Driving Machine meets <span>the Ultimate DI Pipes</span></h2>
  `,
  description: `
    <p>
    With an internal area of 235,000 m², the BMW plant in Wallersdorf is one of the largest sorting depots in Europe ever built in a single construction phase.Electrosteel is proud to have supplied DI Pipes in November 2015 to the quintessentially German luxury car maker, for its spare parts logistics centre in Wallersdorf, Germany.The pipes were supplied for the transportation of water (for the fire-fighting system) at the BMW logistics centre.</p>
    <h4>#technologythatcares</h4>
  `,
  image: "/images/about/p4.jpg",
};
const data5 = {
  title: `
    <h2>Changi <span>Water Reclamation Plant</span></h2>
  `,
  description: `
    <p>
    Are you at this moment drinking a glass of water in Singapore? You could be using water supplied from an Electrosteel Pipe.</br></br>The globally-celebrated Changi Water Reclamation Plant in Singapore is one of the largest water reclamation facilities in the world.The plant treats used water by effectively removing the solids and nutrients - and after treatment, the treated used water is safe to be returned to the environment or channeled to NEWater factory to be further treated into highly purified NEWater.</br></br>Electrosteel is proud to be a preferred brand of Ductile Iron Pipes and Fittings, for this prestigious project.</br></br>Globally, Electrosteel's Ductile Iron pipes are used in effluent water and waste conveyance, right up to processed drinking water.</br></br>We are honoured to play a small role in making the planet a better place to live in.</p>
    <h4>#technologythatcares</h4>
  `,
  image: "/images/about/p5.jpg",
};


const page = async () => {
  const prestigiousData = await getPrestigious();
  if (!prestigiousData || prestigiousData.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection data={prestigiousData?.data?.hero_data?.[0]} />
      <GridTwoSection
        data={prestigiousData?.data?.prestigious_project_sectionData?.prestigious_project_section1?.[0]}
        bannerOrder={"order-1"} contentOrder={"order-2"}
      />
      <GridTwoSection
        data={prestigiousData?.data?.prestigious_project_sectionData?.prestigious_project_section2?.[0]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-2 lg:order-1"}
        className={"py-0!"}
      />
      <GridTwoSection
        data={prestigiousData?.data?.prestigious_project_sectionData?.prestigious_project_section3?.[0]}
        bannerOrder={"order-1"}
        contentOrder={"order-2"}
        isVideo={true}
      />
      <GridTwoSection
        data={prestigiousData?.data?.prestigious_project_sectionData?.prestigious_project_section4?.[0]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-2 lg:order-1"}
        className={"py-0!"} />
      <GridTwoSection
        data={prestigiousData?.data?.prestigious_project_sectionData?.prestigious_project_section5?.[0]}
        bannerOrder={"order-1"}
        contentOrder={"order-2"} />
    </>
  )
}

export default page