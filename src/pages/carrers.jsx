// Careers.jsx
import React, { useEffect, useState } from "react";
import { Briefcase, MapPin } from "lucide-react";
import styles from "/src/styles/carrerspage.module.css";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5137/api";

const JOB_TABS= [
  { key: "join", label: "انضم للفريق" },
  { key: "contractor", label: "مقاول" },
  { key: "supplier", label: "مورد" },
];
const Careers = () => {
  const navigate = useNavigate();
  const [activeTab,setActiveTab] = useState("join");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setErrorMessage("فشل في تحميل الوظائف. الرجاء المحاولة مرة أخرى لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(
    (job) => job.job_type_category ===activeTab
  );
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
      <div className={styles.jobTabs}>
      {JOB_TABS.map((tab)=> {
        return (
  <button
        key={tab.key}
        onClick={()=> setActiveTab(tab.key)}
        className={`${styles.tabButton} ${
          activeTab === tab.key? styles.activeTab:""
        }`}
        >
          {tab.label}
        </button>
        )
      
      })}
      </div>
      {/* Job Listings Grid */}
      <div className={styles.jobsSection}>
        {filteredJobs.length === 0 ? (
          <div className={styles.noJobs}>
            <p className={styles.noJobsText}>
              لا توجد وظائف متاحة حالياً. تحقق مرة أخرى قريباً!
            </p>
          </div>
        ) : (
          <div className={styles.jobsGrid}>
            {filteredJobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobCardContent}>
                  <h3 className={styles.jobTitle}>{job.title}</h3>

                  <div className={styles.jobMeta}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaText}>{job.job_type}</span>
                      <Briefcase className={styles.metaIcon} />
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaText}>{job.location}</span>
                      <MapPin className={styles.metaIcon} />
                    </div>
                  </div>

                  <div className={styles.qualifications}>
                    {job.qualifications &&
                      job.qualifications.slice(0,4).map((qual, index) => (
                        <span key={index} className={styles.qualificationBadge}>
                          {qual}
                        </span>
                      ))}
                  </div>


                  <button
                    onClick={() => navigate(`/careers/${job.id}`)}
                    className={styles.applyButton}
                  >
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

   
    </div>
  );
};

export default Careers;
