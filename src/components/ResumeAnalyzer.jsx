import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  AlertCircle, 
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  FileCheck,
  RefreshCw
} from 'lucide-react';

export default function ResumeAnalyzer({ apiKey, setSharedResumeText }) {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('strengths');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    const extension = selectedFile.name.split('.').pop().toLowerCase();
    if (extension !== 'pdf' && extension !== 'txt') {
      setError('Only PDF and TXT files are supported.');
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (loading) return;

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    const extension = droppedFile.name.split('.').pop().toLowerCase();
    if (extension !== 'pdf' && extension !== 'txt') {
      setError('Only PDF and TXT files are supported.');
      return;
    }

    if (droppedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    setFile(droppedFile);
    setError('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select or upload a resume file first.');
      return;
    }
    if (!targetRole.trim()) {
      setError('Please specify a target role.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('targetRole', targetRole);

    try {
      const response = await fetch('/api/resume/analyze-resume', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey || ''
        },
        body: formData
      });

      const contentType = response.headers.get('content-type') || '';
      const result = contentType.includes('application/json')
        ? await response.json()
        : { error: await response.text() };

      if (response.ok && result.success) {
        setResults(result.data);
        // Save the parsed text size context (optional, mock doesn't send raw text, but backend saves raw text size)
        if (result.data.parsedTextLength) {
          setSharedResumeText(`Target Role: ${targetRole}. Resume has overall score ${result.data.score}. Gap skills: ${result.data.gaps.join(', ')}.`);
        } else {
          setSharedResumeText(`Target Role: ${targetRole}. Resume evaluation score: ${result.data.score}. Strengths: ${result.data.strengths.slice(0,2).join(', ')}. Gaps: ${result.data.gaps.slice(0,2).join(', ')}.`);
        }
      } else {
        setError(result.error || 'Failed to analyze resume.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to contact backend. Verify that the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--warning)';
    return 'var(--danger)';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-[fadeIn_0.5s_ease-out]">
      {/* LEFT COL: File Upload Form */}
      <div className="col-span-1 lg:col-span-4 w-full">
        <div className="glass-card flex flex-col gap-5">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={22} color="var(--primary)" />
            <h2 style={{ fontSize: '1.25rem' }}>Resume Upload</h2>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Upload your resume in PDF or TXT format. Specify your target career role to see how well it fits.
          </p>

          <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="roleInput">Target Career Role</label>
              <input 
                id="roleInput"
                type="text" 
                className="input-field" 
                placeholder="e.g. Front End Developer, System Analyst" 
                value={targetRole} 
                onChange={(e) => setTargetRole(e.target.value)}
                disabled={loading}
              />
            </div>

            <div 
              onDrop={handleDrop} 
              onDragOver={handleDragOver}
              style={{
                ...styles.dropzone,
                borderColor: file ? 'var(--primary)' : 'var(--border-color)',
                backgroundColor: file ? 'rgba(99, 102, 241, 0.03)' : 'rgba(255, 255, 255, 0.01)'
              }}
            >
              <input 
                type="file" 
                id="fileInput" 
                style={{ display: 'none' }} 
                accept=".pdf,.txt" 
                onChange={handleFileChange}
                disabled={loading}
              />
              <label htmlFor="fileInput" style={styles.dropzoneLabel}>
                <UploadCloud size={32} color={file ? 'var(--primary)' : 'var(--text-muted)'} />
                {file ? (
                  <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem', color: '#ffffff', display: 'block', fontWeight: '600' }}>
                      {file.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'block' }}>
                      Drag & drop your resume
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Supports PDF or TXT (Max 5MB)
                    </span>
                  </div>
                )}
              </label>
            </div>

            {error && (
              <div style={styles.errorContainer}>
                <AlertCircle size={16} />
                <span>{error}</span>
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
                  <span>Reviewing resume...</span>
                </>
              ) : (
                <>
                  <FileCheck size={18} />
                  <span>Analyze Resume</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT COL: Output Feedback Screen */}
      <div className="col-span-1 lg:col-span-8 w-full">
        {!results && !loading && (
          <div className="glass-card" style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <FileCheck size={40} color="var(--primary)" />
            </div>
            <h3>Upload your resume for review</h3>
            <p style={{ maxWidth: '400px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Once analyzed, this board will list your ATS compatibility, formatting layout quality, and precise keyword/skill gap reviews.
            </p>
          </div>
        )}

        {loading && (
          <div className="glass-card" style={styles.loadingState}>
            <RefreshCw size={48} className="spin-icon" color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3>Processing Resume Metrics...</h3>
            <div style={styles.tipsCarousel}>
              <span style={styles.carouselTitle}>Did you know?</span>
              <p style={styles.carouselText}>
                "Modern ATS systems scan for exact matches of key framework/skill terms. Rewriting simple job summaries with specific keywords is key to passing initial screens."
              </p>
            </div>
          </div>
        )}

        {results && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* High Level Score Cards */}
            <div style={styles.scoreRow}>
              {/* Overall Score */}
              <div className="glass-card" style={styles.scoreCard}>
                <span style={styles.scoreLabel}>Match Score</span>
                <div style={{ ...styles.bigScore, color: getScoreColor(results.score) }}>
                  {results.score}%
                </div>
                <div style={styles.progressBarWrapper}>
                  <div style={{ 
                    ...styles.progressBar, 
                    width: `${results.score}%`, 
                    backgroundColor: getScoreColor(results.score) 
                  }}></div>
                </div>
              </div>

              {/* ATS Compatibility */}
              <div className="glass-card" style={styles.scoreCard}>
                <span style={styles.scoreLabel}>ATS Parser Match</span>
                <div style={{ ...styles.bigScore, color: getScoreColor(results.atsScore) }}>
                  {results.atsScore}%
                </div>
                <div style={styles.progressBarWrapper}>
                  <div style={{ 
                    ...styles.progressBar, 
                    width: `${results.atsScore}%`, 
                    backgroundColor: getScoreColor(results.atsScore) 
                  }}></div>
                </div>
              </div>

              {/* Formatting Layout */}
              <div className="glass-card" style={styles.scoreCard}>
                <span style={styles.scoreLabel}>Layout & Format</span>
                <div style={{ ...styles.bigScore, color: getScoreColor(results.formattingScore) }}>
                  {results.formattingScore}%
                </div>
                <div style={styles.progressBarWrapper}>
                  <div style={{ 
                    ...styles.progressBar, 
                    width: `${results.formattingScore}%`, 
                    backgroundColor: getScoreColor(results.formattingScore) 
                  }}></div>
                </div>
              </div>
            </div>

            {/* AI Review Summary Callout */}
            <div className="glass-card" style={styles.summaryBox}>
              <h3 style={{ fontSize: '1.05rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <TrendingUp size={18} color="var(--accent)" />
                AI Career Review
              </h3>
              <p style={{ color: 'var(--text-main)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                {results.summary}
              </p>
            </div>

            {/* Tabbed Detailed Feedback */}
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={styles.detailTabs}>
                <button 
                  style={{
                    ...styles.tabButton,
                    color: activeSubTab === 'strengths' ? '#ffffff' : 'var(--text-muted)',
                    borderBottomColor: activeSubTab === 'strengths' ? 'var(--success)' : 'transparent',
                    backgroundColor: activeSubTab === 'strengths' ? 'rgba(255,255,255,0.02)' : 'transparent'
                  }}
                  onClick={() => setActiveSubTab('strengths')}
                >
                  <CheckCircle size={16} color="var(--success)" />
                  <span>Strengths ({results.strengths?.length || 0})</span>
                </button>
                
                <button 
                  style={{
                    ...styles.tabButton,
                    color: activeSubTab === 'gaps' ? '#ffffff' : 'var(--text-muted)',
                    borderBottomColor: activeSubTab === 'gaps' ? 'var(--warning)' : 'transparent',
                    backgroundColor: activeSubTab === 'gaps' ? 'rgba(255,255,255,0.02)' : 'transparent'
                  }}
                  onClick={() => setActiveSubTab('gaps')}
                >
                  <AlertTriangle size={16} color="var(--warning)" />
                  <span>Skill Gaps ({results.gaps?.length || 0})</span>
                </button>

                <button 
                  style={{
                    ...styles.tabButton,
                    color: activeSubTab === 'recommendations' ? '#ffffff' : 'var(--text-muted)',
                    borderBottomColor: activeSubTab === 'recommendations' ? 'var(--primary)' : 'transparent',
                    backgroundColor: activeSubTab === 'recommendations' ? 'rgba(255,255,255,0.02)' : 'transparent'
                  }}
                  onClick={() => setActiveSubTab('recommendations')}
                >
                  <Lightbulb size={16} color="var(--primary)" />
                  <span>Recommendations ({results.recommendations?.length || 0})</span>
                </button>
              </div>

              {/* Tab Panel Body content */}
              <div style={styles.tabContentPanel}>
                {activeSubTab === 'strengths' && (
                  <ul style={styles.bulletList}>
                    {results.strengths && results.strengths.map((str, idx) => (
                      <li key={idx} style={styles.bulletItem}>
                        <div style={styles.bulletPointDotGreen}></div>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeSubTab === 'gaps' && (
                  <ul style={styles.bulletList}>
                    {results.gaps && results.gaps.map((gap, idx) => (
                      <li key={idx} style={styles.bulletItem}>
                        <div style={styles.bulletPointDotOrange}></div>
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeSubTab === 'recommendations' && (
                  <ul style={styles.bulletList}>
                    {results.recommendations && results.recommendations.map((rec, idx) => (
                      <li key={idx} style={styles.bulletItem}>
                        <div style={styles.bulletPointDotBlue}></div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Styling classes for Resume Reviewer tab
const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
  },
  uploadCol: {
    width: '100%',
  },
  resultsCol: {
    width: '100%',
  },
  dropzone: {
    border: '2px dashed var(--border-color)',
    borderRadius: '12px',
    padding: '2.5rem 1.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropzoneLabel: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '8px',
    color: '#ff6b6b',
    fontSize: '0.825rem',
  },
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
  tipsCarousel: {
    marginTop: '1.5rem',
    padding: '1rem 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    maxWidth: '400px',
    textAlign: 'center',
  },
  carouselTitle: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--accent)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'block',
    marginBottom: '0.35rem',
  },
  carouselText: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
  },
  scoreRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '1rem',
  },
  scoreCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.25rem 1rem',
    textAlign: 'center',
  },
  scoreLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    marginBottom: '0.5rem',
  },
  bigScore: {
    fontFamily: 'var(--font-title)',
    fontSize: '2.2rem',
    fontWeight: '800',
    lineHeight: '1',
    margin: '0.25rem 0 0.75rem',
  },
  progressBarWrapper: {
    width: '100%',
    height: '4px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: '2px',
    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  summaryBox: {
    backgroundColor: 'rgba(6, 182, 212, 0.03)',
    border: '1px solid rgba(6, 182, 212, 0.15)',
  },
  detailTabs: {
    display: 'flex',
    borderBottom: '1px solid var(--border-color)',
    background: 'rgba(10, 15, 30, 0.3)',
  },
  tabButton: {
    flex: 1,
    padding: '1rem 0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    fontFamily: 'var(--font-title)',
    fontSize: '0.85rem',
    fontWeight: '600',
    transition: 'all 0.2s',
    outline: 'none',
  },
  tabContentPanel: {
    padding: '1.5rem',
  },
  bulletList: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  bulletItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    color: 'var(--text-main)',
  },
  bulletPointDotGreen: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--success)',
    boxShadow: '0 0 6px var(--success)',
    marginTop: '0.6rem',
    flexShrink: 0,
  },
  bulletPointDotOrange: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--warning)',
    boxShadow: '0 0 6px var(--warning)',
    marginTop: '0.6rem',
    flexShrink: 0,
  },
  bulletPointDotBlue: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    boxShadow: '0 0 6px var(--primary)',
    marginTop: '0.6rem',
    flexShrink: 0,
  }
};
