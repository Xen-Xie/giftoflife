/* eslint-disable no-unused-vars */
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useTranslation } from "react-i18next";
import Button from "./Button";

function Hero() {
  const { t, i18n } = useTranslation();
  const quoteLines = t('quote', { returnObjects: true }); // array of quotes
  const heroText = t('hero', { returnObjects: true });
  const navText = t('nav', { returnObjects: true });
  return (
    <section className="relative w-full flex items-center justify-center px-6 font-Lexend">
      <div className="max-w-4xl w-full text-center space-y-6">
        {/* Typewriter Quote */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold text-melty dark:text-primary leading-tight min-h-[80px] md:min-h-[120px] mt-10"
        >
          <span className="inline-block">
            <Typewriter
              words={quoteLines}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 dark:text-primary"
        >
          {t("subtext")}
        </motion.p>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {t(heroText.joinCommunity)}
        </p>
        <Link to="/find-donor">
          <Button className="px-6 py-3 text-lg text-center mx-auto">
            {t(navText.findDonor)}
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
