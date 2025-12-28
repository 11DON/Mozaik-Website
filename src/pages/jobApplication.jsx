// JobApplication.jsx
import React, { useState, useEffect } from "react";
import { Briefcase, Upload, X, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "../styles/jobDetails.module.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5137/api";

const JobApplication = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobIdFromUrl = searchParams.get('jobId');

  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    cvFile: null,
  });

  const [cvPreview, setCvPreview] = useState(null);

  // ==================== LOAD SELECTED JOB ONLY ====================
  useEffect(() => {
    if (!jobIdFromUrl) {
      // If no job ID in URL, redirect to careers page
      navigate('/careers');
      return;
    }

    const loadSelectedJob = async () => {
      try {
        const response = await fetch(`${API_URL}/jobs`);
        if (response.ok) {
          const data = await response.json();
          const job = data.find(j => j.id === parseInt(jobIdFromUrl));
          
          if (!job) {
            setError("الوظيفة غير موجودة");
            setTimeout(() => navigate('/careers'), 2000);
            return;
          }

          if (!job.is_active && !job.isActive) {
            setError("هذه الوظيفة غير نشطة حالياً");
            setTimeout(() => navigate('/careers'), 2000);
            return;
          }

          setSelectedJob(job);
        } else {
          setError("فشل في تحميل تفاصيل الوظيفة");
        }
      } catch (err) {
        console.error("Error loading job:", err);
        setError("خطأ في الاتصال بالخادم");
      } finally {
        setLoading(false);
      }
    };

    loadSelectedJob();
  }, [jobIdFromUrl, navigate]);

  // ==================== HANDLE FILE UPLOAD ====================
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("يرجى رفع ملف PDF أو Word فقط");
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    setFormData({ ...formData, cvFile: file });
    setCvPreview({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      type: file.type.includes("pdf") ? "PDF" : "Word",
    });
    setError("");
  };

  // ==================== REMOVE FILE ====================
  const removeFile = () => {
    setFormData({ ...formData, cvFile: null });
    setCvPreview(null);
    const fileInput = document.getElementById("cvFile");
    if (fileInput) fileInput.value = "";
  };

  // ==================== HANDLE INPUT CHANGE ====================
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ==================== SUBMIT APPLICATION ====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (!formData.cvFile) {
      setError("يرجى رفع السيرة الذاتية");
      setSubmitting(false);
      return;
    }

    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("message", formData.message);
      data.append("jobId", selectedJob.id);
      data.append("cv", formData.cvFile);

      const response = await fetch(`${API_URL}/apply`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          cvFile: null,
        });
        setCvPreview(null);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Redirect to careers after 5 seconds
        setTimeout(() => {
          navigate('/careers');
        }, 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "فشل في إرسال الطلب");
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      setError("خطأ في الاتصال بالخادم");
    } finally {
      setSubmitting(false);
    }
  };

  // ==================== LOADING STATE ====================
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>جاري تحميل تفاصيل الوظيفة...</p>
        </div>
      </div>
    );
  }

  // ==================== ERROR STATE (No Job) ====================
  if (!selectedJob && !loading) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <AlertCircle size={64} />
          <h2>الوظيفة غير موجودة</h2>
          <p>جاري التحويل إلى صفحة الوظائف...</p>
        </div>
      </div>
    );
  }

  // ==================== RENDER ====================
  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button 
        onClick={() => navigate('/careers')} 
        className={styles.backButton}
      >
        <ArrowLeft size={20} />
        <span>العودة إلى الوظائف</span>
      </button>

      <div className={styles.header}>
        <h1>التقديم على وظيفة</h1>
        <p>املأ النموذج أدناه للتقديم على الوظيفة المطلوبة</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className={styles.successMessage}>
          <CheckCircle size={24} />
          <div>
            <h3>تم إرسال طلبك بنجاح!</h3>
            <p>سنقوم بمراجعة طلبك والتواصل معك قريباً. سيتم تحويلك إلى صفحة الوظائف خلال 5 ثوانٍ...</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          <AlertCircle size={24} />
          <p>{error}</p>
          <button onClick={() => setError("")} className={styles.closeError}>
            <X size={16} />
          </button>
        </div>
      )}

      <div className={styles.content}>
        {/* Job Details Section - Shows Selected Job Only */}
        <div className={styles.jobDetailsSection}>
          <h2>تفاصيل الوظيفة</h2>
          
          <div className={styles.jobDetailsCard}>
            <div className={styles.jobDetailsHeader}>
              <h3>{selectedJob.title}</h3>
              <span className={styles.jobTypeBadge}>
                {selectedJob.job_type || selectedJob.jobType}
              </span>
            </div>

            <div className={styles.jobDetailsBody}>
              <div className={styles.detailSection}>
                <h4>📋 وصف الوظيفة</h4>
                <p className={styles.description}>{selectedJob.description}</p>
              </div>

              {selectedJob.qualifications && selectedJob.qualifications.length > 0 && (
                <div className={styles.detailSection}>
                  <h4>✅ المؤهلات المطلوبة</h4>
                  <ul className={styles.qualificationsList}>
                    {selectedJob.qualifications.map((qual, index) => (
                      <li key={index}>
                        <CheckCircle size={16} />
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={styles.detailSection}>
                <h4>📅 تاريخ النشر</h4>
                <p className={styles.date}>
                  {new Date(selectedJob.created_at).toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className={styles.formSection} id="application-form">
          <h2>نموذج التقديم</h2>
          
          <div className={styles.applyingFor}>
            <Briefcase size={18} />
            <span>التقديم على: <strong>{selectedJob.title}</strong></span>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Name */}
            <div className={styles.formGroup}>
              <label htmlFor="name">
                الاسم الكامل <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="أدخل اسمك الكامل"
                required
                className={styles.input}
              />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email">
                البريد الإلكتروني <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
                required
                className={styles.input}
              />
            </div>

            {/* Phone */}
            <div className={styles.formGroup}>
              <label htmlFor="phone">
                رقم الهاتف <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+20 123 456 7890"
                required
                className={styles.input}
              />
            </div>

            {/* CV Upload */}
            <div className={styles.formGroup}>
              <label htmlFor="cvFile">
                السيرة الذاتية (CV) <span className={styles.required}>*</span>
              </label>
              <div className={styles.fileUpload}>
                {!cvPreview ? (
                  <label htmlFor="cvFile" className={styles.uploadArea}>
                    <Upload size={32} />
                    <p>انقر لرفع السيرة الذاتية</p>
                    <span>PDF أو Word (حتى 5 ميجابايت)</span>
                    <input
                      type="file"
                      id="cvFile"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className={styles.fileInput}
                    />
                  </label>
                ) : (
                  <div className={styles.filePreview}>
                    <div className={styles.fileInfo}>
                      <div className={styles.fileIcon}>
                        {cvPreview.type === "PDF" ? "📄" : "📝"}
                      </div>
                      <div className={styles.fileDetails}>
                        <p className={styles.fileName}>{cvPreview.name}</p>
                        <p className={styles.fileSize}>{cvPreview.size}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className={styles.removeFile}
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div className={styles.formGroup}>
              <label htmlFor="message">رسالة تعريفية (اختياري)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="أخبرنا لماذا أنت مناسب لهذه الوظيفة..."
                rows="5"
                className={styles.textarea}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className={styles.submitButton}
            >
              {submitting ? (
                <>
                  <div className={styles.buttonSpinner}></div>
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                <>
                  <Briefcase size={20} />
                  <span>إرسال الطلب</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;