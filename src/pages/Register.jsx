import "./Register.css";


function Register({ onClose }) {
    return (
        <div className="register-popup">
            <div className="register-box">
                <h2>Registrer deg</h2>
                <input type="text" placeholder="Navn" />
                <input type="email" placeholder="E-post" />
                <input type="password" placeholder="Passord" />
                <button>Registrer</button>
                <button onClick={onClose}>Avbryt</button>
            </div>
        </div>
    );
}

export default Register;
