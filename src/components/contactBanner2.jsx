import styles from '../styles/contactbanner2.module.css';
import { Link } from "react-router-dom";

export default function ContactBanner2() {
    return (
        <div className={styles.contactBanner}>
            <h1>هل أنت مستعد لبدء مشروعك القادم ؟</h1>
            <p>فريقنا المتخصص هنا لدعمك في كل خطوة، من الفكرة إلى التنفيذ.</p>
            <Link to="/contact">            <button className={styles.contactButton}>تواصل معنا الآن</button>
</Link>
        </div>
    )
}
