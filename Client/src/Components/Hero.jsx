/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { useTranslation } from 'react-i18next';
import Button from './Button';

function Hero() {
  const { t, i18n } = useTranslation();
  const quoteLines = t('quote', { returnObjects: true }); // array of quotes

  return (
    <section className="bg-animated relative w-full flex items-center justify-center bg-gradient-to-br from-red-100 via-pink-50 to-white dark:from-[#0f0f1a] dark:via-[#23263d] dark:to-[#3e5370] px-6 font-Lexend">
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
          {t('subtext')}
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full max-w-xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <input
              type="text"
              placeholder={t('search_placeholder')}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              className="w-full md:w-40 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>{t('blood_group')}</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
            <Button>{t('search')}</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
