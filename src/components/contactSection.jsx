import styles from "/src/styles/contact.module.css";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.contactInner}>
        <h2>احصل علي استشارة مجانية</h2>
        <p className={styles.contactLead}>
          يرجى ترك رسالة لنا تحتوي على تفاصيل المشروع، وسنرسل لك لتحديد موعد
          استشارة مجانية
        </p>

        {/* Contact Form */}
        <form
          className={styles.contactForm}
          onSubmit={async (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const service = e.target.service.value;
            const city = e.target.city.value;
            const phone = e.target.phone.value;
            const project = e.target.project.value;

            try {
              const response = await fetch(
                "http://localhost:5137/api/send-email",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    user_name: name,
                    service,
                    city,
                    phone,
                    project,
                  }),
                }
              );

              const data = await response.json();
              if (response.ok) {
                alert("تم إرسال طلبك بنجاح!");
                e.target.reset();
              } else {
                alert("حدث خطأ: " + data.message);
              }
            } catch (error) {
              alert("خطأ في الاتصال بالخادم: " + error.message);
            }
          }}
        >
          {/* Name + Service */}
          <motion.div
            viewport={{ once: true }}
            whileInView={{
              opacity: [0, 1],
              x: [100, 0],
              transition: { duration: 0.6 },
            }}
          >
            <div className={styles.row}>
              <input name="name" placeholder="الاسم" required />
              <select name="service" required>
                <option value="">اختر الخدمة المطلوبة</option>
                <option value="التشطيبات">التشطيبات</option>
                <option value="التأسيس">التأثيث</option>
                <option value="إعادة التأهيل">إعادة التأهيل</option>
                <option value="خدمات الديكور">خدمات الديكور</option>
                <option value="الترميم">الترميم</option>
                <option value="التصميم الداخلي">التصميم الداخلي</option>
                <option value="التصميم الخارجي">التصميم الخارجي</option>
              </select>
            </div>
          </motion.div>

          {/* City + Phone */}
          <motion.div
            viewport={{ once: true }}
            whileInView={{
              opacity: [0, 1],
              x: [100, 0],
              transition: { duration: 1 },
            }}
          >
            <div className={styles.row}>
              <input name="city" placeholder="المدينة" required />
              <input name="phone" placeholder="رقم الهاتف" required />
            </div>
          </motion.div>

          {/* Project Description */}
          <motion.div
            viewport={{ once: true }}
            whileInView={{
              opacity: [0, 1],
              x: [100, 0],
              transition: { duration: 1.3 },
            }}
          >
            <textarea name="project" placeholder="وصف المشروع" required />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            viewport={{ once: true }}
            whileInView={{
              opacity: [0, 1],
              y: [50, 0],
              transition: { duration: 1.3 },
            }}
          >
            <button type="submit" className={styles.contactButton}>
              ارسل طلبك
            </button>
          </motion.div>
        </form>
      </div>
    </section>
  );
}
