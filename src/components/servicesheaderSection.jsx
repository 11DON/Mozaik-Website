import styles from "../styles/servicesPage.module.css";
import {motion} from "framer-motion";
export default function ServicesheaderSection() {
  return (
    <motion.div 
    whileInView={{opacity:[0,1] , y :[-50,0]}}
    animate={{duration:1 , ease : "easeInOut"}}
    className={styles.servicesHeaderSection}>
      <h1>خدماتنا</h1>
      <p>
        نقدم مجموعة متكاملة من الخدمات المعمارية والإنشائية، مصممة خصيصًا لتلبية
        احتياجات السوق المصري
      </p>
    </motion.div>
  );
}
