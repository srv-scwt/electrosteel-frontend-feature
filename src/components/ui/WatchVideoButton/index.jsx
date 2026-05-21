"use client"
import React, { useState } from "react";
import { ButtonWithIcon } from "../Button";
import { AiOutlinePlayCircle } from "react-icons/ai";
import VideoModal from "@/components/modals/VideoModel";
// comment
const WatchVideoButton = ({videoLink}) => {
  const [openVideo, setOpenVideo] = useState(false);

  const handleVideoModalOpen = () => {
    setOpenVideo((prev) => !prev);
  };

  return (
    <>
      <ButtonWithIcon
        iconRight={AiOutlinePlayCircle}
        text="Watch Now"
        className="btn btn-primary w-max! "
        action={handleVideoModalOpen}
      />
      {openVideo && (
        <VideoModal
          isModelOpen={openVideo}
          onClose={handleVideoModalOpen}
          isIframe={true}
          videoLink={videoLink}
        />
      )}
    </>
  );
};

export default WatchVideoButton;
