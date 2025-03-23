import React, { useEffect, useRef, useState } from "react";
import banner from "/assets/Banner.png";
import Search from "./Search";
import { gsap } from "gsap";

function Banner() {
  const words = ["innovative.", "interesting..", "inspiring..."];
  const [displayedText, setDisplayedText] = useState("i");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const typingSpeed = useRef(150);
  const bannerRef = useRef(null);

  // Typing Animation
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      const dynamicPart = currentWord.slice(1);

      if (!isDeleting) {
        setDisplayedText((prev) =>
          prev.length < currentWord.length
            ? "i" + dynamicPart.slice(0, prev.length)
            : prev
        );

        if (displayedText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setDisplayedText((prev) =>
          prev.length > 1 ? "i" + dynamicPart.slice(0, prev.length - 2) : prev
        );

        if (displayedText === "i") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }

      typingSpeed.current = isDeleting ? 80 : 120;
    };

    const timer = setTimeout(handleTyping, typingSpeed.current);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex]);

  // Cursor-based Banner Animation
  // Cursor-based Banner Animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xOffset = ((clientX - innerWidth / 2) / innerWidth) * 50; // Scale offset for x-axis
      const yOffset = ((clientY - innerHeight / 2) / innerHeight) * 50; // Scale offset for y-axis

      gsap.to(bannerRef.current, {
        x: xOffset,
        y: yOffset, // Apply y-offset as well
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="w-screen container mx-auto flex flex-col md:flex-row md:mt-40 my-10">
      {/* Text and Input Sectio:n */}
      <div className="w-full md:p-0 sm:p-12 order-2 md:order-1 md:w-1/2 mt-12 md:mt-36 flex flex-col items-center md:items-start">
        <h1 className="text-2xl lg:text-5xl text-white font-bold text-center md:text-left">
          Let's start to learn something <br />
          <span className="text-pink-500">{displayedText}</span>
        </h1>
        <p className="text-sm md:text-2xl text-center md:text-left md:mt-10 mt-4">
          "You can never get a cup of tea large enough or a book long enough to
          suit me"
        </p>
        <Search />
        <p className="text-sm md:text-4xl text-center md:text-left md:mt-20 text-pink-500 mt-4">
          Search Your Soulmate...
        </p>
      </div>

      {/* Image Section */}
      <div className="order-1 w-full mt-20 md:w-1/2 flex justify-center">
        <img
          ref={bannerRef}
          src={banner}
          className="md:w-[600px] md:h-[500px] md:ml-14 lg:ml-64"
          alt="Banner"
        />
      </div>
    </div>
  );
}

export default Banner;
