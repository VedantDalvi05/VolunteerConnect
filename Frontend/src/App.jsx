import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import LandingPage from './Pages/LandingPage';
import EventDetailsPage from './Pages/EventDetailsPage'; // Renamed
import VolunteerDashboard from './Pages/VolunteerDashboard'; // Renamed
import AdminDashboard from './Pages/AdminDashboard';
import MyRegistrations from './Pages/MyRegistrations';
import AttendanceTracking from './Pages/AttendanceTracking';
import UserProfile from './Pages/UserProfile';
import NotFoundPage from './Pages/NotFoundPage';

// Components
import EventCreationWizard from './components/modals/EventCreationWizard'; // Moved

function App() {
  return (
    <Routes>
      {/* Public Routes wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<LandingPage />} /> {/* Reusing Landing for now */}
        <Route path="/event/:id" element={<EventDetailsPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>

      {/* Protected Dashboard Routes wrapped in DashboardLayout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<VolunteerDashboard />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-event" element={<EventCreationWizard />} />
        <Route path="/admin/attendance" element={<AttendanceTracking />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
    </Routes>
  );
}

export default App;
