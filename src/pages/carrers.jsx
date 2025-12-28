// Careers.jsx
import React, { useEffect, useState } from "react";
import { Briefcase, MapPin } from "lucide-react";
import styles from "/src/styles/carrerspage.module.css";

const API_URL = "http://localhost:5137/api";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    jobId: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch jobs from backend
  useEffect(() => {
    fetchJobs();
  }, []);

const fetchJobs = async () => {
  try {
    setLoading(true);
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const data = await response.json();

    // Parse qualifications JSON and map is_active correctly
    const activeJobs = data
      .filter((job) => job.is_active) // use is_active from backend
      .map((job) => ({
        ...job,
        qualifications: job.qualifications || [],
        location: job.location || "القاهرة، مصر", // Default location
      }));

    setJobs(activeJobs);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    setErrorMessage(
      "فشل في تحميل الوظائف. الرجاء المحاولة مرة أخرى لاحقاً."
    );
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error message when user starts typing
    if (errorMessage) setErrorMessage("");
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setFormData({ ...formData, jobId: job.id });
    
    // Clear any previous messages
    setSuccessMessage("");
    setErrorMessage("");
    
    // Scroll to form
    setTimeout(() => {
      const formSection = document.querySelector(`.${styles.formSection}`);
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.jobId) {
      setErrorMessage("الرجاء اختيار وظيفة للتقديم");
      return;
    }
    
    if (!formData.name.trim()) {
      setErrorMessage("الرجاء إدخال اسمك الكامل");
      return;
    }
    
    if (!formData.email.trim()) {
      setErrorMessage("الرجاء إدخال البريد الإلكتروني");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("الرجاء إدخال بريد إلكتروني صحيح");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    
    try {
      const response = await fetch(`${API_URL}/apply`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("تم إرسال طلبك بنجاح! سنتواصل معك قريباً عبر البريد الإلكتروني.");
        setFormData({ name: "", email: "", message: "", jobId: "" });
        setSelectedJob(null);
        
        // Scroll to success message
        setTimeout(() => {
          const successMsg = document.querySelector(`.${styles.successMessage}`);
          if (successMsg) {
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      } else {
        setErrorMessage(data.message || "فشل في إرسال الطلب. الرجاء المحاولة مرة أخرى.");
      }
    } catch (error) {
      console.error("Application error:", error);
      setErrorMessage("حدث خطأ في الاتصال بالخادم. الرجاء المحاولة مرة أخرى لاحقاً.");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>جاري تحميل الوظائف...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.mainTitle}>انضم إلى فريقنا</h1>
          <p className={styles.subtitle}>
            استكشف الفرص الوظيفية المتاحة وابدأ رحلتك معنا
          </p>
        </div>
      </div>

      {/* Job Listings Grid */}
      <div className={styles.jobsSection}>
        {jobs.length === 0 ? (
          <div className={styles.noJobs}>
            <p className={styles.noJobsText}>
              لا توجد وظائف متاحة حالياً. تحقق مرة أخرى قريباً!
            </p>
          </div>
        ) : (
          <div className={styles.jobsGrid}>
            {jobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobCardContent}>
                  <h3 className={styles.jobTitle}>{job.title}</h3>

                  <div className={styles.jobMeta}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaText}>{job.jobType}</span>
                      <Briefcase className={styles.metaIcon} />
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaText}>{job.location}</span>
                      <MapPin className={styles.metaIcon} />
                    </div>
                  </div>

                  <div className={styles.qualifications}>
                    {job.qualifications && job.qualifications.map((qual, index) => (
                      <span key={index} className={styles.qualificationBadge}>
                        {qual}
                      </span>
                    ))}
                  </div>

                  <p className={styles.jobDescription}>{job.description}</p>

                  <button
                    onClick={() => handleApplyClick(job)}
                    className={styles.applyButton}
                  >
                    قدم الآن
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Form */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>تقديم طلب التوظيف</h2>

          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <label className={styles.label}>اختر الوظيفة *</label>
              <select
                name="jobId"
                value={formData.jobId}
                onChange={handleChange}
                className={styles.select}
                required
                disabled={submitting}
              >
                <option value="">-- اختر وظيفة --</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>الاسم الكامل *</label>
              <input
                type="text"
                name="name"
                placeholder="أدخل اسمك الكامل"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={submitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>البريد الإلكتروني *</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={submitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>رسالة (اختياري)</label>
              <textarea
                name="message"
                placeholder="أخبرنا عن نفسك ولماذا أنت مناسب لهذه الوظيفة..."
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={styles.textarea}
                disabled={submitting}
              />
            </div>

            <button 
              onClick={handleSubmit} 
              className={styles.submitButton}
              disabled={submitting}
            >
              {submitting ? "جاري الإرسال..." : "إرسال الطلب"}
            </button>
          </div>

          {successMessage && (
            <div className={styles.successMessage}>
              <p>{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className={styles.errorMessage}>
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Careers;