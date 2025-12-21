import styles from "/src/styles/homeHero.module.css";
import whiteLogo from "/src/assets/mLogoW.png";

export default function HomeHero() {
    return (
        <header className={styles.hero}>
            <div className={styles.overlay} />
            <div className={styles.circle} />

            <div className={styles.content}>
                <img src={whiteLogo} className={styles.logo} alt="mozaik logo" />;
                <div className={styles.titleWrap}>
                    <h1 className={styles.title}>انطلاقة ثابتة</h1>
                    <p className={styles.subtitle}>في عالم التصميم و البناء</p>
                </div>
                <button className={styles.cta}>تواصل معنا الآن</button>
            </div>
        </header>
    );
}

