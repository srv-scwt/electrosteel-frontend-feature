"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import cstyles from "@/app/common.module.css";
import DirectorCard from "../directorsCard";
import { people } from "./m.data";
import DirectorModel from "@/components/modals/directorModel";

const DirectorSection = ({ people =[] }) => {
  // const [isModelOpen, setModelOpen] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState(null);

  // const handleOpenModel = () => {
  //   setModelOpen(!isModelOpen)
  // };

  const handleOpenModel = (director) => {
    setSelectedDirector(director);
  };

  return (
    <>
      <section className="bg-white">
        <div className={cstyles.containerLg}>
          <ul
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${styles.directorGrid}`}
          >
            {Array.isArray(people) && people.map((items, index) => (
              <DirectorCard key={index} data={items} action={() => handleOpenModel(items)} />
            ))}
          </ul>
        </div>
      </section>
      {/* <DirectorModel action={handleOpenModel} isModelOpen={isModelOpen} data={selectedDirector} /> */}
      <DirectorModel
        action={() => setSelectedDirector(null)}
        isModelOpen={!!selectedDirector}
        data={selectedDirector}
      />

    </>
  );
};

export default DirectorSection;
