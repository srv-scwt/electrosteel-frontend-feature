import CommonTable from '@/components/common/CommonTable';
import GridTwoSection from '@/components/common/GridTwoSection';
import HeroSection from '@/components/common/heroSection'
import React from 'react'
import ToothGasketRestrained from '../../_components/toothGasketRestrained';
import BoltedRestrainedJoints from '../../_components/boltedRestrainedJoints';
import { BoltedRestrainedData, ElectrolockJoint, flangedPipeHeaders, flangedPipeSections } from '../../data/m.data';
import FlangedJointsTable from '../../_components/flangedJoints';

const FlexiblePush = {
    title: `
    <h2><span>Ductile Iron Pipes - Socket & Spigot Flexible Push-on Joints</span></h2>
  `,
    desc: `
 <ul>
  <li>
   Socket and Spigot Flexible Joints are assembled with synthetic EPDM (Ethylene Propylene Diene Monomer) / SBR (Styrene Butadiene Rubber) rubber gaskets of special shape - the gasket has a hard 'Heel' and a soft 'Bulb'.
  </li>
  <li>
    In Push-on joints, the soft bulb of the rubber products is compressed when the spigot is inserted into the socket.
  </li>
  <li>
    The 'heel' locks the position of the gasket and does not allow the gasket to get displaced when the spigot is pushed in.
  </li>
  <li>
    The joint becomes tighter with the increase in internal pressure of water. The rubber is confined in a place and cannot blow out.
  </li>
</ul>
  `,
    image: "/images/growing_section.png",
};

const data2 = {
    title: `
    <h2><span>Permissible Deflection at Socket and Spigot Joints</span></h2>
  `,
    desc: `
    <P>Where it is necessary to deflect the pipeline from a straight line, either in the vertical or horizontal plane, deflection at the joint should not exceed the following:</P>
  `,
    image: "/images/growing_section.png",

    tableData: {
        columns: ["Push on Joint", "Maximum Deflection Angle"],

        rows: [
            { properties: "80-150 mm", value: "5°" },
            { properties: "200-300 mm", value: "5°" },
            { properties: "300-600mm", value: "3°" },
            { properties: "700-800mm", value: "2°" },
            { properties: "900-1000mm", value: "2°" },
        ]
    },
};

const FlangedJoints = {
    title: `
    <h2><span>Ductile Iron Pipes - Flanged Joints</span></h2>
  `,
    desc: `
    <h4>Electrosteel manufactures Flanged Pipes using all the three methods</h4>
 <ul>
  <li>
   Welded Flanged Pipes
  </li>
  <li>
    Screwed Flanged Pipes
  </li>
  <li>
    Integrally Cast Flanged Pipes (short lengths)
  </li>
</ul>
  `,
    image: "/images/growing_section.png",
};

const data4 = {
    desc: `
    <h4>Points to Remember</h4>
 <ul>
  <li>
   Buried installation of flanged pipe is not recommended.
  </li>
  <li>
    Flanged joint being a rigid joint, perfect alignment of the flange faces during jointing and bolt tightening is absolutely vital.
  </li>
  <li>
    Use of duck foot bend at bottom of vertical flange pipe line is necessary.
  </li>
  <li>
    For high pressure application, flanged pipeline needs thrust block or support at bends / tees.
  </li>
</ul>
  `,
    image: "/images/growing_section.png",
};

const BoltedRestrained = {
    title: `
    <h2><span>Ductile Iron Pipes - Bolted Restrained Joints</span></h2>
  `,
    desc: `
    <h4>Features</h4>
    <ul>
  <li>
   Can withstand very high pressure
  </li>
  <li>
    Needs specially manufactured pipes with a hood on the socket and weld bead on spigot
  </li>
  <li>
    Needs special accessories such as Gland, Split Retainer Ring and Nuts/ Hook Bolts
  </li>
  <li>
    Normal push-on gasket is to be used for sealing
  </li>
  <li>
    The hook bolts with the support from socket hood, hold the Gland and the socket together. The welding bead on the other pipe's spigot cannot pass through Retainer Ring housed in the Gland, this ensures restraining of the axial movement between the two pipes.
  </li>
  <li>
    Easy to assemble and disassemble when required.
  </li>
</ul>
  `,
    image: "/images/growing_section.png",
};

const data6 = {
    title: `
    <h2><span>Ductile Iron Pipes - Boltless Restrained Joint (Electrolock Joint)</span></h2>
  `,
    desc: `
    <h4>Features</h4>
    <ul>
  <li>
   Can withstand very high pressure
  </li>
  <li>
    Needs factory manufactured long socket pipes with two chambers – one for sealing and the other for restraining axial movement
  </li>
  <li>
    The water sealing is done by Push-on gasket and restraining is done by Weld Bead and Locking Bar
  </li>
  <li>
    Normal Push-on joint gasket is to be used for sealing
  </li>
  <li>
    After assembly, the locking bars in parts are inserted in the Locking Chamber. The weld bead on the spigot gets locked with the locking bar against separation force
  </li>
  <li>
    Can be used for trenchless applications where all pipes with such joints are used in the trenchless portion
  </li>
  <li>
    Easy to assemble and disassemble when required
  </li>
</ul>
  `,
    image: "/images/growing_section.png",
};

const page = () => {
    return (
        <>
            <HeroSection data={{ title: "Jointing Systems", banner: `/images/board/policies_banner_large.jpg` }} />
            <GridTwoSection data={FlexiblePush} bannerOrder={"order-1"} contentOrder={"order-2"} sectionID={"flexible-push"} />
            <GridTwoSection data={data2} bannerOrder={"order-1 lg:order-2"} contentOrder={"order-2 lg:order-1"} sectionID={"overview"}>
                <CommonTable
                    key={data2?.tableData?.title}
                    columns={data2?.tableData?.columns}
                    rows={data2?.tableData?.rows?.map((r) => [
                        r.properties,
                        r.value,
                    ])}
                />
            </GridTwoSection>

            <GridTwoSection data={FlangedJoints} bannerOrder={"order-1"} contentOrder={"order-2"} sectionID={"flanged-joints"} />
            <FlangedJointsTable />
            <GridTwoSection data={data4} bannerOrder={"order-1 lg:order-2"} contentOrder={"order-2 lg:order-1"} />

            <GridTwoSection data={BoltedRestrained} bannerOrder={"order-1"} contentOrder={"order-2"} sectionID={"bolted-restrained-joint"} />
            <BoltedRestrainedJoints data={BoltedRestrainedData} />

            <GridTwoSection data={data6} bannerOrder={"order-1 lg:order-2"} contentOrder={"order-2 lg:order-1"} sectionID={"boltless-restrained-joint"} />
            <BoltedRestrainedJoints data={ElectrolockJoint}/>

            <ToothGasketRestrained />
        </>
    )
}

export default page;