import { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import AnimatedSection from "./AnimatedSection";

function LiveStats() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://giftoflife.onrender.com/api/stats")
      .then((res) => {
        setUserCount(res.data.total || 0);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
      });
  }, []);
  const { t } = useTranslation();
  const text = t('hero', { returnObjects: true })

  return (
    <div className="text-center mt-10 text-3xl font-bold text-accent font-Lexend">
      <AnimatedSection>
        <span>{t(text.totalUsers)}</span>
      <CountUp className="text-melty dark:text-BG font-Urbanist" end={userCount} duration={2} separator="," />
      </AnimatedSection>
    </div>
  );
}

export default LiveStats;
