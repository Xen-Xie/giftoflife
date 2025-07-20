/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { cn } from '../../config/cn';

const Button = ({ to, children, onClick, className }) => {
  const content = (
    <motion.button
    onClick={onClick}
  whileTap={{ scale: 0.95 }}
  className={cn(
    "relative flex justify-center text-center overflow-hidden bg-primary px-8 py-3 rounded-full font-medium group shadow-lg hover:shadow-xl transition-shadow duration-300",
    "outline-none ring-0 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-BG dark:hover:ring-offset-BG",
    className
  )}
type='button'>
  <span className="relative z-10 font-Urbanist text-BG text-sm md:text-base whitespace-nowrap">
    {children}
  </span>

  <span
    className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"
    aria-hidden="true"
  />
</motion.button>
  )
  return to ? <Link to={to}>{content}</Link> : content;
};

export default Button;
