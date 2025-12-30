import styles from "/src/styles/services.module.css";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "اعمال التشطيبات",
    img: "/src/assets/s1.png",
    des: "ترميم وتطوير الفلل والعمائر السكنية، دراسات رفع القيمة العقارية وتحسين العائد الاستثمارينضمن تنفيذ مشاريعكم بسلاسة وفاعلية، من التخطيط الأولي وحتى التسليم النهائي، وفقاً لأعلى المعايير.",
    displace: 70,
  },
  {
    id: 2,
    title: "خدمات التأثيث",
    img: "/src/assets/s2.png",
    des: "تصميم وتوزيع الأثاث للشقق والمكاتب، تصميم الإنارة، تأسيس أنظمة المنازل الذكية والأمنية",
    displace: 80,
  },
  {
    id: 3,
    title: "تطوير الوحدات السكنية",
    img: "/src/assets/s3.png",
    des: "ترميم وتطوير الفلل والعمائر، رفع القيمة العقارية وتحسين العائد الاستثماري",
    displace: 80,
  },
  {
    id: 4,
    title: "التصميم الداخلي",
    img: "/src/assets/s4.png",
    des: "تصميم الديكورات، الواجهات، الفلل، المكاتب، المحلات، المطاعم، الحدائق",
    displace: 80,
  },
];

const titleVariants = {
  rest: { y: 0 },
  hover: {
    y: 80,
    transition: { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] },
    viewport: { once: true },
  },
};

const descVariants = {
  rest: { opacity: 0, y: 30 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: 0.06 },
    viewport: { once: true },
  },
};

export default function Services() {
  return (
    <section className={styles.services}>
      <h1>خدماتنا</h1>
      <div className={styles.servicesGrid}>
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            className={styles.serviceCard}
            initial={{ opacity: 0, x: -s.displace }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.64,
              delay: i * 0.14,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            viewport={{ once: true, amount: 0.25 }}
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
              />

              <motion.h4
                className={styles.serviceTitle}
                variants={titleVariants}
              >
                {s.title}
              </motion.h4>

              <motion.div className={styles.serviceOverlay}>
                <motion.div className={styles.overlayInner}>
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
