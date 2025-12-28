import CTA from "./cta";
import styles from "/src/styles/work.module.css";

export default function OurPreviousWork() {
  const projects = [
    {
      id: 1,
      title: "تجديد فندق القاهرة الفاخر",
      category: "تصميم داخلي",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
      description: "تحدي إعادة تصميم فندق تاريخي. يتطلب الحفاظ على الطابع العمراني الأصلي مع تحديث المرافق الحديثة وإعادة تصميم الفضاءات الداخلية للمستفيدين والضيوف",
      features: [
        "اكتشاف وتخطيط الاحتياجات",
        "تطوير المفهوم والتصميم الأولي",
        "تحليل الموارد والأولان",
        "التنفيذ والإشراف الفني"
      ]
    },
    {
      id: 2,
      title: "تصميم تطبيق 'معالم مصر'",
      category: "تطوير تطبيقات الهواتف",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      description: "تحدي تطبيق موبايل سهل الاستخدام لعرض المواقع الأثرية والسياحية في مصر. التطبيق تصميم واجهة مستخدم بسيطة وجذابة متوافقة مع جميع أنظمة التشغيل",
      features: [
        "تحليل المتطلبات وتحديد الوظائف",
        "تصميم تدفق المستخدم وشاشات التطبيق",
        "تصميم الواجهة الرسومية والتجارة البرمجية",
        "اختبار المستخدم وتحسينات الأداء"
      ]
    },
    {
      id: 3,
      title: "علامة تجارية لمقهى 'نيل الكرامة'",
      category: "هوية بصرية",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
      description: "تحدي بناء هوية بصرية مميزة لمقهى جديد يستوحى من النيل وتراث مصري. العمل تضمين شعار مع لوحات الألوان وأنماطة متنوعة للعلامة التجارية",
      features: [
        "بحث السوق وتحليل المنافسين",
        "تصميم الشعار وتطوير المفهوم",
        "تحديد لوحة الألوان والخطوط",
        "تصميم المواد التسويقية والمطبوعات"
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>أعمالنا المميزة</h1>
          <div className={styles.titleUnderline}></div>
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={index % 2 === 0 ? styles.projectCard : styles.projectCardReverse}
            >
              {/* Image Section */}
              <div className={styles.imageSection}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.projectImage}
                />
                <div className={styles.categoryBadge}>
                  {project.category}
                </div>
              </div>

              {/* Content Section */}
              <div className={styles.contentSection}>
                <h2 className={styles.projectTitle}>
                  {project.title}
                </h2>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>

                {/* Features List */}
                <div className={styles.featuresList}>
                  {project.features.map((feature, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <div className={styles.featureBullet}></div>
                      <p className={styles.featureText}>{feature}</p>
                    </div>
                  ))}
                </div>

                {/* View More Button */}
                <button className={styles.viewDetailsBtn}>
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
          <CTA />
       
      </div>
    </div>
  );
}