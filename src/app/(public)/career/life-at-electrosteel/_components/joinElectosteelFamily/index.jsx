"use client";
import React, { useState } from "react";
import styles from "@/app/common.module.css";
import { Button } from "@/components/ui/Button";
import JoinElectrosteelFamilyModal from "@/components/modals/joinElectrosteelModal";

const JoinElectrosteelFamily = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOpen = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="bg-[#f9f9f9]">
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <h2 className="text-center !w-full">
            If you think you embody our values and vision and <br />
            <span>would like to be a part of the Electrosteel family</span>
          </h2>

          <div className="text-center mt-6">
            <Button
            className={"btn btn-primary mx-auto"}
              title="Apply Now"
              action={handleOpen}
            />
          </div>

          {isModalOpen && (
            <JoinElectrosteelFamilyModal onClose={handleClose} />
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinElectrosteelFamily;
