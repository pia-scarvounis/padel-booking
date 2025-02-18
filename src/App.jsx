import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./components/AdminDashboard";


function App() {
    return (
      <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
    </AuthProvider>
    );
}

export default App;
