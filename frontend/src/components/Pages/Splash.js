import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../../UI/splash.css";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000); 
    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) return null;

  return (
    <div className="splash-container">
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
        alt="logo"
        className="splash-logo"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.h1
        className="splash-title"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Welcome to Orders Online
      </motion.h1>
    </div>
  );
}
