import React, { useState } from 'react';
import HomePage from './components/HomePage';
import Chatbot from './components/Chatbot';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'chatbot'>('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {currentPage === 'home' && (
        <HomePage onNavigateToChat={() => setCurrentPage('chatbot')} />
      )}
      {currentPage === 'chatbot' && (
        <Chatbot onNavigateHome={() => setCurrentPage('home')} />
      )}
    </div>
  );
}

export default App;