/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import AnimatedSection from "../Components/AnimatedSection";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-12 px-6 md:px-16 lg:px-32">
      {/* Title */}
      <AnimatedSection y={0} skew={-5} delay={0}>
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-primary mb-12 font-Lexend">
          {t("about.title")}
        </h1>
      </AnimatedSection>

      {/* Mission Section */}
      <AnimatedSection y={0} skew={-10} delay={0.1}>
        <div className="head">
          <h2 className="text-2xl font-bold text-primary mb-4 font-Lexend">
            {t("about.missionTitle")}
          </h2>
          <p className="quots">
            {t(
              "about.missionDesc"
            )}
          </p>
        </div>
      </AnimatedSection>

      {/* Vision Section */}
      <AnimatedSection y={0} skew={-10} delay={0.2}>
        <div className="head">
          <h2 className="text-2xl font-bold text-primary mb-4">
            {t("about.visionTitle")}
          </h2>
          <p className="quots">
            {t(
              "about.visionDesc"
            )}
          </p>
        </div>
      </AnimatedSection>

      {/* Why Donate Section */}
      <AnimatedSection y={0} skew={-10} delay={0.3}>
        <div className="head">
          <h2 className="text-2xl font-bold text-primary mb-4">
            {t("about.whyDonateTitle")}
          </h2>
          <p className="quots">
            {t(
              "about.whyDonateDesc"
            )}
          </p>
        </div>
      </AnimatedSection>

      {/* Join the Cause Section */}
      <AnimatedSection y={0} skew={-10} delay={0.4}>
        <div className="head">
          <h2 className="text-2xl font-bold text-primary mb-4">
            {t("about.joinTitle")}
          </h2>
          <p className="quots">
            {t(
              "about.joinDesc"
            )}
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default About;
