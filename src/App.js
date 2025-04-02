import React from 'react';
import { AppProvider } from './context/AppContext';
import Wizard from './components/Wizard';
import './styles/Forms.css';

const App = () => {
  return (
    <AppProvider>
      <div className="app-container">
        <h1 className="app-title">Welcome to Smart Salary Navigator</h1>
        <p className="app-subtitle">Calculate your ideal salary range in minutes</p>
        <Wizard />
      </div>
    </AppProvider>
  );
};

export default App;
