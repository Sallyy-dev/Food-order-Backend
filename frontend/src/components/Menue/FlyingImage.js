import { motion } from "framer-motion";
import React from "react";

function FlyingImage({ img, start, end, onComplete }) {
  return (
    <motion.img
      src={img}
      alt="flying"
      initial={{ x: start.y, y: start.y, scale: 1.5, opacity: 1 }}
      animate={{ x: end.x, y: end.y, scale: 0.2, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: "fixed",
        width: 80,
        height: 80,
        borderRadius: 8,
        pointerEvents: "none",
        zIndex: 2000,
      }}
      onAnimationComplete={onComplete}
    />
  );
}

export default FlyingImage;
