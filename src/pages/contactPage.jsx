import styles from "/src/styles/contactPage.module.css";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const contactItems = [
  {
    icon: <FaPhoneAlt color="#f58220" size={24} />,
    label: "الهاتف",
    value: "0123456789",
  },
  {
    icon: <FaEnvelope color="#f58220" size={24} />,
    label: "البريد الإلكتروني",
    value: "info@example.com",
  },
  {
    icon: <FaMapMarkerAlt color="#f58220" size={24} />,
    label: "العنوان",
    value: "المدينة، الشارع الرئيسي",
  },
  {
    icon: <FaClock color="#f58220" size={24} />,
    label: "ساعات العمل",
    value: "السبت - الخميس 9 صباحًا - 6 مساءً",
  },
];

export default function ContactPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, service, city, phone, project } = e.target;

    try {
      const response = await fetch(`http://localhost:${process.env.port}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: name.value,
          service: service.value,
          city: city.value,
          phone: phone.value,
          project: project.value,
        }),
      });

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
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.contactInner}>
        {/* Left Column → Form */}
        <div className={styles.contactColumn}>
          <h2>نموذج الاستشارة المجانية</h2>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            {["name,service", "city,phone"].map((row, i) => {
              const fields = row.split(",");
              return (
                <motion.div
                  key={i}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <div className={styles.row}>
                    {fields.map((field) => (
                      <input
                        key={field}
                        name={field}
                        placeholder={
                          field === "name"
                            ? "الاسم"
                            : field === "service"
                            ? "الخدمة المطلوبة"
                            : field === "city"
                            ? "المدينة"
                            : "رقم الجوال"
                        }
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <textarea name="project" placeholder="وصف المشروع" />
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button type="submit" className={styles.contactButton}>
                ارسل طلبك
              </button>
            </motion.div>
          </form>
        </div>

        {/* Right Column → Contact Info */}
        <div className={`${styles.contactColumn} ${styles.contactInfo}`}>
          <h3>معلومات الاتصال</h3>
          {contactItems.map((item, i) => (
            <motion.p
              key={i}
              viewport={{ once: true }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              {item.icon}
              <span>
                {item.label}
                <br />
                {item.value}
              </span>
            </motion.p>
          ))}

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.9989860868677!2d31.3110137!3d30.008185499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145839b16e66cf0f%3A0x50b66a36a0d6cca1!2sZ.MART!5e0!3m2!1sen!2seg!4v1766669822103!5m2!1sen!2seg"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
