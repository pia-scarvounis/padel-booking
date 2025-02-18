import { useState } from "react";
import "../styles/Home.css";
import Register from "../components/Register";

function Home() {
    const [showRegister, setShowRegister] = useState(false);
    return (
        <div className="home-container">
            <h1>Velkommen til Padel Booking</h1>
            <p>Her kan du booke en bane, se dine bookinger eller administrere systemet.</p>
            <button onClick={() => setShowRegister(true)}>Registrer deg</button>
            <button>Logg inn</button>
            {showRegister && <Register onClose={() => setShowRegister(false)} />}
        </div>
    );
}

export default Home;
