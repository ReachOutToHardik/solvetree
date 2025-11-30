import React, { useState, useEffect } from 'react';
import { generateStrategicPlan } from '../services/gemini';
import { StrategicPlan, PlannerPhase, PlannerTask } from '../types';
import { Calendar, CheckSquare, Clock, ArrowRight, Loader2, Map } from 'lucide-react';

const Planner: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [plan, setPlan] = useState<StrategicPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-fill from URL
  useEffect(() => {
    const hash = window.location.hash;
    const queryString = hash.split('?')[1];
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      const topic = urlParams.get('topic');
      if (topic) {
        setGoal(decodeURIComponent(topic));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;

    setLoading(true);
    setError(null);
    setPlan(null);

    try {
      const result = await generateStrategicPlan(goal);
      setPlan(result);
    } catch (err) {
      console.error(err);
      setError("Could not generate a plan. Please try to be more specific with your goal.");
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-slate-50 min-h-full py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 bg-teal-100 text-teal-600 rounded-xl mb-4">
             <Map size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Strategic Planner</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Turn ambitious goals into actionable, phased execution roadmaps.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-16 max-w-3xl mx-auto animate-fade-in-up delay-100">
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-slate-700 mb-3">What is your main objective?</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Launch a SaaS startup, Plan a 2-week trip to Italy..."
                className="flex-1 rounded-xl border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-4 border text-lg"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !goal.trim()}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl shadow-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition-all hover:scale-105"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Generate Plan'}
              </button>
            </div>
            {error && <p className="mt-3 text-sm text-red-600 flex items-center"><span className="bg-red-100 text-red-600 rounded-full w-4 h-4 flex items-center justify-center text-xs mr-2">!</span>{error}</p>}
          </form>
        </div>

        {plan && (
          <div className="space-y-10 animate-fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-slate-300 flex-1"></div>
              <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest px-4 py-1 bg-white border border-slate-200 rounded-full shadow-sm">{plan.goal}</h2>
              <div className="h-px bg-slate-300 flex-1"></div>
            </div>

            <div className="relative">
               {/* Vertical Line for Timeline */}
               <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block"></div>

               <div className="space-y-12">
                {plan.phases.map((phase, index) => (
                  <div key={index} className="relative md:pl-24">
                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-6 -ml-1.5 w-5 h-5 rounded-full border-4 border-white bg-teal-500 shadow-md hidden md:block z-10"></div>
                    
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-gradient-to-r from-teal-50 to-white p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                           <span className="bg-teal-600 text-white text-sm font-bold px-3 py-1 rounded shadow-sm">PHASE {index + 1}</span>
                           <h3 className="text-xl font-bold text-slate-900">{phase.title}</h3>
                        </div>
                        <div className="flex items-center text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                          <Clock size={16} className="mr-2 text-teal-600" />
                          {phase.duration || "Flexible duration"}
                        </div>
                      </div>

                      <div className="p-2">
                        {phase.tasks.map((task, tIndex) => (
                          <div 
                            key={tIndex} 
                            className="p-4 md:p-6 flex items-start gap-5 hover:bg-slate-50 transition-colors rounded-xl m-2"
                          >
                            <div className="mt-1 text-slate-300">
                              <CheckSquare size={24} />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <h4 className="text-lg font-semibold text-slate-900">{task.name}</h4>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${getPriorityColor(task.priority)}`}>
                                  {task.priority}
                                </span>
                              </div>
                              <p className="text-slate-600 leading-relaxed text-base">{task.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
               </div>
            </div>
            
            <div className="flex justify-center mt-16 pb-12">
               <button 
                onClick={() => window.print()} 
                className="px-8 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 transition-all font-medium flex items-center shadow-sm"
               >
                  Print Strategy Plan <ArrowRight size={18} className="ml-2" />
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Planner;