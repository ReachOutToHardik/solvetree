import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import DecisionTree from './components/DecisionTree';
import ChatBot from './components/ChatBot';
import Planner from './components/Planner';

// Helper to get a clean, normalized path from the window hash
const getNormalizedPath = () => {
  const hash = window.location.hash;
  // Remove the starting '#' and any query parameters
  const path = hash.replace(/^#/, '').split('?')[0] || '/';
  // Remove trailing slash for consistency (unless it's just root '/')
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path;
};

function App() {
  const [currentPath, setCurrentPath] = useState(getNormalizedPath());

  useEffect(() => {
    const handleHashChange = () => {
      const path = getNormalizedPath();
      setCurrentPath(path);
      window.scrollTo(0, 0);
    };
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  let component;
  switch (currentPath) {
    case '/solve':
      component = <DecisionTree />;
      break;
    case '/chat':
      component = <ChatBot />;
      break;
    case '/plan':
      component = <Planner />;
      break;
    case '/':
    default:
      component = <Home />;
      break;
  }

  return (
    <Layout>
      {component}
    </Layout>
  );
}

export default App;