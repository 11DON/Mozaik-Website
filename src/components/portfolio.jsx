import styles from "/src/styles/portfolio.module.css";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";

const items = [
  { img: p1, link: "/portfolio/1" },
  { img: p3, link: "/portfolio/3" },
  { img: p2, link: "/portfolio/2" },
  { img: p3, link: "/portfolio/3" },
];
export default function Portfolio() {
  return (
    <section className={styles.portfolio}>
      <h3>معرض اعمالنا</h3>
      <div className={styles.portfolioGrid}>
        {items.map((item, i) => (
          <Link key={i} to={item.link} className={styles.portfolioLink}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileTap={{ scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.portfolioItem}
              whileHover={{ scale: 1.03 }}
            >
              <img src={item.img} alt={`project ${i}`} />
            </motion.div>
          </Link>
        ))}

      </div>
    </section>
  );
}
