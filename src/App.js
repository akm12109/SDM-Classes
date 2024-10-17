import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Correct import for AuthProvider
import Login from './components/Login';
import JitsiMeet from './components/JitsiMeet';
import Dashboard from './components/Dashboard';
import HomePage from './HomePage';
import DeveloperSupport from './components/DeveloperSupport';
import ListPage from './components/ListPage';
import AboutUs from './components/AboutUs';
import ContactForm from './ContactForm';
import GetHelp from './components/GetHelp';
import ContactClassTeacher from './components/ContactClassTeacher';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './components/Logout';

// Admin authentication state (for simplicity, using a boolean flag)

const App = () => {
  return (
    <AuthProvider> {/* Wrap the application in AuthProvider */}
      <Router>
        <Routes>
          {/* Home and public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/classroom" element={<JitsiMeet />} />

          {/* Dashboard (secured route) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Additional public routes */}
          <Route path="/developer-support" element={<DeveloperSupport />} />
          <Route path="/list-all-messages" element={<ListPage />} />
          <Route path="/gethelpinloggin" element={<GetHelp />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/contact-class-teacher" element={<ContactClassTeacher />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
