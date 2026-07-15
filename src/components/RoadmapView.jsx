import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  ArrowRight, 
  BookOpen, 
  FileCode, 
  Calendar, 
  CheckCircle,
  HelpCircle,
  Play,
  RefreshCw
} from 'lucide-react';

export default function RoadmapView({ 
  apiKey, 
  userGoal, 
  setUserGoal, 
  userSkills, 
  setUserSkills, 
  roadmapData, 
  setRoadmapData 
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Progress tracker mapping: { "PhaseNumber-SkillName": boolean }
  const [progress, setProgress] = useState({});

  // Load progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('careerai_roadmap_progress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
  }, []);

  const handleToggleSkill = (phaseIndex, skill) => {
    const key = `${phaseIndex}-${skill}`;
    const newProgress = {
      ...progress,
      [key]: !progress[key]
    };
    setProgress(newProgress);
    localStorage.setItem('careerai_roadmap_progress', JSON.stringify(newProgress));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!userGoal.trim()) {
      setError('Please tell us your career goal.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey || ''
        },
        body: JSON.stringify({
          goal: userGoal,
          skills: userSkills
        })
      });

      const result = await response.json();
      if (result.success) {
        setRoadmapData(result.data);
        // Clear progress for new roadmaps
        setProgress({});
        localStorage.removeItem('careerai_roadmap_progress');
      } else {
        setError(result.error || 'Failed to generate roadmap.');
      }
    } catch (err) {
      console.error(err);
      setError('A network error occurred. Please check that the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to calculate completion percentage
  const getCompletionPercentage = () => {
    if (!roadmapData || !roadmapData.phases) return 0;
    let totalSkills = 0;
    let completedSkills = 0;
    
    roadmapData.phases.forEach((phase, pIdx) => {
      if (phase.skills) {
        phase.skills.forEach(skill => {
          totalSkills++;
          if (progress[`${pIdx}-${skill}`]) {
            completedSkills++;
          }
        });
      }
    });

    if (totalSkills === 0) return 0;
    return Math.round((completedSkills / totalSkills) * 100);
  };

  const completionRate = getCompletionPercentage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-[fadeIn_0.5s_ease-out]">
      {/* LEFT COLUMN: Input Form */}
      <div className="col-span-1 lg:col-span-4 w-full">
        <div className="glass-card flex flex-col gap-5">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass size={22} color="var(--primary)" />
            <h2 style={{ fontSize: '1.25rem' }}>Path Finder</h2>
          </div>
          
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Tell us your desired job role and your current level. Our AI will draft a curated learning timeline.
          </p>

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="goalInput">What is your Career Goal?</label>
              <input 
                id="goalInput"
                type="text" 
                className="input-field" 
                placeholder="e.g. Frontend React Engineer, Data Scientist" 
                value={userGoal} 
                onChange={(e) => setUserGoal(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="skillsInput">Current Skills / Experience (Optional)</label>
              <textarea 
                id="skillsInput"
                className="input-field" 
                placeholder="e.g. Basic HTML, CSS, done 1 Python script" 
                value={userSkills} 
                onChange={(e) => setUserSkills(e.target.value)}
                rows={3}
                style={{ resize: 'none' }}
                disabled={loading}
              />
            </div>

            {error && (
              <div style={styles.errorContainer}>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
              disabled={loading}
              style={{ justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="spin-icon" />
                  <span>Analyzing & Generating...</span>
                </>
              ) : (
                <>
                  <span>Create Roadmap</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN: Output Pathway */}
      <div className="col-span-1 lg:col-span-8 w-full">
        {!roadmapData && !loading && (
          <div className="glass-card" style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <Compass size={40} color="var(--primary)" />
            </div>
            <h3>Your roadmap will appear here</h3>
            <p style={{ maxWidth: '400px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Fill in your target career goal on the left panel to receive a structured learning roadmap.
            </p>
          </div>
        )}

        {loading && (
          <div className="glass-card" style={styles.loadingState}>
            <RefreshCw size={48} className="spin-icon" color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h3>Designing your roadmap...</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center', maxWidth: '350px' }}>
              We are consulting our AI database to align courses, books, and specific projects to match your career goals.
            </p>
          </div>
        )}

        {roadmapData && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Roadmap Header Card */}
            <div className="glass-card" style={styles.roadmapHeader}>
              <div>
                <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.5rem' }}>{roadmapData.title}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{roadmapData.description}</p>
              </div>

              {/* Progress Circle bar representation */}
              <div style={styles.progressContainer}>
                <div style={styles.progressLabel}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent)' }}>{completionRate}%</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Done</span>
                </div>
                <svg width="64" height="64" style={styles.progressCircle}>
                  <circle 
                    cx="32" cy="32" r="28" 
                    stroke="rgba(255,255,255,0.05)" 
                    strokeWidth="4" 
                    fill="transparent" 
                  />
                  <circle 
                    cx="32" cy="32" r="28" 
                    stroke="var(--accent)" 
                    strokeWidth="4" 
                    fill="transparent" 
                    strokeDasharray={175}
                    strokeDashoffset={175 - (175 * completionRate) / 100}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                  />
                </svg>
              </div>
            </div>

            {/* Phases Timeline */}
            <div style={styles.timeline}>
              {roadmapData.phases && roadmapData.phases.map((phase, pIdx) => (
                <div key={pIdx} style={styles.timelineItem}>
                  {/* Left Timeline Indicator line */}
                  <div style={styles.timelineLine}>
                    <div style={styles.timelineDot}>
                      {pIdx + 1}
                    </div>
                  </div>

                  {/* Phase Details Card */}
                  <div className="glass-card" style={styles.timelineContent}>
                    <div style={styles.phaseTitleRow}>
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>{phase.title}</h3>
                      <div style={styles.durationBadge}>
                        <Calendar size={14} color="var(--primary)" />
                        <span>{phase.duration}</span>
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.5rem 0 1rem' }}>
                      {phase.description}
                    </p>

                    {/* Skills checkboxes */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h4 style={styles.subHeading}>Key Skills to Practice:</h4>
                      <div style={styles.skillsGrid}>
                        {phase.skills && phase.skills.map((skill, sIdx) => {
                          const isDone = progress[`${pIdx}-${skill}`];
                          return (
                            <div 
                              key={sIdx} 
                              onClick={() => handleToggleSkill(pIdx, skill)}
                              style={{
                                ...styles.skillBadge,
                                borderColor: isDone ? 'var(--success)' : 'var(--border-color)',
                                background: isDone ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)'
                              }}
                            >
                              <CheckCircle 
                                size={14} 
                                color={isDone ? 'var(--success)' : 'var(--text-dark)'} 
                                style={{ transition: 'all 0.2s' }}
                              />
                              <span style={{ textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'var(--success)' : 'var(--text-main)' }}>
                                {skill}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Resources List */}
                    {phase.resources && phase.resources.length > 0 && (
                      <div style={{ marginBottom: '1.25rem' }}>
                        <h4 style={styles.subHeading}>Recommended Resources:</h4>
                        <div style={styles.resourcesList}>
                          {phase.resources.map((res, rIdx) => (
                            <a 
                              key={rIdx} 
                              href={res.url.startsWith('http') ? res.url : `https://${res.url}`} 
                              target="_blank" 
                              rel="noreferrer"
                              style={styles.resourceItem}
                            >
                              <BookOpen size={16} color="var(--accent)" />
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={styles.resourceName}>{res.name}</span>
                                <span style={styles.resourceType}>{res.type}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Hands-on Project */}
                    {phase.project && (
                      <div style={styles.projectSection}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                          <FileCode size={16} color="var(--secondary)" />
                          <h4 style={{ fontSize: '0.9rem', color: 'var(--secondary)' }}>Core Project: {phase.project.title}</h4>
                        </div>
                        <p style={{ color: 'var(--text-main)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                          {phase.project.description}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Styles for Roadmap View
const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
  },
  formCol: {
    width: '100%',
  },
  roadmapCol: {
    width: '100%',
  },
  // Responsive grid wrapper handled dynamically in index.css dashboard-grid but customized here
  emptyState: {
    padding: '4rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'rgba(99, 102, 241, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed rgba(99, 102, 241, 0.25)',
  },
  loadingState: {
    padding: '5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#ff6b6b',
    borderRadius: '8px',
    fontSize: '0.85rem',
  },
  roadmapHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  progressContainer: {
    position: 'relative',
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLabel: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    lineHeight: '1.1',
  },
  progressCircle: {
    transform: 'rotate(-90deg)',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    position: 'relative',
    paddingLeft: '1rem',
  },
  timelineItem: {
    display: 'flex',
    gap: '1.5rem',
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: '12px',
    top: 0,
    bottom: '-2rem',
    width: '2px',
    background: 'linear-gradient(to bottom, var(--primary), rgba(255, 255, 255, 0.05))',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  },
  timelineDot: {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    background: 'var(--grad-primary)',
    border: '4px solid var(--bg-main)',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    boxShadow: 'var(--shadow-sm)',
    marginTop: '0.75rem',
  },
  timelineContent: {
    flex: 1,
    zIndex: 2,
  },
  phaseTitleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  durationBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.3rem 0.6rem',
    borderRadius: '6px',
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    border: '1px solid rgba(99, 102, 241, 0.25)',
    fontSize: '0.75rem',
    color: 'var(--text-main)',
  },
  subHeading: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    marginBottom: '0.5rem',
  },
  skillsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  skillBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem 0.75rem',
    borderRadius: '8px',
    border: '1px solid',
    fontSize: '0.8rem',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.2s',
  },
  resourcesList: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.65rem',
  },
  resourceItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-color)',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.2s',
  },
  resourceName: {
    fontSize: '0.825rem',
    fontWeight: '500',
    color: 'var(--text-main)',
  },
  resourceType: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
  },
  projectSection: {
    padding: '1rem',
    backgroundColor: 'rgba(168, 85, 247, 0.05)',
    border: '1px solid rgba(168, 85, 247, 0.15)',
    borderRadius: '10px',
  }
};

// Add CSS media query behavior dynamically
const loadResponsiveStyles = () => {
  if (typeof window === 'undefined') return;
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    @media (min-width: 900px) {
      .roadmap-layout-container {
        display: grid;
        grid-template-columns: 1fr 2fr;
        align-items: start;
        gap: 1.5rem;
      }
    }
  `;
  document.head.appendChild(styleEl);
};
loadResponsiveStyles();
