import styles from '../styles/contactbanner2.module.css';
export default function ContactBanner2() {
    return (
        <div className={styles.contactBanner}>
            <h1>هل أنت مستعد لبدء مشروعك القادم ؟</h1>
            <p>فريقنا المتخصص هنا لدعمك في كل خطوة، من الفكرة إلى التنفيذ.</p>
            <button className={styles.contactButton}>تواصل معنا الآن</button>
        </div>
    )
}
