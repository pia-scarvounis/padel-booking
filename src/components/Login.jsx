import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css"; 

const API_URL = "https://crudapi.co.uk/api/v1/users"; 
const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // admin login
    if (email === "admin" && password === "admin") {
        const adminUser = { email: "admin", role: "admin" };
        login(adminUser);
        setMessage("Administrator innlogging vellykket!");
        setTimeout(() => {
            navigate("/admin");
        }, 2000);
        return;
    }

    try {
      // Hent alle brukere fra API
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Authorization": API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const users = data.items;

        // sjekke om det finnes en bruker med den e-posten og passordet
        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
            login(user);
          setMessage("Ready to padel! Du er nå logget inn!");
          setTimeout(() => { navigate("/booking");}, 2000); 
      } else {
        setMessage("Feil E-post eller passord");
      }
    } else {
        setMessage("Kunne ikke finne deg akkurat nå. Prøb igjen senere");
    }
    } catch (error) {
      setMessage("Nettverksfeil: Sjekk internettforbindelsen.");
    }
  };
  
  return (
    <div className="login-popup">
      <div className="login-box">
        <h2>Logg inn</h2>
        <form onSubmit={handleSubmit}> 
          <input
            type="text"
            placeholder="E-post/Admin login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Passord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Logg inn</button>
          <button type="button" onClick={onClose}>Avbryt</button>
        </form>
        {message && <p className="login-message">{message}</p>} 
      </div>
    </div>
  );
}

export default Login;

