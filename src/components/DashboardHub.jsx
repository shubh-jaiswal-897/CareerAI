import React from 'react';
import { 
  Sparkles, 
  Target, 
  FileText, 
  Compass, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle,
  Activity,
  Award
} from 'lucide-react';

export default function DashboardHub({ 
  userGoal, 
  roadmapData, 
  resumeText, 
  setActiveTab,
  apiKey
}) {
  // Extract resume analysis state if shared resumeText is available
  const hasResume = resumeText && resumeText.includes('Target Role:');
  const mockATSScore = hasResume ? 85 : 0;
  
  // Calculate completion details
  const hasRoadmap = !!roadmapData;
  const totalPhases = roadmapData?.phases?.length || 0;
  
  // Custom mock activity logs
  const activities = [
    { text: "Logged in to CareerAI console", time: "Just now", type: "system" },
    userGoal ? { text: `Set active target career goal: "${userGoal}"`, time: "10 mins ago", type: "goal" } : null,
    hasRoadmap ? { text: `Generated personalized roadmap: "${roadmapData.title}"`, time: "8 mins ago", type: "roadmap" } : null,
    hasResume ? { text: `Analyzed resume alignment for: "${userGoal || 'Target Role'}"`, time: "5 mins ago", type: "resume" } : null,
  ].filter(Boolean);

  if (activities.length === 1) {
    // Add default mock logs if user hasn't done anything yet
    activities.push(
      { text: "Welcome to CareerAI! Complete a profile scan to start.", time: "1 hour ago", type: "welcome" }
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-[fadeIn_0.5s_ease-out]">
      
      {/* WELCOME BANNER */}
      <div className="glass-card relative overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border-indigo-500/20">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h1 className="font-[Outfit] text-2xl sm:text-3xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            Welcome to your Dashboard <Sparkles size={20} className="text-purple-400 animate-pulse" />
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl">
            Prepare, analyze, and learn. Navigate through modules to build your path and land your target role.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
            {apiKey ? '🟢 Live API Key Connected' : '🟡 Demo Mode Active'}
          </div>
        </div>
      </div>

      {/* THREE STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* STAT 1: Target Career Goal */}
        <div className="glass-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-400">Target Role</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Target size={16} className="text-indigo-400" />
            </div>
          </div>
          <div>
            <h3 className="font-[Outfit] text-xl font-bold text-white truncate">
              {userGoal || 'Not Specified'}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {userGoal ? 'Active goal loaded' : 'Define your goal in the Roadmap tab'}
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('roadmap')} 
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 mt-2 self-start"
          >
            Manage Roadmaps <ArrowRight size={12} />
          </button>
        </div>

        {/* STAT 2: ATS Scorecard */}
        <div className="glass-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-400">ATS Profile Match</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <FileText size={16} className="text-emerald-400" />
            </div>
          </div>
          <div>
            <h3 className="font-[Outfit] text-xl font-bold text-white flex items-baseline gap-1.5">
              {hasResume ? `${mockATSScore}%` : 'No Resume Scan'}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {hasResume ? 'Highly compatible profile match' : 'Upload resume in the Reviewer tab'}
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('resume')} 
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 mt-2 self-start"
          >
            Review Resume <ArrowRight size={12} />
          </button>
        </div>

        {/* STAT 3: Roadmap Milestones */}
        <div className="glass-card flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-400">Roadmap Status</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Compass size={16} className="text-purple-400" />
            </div>
          </div>
          <div>
            <h3 className="font-[Outfit] text-xl font-bold text-white">
              {hasRoadmap ? `${totalPhases} Learning Phases` : 'No active timeline'}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {hasRoadmap ? 'Custom learning tracks generated' : 'Build a syllabus timeline'}
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('roadmap')} 
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 mt-2 self-start"
          >
            View Syllabus <ArrowRight size={12} />
          </button>
        </div>

      </div>

      {/* HUB MIDDLE ROW: QUICK ACTIONS vs ACTIVITY LOG */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT HUB: QUICK PREPARATION ACTIONS */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
          <div className="glass-card flex flex-col gap-5">
            <h3 className="font-[Outfit] text-lg font-bold text-white flex items-center gap-2">
              <Award size={18} className="text-amber-500" /> Prepare For Placement
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-3 hover:bg-white/10 transition-all">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">AI Mock Interview</h4>
                  <p className="text-xs text-gray-400 leading-normal">
                    Interactive technical/behavioral simulator to test your readiness.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('interview')}
                  className="btn btn-secondary !py-1.5 !px-3 text-xs w-full justify-center"
                >
                  Start Round
                </button>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-3 hover:bg-white/10 transition-all">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">AI Career Coach</h4>
                  <p className="text-xs text-gray-400 leading-normal">
                    Prepare mock questions or discuss negotiation tricks with your coach.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('chat')}
                  className="btn btn-secondary !py-1.5 !px-3 text-xs w-full justify-center"
                >
                  Ask Coach
                </button>
              </div>

            </div>

            {/* RECOMMENDED TARGET SKILLS */}
            {hasRoadmap && (
              <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex flex-col gap-2">
                <span className="text-xs text-indigo-400 font-semibold tracking-wide uppercase">Next Target Skill</span>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {roadmapData.phases[0]?.skills[0] || 'Start studying baseline skills'}
                    </h4>
                    <p className="text-xs text-gray-400">
                      Phase 1: {roadmapData.phases[0]?.title || 'Foundation'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('roadmap')}
                    className="btn btn-primary !py-1.5 !px-4 text-xs font-semibold"
                  >
                    Open Roadmap
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT HUB: SYSTEM ACTIVITY LOG */}
        <div className="col-span-1 lg:col-span-5 w-full">
          <div className="glass-card h-full flex flex-col gap-5">
            <h3 className="font-[Outfit] text-lg font-bold text-white flex items-center gap-2">
              <Activity size={18} className="text-indigo-400" /> Recent Activities
            </h3>
            
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[250px] pr-1">
              {activities.map((act, index) => (
                <div key={index} className="flex gap-3 text-xs items-start">
                  <div className="w-5 h-5 rounded-full bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={10} className="text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 leading-relaxed font-medium">{act.text}</p>
                    <span className="text-[10px] text-gray-500 block mt-0.5">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
