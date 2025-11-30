import React from 'react';
import { 
  Network, MessageSquare, Map, ArrowRight, PlayCircle, GitGraph, 
  Briefcase, Heart, Home as HomeIcon, Zap, CheckCircle2, ChevronDown, 
  Globe, Shield, BrainCircuit, Sparkles, Plane, Bot, Check, BarChart3, Flag, X
} from 'lucide-react';

const Home: React.FC = () => {
  const handleNav = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = path;
  };

  const personalExamples = [
    { 
      icon: <Heart className="text-pink-500" size={24} />, 
      title: "Relationships", 
      desc: "Stay or leave? Hard conversations.",
      query: "Should I break up with my partner if our long-term goals don't align?",
      link: "/solve",
      color: "bg-pink-50 border-pink-100"
    },
    { 
      icon: <Briefcase className="text-blue-500" size={24} />, 
      title: "Career", 
      desc: "Switch jobs? Ask for a raise?",
      query: "I have a stable job but want to join a risky startup. Help me decide.",
      link: "/solve",
      color: "bg-blue-50 border-blue-100"
    },
    { 
      icon: <Plane className="text-teal-500" size={24} />, 
      title: "Travel", 
      desc: "Itineraries & logistics.",
      query: "Plan a detailed 10-day trip to Japan for a couple who loves food and nature.",
      link: "/plan",
      color: "bg-teal-50 border-teal-100"
    },
    { 
      icon: <BrainCircuit className="text-purple-500" size={24} />, 
      title: "Complex Problems", 
      desc: "Analyze vague situations.",
      query: "I feel stuck in life and don't know what my next step should be.",
      link: "/chat",
      color: "bg-purple-50 border-purple-100"
    }
  ];

  const testimonials = [
    {
      quote: "SolveTree helped me map out a complex acquisition strategy. The visual tree made the risks obvious.",
      author: "Sarah J.",
      role: "Product Manager",
      company: "TechFlow"
    },
    {
      quote: "I was paralyzed about moving cities. The binary solver asked 5 questions and I knew exactly what to do.",
      author: "Marcus T.",
      role: "Freelancer",
      company: "RemoteWorks"
    },
    {
      quote: "The strategic planner is a game changer. It built a launch plan for my coffee shop in seconds.",
      author: "Elena R.",
      role: "Founder",
      company: "Bean & Brew"
    }
  ];

  const faqs = [
    { q: "Is my data private?", a: "Yes. Your sessions are private and we do not store your personal decision data permanently." },
    { q: "How accurate is the AI?", a: "We use Google's advanced Gemini 2.5 models. While highly capable, always use your own judgment for life-altering choices." },
    { q: "Can I print my plans?", a: "Absolutely. The Strategic Planner includes a print-friendly view for your roadmaps." }
  ];

  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-white">
      
      {/* HERO SECTION - WIDE & IMMERSIVE */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50/50">
        
        {/* Background Grid & Gradients */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
           <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-brand-100/40 rounded-full blur-[120px] animate-pulse-slow"></div>
           <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[100px]"></div>
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT FLOATING VISUAL (Desktop) */}
            <div className="hidden lg:block lg:col-span-3 animate-float relative">
              <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-5 rounded-3xl shadow-2xl transform rotate-[-3deg] hover:rotate-0 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <Bot size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">AI Consultant</div>
                    <div className="text-xs text-slate-500">Online</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-100 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-xs text-slate-600">
                    Should I invest in real estate now?
                  </div>
                  <div className="bg-purple-600 p-3 rounded-tl-xl rounded-br-xl rounded-bl-xl text-xs text-white shadow-lg">
                    Based on your finances, let's analyze the risks.
                  </div>
                  <div className="flex gap-2 mt-2">
                    <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
                    <div className="h-2 w-8 bg-slate-200 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Secondary floating element */}
              <div className="absolute -bottom-12 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-float-delayed">
                 <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600"><Check size={16} /></div>
                    <span className="text-sm font-bold text-slate-700">Clarity Found</span>
                 </div>
              </div>
            </div>

            {/* CENTER CONTENT */}
            <div className="col-span-1 lg:col-span-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium mb-8 shadow-sm hover:shadow-md transition-all cursor-default animate-fade-in-up">
                <Sparkles size={14} className="text-brand-500" />
                <span>Now with Interactive Binary Solver</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1] drop-shadow-sm">
                Decisions, <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-purple-600 to-brand-600 bg-300% animate-gradient">
                  Simplified.
                </span>
              </h1>
              
              <p className="mt-6 text-xl md:text-2xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                Stop overthinking. Use AI to visualize outcomes, solve binary dilemmas, and plan your next big move.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#/solve"
                  onClick={handleNav('/solve')}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-slate-900 hover:bg-slate-800 transition-all hover:scale-105 shadow-xl hover:shadow-slate-900/20"
                >
                  Start Solving Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a 
                  href="#/plan" 
                  onClick={handleNav('/plan')}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-slate-200 text-lg font-bold rounded-2xl text-slate-700 bg-white hover:bg-slate-50 transition-all hover:border-slate-300 shadow-md hover:shadow-lg"
                >
                  Generate a Plan
                </a>
              </div>

              <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-400 font-medium">
                 <span className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-1.5" /> No signup required</span>
                 <span className="mx-2 text-slate-300">•</span>
                 <span className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-1.5" /> Free to use</span>
                 <span className="mx-2 text-slate-300">•</span>
                 <span className="flex items-center"><CheckCircle2 size={16} className="text-green-500 mr-1.5" /> Private</span>
              </div>
            </div>

            {/* RIGHT FLOATING VISUAL (Desktop) */}
            <div className="hidden lg:block lg:col-span-3 animate-float-delayed relative">
               <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 p-6 rounded-[2rem] shadow-2xl transform rotate-[3deg] hover:rotate-0 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                        <PlayCircle size={20} />
                     </div>
                     <div>
                        <div className="font-bold text-slate-400 text-xs uppercase tracking-wider">BINARY SOLVER</div>
                     </div>
                  </div>
                  
                  <div className="text-center mb-8">
                     <div className="flex items-center justify-center gap-2 mb-2">
                        <h3 className="text-xl font-extrabold text-slate-900">"Situationship"</h3>
                        <Flag className="text-red-500 fill-red-500" size={20} />
                     </div>
                     <p className="text-slate-500 text-sm italic">He texted 'wyd' at 2am. Reply?</p>
                  </div>

                  <div className="flex gap-3">
                     <button className="flex-1 py-3 rounded-xl bg-red-50 text-red-600 font-bold text-sm border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center gap-2 shadow-sm">
                        <X size={16} /> NO
                     </button>
                     <button className="flex-1 py-3 rounded-xl bg-green-50 text-green-600 font-bold text-sm border border-green-100 hover:bg-green-100 transition-colors flex items-center justify-center gap-2 shadow-sm">
                        <Check size={16} /> YES
                     </button>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TRUSTED BY */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Trusted by forward thinkers at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><Globe size={24} /> GlobalCorp</div>
               <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><Zap size={24} /> FastScale</div>
               <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><Network size={24} /> NexusAI</div>
               <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><Shield size={24} /> SecurePath</div>
            </div>
         </div>
      </section>

      {/* USE CASE GRID - WIDE */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">What's on your mind?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Select a category to jumpstart your decision making process with a tailored AI template.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personalExamples.map((item, i) => (
                <a 
                  key={i}
                  href={`${item.link}?topic=${encodeURIComponent(item.query)}`}
                  onClick={handleNav(`${item.link}?topic=${encodeURIComponent(item.query)}`)}
                  className={`group relative p-8 rounded-[2rem] border ${item.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block bg-opacity-40 hover:bg-opacity-100`}
                >
                   <div className="mb-6 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      {item.icon}
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                   <p className="text-slate-500 mb-6 text-sm leading-relaxed">{item.desc}</p>
                   <div className="flex items-center text-sm font-semibold text-slate-900">
                      Try this template <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </div>
                </a>
              ))}
           </div>
        </div>
      </section>

      {/* FEATURE BENTO GRID - WIDE */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none bg-grid-slate-100"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">A complete toolkit for clarity.</h2>
             <p className="text-slate-500 text-lg">We've combined three powerful thinking models into one platform to handle any type of problem you face.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
            
            {/* Feature 1: Binary Solver (Large) */}
            <div className="md:col-span-2 md:row-span-2 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group shadow-2xl flex flex-col justify-between hover:shadow-brand-900/20 transition-all">
              <div className="relative z-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6 border border-white/10 backdrop-blur-md">
                   <PlayCircle size={14} className="mr-2" /> New Feature
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Binary Solver Engine</h3>
                <p className="text-slate-300 text-lg md:text-xl max-w-md leading-relaxed">
                  Stuck in analysis paralysis? Our interactive engine asks you a specific series of <span className="text-white font-bold">Yes/No</span> questions to drill down to the optimal solution.
                </p>
              </div>
              
              <div className="mt-8 relative z-10">
                 <a href="#/solve" onClick={handleNav('/solve')} className="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-brand-50 transition-colors shadow-lg">
                   Try Interactive Mode
                 </a>
              </div>

              {/* Decorative UI Mockup */}
              <div className="absolute right-[-20%] bottom-[-10%] w-[60%] h-[70%] bg-slate-800 rounded-t-3xl border border-slate-700 shadow-2xl transform rotate-[-10deg] p-6 opacity-50 md:opacity-100 group-hover:rotate-[-5deg] group-hover:translate-y-[-10px] transition-all duration-700 ease-out">
                 <div className="w-full h-8 bg-slate-700 rounded-full mb-6 flex items-center px-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                 </div>
                 <div className="w-3/4 h-8 bg-slate-600 rounded-lg mb-4"></div>
                 <div className="w-1/2 h-8 bg-slate-600 rounded-lg mb-12"></div>
                 <div className="flex gap-4">
                    <div className="w-1/2 h-16 bg-red-900/50 border border-red-500/30 rounded-xl flex items-center justify-center text-red-400 font-bold">NO</div>
                    <div className="w-1/2 h-16 bg-green-900/50 border border-green-500/30 rounded-xl flex items-center justify-center text-green-400 font-bold">YES</div>
                 </div>
              </div>
            </div>

            {/* Feature 2: Visual Tree */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all">
               <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <GitGraph size={28} />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-3">Visual Mapping</h3>
               <p className="text-slate-500 leading-relaxed">See the big picture. Visualize every probability branch and outcome in a dynamic tree.</p>
               
               <a href="#/solve" onClick={handleNav('/solve')} className="absolute bottom-8 right-8 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-colors">
                  <ArrowRight size={20} />
               </a>
            </div>

            {/* Feature 3: Strategic Planner */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all">
               <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 size={28} />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-3">Launch Plans</h3>
               <p className="text-slate-500 leading-relaxed">Turn dreams into tasks. Get a detailed, Phase-by-Phase execution roadmap instantly.</p>
               
                <a href="#/plan" onClick={handleNav('/plan')} className="absolute bottom-8 right-8 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-colors">
                  <ArrowRight size={20} />
               </a>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white border-b border-slate-100">
         <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">See what others achieved</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {testimonials.map((t, i) => (
                  <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 relative hover:bg-slate-100 transition-colors">
                     <div className="text-brand-500 mb-6">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.0547 15.1924 15.3623 15.1924 13.5625C15.1924 11.501 13.434 11.5547 13.434 8C13.434 5.375 15.165 4 17.1357 4C19.7226 4 21.6842 5.86035 21.6842 9.07129C21.6842 13.9189 18.0674 18.0068 15.3525 21L14.017 21ZM5.16915 21L5.16915 18C5.16915 16.0547 6.34449 15.3623 6.34449 13.5625C6.34449 11.501 4.58611 11.5547 4.58611 8C4.58611 5.375 6.31707 4 8.2878 4C10.8747 4 12.8363 5.86035 12.8363 9.07129C12.8363 13.9189 9.21953 18.0068 6.50465 21L5.16915 21Z" /></svg>
                     </div>
                     <p className="text-slate-700 font-medium text-lg mb-6 leading-relaxed">"{t.quote}"</p>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-slate-500 shadow-sm border border-slate-200">
                           {t.author.charAt(0)}
                        </div>
                        <div>
                           <div className="text-sm font-bold text-slate-900">{t.author}</div>
                           <div className="text-xs text-slate-500">{t.role}, {t.company}</div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
               {faqs.map((faq, i) => (
                  <div key={i} className="border border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-colors bg-slate-50/30">
                     <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                     <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-slate-900 py-24 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="max-w-2xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to clear your mind?</h2>
            <p className="text-slate-400 mb-10 text-xl leading-relaxed">Join thousands of users making better, faster decisions every day with AI assistance.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#/solve" onClick={handleNav('/solve')} className="inline-flex items-center justify-center px-8 py-4 bg-white rounded-xl text-slate-900 font-bold hover:bg-brand-50 transition-all shadow-lg hover:shadow-white/10 hover:scale-105">
                 Start Solving Now
              </a>
              <a href="#/chat" onClick={handleNav('/chat')} className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-slate-600 rounded-xl text-white font-medium hover:bg-slate-800 transition-all">
                 <MessageSquare className="mr-2 h-5 w-5" />
                 Chat with Consultant
              </a>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;