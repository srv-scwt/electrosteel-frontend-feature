"use client";
import Image from "next/image";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { ButtonLinkOutlineWithBorder, OutlineButton } from "@/components/ui/Button";

const data = {
  title: "<h2>Electrolock <span>Joint</span></h2>",
  desc: `<p>
    Electrosteel now offers boltless self-restraining joint system both for pipes and fittings, known as Electrolock Joint.</br> </br>This double socket joint uses the same gasket as the traditional push on joint with a second chamber providing anchorage through use of a weld bead and locking ring.
    </P>`,
};

export default function ElectrolockJoint() {
  return (
    <section className="">
      <div className={styles.containerLg}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
          <div className="relative w-full h-64 md:h-80 lg:h-[380px]  overflow-hidden shadow-md">
            <Image
              src="/images/growing_section.png"
              alt="Factory"
              fill
              className="object-cover"
            />
          </div>
          <div className={styles.sectionContent}>
            <HTMLRender htmlString={data?.title} />
            <HTMLRender htmlString={data?.desc} />
            <div className="flex justify-between gap-2 mt-6">
                <ButtonLinkOutlineWithBorder title="Watch Now" goto={"/"} />
                <ButtonLinkOutlineWithBorder title="Download Now" goto={"/"} />
                <ButtonLinkOutlineWithBorder title="FAQ" goto={"/"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
