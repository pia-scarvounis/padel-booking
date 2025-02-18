import { useState } from "react";
import "../styles/Home.css";
import Register from "../components/Register";
import Login from "../components/Login";

function Home() {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    return (
        <div className="home-container">
            <h1>Velkommen til Padel Booking</h1>
            <p>Her kan du booke en bane, se dine bookinger eller administrere systemet.</p>

            { /* knapper for login & register */ }
            <button onClick={() => setShowRegister(true)}>Registrer deg</button>
            <button onClick={() => setShowLogin(true)}>Logg inn</button>
            {showRegister && <Register onClose={() => setShowRegister(false)} />}
            {showLogin && <Login onClose={() => setShowLogin(false)}/>}
        </div>
    );
}

export default Home;
