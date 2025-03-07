import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddEditBook from './pages/AddEditBook';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddEditBook />} />
        <Route path="/edit/:id" element={<AddEditBook />} />
      </Routes>
    </Router>
  );
};

export default App;