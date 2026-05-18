"use client"
import React from 'react';
import dynamic from 'next/dynamic';

const ButtonSliderImage = dynamic(() => import('@/components/ui/ButtonSliderImage'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black/30 h-45 w-full animate-pulse flex justify-center items-center z-50" />
  ),
});

const ButtonSwiperImageClient = ({ images , className ,title, imageTitle }) => {
  return (
    <div className={` ${className} w-[95%] m-auto`}>
      <ButtonSliderImage images={images} title={title} imageTitle={imageTitle} />
    </div>
  );
};

export default ButtonSwiperImageClient;
