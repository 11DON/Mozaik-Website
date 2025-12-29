import styles from "/src/styles/callToAction.module.css";
import {motion} from "framer-motion"
import { Link } from "react-router-dom";

export default function CTA (){
    return (
        <motion.div
        whileInView={{opacity:[0,1],y:[-100,0]}}
        transition={{duration:1, ease:"easeOut"}}
        className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            هل لديك مشروع في ذهنك؟
          </h2>
          <p className={styles.ctaDescription}>
            دعنا نحول أفكارك إلى واقع مميز
          </p>
          <Link to="/contact">
                    <button className={styles.ctaBtn}>
            تواصل معنا الآن
          </button>
          </Link>

        </motion.div>
    )
}