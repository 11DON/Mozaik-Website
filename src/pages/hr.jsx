// HRAdmin.jsx
import React, { useState, useEffect } from "react";
import { Briefcase, Trash2, Users } from "lucide-react";
import styles from "../styles/hr.module.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5137/api";

const HRAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("jobs");
  const [loading, setLoading] = useState(true);

 const [jobForm, setJobForm] = useState({
  title: "",
  jobType: "",
  jobCategory: "",
  qualifications: "",
  description: "",
});

  const downloadCV = (cvPath) => {
    if (!cvPath) {
      alert("لا يوجد سيرة ذاتية لهذا الطلب");
      return;
    }
    // open cv in new Tab
    const cvUrl = `${API_URL.replace("/api", "")}/uploads/${cvPath
      .split("/")
      .pop()}`;
    window.open(cvUrl, "_blank");
  };

  // ==================== AUTH HELPER ====================
  const authenticatedFetch = async (url, options = {}) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authentication token found");
      handleLogout();
      return null;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      // Handle unauthorized - token expired or invalid
      if (response.status === 401) {
        console.error("Token invalid or expired");
        handleLogout();
        return null;
      }

      return response;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  // ==================== INITIAL LOAD ====================
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
      loadInitialData();
    } else {
      setLoading(false);
    }
  }, []);

  const loadInitialData = async () => {
    try {
      await Promise.all([loadJobs(), loadApplications()]);
    } catch (error) {
      console.error("Failed to load initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==================== AUTH ====================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        setIsLoggedIn(true);
        setLoginData({ email: "", password: "" });
        loadInitialData();
      } else {
        setLoginError(data.message || "فشل تسجيل الدخول");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("خطأ في الاتصال بالخادم");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    setJobs([]);
    setApplications([]);
  };

  // ==================== JOBS ====================
  const loadJobs = async () => {
    try {
      // Jobs endpoint is public, no auth needed
      const response = await fetch(`${API_URL}/jobs`);

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error("Failed to load jobs");
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
  };

  const handleJobFormChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

const createJob = async (e) => {
  e.preventDefault();

  if (!jobForm.title || !jobForm.jobType || !jobForm.jobCategory || !jobForm.description) {
    alert("يرجى ملء جميع الحقول المطلوبة");
    return;
  }

  try {
    const qualificationsArray = jobForm.qualifications
      .split(",")
      .map((q) => q.trim())
      .filter((q) => q);

    const payload = {
      title: jobForm.title,
      job_type: jobForm.jobType,                    // VARCHAR(100) - required
      job_type_category: jobForm.jobCategory,       // ENUM - required
      description: jobForm.description,              // TEXT - required
      qualifications: qualificationsArray,           // JSON - required (can be empty array)
      is_active: true,   
    };

    console.log("📤 Sending payload:", payload); // ✅ Log what we're sending

    const response = await authenticatedFetch(`${API_URL}/jobs`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response) return;

    if (response.ok) {
      alert("تم إنشاء الوظيفة بنجاح!");
      setJobForm({
        title: "",
        jobType: "",
        jobCategory: "",
        qualifications: "",
        description: "",
      });
      loadJobs();
    } else {
      const error = await response.json();
      console.error("❌ Backend error response:", error); // ✅ Log full error
      console.error("❌ Status:", response.status);
      alert(error.message || error.error || "فشل في إنشاء الوظيفة");
    }
  } catch (error) {
    console.error("💥 Error creating job:", error);
    alert("خطأ في الخادم");
  }
};

  const deactivateJob = async (id) => {
    if (!window.confirm("هل أنت متأكد من إيقاف هذه الوظيفة؟")) return;

    try {
      const response = await authenticatedFetch(
        `${API_URL}/jobs/${id}/deactivate`,
        {
          method: "PATCH",
        }
      );

      if (!response) return;

      if (response.ok) {
        alert("تم إيقاف الوظيفة بنجاح");
        loadJobs();
      } else {
        alert("فشل في إيقاف الوظيفة");
      }
    } catch (error) {
      console.error("Error deactivating job:", error);
      alert("خطأ في الخادم");
    }
  };

  const deleteJob = async (id) => {
    if (
      !window.confirm(
        "هل أنت متأكد من حذف هذه الوظيفة؟ سيتم حذف جميع الطلبات المرتبطة بها."
      )
    )
      return;

    try {
      const response = await authenticatedFetch(`${API_URL}/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response) return;

      if (response.ok) {
        alert("تم حذف الوظيفة بنجاح");
        loadJobs();
      } else {
        alert("فشل في حذف الوظيفة");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("خطأ في الخادم");
    }
  };

  // ==================== APPLICATIONS ====================
  const loadApplications = async () => {
    try {
      const response = await authenticatedFetch(`${API_URL}/applications`);

      if (!response) return;

      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else {
        console.error("Failed to load applications");
      }
    } catch (error) {
      console.error("Error loading applications:", error);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await authenticatedFetch(
        `${API_URL}/applications/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }
      );

      if (!response) return;

      if (response.ok) {
        alert("تم تحديث حالة الطلب بنجاح");
        loadApplications();
      } else {
        alert("فشل في تحديث حالة الطلب");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      alert("خطأ في الخادم");
    }
  };

  const deleteJobApplication = async (id) => {
    if (
      !window.confirm(
        "هل أنت متأكد من حذف هذا الطلب؟ سيتم حذف جميع الطلبات المرتبطة بها."
      )
    )
      return;

    try {
      const response = await authenticatedFetch(
        `${API_URL}/applications/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response) return;

      if (response.ok) {
        alert("تم حذف الوظيفة بنجاح");
        loadApplications();
      } else {
        alert("فشل في حذف الوظيفة");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("خطأ في الخادم");
    }
  };

  // ==================== RENDER LOGIN ====================
  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}> HR </h1>
          <p className={styles.loginSubtitle}>Login</p>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className={styles.input}
                required
                disabled={loginLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <label>كلمة المرور</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className={styles.input}
                required
                disabled={loginLoading}
              />
            </div>

            {loginError && <p className={styles.error}>{loginError}</p>}

            <button
              type="submit"
              className={styles.loginButton}
              disabled={loginLoading}
            >
              {loginLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==================== LOADING STATE ====================
  if (loading) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.loadingContainer}>
          <p>جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // ==================== RENDER ADMIN PANEL ====================
  return (
    <div className={styles.adminContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1>HR</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          تسجيل الخروج
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "jobs" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("jobs")}
        >
          <Briefcase className={styles.tabIcon} />
          إدارة الوظائف
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "applications" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("applications")}
        >
          <Users className={styles.tabIcon} />
          الطلبات ({applications.length})
        </button>
      </div>

      {/* Jobs Tab */}
      {activeTab === "jobs" && (
        <div className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>إنشاء وظيفة جديدة</h2>
            <form onSubmit={createJob} className={styles.form}>
              <input
                type="text"
                name="title"
                placeholder="عنوان الوظيفة"
                value={jobForm.title}
                onChange={handleJobFormChange}
                className={styles.input}
                required
              />
              <select
                name="jobType"
                value={jobForm.jobType}
                onChange={handleJobFormChange}
                className={styles.input}
                required
              >
                <option value="">اختر نوع الوظيفة</option>
                <option value="full-time">دوام كامل</option>
                <option value="part-time">دوام جزئي</option>
                <option value="remote">عن بُعد</option>
                <option value="hybrid">هجين</option>
                <option value="contract">عقد</option>{" "}
              </select>
              <select
                name="jobCategory"
                value={jobForm.jobCategory}
                onChange={handleJobFormChange}
                className={styles.input}
                required
              >
                <option value="">اختر نوع الوظيفة</option>
                <option value="join">انضم للفريق</option>
                <option value="contractor">مقاول</option>
                <option value="supplier">مورد</option>
              </select>

              <input
                type="text"
                name="qualifications"
                placeholder="المؤهلات (مفصولة بفاصلة)"
                value={jobForm.qualifications}
                onChange={handleJobFormChange}
                className={styles.input}
              />
              <textarea
                name="description"
                placeholder="وصف الوظيفة"
                value={jobForm.description}
                onChange={handleJobFormChange}
                rows="4"
                className={styles.textarea}
                required
              />
              <button type="submit" className={styles.createButton}>
                إنشاء وظيفة
              </button>
            </form>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              الوظائف الحالية ({jobs.length})
            </h2>
            <div className={styles.jobsList}>
              {jobs.length === 0 ? (
                <p className={styles.noData}>لا توجد وظائف حالياً</p>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className={styles.jobItem}>
                    <div className={styles.jobInfo}>
                      <h3>{job.title}</h3>

                      {/* Show both job type and category */}
                      <p className={styles.jobType}>
                        {job.job_type || job.jobType} •{" "}
                        {job.job_type_category || job.jobCategory}
                      </p>

                      <span
                        className={
                          job.is_active || job.isActive
                            ? styles.activeStatus
                            : styles.inactiveStatus
                        }
                      >
                        {job.is_active || job.isActive ? "نشطة" : "غير نشطة"}
                      </span>
                    </div>
                    <div className={styles.jobActions}>
                      <button
                        onClick={() => deactivateJob(job.id)}
                        className={styles.deactivateButton}
                        disabled={!(job.is_active || job.isActive)}
                      >
                        إيقاف
                      </button>

                      <button
                        onClick={() => deleteJob(job.id)}
                        className={styles.deleteButton}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === "applications" && (
        <div className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              طلبات التوظيف ({applications.length})
            </h2>
            <div className={styles.applicationsList}>
              {applications.length === 0 ? (
                <p className={styles.noData}>لا توجد طلبات حالياً</p>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className={styles.applicationItem}>
                    <div className={styles.appHeader}>
                      <h3>{app.name}</h3>
                      <span className={styles[`status-${app.status}`]}>
                        {app.status === "pending" && "قيد الانتظار"}
                        {app.status === "reviewed" && "تمت المراجعة"}
                        {app.status === "accepted" && "مقبول"}
                        {app.status === "rejected" && "مرفوض"}
                      </span>
                    </div>
                    <p className={styles.appEmail}>{app.email}</p>
                    <p className={styles.appJob}>
                      الوظيفة: {app.jobTitle || app.job_title}
                    </p>
                    {app.message && (
                      <p className={styles.appMessage}>{app.message}</p>
                    )}
                    <p className={styles.appDate}>
                      {new Date(
                        app.createdAt || app.created_at
                      ).toLocaleDateString("ar-EG")}
                    </p>
                    {app.cv_path && (
                      <button
                        onClick={() => downloadCV(app.cv_path)}
                        className={styles.downloadCvButton}
                        style={{
                          backgroundColor: "#4CAF50",
                          color: "white",
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginBottom: "10px",
                          fontSize: "14px",
                        }}
                      >
                        📄 تحميل السيرة الذاتية
                      </button>
                    )}
                    <div className={styles.appActions}>
                      <button
                        onClick={() =>
                          updateApplicationStatus(app.id, "reviewed")
                        }
                        className={styles.reviewButton}
                        disabled={app.status === "reviewed"}
                      >
                        مراجعة
                      </button>
                      <button
                        onClick={() => deleteJobApplication(app.id)}
                        className={styles.reviewButton}
                        disabled={app.status === "reviewed"}
                      >
                        Delete{" "}
                      </button>
                      <button
                        onClick={() =>
                          updateApplicationStatus(app.id, "accepted")
                        }
                        className={styles.acceptButton}
                        disabled={app.status === "accepted"}
                      >
                        قبول
                      </button>
                      <button
                        onClick={() =>
                          updateApplicationStatus(app.id, "rejected")
                        }
                        className={styles.rejectButton}
                        disabled={app.status === "rejected"}
                      >
                        رفض
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRAdmin;
