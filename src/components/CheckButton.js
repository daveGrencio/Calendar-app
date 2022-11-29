import React from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";

const checkVariants = {
  initial: {
    color: "white",
  },
  checked: {
    pathLength: 1,
  },
  unchecked: {
    pathLength: 0,
  },
};

const CheckButton = ({ checked, handleCheck }) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <div className="hidden md:inline-block">
      <motion.div
        style={{}}
        className={checked ? "svgBox bg-green-800/75" : "svgBox bg-gray-100"}
        onClick={handleCheck}
      >
        <motion.svg
          className="check stroke-white"
          viewBox="0 0 53 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            style={{ pathLength, opacity }}
            variants={checkVariants}
            animate={checked ? "checked" : "unchecked"}
            fill="none"
            strokeMiterlimit="10"
            strokeWidth="6"
            d="M1.5 22L16 36.5L51.5 1"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></motion.path>
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default CheckButton;
