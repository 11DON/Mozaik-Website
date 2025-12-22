import styles from "/src/styles/aboutUs.module.css";
import assets from "/src/assets/homeAsset1.png";
import {motion} from "framer-motion";
export default function AboutUsSections() {
  return (
    <section className={styles.aboutWrap}>
      <div className={styles.inner}>
        <motion.div
        viewport={{once:true}}
        initial={{opacity:0, x:-100}}
        whileInView={{opacity:1, x:0}}
        transition={{duration:1, ease:"easeOut"}}
        >
          <div className={styles.left}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>عن موزييك</h2>
              <p className={styles.cardText}>
                موزييك صبغة هندسية بدأت منذ فترة زمنية لترسم صورة لمستقبل ناجح
                في مجـــال التصميم والبنـــاء ومن هنا بدأت شركــة موزييك
                بانطلاقــة ثابتة في عالم التصميم والبناء معتمــدة على آلية
                تنظيميـــة متطورة وتخطيط قائم على هيكل تنظيمي قادها للتميز في
                مجال المقـاولات ومن خلال الانطلاقــة الأولى للشركـة تحدد
                الهـــدف وهو التخصص في تصميم وبناء الوحـدات السكنية والتجاريــة
                والأبراج بمختلف أنواعه .
              </p>
              <button className={styles.moreBtn}>اعرف المزيد</button>
            </div>
          </div>
        </motion.div>
        <motion.div
         className={styles.right}
        viewport={{once:true}}
        initial={{opacity:0, x:100}}
        whileInView={{opacity:1, x:0}}
        transition={{duration:1.2, ease:"easeOut"}}

        >
        
        <div>
          <div className={styles.bar} />
          <div className={styles.imageCard}>
            <img src={assets} alt="about" className={styles.aboutImage} />
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
