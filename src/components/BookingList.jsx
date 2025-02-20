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

                console.log("✅ Innlogget bruker:", user.email);

                // logg ut ALLE bookingene før filtrering
                console.log("full booking-liste før filtrering:", data.items);

                // filtrer ut kun brukerens bookinger
                const userBookings = data.items.filter(
                    (booking) => booking.userEmail === user.email
                );

                // logg ut etter filtrering
                console.log("bvookinger etter filtrering:", userBookings);

                setBookings(userBookings);
            } else {
                console.error("kunne ikke hente bookinger");
            }
        } catch (error) {
            console.error("feil ved henting av bookinger:", error);
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
                            {booking.date} kl {booking.time} på {booking.court} ({booking.players} spillere)
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BookingList;



