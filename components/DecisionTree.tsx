import React, { useState, useEffect } from 'react';
import { generateDecisionTree, createInteractiveSolverSession } from '../services/gemini';
import { TreeNode, DecisionStep } from '../types';
import D3TreeGraph from './D3TreeGraph';
import { Loader2, AlertCircle, Network, GitGraph, PlayCircle, Check, X, RefreshCw } from 'lucide-react';
import { Chat } from '@google/genai';

const DecisionTree: React.FC = () => {
  // Parsing query params for auto-fill from Home page
  useEffect(() => {
    const hash = window.location.hash;
    const queryString = hash.split('?')[1];
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      const topic = urlParams.get('topic');
      if (topic) {
        setSituation(decodeURIComponent(topic));
        // Optional: auto-submit or just pre-fill
      }
    }
  }, []);

  const [mode, setMode] = useState<'visual' | 'interactive'>('visual');
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Visual Mode State
  const [treeData, setTreeData] = useState<TreeNode | null>(null);

  // Interactive Mode State
  const [solverSession, setSolverSession] = useState<Chat | null>(null);
  const [currentStep, setCurrentStep] = useState<DecisionStep | null>(null);
  const [history, setHistory] = useState<{question: string, answer: string}[]>([]);

  // VISUAL MODE HANDLER
  const handleVisualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim()) return;

    setLoading(true);
    setError(null);
    setTreeData(null);

    try {
      const result = await generateDecisionTree(situation);
      setTreeData(result);
    } catch (err) {
      console.error("Decision Tree Generation Error:", err);
      setError("Failed to generate the decision tree. Please try again or refine your situation description.");
    } finally {
      setLoading(false);
    }
  };

  // INTERACTIVE MODE HANDLERS
  const startInteractiveSession = async () => {
    if (!situation.trim()) return;
    setLoading(true);
    setError(null);
    setHistory([]);
    
    try {
      const session = createInteractiveSolverSession();
      setSolverSession(session);
      
      const response = await session.sendMessage({ message: situation });
      if (response.text) {
        const step = JSON.parse(response.text) as DecisionStep;
        setCurrentStep(step);
      }
    } catch (err) {
      console.error("Interactive Session Error:", err);
      setError("Failed to start the solver.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer: 'Yes' | 'No') => {
    if (!solverSession || !currentStep) return;
    
    // Optimistic update of history
    setHistory(prev => [...prev, { question: currentStep.content, answer }]);
    setLoading(true);
    
    try {
      const response = await solverSession.sendMessage({ message: answer });
      if (response.text) {
        const nextStep = JSON.parse(response.text) as DecisionStep;
        setCurrentStep(nextStep);
      }
    } catch (err) {
      setError("Failed to get next step.");
    } finally {
      setLoading(false);
    }
  };

  const resetInteractive = () => {
    setSolverSession(null);
    setCurrentStep(null);
    setHistory([]);
  };

  return (
    <div className="bg-slate-50 min-h-full py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Decision Engine</h1>
          <p className="mt-2 text-slate-600">Choose your preferred method of analysis.</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
            <button
              onClick={() => setMode('visual')}
              className={`flex items-center px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'visual' 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <GitGraph size={18} className="mr-2" />
              Visual Map
            </button>
            <button
              onClick={() => setMode('interactive')}
              className={`flex items-center px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'interactive' 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <PlayCircle size={18} className="mr-2" />
              Binary Solver
            </button>
          </div>
        </div>

        {/* INPUT SECTION (Shared mainly for Visual, acts as Init for Interactive) */}
        {!currentStep && (
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 max-w-3xl mx-auto transition-all animate-fade-in-up">
            <form onSubmit={mode === 'visual' ? handleVisualSubmit : (e) => { e.preventDefault(); startInteractiveSession(); }}>
              <label htmlFor="situation" className="block text-sm font-medium text-slate-700 mb-2">
                What's on your mind?
              </label>
              <div className="relative">
                <textarea
                  id="situation"
                  rows={4}
                  className="block w-full rounded-xl border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-lg p-4 border bg-slate-50/50"
                  placeholder={mode === 'visual' 
                    ? "e.g., Should I accept a job offer with higher pay but longer commute?" 
                    : "e.g., I'm thinking about breaking up with my partner because..."
                  }
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !situation.trim()}
                  className="absolute bottom-3 right-3 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      {mode === 'visual' ? 'Generate Map' : 'Start Solving'}
                      {mode === 'visual' ? <Network className="ml-2 h-4 w-4" /> : <PlayCircle className="ml-2 h-4 w-4" />}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {error && (
          <div className="max-w-3xl mx-auto rounded-md bg-red-50 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* VISUAL MODE OUTPUT */}
        {mode === 'visual' && treeData && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in-up">
             <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-800">Decision Analysis</h2>
                <button 
                  onClick={() => setTreeData(null)}
                  className="text-sm text-slate-500 hover:text-brand-600 underline"
                >
                  Clear Result
                </button>
             </div>
            <D3TreeGraph data={treeData} />
            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <p className="text-slate-600 text-sm">
                Scroll to zoom. Drag to pan.
              </p>
            </div>
          </div>
        )}

        {/* INTERACTIVE MODE OUTPUT */}
        {mode === 'interactive' && currentStep && (
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            
            {/* History Breadcrumbs */}
            {history.length > 0 && (
              <div className="mb-8 space-y-4">
                {history.map((h, i) => (
                  <div key={i} className="flex flex-col animate-fade-in">
                    <div className="text-slate-500 text-sm italic mb-1">"{h.question}"</div>
                    <div className="self-start inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      You: {h.answer}
                    </div>
                    {i < history.length && <div className="h-4 w-0.5 bg-slate-200 ml-4 my-1"></div>}
                  </div>
                ))}
              </div>
            )}

            {/* Current Step Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
               <div className={`h-2 w-full ${currentStep.type === 'result' ? 'bg-green-500' : 'bg-brand-500'}`}></div>
               <div className="p-8 md:p-10 text-center">
                  
                  {loading ? (
                    <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                      <Loader2 className="animate-spin h-10 w-10 mb-4 text-brand-500" />
                      <p>Analyzing your response...</p>
                    </div>
                  ) : (
                    <>
                      {currentStep.type === 'result' && (
                        <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-600 rounded-full mb-6">
                           <Check size={32} />
                        </div>
                      )}
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight">
                        {currentStep.content}
                      </h3>
                      
                      {currentStep.type === 'question' ? (
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          <button
                            onClick={() => handleAnswer('No')}
                            className="flex items-center justify-center px-6 py-4 border-2 border-slate-200 rounded-xl text-lg font-medium text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700 transition-all"
                          >
                            <X className="mr-2 h-5 w-5" />
                            No
                          </button>
                          <button
                            onClick={() => handleAnswer('Yes')}
                            className="flex items-center justify-center px-6 py-4 border-2 border-brand-100 bg-brand-50 rounded-xl text-lg font-medium text-brand-700 hover:bg-brand-100 hover:border-brand-200 transition-all shadow-sm"
                          >
                            <Check className="mr-2 h-5 w-5" />
                            Yes
                          </button>
                        </div>
                      ) : (
                        <div className="mt-8">
                           <button
                            onClick={resetInteractive}
                            className="inline-flex items-center text-sm text-slate-500 hover:text-brand-600 underline"
                           >
                             <RefreshCw className="mr-1 h-3 w-3" />
                             Start Over
                           </button>
                        </div>
                      )}
                    </>
                  )}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionTree;