import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./LineScroller.css";

const LineScroller = () => {
  const [scrollHeight, setScrollHeight] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / docHeight) * 100;
    setScrollHeight(scrollPercentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    console.log("LineScroller rendered"),
    (
      <div className="line-scroller-container">
        <motion.div
          className="line-scroller"
          style={{ height: `${scrollHeight}%` }}
          animate={{}}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    )
  );
};

export default LineScroller;
