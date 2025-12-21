import styles from "/src/styles/aboutUs.module.css";
import assets from "/src/assets/homeAsset1.png";

export default function AboutUsSections() {
    return (
        <section className={styles.aboutWrap}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>عن موزياك</h2>
                        <p className={styles.cardText}>
                            موزييك صبغة هندسية بدأت منذ فترة زمنية لترسم صورة لمستقبل ناجح في مجـــال التصميم
                            والبنـــاء ومن هنا بدأت شركــة موزييك بانطلاقــة ثابتة في عالم التصميم والبناء معتمــدة
                            على آلية تنظيميـــة متطورة وتخطيط قائم على هيكل تنظيمي قادها للتميز في مجال المقـاولات
                            ومن خلال الانطلاقــة الأولى للشركـة تحدد الهـــدف وهو التخصص في تصميم وبناء الوحـدات
                            السكنية والتجاريــة والأبراج بمختلف أنواعه .
                        </p>
                        <button className={styles.moreBtn}>اعرف المزيد</button>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.bar} />
                    <div className={styles.imageCard}>
                        <img src={assets} alt="about" className={styles.aboutImage} />
                    </div>
                </div>
            </div>
        </section>
    );
}