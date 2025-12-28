// Careers.jsx
import React, { useEffect, useState } from "react";
import { Briefcase, MapPin } from "lucide-react";
import styles from "/src/styles/carrerspage.module.css";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5137/api";

const Careers = () => {
  const navigate = useNavigate();

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
                    {job.qualifications &&
                      job.qualifications.map((qual, index) => (
                        <span key={index} className={styles.qualificationBadge}>
                          {qual}
                        </span>
                      ))}
                  </div>

                  <p className={styles.jobDescription}>{job.description}</p>

                  <button
                    onClick={() => navigate(`/carrers/${job.id}`)}
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
