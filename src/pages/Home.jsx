import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Home.css";
import Register from "../components/Register";
import Login from "../components/Login";

function Home() {
const { user } = useContext(AuthContext);
const navigate = useNavigate();

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    console.log("Bruker fra AuthContext:", user);
    
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
