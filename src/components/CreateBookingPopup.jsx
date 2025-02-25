import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const API_URL = "https://crudapi.co.uk/api/v1/bookings";
const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

const COURTS = [
  { id: 1, name: "Bane 1", players: 2 },
  { id: 2, name: "Bane 2", players: 2 },
  { id: 3, name: "Bane 3", players: 4 },
  { id: 4, name: "Bane 4", players: 4 },
];

function CreateBookingPopup({ 
  bookings =[],
   onClose, 
   onBookingCreated,
    preselectedDate = "", 
    preselectedTime = "08:00", 
    preselectedCourt = COURTS[0].name }) {

  const [name, setName] = useState("");
  const [teammates, setTeammates] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(preselectedDate);
  const [time, setTime] = useState(preselectedTime);
  const [court, setCourt] = useState(preselectedCourt);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  /* finne maks antall spillere for bane */
  const selectedCourt = COURTS.find((c) => c.name === court);
  const maxPlayers = selectedCourt ? selectedCourt.players : 2; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teammateList = teammates ? teammates.split(",").map((t) => t.trim()) : [];


    if (teammateList.length !== maxPlayers - 1) {
      alert(`Du må legge til ${maxPlayers - 1} medspillere.`);
      return;
    }

    const isBooked = bookings.some(
        (booking) => booking.date === date && booking.time === time && booking.court === court
      );

      if (!date || !time || !court) {
        setMessage("Vennligst fyll ut alle feltene.");
        return;
      }

  
      if (isBooked) {
        setMessage("Dette tidspunktet og banen er allerede reservert. Prøv et annet tidspunkt eller bane.");
        return;
      }

    const bookingData = [{
      userName: name,
      userEmail: email,
      teammates: teammateList,
      date,
      time,
      court,
      players: maxPlayers,
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
              value={date} readOnly
            />
          </label>
          <label>
            Tid:
            <input type="text" value={time} readOnly />
          </label>
          <label>
            Bane:
            <input type="text" value={court} readOnly />
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


