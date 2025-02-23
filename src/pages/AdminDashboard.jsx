import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BookingFilters from "../components/BookingFilters";
import "../styles/AdminDashboard.css";

const API_URL = "https://crudapi.co.uk/api/v1/bookings";
const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
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
      <p className="admin-subtitle">
        Her får du en oversikt over alle bookinger og registrerte brukere.
        <button
        className="admin-logout"
        onClick={() => navigate("/")}
      >
        Logg ut
      </button>
      </p></div>
      <h2>Alle bookinger</h2>
      <BookingFilters onFilterChange={setFilters} />
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
            <tr key={booking._id}>
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
