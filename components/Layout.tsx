import React from 'react';
import { Network, MessageSquare, Map, Menu, X, Twitter, Linkedin, Github, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { currentUser, logout } = useAuth();

  // Get current path from hash for active state highlighting, matching App.tsx logic
  const getNormalizedPath = () => {
    if (typeof window === 'undefined') return '/';
    const hash = window.location.hash;
    const path = hash.replace(/^#/, '').split('?')[0] || '/';
    if (path.length > 1 && path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  };

  const currentPath = getNormalizedPath();

  const navItems = [
    { name: 'Decision Tree', path: '/solve', icon: <Network size={18} /> },
    { name: 'Consultant Chat', path: '/chat', icon: <MessageSquare size={18} /> },
    { name: 'Strategic Planner', path: '/plan', icon: <Map size={18} /> },
  ];

  const isActive = (path: string) => currentPath === path;

  // Helper to handle navigation without triggering default browser behavior
  const handleNav = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = path;
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 selection:bg-brand-100 selection:text-brand-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <a
              href="#/"
              onClick={handleNav('/')}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="bg-slate-900 text-white p-1.5 rounded-lg group-hover:bg-brand-600 transition-colors">
                <Network size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Solve<span className="text-brand-600">Tree</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={`#${item.path}`}
                  onClick={handleNav(item.path)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${isActive(item.path)
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                    }`}
                >
                  {item.icon}
                  {item.name}
                </a>
              ))}
            </nav>

            {/* User Controls */}
            <div className="hidden md:flex items-center gap-4 ml-4">
              {currentUser ? (
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="bg-brand-100 text-brand-600 p-1.5 rounded-full">
                      <UserIcon size={16} />
                    </div>
                    <span className="max-w-[150px] truncate">{currentUser.email}</span>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <a
                  href="#/login"
                  onClick={handleNav('/login')}
                  className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors shadow-sm shadow-brand-200"
                >
                  Sign In
                </a>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              {currentUser && (
                <button
                  onClick={() => logout()}
                  className="p-2 text-slate-400 hover:text-red-600"
                >
                  <LogOut size={20} />
                </button>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={`#${item.path}`}
                  onClick={handleNav(item.path)}
                  className={`flex items-center gap-3 px-3 py-4 text-base font-medium rounded-md cursor-pointer ${isActive(item.path)
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                    }`}
                >
                  {item.icon}
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-slate-900 text-white p-1 rounded">
                  <Network size={16} />
                </div>
                <span className="font-bold text-lg text-slate-900">SolveTree</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Empowering individuals and businesses to make better decisions through artificial intelligence. Map your problems, consult with experts, and plan your future with confidence.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-slate-400 hover:text-brand-600 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-brand-600 transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-brand-600 transition-colors"><Github size={20} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-slate-900 font-bold mb-4">Product</h3>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#/solve" onClick={handleNav('/solve')} className="hover:text-brand-600 transition-colors cursor-pointer">Decision Engine</a></li>
                <li><a href="#/plan" onClick={handleNav('/plan')} className="hover:text-brand-600 transition-colors cursor-pointer">Strategic Planner</a></li>
                <li><a href="#/chat" onClick={handleNav('/chat')} className="hover:text-brand-600 transition-colors cursor-pointer">AI Consultant</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-900 font-bold mb-4">Legal</h3>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#/privacy" onClick={handleNav('/privacy')} className="hover:text-brand-600 transition-colors cursor-pointer">Privacy Policy</a></li>
                <li><a href="#/terms" onClick={handleNav('/terms')} className="hover:text-brand-600 transition-colors cursor-pointer">Terms of Service</a></li>
                <li><a href="#/cookies" onClick={handleNav('/cookies')} className="hover:text-brand-600 transition-colors cursor-pointer">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} SolveTree AI. All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              System Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;