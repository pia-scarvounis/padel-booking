import { useState } from "react";

const API_URL = "https://crudapi.co.uk/api/v1/bookings";
const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

const COURTS = [
  { id: 1, name: "Bane 1", players: 2 },
  { id: 2, name: "Bane 2", players: 2 },
  { id: 3, name: "Bane 3", players: 4 },
  { id: 4, name: "Bane 4", players: 4 },
];

function EditBookingPopup({ booking, bookings, onClose, onBookingEdited }) {
  const [date, setDate] = useState(booking.date);
  const [time, setTime] = useState(booking.time);
  const [court, setCourt] = useState(booking.court);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isBooked = bookings.some(
      (b) =>
        b.date === date &&
        b.time === time &&
        b.court === court &&
        b._uuid !== booking._uuid
    );

    if (isBooked) {
      setMessage("Dette tidspunktet og banen er allerede reservert");
      return;
    }

    const updatedBooking = {
      ...booking,
      date,
      time,
      court,
    };

    try {
      const response = await fetch(`${API_URL}/${booking._uuid}`, {
        method: "PUT",
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBooking),
      });

      if (response.ok) {
        onBookingEdited();
        onClose();
      } else {
        setMessage("Kunne ikke oppdatere booking. Prøv igjen");
      }
    } catch (error) {
      console.error("Feil ved oppdatering:", error);
      setMessage("En feil oppstod. Prøv igjen.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Rediger booking</h3>
        <form onSubmit={handleSubmit}>
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
              {[...Array(14)].map((_, i) => {
                const hour = 8 + i;
                return (
                  <option key={hour} value={`${hour}:00`}>
                    {hour}:00
                  </option>
                );
              })}
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
          <button type="submit">Lagre endringer</button>
          <button type="button" onClick={onClose}>
            Avbryt
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default EditBookingPopup;
