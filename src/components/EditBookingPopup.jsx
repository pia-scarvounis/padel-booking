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
  const [teammates, setTeammates] = useState(booking.teammates.join(","));
  const [message, setMessage] = useState("");

  const selectedCourt = COURTS.find((c) => c.name === court);
  const maxPlayers = selectedCourt ? selectedCourt.players : 2;

        const handleCourtChange = (e) => {
            const newCourtName = e.target.value;
            setCourt(newCourtName);
        

        const newCourt = COURTS.find((c) => c.name === newCourtName);
        const newMaxPlayers = newCourt ? newCourt.players : 2;

        if (newMaxPlayers !== maxPlayers) {
            let validInput = false;
            let newTeammates = [];

            while (!validInput) {
                const teammateNames = alert(
                  `Fyll inn navn på korrekt antall medspiller(e): ${newMaxPlayers - 1} stk, separert med komma:`
                );

                if (teammateNames === null) {
                    return;
                  }

    newTeammates = teammateNames.split(",").map((name) => name.trim());

    if (teammateList.length !== maxPlayers - 1) {
     validInput = true; // iut av loopen hvis input gyldig
    } else {
        alert(`Feil antall medspillere. Du må skrive inn ${newMaxPlayers - 1} navn`);
        return;
    }
    } 

    setTeammateList(newTeammates.join(","));
}
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const teammateList = teammates ? teammates.split(",").map((t) => t.trim()) : [];

    if (teammateList.length !== maxPlayers - 1) {
      alert(`Du må legge til ${maxPlayers - 1} medspillere.`);
      return;
    }

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
      teammates: teammateList,
      players: maxPlayers,
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
            <select value={court} onChange={handleCourtChange}>
              {COURTS.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.players} spillere)
                </option>
              ))}
            </select>
          </label>
          <label>
          Medspillere:
            <input
              type="text"
              value={teammates}
              onChange={(e) => setTeammates(e.target.value)}
              placeholder={`Skriv inn navn på ${maxPlayers - 1} medspillere, separert med komma`}
              required
            />
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
