import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Contact from './pages/Contact';
import About from './pages/About';
import Natural from './pages/Natural';
import Profile from './pages/Profile'; // Lab 5: Profile page with SCSS
import Dashboard from './pages/Dashboard'; // Lab 6: Dashboard with CRUD
import Login from './pages/Login'; // Lab 6: Login with Google Auth
import ProtectedRoute from './components/ProtectedRoute'; // Lab 6: Protected Route
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/natural" element={<Natural />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} /> {/* Lab 5: Profile page */}
          <Route path="/login" element={<Login />} /> {/* Lab 6: Login page */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            } 
          /> {/* Lab 6: Protected Dashboard - Lab 7: Admin Only */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
