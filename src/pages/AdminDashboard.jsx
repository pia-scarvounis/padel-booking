import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BookingFilters from "../components/BookingFilters";
import CreateBookingPopup from "../components/CreateBookingPopup";
import "../styles/AdminDashboard.css";

const API_URL = "https://crudapi.co.uk/api/v1/bookings";
const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const [filters, setFilters] = useState({
    day: "",
    time: "",
    court: "",
    players: "",
  });

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      fetchBookings();
    }
  }, [user, loading, navigate]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data.items || []);
      } else {
        console.error("Kunne ikke hente bookinger");
      }
    } catch (error) {
      console.error("Feil ved henting av bookinger:", error);
    }
  };

  if (loading) {
    return <p>Laster admin-dashboard...</p>;
  }

  const filteredBookings = bookings.filter((booking) => {
    return (
      (!filters.day || booking.date === filters.day) &&
      (!filters.time || booking.time === filters.time) &&
      (!filters.court || booking.court === filters.court) &&
      (!filters.players || booking.players.toString() === filters.players)
    );
  });

  return (
    <div className="admin-container">
      <div className="header">
        <h1 className="admin-title">Velkommen til Admin Dashboard</h1>
        <div className="admin-subtitle">
         <p>Her får du en oversikt over alle bookinger og registrerte brukere. </p>
          <div className="btncontainer-header">
            <button
              className="createbooking-button"
              onClick={() => setShowCreatePopup(true)}
            >
              Opprett ny booking
            </button>
            <button
              className="filter-button"
              onClick={() => setShowFilterPopup(true)}
            >
              Filtrer bookinger
            </button>

            <button className="logout-button" onClick={() => navigate("/")}>
              Logg ut
            </button>
          </div>
      </div>
      </div>
      {showFilterPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <BookingFilters
              onFilterChange={(filters) => {
                setFilters(filters);
                setShowFilterPopup(false);
              }}
            />
            <div className="close-filter-button">
            <button onClick={() => setShowFilterPopup(false)}>Lukk</button>
            </div>
          </div>
        </div>
      )}
      {showCreatePopup && (
        <CreateBookingPopup
          onClose={() => setShowCreatePopup(false)}
          onBookingCreated={fetchBookings}
        />
      )}
      <h2>Alle bookinger</h2>
      
       <div/>
    

      <table className="admin-table">
        <thead>
          <tr>
            <th>Spiller</th>
            <th>Medspiller(e)</th>
            <th>Dato</th>
            <th>Tid</th>
            <th>Bane</th>
            <th>Spillere</th>
            <th>Rediger / Slett</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking._uuid}>
              <td>{booking.userName}</td>
              <td>{booking.teammates && booking.teammates.join(", ")}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.court}</td>
              <td>{booking.players}</td>
              <td>
                <button className="edit-button">✏️ Rediger</button>
                <button className="delete-button">🗑️ Slett</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
