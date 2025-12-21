import styles from "/src/styles/services.module.css";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "اعمال التشطيبات",
    img: "/src/assets/s1.png",
    des: "ترميم وتطوير الفلل والعمائر السكنية، دراسات رفع القيمة العقارية وتحسين العائد الاستثماري"
  },
  {
    id: 2,
    title: "خدمات التأثيث",
    img: "/src/assets/s2.png",
    des: "تصميم وتوزيع الأثاث للشقق والمكاتب، تصميم الإنارة، تأسيس أنظمة المنازل الذكية والأمنية"
  },
  {
    id: 3,
    title: "تطوير الوحدات السكنية",
    img: "/src/assets/s3.png",
    des: "ترميم وتطوير الفلل والعمائر، رفع القيمة العقارية وتحسين العائد الاستثماري"
  },
  {
    id: 4,
    title: "التصميم الداخلي",
    img: "/src/assets/s4.png",
    des: "تصميم الديكورات، الواجهات، الفلل، المكاتب، المحلات، المطاعم، الحدائق"
  },
];


const imgVariants = { rest: { scale: 1 }, hover: { scale: 1.03 }, viewport: { once: true } };
// use fixed pixel offsets so the gap between title and description is constant
const overlayVariants = {
    rest: { y: 80, opacity: 0 },
    hover: { y: 0, opacity: 1, transition: { duration: 0.32, ease: "easeOut" },viewport: { once: true } },
};

const titleVariants = {
    rest: { y: 0 },
    hover: { y: -80, transition: { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] },viewport: { once: true } },
};

const descVariants = {
    rest: { opacity: 0, y: 30 },
    hover: { opacity: 1, y: 0, transition: { duration: 0.35, delay: 0.06 },viewport: { once: true } },
};

export default function Services() {
    return (
        <section className={styles.services}>
            <h3>خدماتنا</h3>

            <div className={styles.servicesGrid}>
            {services.map((s) => (
  <motion.div
    key={s.id}
    className={styles.serviceCard}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <motion.div
      className={styles.serviceMedia}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <motion.img
        src={s.img}
        alt={s.title}
        className={styles.serviceImg}
        variants={imgVariants}
      />

      <motion.h4
        className={styles.serviceTitle}
        variants={titleVariants}
      >
        {s.title}
      </motion.h4>

      <motion.div className={styles.serviceOverlay}>
        <motion.div
          className={styles.overlayInner}
          variants={overlayVariants}
        >
          <motion.p
            className={styles.serviceDescription}
            variants={descVariants}
          >
            {s.des}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  </motion.div>
))}

            </div>
        </section>
    );
}
