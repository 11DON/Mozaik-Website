import styles from "/src/styles/servicesPage.module.css";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import p1 from "../assets/proj.png";
import p2 from "../assets/proj2.png";
import p3 from "../assets/proj3.png";
import p4 from "../assets/proj4.png";
import p5 from "../assets/proj5.png";
import p6 from "../assets/proj6.png";
import p7 from "../assets/proj7.png";
import p8 from "../assets/proj8.png";

const items = [
  { img: p1, link: "/portfolio/1", duration: 0.3 },
  { img: p2, link: "/portfolio/2", duration: 0.4 },
  { img: p3, link: "/portfolio/4", duration: 0.5 },
  { img: p4, link: "/portfolio/5", duration: 0.6 },
  { img: p5, link: "/portfolio/6", duration: 0.7 },
  { img: p6, link: "/portfolio/7", duration: 0.8 },
  { img: p7, link: "/portfolio/8", duration: 0.9 },
  { img: p8, link: "/portfolio/9", duration: 1 },
];

export default function OurProjects() {
  return (
    <section className={styles.portfolio}>
      <h3>مشاريعنا المميزة </h3>
      <p>
        شاهدوا بعضًا من أعمالنا التي تبرز التزامنا بالجودة والابتكار في كل
        مشروع.
      </p>
      <div className={styles.portfolioGrid}>
        {items.map((item, i) => (
          <Link key={i} to={item.link} className={styles.portfolioLink}>
            <motion.div
              whileTap={{ scale: 0.97 }}
              whileInView={{ opacity: [0, 1], x: [300, 0] }}
              transition={{
                duration: item.duration,
                ease: "easeInOut",
                delay: 0.1,
              }}
              viewport={{ once: true }}
              className={styles.portfolioItem}
              whileHover={{ scale: 1.03 }}
            >
              <div className={styles.imageWrapper}>
                <img src={item.img} alt={`project ${i}`} />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
