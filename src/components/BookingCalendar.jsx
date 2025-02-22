import { useState } from "react";
import "../styles/Booking.css";

const OPENING_HOURS = { start: 8, end: 22 };

const COURTS = [
  { id: 1, name: "Bane 1", players: 2 },
  { id: 2, name: "Bane 2", players: 2 },
  { id: 3, name: "Bane 3", players: 4 },
  { id: 4, name: "Bane 4", players: 4 },
];

function BookingCalendar({ bookings, onSelectTime, filters }) {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [visibleRows, setVisibleRows] = useState(10); // vi viser kun 10 rader om gangen

  // genererer ukedager (man-søndag)
  const generateWeekDays = () => {
    let days = [];
    for (let i = 0; i < 100; i++) {
      let date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      days.push(date.toISOString().split("T")[0]); // konvertering til YYYY-MM-DD
    }
    return days;
  };

  // genererer ALLE tidspunkter for en hel uke
  const generateAvailableTimes = () => {
    let times = [];
    const weekDays = generateWeekDays();
  
    weekDays.forEach((date) => {
      for (let hour = OPENING_HOURS.start; hour < OPENING_HOURS.end; hour++) {
        COURTS.forEach((court) => {
          const existingBooking = bookings.find(
            (b) => b.date === date && b.time === `${hour}:00` && b.court === court.name
          );
  
          let isBooked = existingBooking ? true : false;
  
          // FILTRERING AV DATO, TID OG ANTALL SPILLERE
          if (
            (filters?.day && new Date(filters.day).toISOString().split("T")[0] !== date) || 
            (filters?.time && filters.time !== `${hour}:00`) || 
            (filters?.players && filters.players !== court.players.toString())
          ) {
            return; // hoppe over tider som ikke matcher filteret
          }
  
          times.push({
            date: date,
            time: `${hour}:00`,
            court: court.name,
            players: court.players,
            isBooked: isBooked,
          });
        });
      }
    });
  
    return times;
  };
  

  const availableTimes = generateAvailableTimes(); 

  return (
    <div className="booking-calendar-container">
      <h3>Se alle tider og baner:</h3>
      <div className="week-nav">
        <button onClick={() => setCurrentWeekStart((prev) => {
          let newDate = new Date(prev);
          newDate.setDate(prev.getDate() - 7);
          return newDate;
        })}>Forrige uke</button>

        <button onClick={() => setCurrentWeekStart((prev) => {
          let newDate = new Date(prev);
          newDate.setDate(prev.getDate() + 7);
          return newDate;
        })}>Neste uke</button>
      </div>

      <table className="booking-calendar">
        <thead>
          <tr>
            <th>Dato</th>
            <th>Tid</th>
            <th>Bane</th>
            <th>Antall spillere</th>
            <th>Book bane</th>
          </tr>
        </thead>
        <tbody>
          {availableTimes.slice(0, visibleRows).map((time, index) => (
            <tr key={index}>
              <td>{time.date}</td>
              <td>{time.time}</td>
              <td>{time.court}</td>
              <td>{time.players}</td>
              <td>
                <button
                  className={`booking-button ${time.isBooked ? "booked" : "available"}`}
                  onClick={() => onSelectTime(time)}
                  disabled={time.isBooked}
                >
                  {time.isBooked ? "Opptatt" : "Reserver"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleRows < availableTimes.length ? (
  <button className="see-more-button" onClick={() => setVisibleRows(prev => prev + 10)}>
    Se mer ▼
  </button>
) : null

      }
    </div>
  );
}

export default BookingCalendar;



