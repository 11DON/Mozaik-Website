// HRAdmin.jsx
import React, { useState, useEffect } from "react";
import { Briefcase, Trash2, Edit, Users } from "lucide-react";
import styles from "../styles/hr.module.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5137/api";

const HRAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("jobs"); // jobs or applications
  
  const [jobForm, setJobForm] = useState({
    title: "",
    jobType: "",
    qualifications: "",
    description: "",
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("hrToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      loadJobs(savedToken);
      loadApplications(savedToken);
    }
  }, []);

  // ==================== AUTH ====================
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setIsLoggedIn(true);
        localStorage.setItem("hrToken", data.token);
        setLoginError("");
        loadJobs(data.token);
        loadApplications(data.token);
      } else {
        setLoginError(data.message || "فشل تسجيل الدخول");
      }
    } catch (error) {
      setLoginError("خطأ في الاتصال بالخادم");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
    localStorage.removeItem("hrToken");
  };

  // ==================== JOBS ====================
  const loadJobs = async (authToken) => {
    try {
      const response = await fetch(`${API_URL}/jobs`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to load jobs:", error);
    }
  };

  const handleJobFormChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const createJob = async (e) => {
    e.preventDefault();
    try {
      const qualificationsArray = jobForm.qualifications
        .split(",")
        .map((q) => q.trim())
        .filter((q) => q);

      const response = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...jobForm,
          qualifications: qualificationsArray,
        }),
      });

      if (response.ok) {
        alert("تم إنشاء الوظيفة بنجاح!");
        setJobForm({ title: "", jobType: "", qualifications: "", description: "" });
        loadJobs(token);
      } else {
        alert("فشل في إنشاء الوظيفة");
      }
    } catch (error) {
      alert("خطأ في الخادم");
    }
  };

  const deactivateJob = async (id) => {
    if (!window.confirm("هل أنت متأكد من إيقاف هذه الوظيفة؟")) return;

    try {
      await fetch(`${API_URL}/jobs/${id}/deactivate`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      loadJobs(token);
    } catch (error) {
      alert("فشل في إيقاف الوظيفة");
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الوظيفة؟ سيتم حذف جميع الطلبات المرتبطة بها.")) return;

    try {
      await fetch(`${API_URL}/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      loadJobs(token);
    } catch (error) {
      alert("فشل في حذف الوظيفة");
    }
  };

  // ==================== APPLICATIONS ====================
  const loadApplications = async (authToken) => {
    try {
      const response = await fetch(`${API_URL}/applications`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Failed to load applications:", error);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/applications/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      loadApplications(token);
    } catch (error) {
      alert("فشل في تحديث حالة الطلب");
    }
  };

  // ==================== RENDER ====================
  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>لوحة تحكم الموارد البشرية</h1>
          <p className={styles.loginSubtitle}>تسجيل الدخول</p>
          
          <div className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>كلمة المرور</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className={styles.input}
              />
            </div>

            {loginError && <p className={styles.error}>{loginError}</p>}
            
            <button onClick={handleLogin} className={styles.loginButton}>
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1>لوحة تحكم الموارد البشرية</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          تسجيل الخروج
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "jobs" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("jobs")}
        >
          <Briefcase className={styles.tabIcon} />
          إدارة الوظائف
        </button>
        <button
          className={`${styles.tab} ${activeTab === "applications" ? styles.activeTab : ""}`}
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
            <div className={styles.form}>
              <input
                type="text"
                name="title"
                placeholder="عنوان الوظيفة"
                value={jobForm.title}
                onChange={handleJobFormChange}
                className={styles.input}
              />
              <input
                type="text"
                name="jobType"
                placeholder="نوع الوظيفة (مثال: دوام كامل)"
                value={jobForm.jobType}
                onChange={handleJobFormChange}
                className={styles.input}
              />
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
              />
              <button onClick={createJob} className={styles.createButton}>
                إنشاء وظيفة
              </button>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>الوظائف الحالية</h2>
            <div className={styles.jobsList}>
              {jobs.map((job) => (
                <div key={job.id} className={styles.jobItem}>
                  <div className={styles.jobInfo}>
                    <h3>{job.title}</h3>
                    <p className={styles.jobType}>{job.job_type || job.jobType}</p>
                    <span className={job.is_active || job.isActive ? styles.activeStatus : styles.inactiveStatus}>
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
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === "applications" && (
        <div className={styles.content}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>طلبات التوظيف</h2>
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
                    <p className={styles.appJob}>الوظيفة: {app.job_title}</p>
                    {app.message && (
                      <p className={styles.appMessage}>{app.message}</p>
                    )}
                    <p className={styles.appDate}>
                      {new Date(app.created_at).toLocaleDateString("ar-EG")}
                    </p>
                    <div className={styles.appActions}>
                      <button
                        onClick={() => updateApplicationStatus(app.id, "reviewed")}
                        className={styles.reviewButton}
                      >
                        مراجعة
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, "accepted")}
                        className={styles.acceptButton}
                      >
                        قبول
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, "rejected")}
                        className={styles.rejectButton}
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