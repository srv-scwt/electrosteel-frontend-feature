import HeroSection from "@/components/common/heroSection";
import FAQAccordion from "./_components/FAQAccordion";
import styles from "@/app/common.module.css";

export default function Page() {
    const data = [
        {
            sectionName: "PART 1",
            faq: [
                {
                    id: "1",
                    title: "How does a Electrolock joint work?",
                    content: `
          <p>
          Electrolock is a boltless restrained joint system with a double chamber socket to be used in Ductile Iron (DI) pipelines. It uses the same gasket as the normal push-on joint. The second chamber accommodates mechanical anchorage provided by specially designed locking bars or plates. It locks with a weld bead made on the jointing spigot. Electrolock joint Ductile Iron (DI) pipes are supplied with compatible Electrolock type Ductile Iron (DI) Fittings. Restrained joints are designed and tested as per the provisions of ISO 2531, EN 545 and ISO 10804.</p>
        `,
                },
                {
                    id: "2",
                    title: " What are the advantages of Boltless restrained joint over Bolted restrained joint?",
                    content: `
          <p>
        Before the advent of Ductile Iron( DI) Pipes and Fittings (DI) pipes with boltless restrained joint, the older restrained joint design required cumbersome bolting arrangements with a separately cast follower gland, to serve the purpose of physically restraining the joint. However, in the new â€˜Electrolockâ€™ design no bolting is required to do the restraining. The advantages are manifold:
        </p>
        <ul>
        <li>Easier to assemble and disassemble</li>
        <li>Faster jointing</li>
        <li>Lesser excavation at joint since no bolting is required</li>
        <li>No separate follower gland is required</li>
        <li>As there is no extended part, it can be used for trenchless laying of DI pipe</li>
        </ul>
        `,
                },
                {
                    id: "3",
                    title: "How the thrust force is dispersed to the soil by a restrained joint system in a Ductile Iron(DI) pipeline ?",
                    content: `
          <p>
       The thrust force developed in a Ductile Iron (DI) pipeline is dispersed along the calculated restraining length with the help of:
       </p>
       <ul>
       <li>Passive soil resistance</li>
       <li>Skin friction between the pipe and the surrounding soil</li>
       </ul>
     <p>The concept is explained with a sample force diagram showing the thrust force and resistance forces at horizontal bend -</p>
        `,
                    imgUrl: "/images/faq/grp.png",
                    content2: `
                    <p>Where,</p>
                    <ul>
                    <li>P: Thrust force developed by internal pressure</li>
                    <li>A: cross sectional area of pipe</li>
                    <li>Rs: Unit bearing resistance / Passive soil resistance</li>
                    <li>Ff: Unit frictional resistance / skin friction</li>
                    <li>L: Restrained length</li>
                    </ul>`
                },
                {
                    id: "4",
                    title: "How the thrust force is dispersed to the soil by a restrained joint system in a Ductile Iron(DI) pipeline ?",
                    content: `
          <ul>
          <li>Execution of project is faster. Concrete thrust block needs much longer time to install and cure.<li>
          <li>Very useful where there is no space for thrust block.</li>
           <li>Ideal for soils with low bearing capacity where a concrete thrust block can sink.</li>
            <li>Eliminates chance of destabilization due to future excavation.</li>
            <li>It is a more economical solution than conventional concrete thrust block.</li>
            <li>There is further savings in terms of lesser manpower and machine engagement, lesser excavation and land acquisition cost.</li>
            <li>No chance of third party interference</li>
            <li>It is technically advanced and is a more sustainable solution having lesser carbon footprint compared to concrete thrust blocks</li>
        </ul>
     
        `,

                },
            ],
        },
        {
            sectionName: "PART 2",
            faq: [
                {
                    id: "5",
                    title:
                        "Why is the Electrolock restrained joint is known as double-chambered restrained joint?",
                    content: `<p>The Electrolock restrained joint comprises of two chambers. It uses the same gasket as the normal Ductile Iron (DI) pipe push-on joint in the inner chamber to provide leak tightness. The second chamber accommodates mechanical anchorage provided by specially designed locking bars or plates. It locks with a weld bead made on the jointing spigot of the Ductile Iron (DI) pipe.</p>`,
                },
                {
                    id: "6",
                    title:
                        "How many joints are to be restrained in a self-restrained Ductile Iron (DI) pipeline?",
                    content: `<ul>
                    <li>All pipes in the pipeline need not be restrained</li>
                    <li>All bends, reducers, end blocks and tees are to be with restrained joints.</li>
                    <li>All joints on both sides of the fitting within the restraining length are to be restrained.</li>
                    <li>The length to be restrained depends on soil type, backfill compaction level, pipeline profile and working pressure.</li>
                    <li>Non-cohesive or sinking soils with low bearing capacity and lower friction angles require longer lengths of restrained pipes.</li>
                    </ul>`,
                },
                {
                    id: "7",
                    title:
                        "What are the areas of application of Electrolock joint in a Ductile Iron (DI) pipe system?",
                    content: `<p>Some of the areas of application of Electrolock joint in a Ductile Iron(DI) Pipeline are â€“</p>
                    <ul>
                    <li>As a replacement for concrete thrust blocks</li>
                    <li>Where there is not enough space to construct a thrust block</li>
                    <li>In inclined hilly terrain where putting up of thrust block is difficult</li>
                    <li>Where pipes are to laid very quickly</li>
                    <li>Pipe systems for snow-making facilities</li>
                    <li>Turbine penstock pipelines</li>
                    <li>Underground fire-extinguishing pipes</li>
                    <li>Pipes to be laid inside a culvert</li>
                    <li>Trenchless laying and Horizontal Direction Drilling (HDD) application</li>
                    </ul>`,
                },
                {
                    id: "8",
                    title: "Can a Electrolock joint be disassembled?",
                    content: `<p>Since there is no cumbersome bolting is involved in this type of restrained joint, Ductile Iron (DI) pipe and Fittings with Electrolock joints can be disassembled by removal of rubber blocks followed by unlocking the locking bars/plates and by removing them through the front slot one by one.</p>`,
                },
            ],
        },

        {
            sectionName: "PART 3",
            faq: [
                {
                    id: "9",
                    title: "Is the Electrolock joint flexible joint or a rigid joint?",
                    content: `
    <p>
      The unique quality of Ductile Iron (DI) pipe restrained joint system is that it retains joint flexibility while providing physical restraint against axial pull and preventing longitudinal joint separation.
    </p>
    <p>
      Joint flexibility means that the jointed pipe can be deflected from a straight line by a certain angle of deflection, as declared by the manufacturer. The allowable angular deflection for Electrolock joint is given below:
    </p>
  `,
                    tableColumns: ["DN", "Maximum angular joint deflection (in degree)"],
                    tableRows: [
                        ["80-125", "5"],
                        ["150", "5"],
                        ["200", "4"],
                        ["250", "4"],
                        ["300", "4"],
                        ["350", "3"],
                        ["400-500", "3"],
                        ["600", "3"],
                        ["700-1000", "3"],
                    ],
                },
                {
                    id: "10",
                    title:
                        "What is the meaning and concept of restraining length in a self-restrained Ductile Iron (DI) pipe system?",
                    content: `<p>In a typical Ductile Iron (DI) pipeline with restrained joints, the thrust force is calculated and then a system of restrained jointed components, comprising a restrained jointed Ductile Iron (DI) fitting and a requisite number of restrained joint pipes on the upstream and downstream side of the DI fitting are installed to combat the thrust force. The length of pipeline to be restrained is calculated based on the pipeline pressure, type of fittings, surrounding soil parameters and backfill compaction level, as per the provision of ISO:21052.
                    </p>
                    <ul>
                    <li>Restrained joints are normally designed for underground application.</li>
                    <li>All pipes in the pipeline need not be restrained</li>
                    <li>All bends, reducers, end blocks and tees are to be with restrained joints.</li>
                    <li>All joints on both sides of the fittings within the restraining length are to be restrained.</li>
                  </ul>`,
                    imgUrl: "/images/faq/grp2.png",
                },
                {
                    id: "11",
                    title:
                        "What kind of gasket is used for leak sealing in Electrolock joint used in self-restrained Ductile Iron(DI) pipe line?",
                    content: `<p>An Electrolock joint is a double chambered restrained joint, where the inner chamber of the joint houses the normal push-on joint gaskets of EPDM (Ethylene Propylene Diene Monomer) and it does the joint sealing</p>
           `,
                },

            ],
        },
        {
            sectionName: "PART 4",
            faq: [
                {
                    id: "12",
                    title:
                        "Which ISO standard gives the details of restraining length calculation in Ductile Iron (DI) pipeline system?",
                    content: `
        <p>
          The restraining length calculation for Ductile Iron (DI) pipeline systems is generally guided by international standards such as ISO 10804. This standard provides recommendations for the design, installation, and application of restrained joints in DI pipelines, including principles for determining the required restraining length based on soil conditions, pipeline profile, and operating pressure.
        </p>
      `,
                },
                {
                    id: "13",
                    title:
                        "How can over ground Ductile Iron (DI) Pipe installations be restrained with the help of restrained joint?",
                    content: `
        <p>
       As per clause No. 11 of ISO 21052,â€¦ â€œOnly in extraordinary circumstances, e.g. unstable soils, high internal pressure in combination with very shallow cover and exposed pipeline, the joint security is threatened. In these situations, the entire pipeline should be restrained and additional arrangements should be provided so that the angular deflection remains within the prescribed limits.â€ </p>
      
      `,
                },
                {
                    id: "14",
                    title:
                        "How is the allowable pressure rating of Ductile Iron (DI) Electrolock joint determined?",
                    content: `
        <p>
        The pressure bearing ability of a Ductile Iron (DI) restrained joint is declared by the manufacturer based on the type test of the joint conducted by the manufacturer. The table below gives value for allowable operating capacity of Electrolock joint. </p>
  
      `,
                },
                {
                    id: "15",
                    title:
                        "Can Ductile Iron (DI) boltless restrained joint systems like Electrolock be used for trenchless laying?",
                    content: `
        <p>
        Boltless restrained joint is preferred for trenchless laying mainly due to following factors â€“</p>
        <ul>
          <li>As it is boltless system with no extruded part like bolted follower gland, less frictional resistance is encountered during pull or push</li>
          <li>Absence of cumbersome bolted restrained joint fittings</li>
          <li>Being a self-restrained joint, it can effectively resist the pulling force exerted during trenchless laying
</li>
         
        </ul>
      `,
                },
            ],
        },
        {
            sectionName: "PART 5",
            faq: [
                {
                    id: "16",
                    title:
                        "What are the parameters required to calculate restraining length in a self- restrained Ductile Iron(DI)Pipe system?",
                    content: `
        <p>
        A properly designed, restrained pipeline uses the passive bearing strength of the soil and frictional resistance of the soil. Calculation of restraining length depends on certain parameters which are:</p>
      <ul>
      <li>Pipe size and pipe class</li>
    <li>Maximum working pressure of the pipeline</li>
    <li>Type of Fittings</li>
    <li>Trench type</li>
    <li>Depth of cover</li>
    <li>Soil type and characteristics</li>  
    <li>Safety factors</li>
      </ul>
      <p>Detailed calculation can be done as per the method explained in ISO 21052:2021-â€œRestrained joint systems for ductile iron pipelines â€” Calculation rules for lengths to be restrainedâ€.</p>
        `,
                },
                {
                    id: "17",
                    title:
                        "How installtion of Electrolock joint save costs, when it is used in place of Thrust blocks in Ductile Iron (DI) Pipelines?",
                    content: `
        <p>
       A sample cost comparison between supply and installation of Electrolock restrained joint pipes & fittings and supply and installation of socket and spigot joint pipes and fittings with construction of thrust blocks in 1.2 MPa design pressure (WT is at ground level) in cohesiveâ€“granular soil (depth of cover is 1m):</p>
      
      `,
                },

            ],
        },
        {
            sectionName: "PART 6",
            faq: [
                {
                    id: "18",
                    title:
                        "Why are Electrolock joints a more sustainable solution compared to concrete thrust blocks in a typical Ductile Iron (DI) pipeline?",
                    content: `
      <ul>
      <li>Electrolock joints in a Ductile Iron (DI) pipeline are usually used in place of conventional concrete thrust block. Thrust blocks require cement and steel reinforcement. Production of cement and steel has very high carbon foot print.</li>
    <li>Installation of such Boltless restrained joints require lesser excavation during jointing. Thrust block construction requires larger soil excavation hence more man/machine engagement.</li>
    <li>Lesser disturbance of virgin soil indicates more environmental sustainability</li>
    <li>Faster execution of project means a more economic project execution and lesser carbon emission</li>
  
      </ul>
       `,
                },
                {
                    id: "19",
                    title:
                        "How does the use of restrained jointed Ductile Iron (DI) pipes and fittings reduce carbon footprint? ",
                    content: `
        <p>
      Sample Calculation of total carbon emission of construction of a thrust block in Ductile Iron (DI) pipeline and equivalent value of CO2 emission:
Considerations:</p>
      <ul>
      <li>Weight of 1 cubic meter of M20 concrete:
    Quantity of cement required for 1 cubic meter of M20 concrete: - considering, 1440 kg/cum is density of cement, then cement quantity = (1/5.5) Ã—1.54m3 Ã— 1440 kg/cum = 403 kg or around 8 bags of 50 kg of cement."</li>
    <li>Approximated CO2 emission per unit have been considered as per the literature review.</li>
    <li>Approximated Internal Carbon Price (ICP) has been considered as $50/MT of CO2 based on Carbon Disclosure Project, India.</li>
    <li>Approximated Voluntary Carbon Price has been considered as $5/MT of CO2 based on National Carbon Market.</li>
    <li>Carbon Footprint of DI Socket and Spigot pipes and DI Double Chambered Restrained Joint pipes are considered equal for this calculation.</li>
    <li>Design Pressure =1 MPa and Depth of Cover = 1 m</li>
      </ul>
      <p>From the above calculation of carbon emission of conventional Socket and Spigot Pipes with concrete Thrust Block System, Ductile Iron( DI) Double Chamber Restrained Joint Pipes and Fittings will become the successor of Thrust Block day to day, due to lesser carbon footprint of Electrolock type Ductile Iron (DI) Restrained Joint Pipes and Fittings.</p>

      `,
                },

            ],
        }
    ];

    return (
        <>
            <HeroSection
                data={{ title: "FAQ", banner: "/images/paint/b11.jpg" }}
            />
            <section className="!pt-0">

                <div className={`${styles.containerLg} !py-0`}>

                    <FAQAccordion data={data} />
                </div>
            </section>
        </>
    );
}