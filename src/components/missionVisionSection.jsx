import styles from "../styles/whoAreWe.module.css";
import OurTeam from "./ourTeam";
import missionImage from "/src/assets/Selection.jpg";
import { motion } from "framer-motion";
export default function MissionVisionSection() {
  return (
    <section>
      <motion.div 
      whileInView={{opacity: [0, 1], y: [50, 0]}}
      transition={{duration: 0.5}}
      className={styles.missionVision}>
        <h2>مهمتنا ورؤيتنا</h2>
        <p>تحديد مسار النمو والابتكار في المشهد العمراني المصري</p>
      </motion.div>

      <div className={styles.mission}>
        < motion.div 
        whileInView={{opacity: [0, 1], x: [-70, 0]}}
      transition={{duration: 1}}
        className={styles.missionImageContainer}>
          <img
            src={missionImage}
            className={styles.missionImage}
            alt="Mission"
          />
        </motion.div>
        <motion.div 
        whileInView={{opacity: [0, 1], x: [70, 0]}}
        transition={{duration: 1}}
        className={styles.missionContent}>
          <h3>رؤيتنا:الريادة في تطوير البنية .التحتية وبناء مجتمعات مستدامة</h3>
          <p>
            نطمح لأن نكون الشريك الموثوق والمفضل في مشاريع البنية التحتية
            والتطوير العقاري، من خلال تقديم حلول مبتكرة ومستدامة تتماشى مع
            المعايير العالمية، وتسهم في الارتقاء بجودة الحياة ودعم النمو
            الاقتصادي في الأسواق التي نعمل بها<br></br> نلتزم بتطبيق أفضل الممارسات
            الدولية مع فهم عميق لاحتياجات الأسواق المحلية وتنوعها.
          </p>
        <button className={styles.moreBtn}>اعرف المزيد</button>
          
        </motion.div>
      </div>
      <OurTeam/>
    </section>
  );
}
