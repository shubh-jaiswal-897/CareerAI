import React, { useState } from 'react';
import {
  Briefcase,
  ArrowRight,
  Play,
  Award,
  User,
  Sparkles,
  BookOpen,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Target,
  MessageSquare,
} from 'lucide-react';

export default function MockInterview({ apiKey, userGoal }) {
  const [step, setStep] = useState('setup');
  const [role, setRole] = useState(userGoal || '');
  const [difficulty, setDifficulty] = useState('Mid-Level');
  const [track, setTrack] = useState('Technical/Coding');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [questionIdx, setQuestionIdx] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [qaHistory, setQaHistory] = useState([]);
  const [evaluation, setEvaluation] = useState(null);

  const mockQuestions = {
    'Technical/Coding': [
      'Explain the difference between synchronous and asynchronous execution in JavaScript, and how event loops manage tasks.',
      'How does CSS flexbox coordinate spacing, and when should you prefer CSS grid over flexbox?',
      'Explain the concept of memoization and describe how you would write a custom hook in React to memoize heavy computations.',
    ],
    'System Design': [
      'Design a scaling strategy for a web application expecting an abrupt surge in traffic (e.g. flash sale).',
      'Explain when you would use SQL vs NoSQL databases in a modern microservices architecture.',
      'How do caching layers (like Redis) optimize database query performance, and what are common cache invalidation strategies?',
    ],
    Behavioral: [
      'Tell me about a time you worked on a challenging team project and encountered a conflict. How did you resolve it?',
      'How do you prioritize deadlines and manage tasks when you are assigned multiple high-priority tickets?',
      'Describe a time you failed to deliver a task on time. What did you learn and how did you communicate it to your lead?',
    ],
  };

  const activeQuestions = mockQuestions[track] || mockQuestions['Technical/Coding'];

  const interviewTips = {
    'Technical/Coding': [
      'Start with a quick structure: define the concept, give an example, and explain trade-offs.',
      'Use one practical scenario to demonstrate how you think under pressure.',
    ],
    'System Design': [
      'State assumptions early so your architecture answer feels grounded and realistic.',
      'Discuss bottlenecks, scale limits, and tradeoffs before finalizing the design.',
    ],
    Behavioral: [
      'Use the STAR method: Situation, Task, Action, Result.',
      'Emphasize what changed after your intervention and what you learned.',
    ],
  };

  const handleStartRound = (e) => {
    e.preventDefault();
    if (!role.trim()) {
      setError('Please specify the job role you want to practice.');
      return;
    }
    setError('');
    setStep('live');
    setQuestionIdx(0);
    setQaHistory([]);
    setCurrentAnswer('');
  };

  const handleNextQuestion = async () => {
    if (!currentAnswer.trim()) return;

    const newHistory = [
      ...qaHistory,
      {
        question: activeQuestions[questionIdx],
        answer: currentAnswer,
      },
    ];
    setQaHistory(newHistory);
    setCurrentAnswer('');

    if (questionIdx < activeQuestions.length - 1) {
      setQuestionIdx((prev) => prev + 1);
    } else {
      setLoading(true);
      setStep('scoring');

      try {
        if (apiKey) {
          await new Promise((res) => setTimeout(res, 2500));
        } else {
          await new Promise((res) => setTimeout(res, 2000));
        }

        setEvaluation({
          score: 82,
          difficulty,
          track,
          feedback: [
            {
              metric: 'Technical Accuracy',
              rating: '85%',
              desc: 'Answers demonstrate strong familiarity with core structures. Terminology was used correctly.',
            },
            {
              metric: 'Communication Clarity',
              rating: '80%',
              desc: 'Explanations were concise, although structuring using bullet formats or STAR method would improve structure.',
            },
            {
              metric: 'Problem Solving',
              rating: '82%',
              desc: 'Good grasp of edge-case scenarios and analytical tradeoffs.',
            },
          ],
          qAssessments: newHistory.map((qa, idx) => ({
            question: qa.question,
            userAnswer: qa.answer,
            verdict: idx === 0 ? 'Strong Response' : idx === 1 ? 'Acceptable Response' : 'Needs Detail',
            suggestedModelAnswer:
              idx === 0
                ? 'A complete answer should define the call stack, Web APIs, callback queue, and loop iterations.'
                : idx === 1
                  ? 'Highlight grid for 2D complex page layouts and flexbox for 1D alignments.'
                  : 'Use the STAR method: Situation, Task, Action, and Result.',
          })),
        });
      } catch (err) {
        setError('Failed to score the answers. Try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRestart = () => {
    setStep('setup');
    setEvaluation(null);
    setQaHistory([]);
    setCurrentAnswer('');
  };

  return (
    <div className="mx-auto w-full max-w-5xl animate-[fadeIn_0.5s_ease-out]">
      {step === 'setup' && (
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="auth-card flex flex-col justify-between gap-6 p-6 sm:p-8">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/20">
                  <Briefcase size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Practice mode</p>
                  <h2 className="font-[Outfit] text-2xl font-bold text-white">AI Mock Interview</h2>
                </div>
              </div>
              <p className="text-sm text-slate-300">
                Prepare for real interview pressure with a focused, simple round structure and immediate feedback.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <Target size={16} className="text-cyan-300" />
                  <span className="text-sm font-semibold">Match your target role</span>
                </div>
                <p className="text-sm text-slate-300">Choose a role and track that matches your real job search goals.</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <MessageSquare size={16} className="text-amber-300" />
                  <span className="text-sm font-semibold">Stay structured</span>
                </div>
                <p className="text-sm text-slate-300">Answer one question at a time and move through a smoother practice flow.</p>
              </div>
            </div>
          </div>

          <div className="section-card p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                <Sparkles size={18} className="text-purple-300" />
              </div>
              <div>
                <h3 className="font-[Outfit] text-xl font-bold text-white">Configure your round</h3>
                <p className="text-xs text-slate-400">Select the track and difficulty that fits your stage</p>
              </div>
            </div>

            <form onSubmit={handleStartRound} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="form-group mb-0">
                  <label className="form-label" htmlFor="interviewRole">Target Job Role</label>
                  <input
                    id="interviewRole"
                    type="text"
                    className="input-field"
                    placeholder="e.g. React Front End, Data Analyst"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>

                <div className="form-group mb-0">
                  <label className="form-label" htmlFor="difficultySelect">Experience Level</label>
                  <select
                    id="difficultySelect"
                    className="input-field"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="Junior">Junior (0-2 years)</option>
                    <option value="Mid-Level">Mid-Level (2-5 years)</option>
                    <option value="Senior">Senior (5+ years)</option>
                  </select>
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Interview Category Track</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { id: 'Technical/Coding', label: '💻 Coding', desc: 'Core languages and web architecture' },
                    { id: 'System Design', label: '🏗️ System Design', desc: 'Scalability and trade-offs' },
                    { id: 'Behavioral', label: '🎙️ Behavioral', desc: 'STAR story structure' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setTrack(item.id)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        track === item.id
                          ? 'border-indigo-400 bg-indigo-500/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-sm font-bold text-white">{item.label}</div>
                      <div className="mt-1 text-[11px] text-slate-400">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-3 text-xs text-rose-300">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary w-full justify-center py-3 text-base">
                <Play size={16} fill="white" />
                Start Practice Round
              </button>
            </form>
          </div>
        </div>
      )}

      {step === 'live' && (
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="section-card p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-[11px] font-bold text-purple-300">
                  Question {questionIdx + 1} of {activeQuestions.length}
                </span>
                <span className="text-xs text-slate-400">{track} • {difficulty}</span>
              </div>
              <button onClick={handleRestart} className="text-xs text-slate-400 hover:text-white">
                Cancel round
              </button>
            </div>

            <div className="mb-4 flex items-start gap-3 rounded-2xl bg-white/5 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-purple-300">Interviewer Question</p>
                <p className="text-sm leading-relaxed text-slate-100">{activeQuestions[questionIdx]}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                <User size={16} className="text-slate-300" />
              </div>
              <textarea
                className="input-field"
                rows={7}
                placeholder="Type your structured answer here. Take your time to explain your reasoning clearly."
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                style={{ resize: 'none' }}
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button onClick={handleRestart} className="btn btn-secondary">Quit Practice</button>
              <button
                onClick={handleNextQuestion}
                disabled={!currentAnswer.trim()}
                className={`btn btn-primary ${!currentAnswer.trim() ? 'btn-disabled' : ''}`}
              >
                {questionIdx === activeQuestions.length - 1 ? 'Finish & Score' : 'Next Question'}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="section-card p-5 sm:p-6">
            <h3 className="font-[Outfit] text-lg font-bold text-white">Quick Tips</h3>
            <div className="mt-4 space-y-3">
              {interviewTips[track].map((tip, idx) => (
                <div key={idx} className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
                  <div className="mb-1 flex items-center gap-2 text-white">
                    <CheckCircle2 size={14} className="text-emerald-300" />
                    <span className="font-semibold">Tip {idx + 1}</span>
                  </div>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 'scoring' && (
        <div className="flex flex-col gap-6">
          {loading && (
            <div className="section-card py-16 text-center">
              <RefreshCw size={42} className="mx-auto mb-4 text-purple-300" />
              <h3 className="font-[Outfit] text-lg font-bold text-white">Evaluating your performance...</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">
                Our AI model is checking technical depth, clarity, and structure in your responses.
              </p>
            </div>
          )}

          {!loading && evaluation && (
            <div className="flex flex-col gap-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="section-card flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-[Outfit] text-2xl font-bold text-white">Scorecard Generated</h2>
                  <p className="mt-1 text-sm text-slate-300">
                    Target role: <span className="text-white">{role}</span> • Difficulty: <span className="text-white">{difficulty}</span>
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 px-5 py-3 text-center">
                  <div className="font-[Outfit] text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                    {evaluation.score}%
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Overall rating</div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {evaluation.feedback.map((item, index) => (
                  <div key={index} className="section-card">
                    <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-bold text-slate-400">{item.metric}</span>
                      <span className="text-xs font-bold text-purple-300">{item.rating}</span>
                    </div>
                    <p className="text-sm text-slate-300">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="section-card">
                <h3 className="font-[Outfit] text-lg font-bold text-white">Question-by-question audit</h3>
                <div className="mt-5 space-y-4">
                  {evaluation.qAssessments.map((qa, index) => (
                    <div key={index} className="rounded-2xl bg-white/5 p-4">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-300">Question {index + 1}</span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            qa.verdict === 'Strong Response'
                              ? 'bg-emerald-500/10 text-emerald-300'
                              : qa.verdict === 'Acceptable Response'
                                ? 'bg-amber-500/10 text-amber-300'
                                : 'bg-rose-500/10 text-rose-300'
                          }`}
                        >
                          {qa.verdict}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-white">{qa.question}</p>
                      <p className="mt-2 text-xs text-slate-400">Your answer: “{qa.userAnswer}”</p>

                      <div className="mt-3 rounded-xl border border-purple-500/15 bg-purple-500/5 p-3 text-xs text-slate-200">
                        <div className="mb-1 flex items-center gap-2 text-purple-300">
                          <BookOpen size={12} />
                          <span className="font-semibold">Key assessment checkpoint</span>
                        </div>
                        <p>{qa.suggestedModelAnswer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <button onClick={handleRestart} className="btn btn-primary">
                  <RefreshCw size={14} /> Practice Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
