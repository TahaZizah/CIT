import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OrderPage from './pages/OrderPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
