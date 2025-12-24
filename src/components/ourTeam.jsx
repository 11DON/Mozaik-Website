import styles from "../styles/ourTeam.module.css";
import teamImg from "/src/assets/t1.jpg";
import { motion } from "framer-motion";
const teamMembers = [
  {
    name: "أحمد محمود",
    role: "مدير عام",
    desc: "يقود الرؤية الاستراتيجية ويدير العمليات اليومية للفرع المصري.",
    img: teamImg,
    delay: 0.1,
  },
  {
    name: "الزهراء",
    role: "رئيسة قسم التصميم",
    desc: "تقود فريق التصميم وتقدم حلولًا إبداعية وممارسات مبتكرة.",
    img: teamImg,
    delay: 0.2,
  },
  {
    name: "كريم خالد",
    role: "مدير المشاريع",
    desc: "يشرف على تنفيذ المشاريع ويضمن تسليمها في الوقت المحدد والجودة المطلوبة.",
    img: teamImg,
    delay: 0.3,
  },
  {
    name: "نور الشريف",
    role: "مهندسة معمارية",
    desc: "متخصصة في تصميم المساحات المستدامة والوظيفية التي تلبي احتياجات العملاء.",
    img: teamImg,
    delay: 0.4,
  },
  {
    name: "يوسف طارق",
    role: "أخصائي تطوير أعمال",
    desc: "يبني علاقات قوية مع العملاء ويستكشف فرص نمو جديدة في السوق المصري.",
    img: teamImg,
    delay: 0.5,
  },
  {
    name: "مريم عادل",
    role: "أخصائية تسويق",
    desc: "تطور وتنفيذ استراتيجيات تسويقية لتعزيز وجود الشركة وعلوائها التجاري.",
    img: teamImg,
    delay: 0.6,
  },
];

export default function OurTeam() {
  return (
    <section className={styles.ourTeamSection} dir="rtl">
      <div className={styles.meetTeamTitle}>
        <h2>تعرف على فريقنا</h2>
        <p>خبرة متفانية لتقديم أفضل الحلو لكم.</p>
      </div>

      <div className={styles.teamMembers}>
        {teamMembers.map((member, idx) => (
          <motion.div
            key={idx}
            className={styles.teamCard}
            viewport={{ once: true }}
            whileInView={{
              x: [100, 0],
              opacity: [0, 1],
              transition: { delay: member.delay, duration: 0.6 },
            }}
          >
            <div className={styles.avatarWrap}>
              <img
                src={member.img}
                alt={member.name}
                className={styles.teamAvatar}
              />
            </div>
            <h3 className={styles.teamName}>{member.name}</h3>
            <p className={styles.teamRole}>{member.role}</p>
            <p className={styles.teamDesc}>{member.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
