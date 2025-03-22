import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ICON from "../assets/ICON.png"; // Replace with the path to your image

const Loader = ({ setLoadingComplete }) => {
  const imageRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    // GSAP animation for the image
    gsap.fromTo(
      imageRef.current,
      { scale: 0.2, rotate: 0, x: "-100%" },
      { scale: 1, rotate: 360, x: "0%", duration: 4, ease: "power2.out" }
    );

    // GSAP animation for the progress bar
    gsap.fromTo(
      progressBarRef.current,
      { width: "0%" },
      { width: "100%", duration: 4, ease: "linear" }
    );

    // Complete loader after 4 seconds
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [setLoadingComplete]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 flex flex-col items-center justify-center z-50">
      {/* Rotating Image */}
      <img
        ref={imageRef}
        src={ICON}
        alt="Loading Icon"
        className="w-80 h-80 mb-6"
      />

      {/* Progress Bar */}
      <div className="w-1/4 h-2 bg-gray-500 rounded-full overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-white"
        ></div>
      </div>
    </div>
  );
};

export default Loader;
