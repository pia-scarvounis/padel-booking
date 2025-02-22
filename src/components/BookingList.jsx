import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_URL = "https://crudapi.co.uk/api/v1/bookings";
const API_KEY = "Bearer 4tmmeJfd5UT7Gnn_WEMg6ZgDHk1AgsXAqzSYmIdPiQkxCSkGiA";

function BookingList() {
    const { user, loading } = useContext(AuthContext); // henter innlogget bruker
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!loading) {
            fetchBookings();
        }
    }, [loading]); // kjøre fetchBookings KUN etter at brukeren er lastet

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
                console.log("alle bookinger fra API:", data.items);

                if (!user || !user.email) {
                    console.error("bruker ikke funnet i AuthContext.");
                    return;
                }

                // filtrer ut kun brukerens bookinger
                const userBookings = data.items.filter(
                    (booking) => booking.userEmail === user.email
                );

                setBookings(userBookings);
            } else {
                console.error("kunne ikke hente bookinger");
            }
        } catch (error) {
            console.error("feil ved henting av bookinger:", error);
        }
    };

    // slett booking-funksjon 
    const deleteBooking = async (bookingId) => {
        if (!window.confirm("Er du sikker på at du vil slette denne bookingen?")) return;

        try {
            const response = await fetch(`${API_URL}/${bookingId}`, {
                method: "DELETE",
                headers: {
                    Authorization: API_KEY,
                },
            });

            if (response.ok) {
                alert("Booking slettet!");
                setBookings((prev) => prev.filter((booking) => booking._uuid !== bookingId));
            } else {
                console.error("Feil ved sletting av booking");
            }
        } catch (error) {
            console.error("Nettverksfeil ved sletting:", error);
        }
    };

    return (
        <div>
            <h2>Mine Bookinger</h2>
            {loading ? (
                <p>Laster bookinger...</p>
            ) : bookings.length === 0 ? (
                <p>Ingen bookinger funnet..</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._uuid}>
                            <strong>{booking.date}</strong> kl <strong>{booking.time}</strong> på <strong>{booking.court}</strong> ({booking.players} spillere) 
                            <p>E-post: {booking.userEmail}</p> 
                            {booking.teammates && booking.teammates.length > 0 && (
                            <p>Medspillere: {booking.teammates.join(", ")}</p> )}
                    
                            <span className="icon-container" onClick={() => deleteBooking(booking._uuid)}>🗑️</span>
   
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BookingList;



