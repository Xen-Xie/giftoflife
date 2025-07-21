/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaWater,
  FaDrumstickBite,
  FaUtensils,
  FaClock,
  FaSmokingBan,
  FaBed,
  FaHeartbeat,
  FaTshirt,
  FaHandHoldingWater,
} from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";

const icons = [
  <FaWater className="text-[#00BFFF] text-3xl" />,
  <FaDrumstickBite className="text-[#A0522D] text-3xl" />,
  <FaUtensils className="text-[#C0C0C0] text-3xl" />,
  <FaClock className="text-[#708090] text-3xl" />,
  <FaSmokingBan className="text-[#D32F2F] text-3xl" />,
  <FaBed className="text-[#87CEFA] dark:text-BG/55 text-3xl" />,
  <FaHeartbeat className="text-[#E53935] text-3xl" />,
  <FaTshirt className="text-[#87CEFA] text-3xl" />,
];

const tips = Array.from({ length: 8 }, (_, i) => ({
  key: `medicalTips.tip${i + 1}`,
  icon: icons[i],
}));

function MedicalTips() {
  const { t } = useTranslation();

  return (
    <section className="py-12 px-6 text-center font-Lexend">
      <h2 className="flex items-center mx-auto text-lg md:text-3xl font-bold text-primary mb-6 gap-2 justify-center">
        <FaHandHoldingWater className="text-xl sm:text-2xl md:text-3xl" />
        {t("medicalTips.title")}
      </h2>

      <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
        {tips.map((tip, index) => (
          <AnimatedSection
            key={tip.key}
            delay={index * 0.2}
            threshold={0.2}
            once={false}
          >
            <div className="h-full flex flex-col justify-between items-center bg-BG dark:bg-melty p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md text-center space-y-4 hover:scale-105 transition-all duration-300 cursor-pointer">
              <p className="text-melty dark:text-BG text-base font-medium">
                {t(tip.key)}
              </p>
              {tip.icon}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

export default MedicalTips;
