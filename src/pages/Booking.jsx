import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import BookingCalendar from "../components/BookingCalendar";
import BookingList from "../components/BookingList";
import BookingFilters from "../components/BookingFilters";
import "../styles/Booking.css";

const API_URL = "https://crudapi.co.uk/api/v1/bookings";
const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

function Booking() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({
    day: "",
    time: "",
    players: ""
  });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

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
        setBookings(data.items);
      } else {
        console.error("Kunne ikke hente bookinger");
      }
    } catch (error) {
      console.error("Feil ved henting av bookinger:", error);
    }
  };

  const handleBooking = async (selectedTime) => {
    console.log("Reservering valgt:", selectedTime);

    let numPlayers = selectedTime.players; 

    let teammates = [];
    if (numPlayers > 1) {
        let validInput = false;
        while (!validInput) {
            const teammateNames = prompt(`Skriv inn navn på ${numPlayers - 1} medspiller(e), separert med komma: (Trykk "Avbryt" for å avbryte)`);

            // hvis bruker trykker avbryt eller lar det stå tomt: avbryt hele bookingen
            if (teammateNames === null) {
                alert("Booking avbrutt.");
                return;
            }

            if (teammateNames.trim() === "") {
                alert("Du må skrive inn navn på medspillere, eller trykke Avbryt for å avbryte.");
                continue;
            }

            teammates = teammateNames.split(",").map(name => name.trim());

            // sjekke at riktig antall medspillere er skrevet inn
            if (teammates.length === numPlayers - 1) {
                validInput = true; // går ut av loopen hvis alt er ok
            } else {
                alert(`Du må skrive inn ${numPlayers - 1} navn, separert med komma.`);
            }
        }
    }

    const newBooking = {
      "date": selectedTime.date,
      "time": selectedTime.time,
      "court": selectedTime.court,
      "players": numPlayers,
      "teammates": teammates,
      "isBooked": true,
      "userEmail": user?.email,
      "userName": user?.name
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify([newBooking]) // API krever en array
      });

      if (response.ok) {
        alert("Bane reservert!");
        fetchBookings(); 
      } else {
        console.error("feil ved booking", await response.json());
        alert("Kunne ikke reservere banen. Prøv igjen.");
      }
    } catch (error) {
      console.error("nettverksfeil:", error);
      alert("Nettverksfeil. Prøv igjen.");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    return (
      (!filters.day || booking.date === filters.day) &&
      (!filters.time || booking.time === filters.time) &&
      (!filters.players || booking.players.toString() === filters.players)
    );
  });

  return (
    
    <div className="booking-container">
      <div className="booking-header">
        <button className="booking-button" onClick={() => setShowPopup(true)}>Mine bookinger</button>
      </div>
      <h1 className="booking-title">
        Hei, <span className="user-name">{user?.name || "Padel-spiller"}!</span> 🎾
      </h1>
      <p className="booking-subtitle">Book en ledig bane, se dine bookinger og gjør deg klar for kamp!</p>

  <div className="booking-layout">
      <div className="filters-container">
        <BookingFilters onFilterChange={setFilters} />
      </div>
      <div className="calendar-container">
        <BookingCalendar bookings={bookings} onSelectTime={handleBooking} filters={filters} />
        </div>
      
        {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
          
<button className="close-button" onClick={() => setShowPopup(false)}>×</button>
<BookingList />
          </div>
        </div>
)}
       </div>
      </div>
  );
}

export default Booking;





  
  
  






  