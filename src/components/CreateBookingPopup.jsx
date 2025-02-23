import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_URL = "https://crudapi.co.uk/api/v1/bookings";
const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

const COURTS = [
  { id: 1, name: "Bane 1", players: 2 },
  { id: 2, name: "Bane 2", players: 2 },
  { id: 3, name: "Bane 3", players: 4 },
  { id: 4, name: "Bane 4", players: 4 },
];

function CreateBookingPopup({ onClose, onBookingCreated }) {
  const [name, setName] = useState("");
  const [teammates, setTeammates] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("08:00");
  const [court, setCourt] = useState(COURTS[0].name);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = [{
      userName: name,
      userEmail: email,
      teammates: teammates ? teammates.split(",") : [],
      date,
      time,
      court,
      players: COURTS.find((c) => c.name === court)?.players || 0,
      isBooked: true,
    }];

    console.log("Booking data som sendes til API:", JSON.stringify(bookingData, null, 2));

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      console.log("Response status:", response.status);
      if (response.ok) {
        alert("Ny booking opprettet!");
        onClose();
        onBookingCreated();
      } else {
        const errorData = await response.json();
        console.error("Feil ved oppretting av booking:", errorData);
        setMessage("Kunne ikke opprette booking. Sjekk dataene og prøv igjen.");
      }
    } catch (error) {
      console.error("Feil ved oppretting av booking:", error);
      setMessage("Nettverksfeil ved oppretting av booking.");
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 21; hour++) {
      times.push(`${hour}:00`);
    }
    return times;
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Opprett ny booking</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Navn:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Medspiller(e):
            <input
              type="text"
              value={teammates}
              onChange={(e) => setTeammates(e.target.value)}
            />
          </label>
          <label>
            E-post:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Dato:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            Tid:
            <select value={time} onChange={(e) => setTime(e.target.value)}>
              {generateTimeOptions().map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            Bane:
            <select value={court} onChange={(e) => setCourt(e.target.value)}>
              {COURTS.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.players} spillere)
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Opprett booking</button>
          <button type="button" onClick={onClose}>Avbryt</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default CreateBookingPopup;


