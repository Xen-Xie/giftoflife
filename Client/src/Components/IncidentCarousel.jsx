/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const CarouselSection = () => {
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);
  const startX = useRef(0);
  const endX = useRef(0);
  // Photos Fetching Logic
const fetchPhotos = async () => {
  try {
    const response = await axios.get("https://giftoflife.onrender.com/api/allphotos");
    setPhotos(response.data);
  } catch (err) {
    console.error("Error fetching photos:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchPhotos();
  }, []);
  //Carousel Logic
  // Auto-slide logic
  const resetAutoSlide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
  }, [photos.length]);

  useEffect(() => {
    if (photos.length) resetAutoSlide();
    return () => clearTimeout(timeoutRef.current);
  }, [index, photos.length, resetAutoSlide]);

  // Manual Navigation
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Swipe gesture support
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = startX.current - endX.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0) nextSlide();
      else prevSlide();
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg font-medium mt-6">Loading...</div>
    );
  }

  if (!photos.length) {
    return (
      <div className="text-center text-lg font-medium mt-6">
        No photos uploaded yet.
      </div>
    );
  }

  return (
    <div
      className="relative max-w-3xl sm:mx-auto mx-4 mt-10 overflow-hidden rounded-xl shadow-lg select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => clearTimeout(timeoutRef.current)}
      onMouseLeave={resetAutoSlide}
      ref={containerRef}
    >
      <div className="relative w-full pt-[56.25%]">
        {" "}
        {/* 16:9 Aspect Ratio Container */}
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={photos[index]._id}
            src={photos[index].imageUrl}
            alt={photos[index].caption}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={prevSlide}
          className="bg-melty/40 text-BG rounded-full w-10 h-10 hidden sm:flex items-center justify-center hover:bg-melty/60 transition-all duration-300 "
          aria-label="Previous Slide"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button
          onClick={nextSlide}
          className="bg-melty/40 text-BG rounded-full w-10 h-10 hidden sm:flex items-center justify-center hover:bg-melty/60 transition-all duration-300"
          aria-label="Next Slide"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 bg-melty/50 text-BG text-center py-2 text-sm font-Lexend">
        {photos[index].caption || "No caption"}
      </div>
    </div>
  );
};

export default CarouselSection;
