import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Patients from './pages/Patients';
import Mapping from './pages/Mapping';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="mapping" element={<Mapping />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
