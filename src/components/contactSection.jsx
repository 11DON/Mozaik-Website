import styles from "/src/styles/contact.module.css";

export default function ContactSection() {
  return (
    <section className={styles.contact}>
      <div className={styles.contactInner}>
        <h2>احصل علي استشارة مجانية</h2>
        <p className={styles.contactLead}>يرجى ترك رسالة لنا تحتوي على تفاصيل المشروع، وسنرسل لك لتحديد موعد استشارة مجانية</p>

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
              const response = await fetch("http://localhost:5137/api/send-email", {
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
          }}
        >
          <div className={styles.row}>
            <input name="name" placeholder="الاسم" />
            <input name="service" placeholder="الخدمة المطلوبة" />
          </div>
          <div className={styles.row}>
            <input name="city" placeholder="المدينة" />
            <input name="phone" placeholder="رقم الجوال" />
          </div>
          <textarea name="project" placeholder="وصف المشروع" />
          <button type="submit" className={styles.contactButton}>ارسل طلبك</button>
        </form>

      </div>
    </section>
  );
}
