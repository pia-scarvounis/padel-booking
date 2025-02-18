import { useState, useEffect } from "react";
import "../styles/Register.css";

const API_URL = "https://crudapi.co.uk/api/v1/probe"; 
const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

function Register({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

   // GET: hente brukere fra API
   const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { "Authorization": API_KEY }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.items); // lagre brukerne i state
      } else {
        setMessage("Kunne ikke hente brukere.");
      }
    } catch (error) {
      console.error("Feil ved henting av brukere:", error);
      setMessage("Nettverksfeil ved henting av brukere.");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("registreringsknappen er trykket!");

    const userData = [{
        name,
        email,
        password
    }];

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": API_KEY
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            setMessage("Ready to padel! Du kan nå logge inn");
            setTimeout(() => setMessage(""), 3000);
            setName(""); // nullstille inputfelt
            setEmail("");
            setPassword("");
            fetchUsers(); 

            setTimeout(() => {
                onClose(); // lukke popup etter registrering
            }, 2000); 
        } else {
            const result = await response.json();
            setMessage("Oh nei! Feil ved registrering: " + (result.error || "Prøv igjen."));
        }
    } catch (error) {
        setMessage("Nettverksfeil :( Sjekk internettforbindelsen din.");
    }
};

  return (
    <div className="register-popup">
      <div className="register-box">
        <h2>Registrer deg</h2>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Navn"
          value={name}
          required
          onChange={(e) => setName(e.target.value)} 
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)} 
          
        />

        <input
          type="password"
          placeholder="Passord"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}

        />
        <button type="submit">Registrer</button>
        <button onClick={onClose}>Avbryt</button>
        </form>
        {message && <p className="register-message">{message}</p>}

      </div>
    </div>
  );
}

export default Register;
