import { useState } from "react";
import arcticleImg from "../assets/article.png";
import arcticleImg1 from "../assets/article1.png";
import arcticleImg2 from "../assets/article2.png";
import arcticleImg3 from "../assets/article3.png";
import arcticleImg4 from "../assets/article4.png";
import arcticleImg5 from "../assets/article5.png";
import arcticleImg6 from "../assets/article6.png";
import arcticleImg7 from "../assets/article7.png";
import arcticleImg8 from "../assets/article8.png";


import styles from "/src/styles/news.module.css";
import { motion, AnimatePresence } from "framer-motion";
const articles = [
  {
    title: "الاتجاهات الحديثة في التصميم الرقمي لعام 2024",
    img: arcticleImg,
    describtion:
      "استكشف أحدث الابتكارات والأساليب التي تشكل مستقبل التصميم الرقمي في عام 2024.",
    writtenBy: "فاطمة الزهراء",
    date: "12 يناير 2024",
    category: "تصميم",
  },
  {
    title: "أفضل ممارسات تطوير البرمجيات",
    img: arcticleImg1,
    describtion: "تعرف على أفضل الأساليب الحديثة في تطوير البرمجيات.",
    writtenBy: "أحمد علي",
    date: "15 فبراير 2024",
    category: "برمجة",
  },
  {
    title: "أفضل ممارسات تطوير البرمجيات",
    img: arcticleImg2,
    describtion: "تعرف على أفضل الأساليب الحديثة في تطوير البرمجيات.",
    writtenBy: "أحمد علي",
    date: "15 فبراير 2024",
    category: "برمجة",
  },
  {
    title: "أفضل ممارسات تطوير البرمجيات",
    img: arcticleImg3,
    describtion: "تعرف على أفضل الأساليب الحديثة في تطوير البرمجيات.",
    writtenBy: "أحمد علي",
    date: "15 فبراير 2024",
    category: "تكنولوجيا",
  },
  {
    title: "أفضل ممارسات تطوير البرمجيات",
    img: arcticleImg4,
    describtion: "تعرف على أفضل الأساليب الحديثة في تطوير البرمجيات.",
    writtenBy: "أحمد علي",
    date: "15 فبراير 2024",
    category: "تصميم",
  },
  {
    title: "أفضل ممارسات تطوير البرمجيات",
    img: arcticleImg5,
    describtion: "تعرف على أفضل الأساليب الحديثة في تطوير البرمجيات.",
    writtenBy: "أحمد علي",
    date: "15 فبراير 2024",
    category: "الابتكار",
  },
  {
    title: "أفضل ممارسات تطوير البرمجيات",
    img: arcticleImg6,
    describtion: "تعرف على أفضل الأساليب الحديثة في تطوير البرمجيات.",
    writtenBy: "أحمد علي",
    date: "15 فبراير 2024",
    category: "تحليلات البيانات",
  },
    {
    title: "أفضل ممارسات تطوير البرمجيات",
    img: arcticleImg7,
    describtion: "تعرف على أفضل الأساليب الحديثة في تطوير البرمجيات.",
    writtenBy: "أحمد علي",
    date: "15 فبراير 2024",
    category: "تحليلات البيانات",
  },  {
    title: "أفضل ممارسات تطوير البرمجيات",
    img: arcticleImg8,
    describtion: "تعرف على أفضل الأساليب الحديثة في تطوير البرمجيات.",
    writtenBy: "أحمد علي",
    date: "15 فبراير 2024",
    category: "تحليلات البيانات",
  },
];

const categories = [
  "الكل",
  "أخبار الصناعة",
  "تصميم الواجهات",
  "التسويق الرقمي",
  "التطوير الويب",
  "دراسات حالة",
  "أخبار الشركة",
  "نصائح تقنية",
  "الابتكار",
  "تحليلات البيانات",
];

export default function News() {
  // ✅ hook inside component
  const [activeCategory, setActiveCategory] = useState("الكل");

  // ✅ derived data inside component
  const mainArticle = articles[0];
  const otherArticles = articles.slice(1);

  const filteredArticles =
    activeCategory === "الكل"
      ? otherArticles
      : otherArticles.filter((article) => article.category === activeCategory);

  return (
    <section className={styles.articlePage}>
      <h1>المقالة المميزة</h1>

      {/* MAIN ARTICLE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className={styles.mainArticle}
      >
        <div className={styles.mainArticleCard}>
          <h2>{mainArticle.title}</h2>
          <p>{mainArticle.describtion}</p>
          <div className={styles.dateby}>
            <span>{mainArticle.writtenBy}</span>
            <span>{mainArticle.date}</span>
          </div>
          <button className={styles.readMore}>اقرأ المزيد</button>
        </div>

        <div className={styles.imgWrapper}>
          <img src={mainArticle.img} alt={mainArticle.title} />
        </div>
      </motion.div>
      <h1>تصفح المقالات حسب الفئة</h1>
      {/* CATEGORY TABS */}
      <div className={styles.tabs}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.tab} ${
              activeCategory === cat ? styles.activeTab : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FILTERED ARTICLES */}
      <h1>آخر المقالات</h1>
      <div className={styles.articlesList}>
        {filteredArticles.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
              ease: "easeOut",
            }}
            whileHover={{
              y: -4,
              boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
            }}
            className={styles.articleCard}
            key={index}
          >
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.describtion}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
