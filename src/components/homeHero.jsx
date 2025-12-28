import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "/src/styles/homeHero.module.css";
import whiteLogo from "/src/assets/mLogoW.png";

import bg1 from "/src/assets/hh1.jpg";
import bg2 from "/src/assets/hh2.jpg";

const backgrounds = [bg1, bg2];

export default function HomeHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className={styles.hero}>
      {/* Background Carousel */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className={styles.bg}
          style={{ backgroundImage: `url(${backgrounds[index]})` }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className={styles.overlay} />
      <div className={styles.circle} />

      <div className={styles.content}>
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          delay={0.9}
        >
          <img src={whiteLogo} className={styles.logo} alt="mozaik logo" />
        </motion.div>

        <div className={styles.heroContent}>
          <div className={styles.titleWrap}>
            {/* Title */}
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              delay={0.9}
            >
              انطلاقة ثابتة
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              delay={0.9}
            >
              في عالم التصميم و البناء
            </motion.p>
          </div>

          {/* Button */}
          <motion.button
            className={styles.cta}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const target = document.getElementById("contact");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            تواصل معنا الآن
          </motion.button>
        </div>
      </div>
    </header>
  );
}
