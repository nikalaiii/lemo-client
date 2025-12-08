// FloatingNumber.tsx
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface FloatingNumberProps {
  leftPercent: number;   // позиція по X у відсотках від ширини графіку
  duration?: number;     // час падіння
  onDone: () => void;    // викликається коли анімація закінчилась (прибрати з DOM)
}

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const FloatingNumber: React.FC<FloatingNumberProps> = ({
  leftPercent,
  duration = 10,
  onDone,
}) => {
  const [value, setValue] = useState(() => randInt(100, 999));

  // міняємо число кожні 300мс
  useEffect(() => {
    const id = setInterval(() => {
      setValue(randInt(100, 999));
    }, 300);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ top: "-10%", opacity: 0 }}      // старт трохи вище бокса
      animate={{ top: "110%", opacity: [0, 1, 1, 0] }} // до низу + трохи нижче
      transition={{ duration, ease: "linear" }}
      onAnimationComplete={onDone}
      style={{
        position: "absolute",
        left: `${leftPercent}%`,
        transform: "translateX(-50%)",
        fontFamily: "monospace",
        fontSize: 12,
        color: "rgba(148,163,184,0.6)",
        pointerEvents: "none",
      }}
    >
      {value}
    </motion.div>
  );
};

export default FloatingNumber;
