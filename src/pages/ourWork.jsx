import styles from "/src/styles/OurWork.module.css";
import work1 from "/src/assets/work.png";
import { motion } from "framer-motion";
import { FaPaintBrush, FaCamera } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import OurPreviousWork from "../components/ourPreviousWork";

const workServicesItems = [
  {
    title: "تصميم واجهة المستخدم (UI)",
    des: "نصمم واجهات جذابة وبديهية تضمن تجربة مستخدم سلسة وفعالة.",
    icon: FaPaintBrush,
  },
  {
    title: "تجربة المستخدم (UX)",
    des: "نركز على فهم احتياجات المستخدم لإنشاء تجارب تفاعلية تلبي أهداف عملك.",
    icon: CgWebsite,
  },
  {
    title: "التصوير الفوتوغرافي الإبداعي",
    des: "نوفر تصويراً احترافياً يعزز علامتك التجارية ويبرز جمال منتجاتك وخدماتك.",
    icon: FaCamera,
  },
];

export default function OurWork() {
  return (
    <section>
      {/* Header */}
      <motion.div
        whileInView={{ opacity: [0, 1], y: [50, 0] }}
        transition={{ duration: 0.5 }}
        className={styles.workHeader}
      >
        <h2>مهمتنا ورؤيتنا</h2>
        <p>تحديد مسار النمو والابتكار في المشهد العمراني المصري</p>
      </motion.div>

      {/* Main Work Section */}
      <div className={styles.work}>
        <motion.div
          whileInView={{ opacity: [0, 1], x: [70, 0] }}
          transition={{ duration: 1 }}
          className={styles.workContent}
        >
          <h1>تصميمات مبتكرة تعكس رؤيتك</h1>
          <p>
            نقدم حلول تصميم إبداعية تحول أفكارك إلى واقع ملموس، مع التركيز على
            الجودة والتفرد.
          </p>
          <button className={styles.moreBtn}>اطلب استشارة تصميم مجانية</button>
        </motion.div>

        <motion.div
          whileInView={{ opacity: [0, 1], x: [-70, 0] }}
          transition={{ duration: 1 }}
          className={styles.workImageContainer}
        >
          <img src={work1} className={styles.workImage} alt="Mission" />
        </motion.div>
      </div>

      {/* Services Section */}
      <div className={styles.workServices}>
        <h1>خدماتنا التصميمية المتميزة</h1>
        <div className={styles.workServicesList}>
          {workServicesItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={styles.workServicesItem}
            >
              <item.icon size={40} color="#E08F4C" />
              <h3>{item.title}</h3>
              <p>{item.des}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <OurPreviousWork />
    </section>
  );
}
