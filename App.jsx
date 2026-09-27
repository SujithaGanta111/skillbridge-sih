import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import Assessment from './pages/Assessment.jsx';
import SkillGap from './pages/SkillGap.jsx';
import Internships from './pages/Internships.jsx';
import Tracking from './pages/Tracking.jsx';
import Portfolio from './pages/Portfolio.jsx';
import IndustryDashboard from './pages/IndustryDashboard.jsx';
import FacultyDashboard from './pages/FacultyDashboard.jsx';
import InstitutionDashboard from './pages/InstitutionDashboard.jsx';

export default function App() {
  const [role, setRole] = useState(null);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  const applied = applications.map((a) => a.jobId);

  const handleApply = (job) => {
    const id = Date.now();
    setApplications((prev) => [...prev, { id, jobId: job.id, title: job.title, co: job.co, stage: 'Applied' }]);
    setTimeout(() => {
      setApplications((prev) => prev.map((a) => (a.jobId === job.id ? { ...a, stage: 'Shortlisted' } : a)));
    }, 1200);
  };

  const handleLogin = (r) => {
    setRole(r);
    navigate(r === 'student' ? '/' : '/' + r);
  };

  const handleLogout = () => {
    setRole(null);
    navigate('/');
  };

  if (!role) return <Login onLogin={handleLogin} />;

  return (
    <div className="app">
      <Sidebar role={role} />
      <div className="main">
        <div className="topbar">
          <b style={{ textTransform: 'capitalize' }}>{role} Portal</b>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="sub">SIH26044 · SkillBridge</span>
            <button className="btn sm outline" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <Routes>
          {role === 'student' && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<StudentDashboard applications={applications} />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/gap" element={<SkillGap />} />
              <Route path="/jobs" element={<Internships onApply={handleApply} applied={applied} />} />
              <Route path="/track" element={<Tracking applications={applications} />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
          {role === 'industry' && (
            <>
              <Route path="/industry" element={<IndustryDashboard />} />
              <Route path="*" element={<Navigate to="/industry" replace />} />
            </>
          )}
          {role === 'faculty' && (
            <>
              <Route path="/faculty" element={<FacultyDashboard />} />
              <Route path="*" element={<Navigate to="/faculty" replace />} />
            </>
          )}
          {role === 'institution' && (
            <>
              <Route path="/institution" element={<InstitutionDashboard />} />
              <Route path="*" element={<Navigate to="/institution" replace />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}
