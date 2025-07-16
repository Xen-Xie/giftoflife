/* eslint-disable no-unused-vars */
import { useTranslation } from "react-i18next";
import { FaUserPlus, FaSearchLocation, FaPhoneAlt, FaHeartbeat } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";

const iconList = [FaUserPlus, FaSearchLocation, FaPhoneAlt, FaHeartbeat];

function HowItWorks() {
 const { t } = useTranslation();
 const steps = t("howItWorks.steps", { returnObjects: true });

 return (
   <section className="py-16 px-6 text-center font-Lexend">
     <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10">
       🚀 {t("howItWorks.title")}
     </h2>

     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
       {steps.map((step, index) => {
         const Icon = iconList[index];
         return (
           <AnimatedSection key={index} delay={index * 0.2} threshold={0.2} once={false}>
             <div className="bg-BG dark:bg-melty rounded-xl border border-gray-200 dark:border-gray-700 shadow-md p-6 h-full flex flex-col items-center text-center hover:scale-105 transition-all duration-300 cursor-pointer">
               <div className="text-primary text-3xl mb-4">
                 <Icon />
               </div>
               <h3 className="text-lg font-semibold text-melty dark:text-BG mb-2">
                 {step.title}
               </h3>
               <p className="text-gray-600 dark:text-gray-300 text-sm">
                 {step.desc}
               </p>
             </div>
           </AnimatedSection>
         );
       })}
     </div>
   </section>
 );
}

export default HowItWorks;

