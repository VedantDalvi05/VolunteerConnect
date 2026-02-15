import { Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import EventDetails from './Pages/EventDetails'
import AdminDashboard from './Pages/AdminDashboard'
import UserDashboard from './Pages/UserDashboard'
import EventCreationWizard from './components/EventCreationWizard'
import AttendanceTracking from './Pages/AttendanceTracking'
import MyRegistrations from './Pages/MyRegistrations'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/create-event" element={<EventCreationWizard />} />
      <Route path="/admin/attendance" element={<AttendanceTracking />} />
      <Route path="/my-registrations" element={<MyRegistrations />} />
    </Routes>
  )
}

export default App
