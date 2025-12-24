import styles from "../styles/journey.module.css";
import { motion } from "framer-motion";
const journey = [
  {
    year: "2018",
    title: "تأسيس فرع مصر",
    desc: "تأسست الشركة بهدف تقديم حلول متكاملة في التصميم والهندسة لخدمة السوق المحلي.",
    side: "left",
    duration: 0.3,
  },
  {
    year: "2019",
    title: "إطلاق أول مشروع كبير",
    desc: "أطلقنا أول مشروع كبير ناجح ساعدنا في بناء سمعة قوية في السوق.",
    side: "right",
        duration: 0.5,

  },
  {
    year: "2021",
    title: "توسيع فريق العمل",
    desc: "تم توسيع فريقنا بمواهب جديدة لتعزيز قدراتنا التشغيلية والتقنية.",
    side: "left",
        duration: 0.7,

  },
  {
    year: "2023",
    title: "شراكات استراتيجية",
    desc: "عقدنا شراكات مع جهات محلية وعالمية لتوسيع نطاق خدماتنا.",
    side: "right",
        duration: 0.9,

  },
  {
    year: "2024",
    title: "الانتقال الرسمي للمقر الجديد",
    desc: "افتتحنا مقرًا جديدًا يدعم نمو الشركة ويوفر بيئة عمل أفضل.",
    side: "left",
        duration: 0.3,

  },
];

export default function OurJourney() {
  return (
    <section className={styles.ourJourneySection} dir="rtl">
      <div className={styles.journeyTitle}>
        <h2>رحلتنا</h2>
        <p>محطات رئيسية نحو النجاح والتميز</p>
      </div>

      <div className={styles.timeline}>
        {journey.map((item, index) => {
          const isLeft = item.side === "left";

          return (
            <div className={styles.timelineRow} key={index}>
              {/* LEFT SIDE */}
              <motion.div
                whileInView={{ opacity: [0, 1], x: [100, 0] }}
                transition={{ duration: item.duration }}
                whileHover={{ scale: 1.1 }}
                viewport={{ once: true }}
                className={styles.sideLeft}
              >
                {isLeft ? (
                  <div className={styles.content}>
                    <div className={styles.journeyYear}>{item.year}</div>
                    <h3 className={styles.journeyTitleItem}>{item.title}</h3>
                    <p className={styles.journeyDesc}>{item.desc}</p>
                  </div>
                ) : (
                  <div className={styles.contentHidden} />
                )}
              </motion.div>

              {/* CENTER DOT (desktop only via CSS) */}
              <div className={styles.center}>
                <div className={styles.dot} />
              </div>

              {/* RIGHT SIDE */}
              <motion.div 
                whileInView={{ opacity: [0, 1], x: [-100, 0] }}
                transition={{ duration: item.duration ,ease: "easeOut"}}
                whileHover={{ scale: 1.1 }}
                
                viewport={{ once: true }}
              className={styles.sideRight}>
                {!isLeft ? (
                  <div className={styles.content}>
                    <div className={styles.journeyYear}>{item.year}</div>
                    <h3 className={styles.journeyTitleItem}>{item.title}</h3>
                    <p className={styles.journeyDesc}>{item.desc}</p>
                  </div>
                ) : (
                  <div className={styles.contentHidden} />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
