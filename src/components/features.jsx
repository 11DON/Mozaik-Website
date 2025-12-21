import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faDollarSign, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import styles from "/src/styles/features.module.css";

export default function Features() {
    return (
        <section className={styles.features}>
            <h3>لماذا تختار موزياك ؟</h3>

            <div className={styles.featuresGrid}>
                <motion.div
                    className={styles.featureCard}
                    whileInView={{ opacity: [0, 1], transition: { duration: 2 }, y: [20, 0] }}

                >
                    <FontAwesomeIcon icon={faDollarSign} className={styles.featureIcon} />
                    <div className={styles.col}></div>

                    <div className={styles.featureTitle}>افضل الأسعار</div>
                </motion.div>

                <motion.div
                    className={styles.featureCard}
                    whileInView={{ opacity: [0, 1], transition: { duration: 1 }, y: [20, 0] }}

                >
                    <FontAwesomeIcon icon={faBolt} className={styles.featureIcon} />
                    <div className={styles.col}></div>
                    <div className={styles.featureTitle}>احدث التقنيات</div>
                </motion.div>

                <motion.div
                    className={styles.featureCard}
                    whileInView={{ opacity: [0, 1], transition: { duration: 0.5 }, y: [20, 0] }}
                >
                    <FontAwesomeIcon icon={faBuilding} className={styles.featureIcon} />
                    <div className={styles.col}></div>

                    <div className={styles.featureTitle}>سرعة الانجاز</div>
                </motion.div>
            </div>
        </section>
    );
}
