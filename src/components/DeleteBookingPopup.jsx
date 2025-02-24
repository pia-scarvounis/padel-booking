import { useState } from "react";

const API_URL = "https://crudapi.co.uk/api/v1/bookings";
const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

function DeleteBookingPopup({ booking, onClose, onBookingDeleted }) {
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${booking._uuid}`, {
        method: "DELETE",
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMessage("Booking ble slettet");
        onBookingDeleted();
        onClose();
      } else {
        setMessage("Kunne ikke slette booking. Prøv igjen");
      }
    } catch (error) {
      console.error("Feil ved sletting:", error);
      setMessage("En feil oppstod. Prøv igjen");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Bekreft sletting</h3>
        <p>Er du sikker på at du vil slette denne bookingen?</p>
        <p><strong>{booking.date}</strong> kl. <strong>{booking.time}</strong> på <strong>{booking.court}</strong></p>
        <button className="delete-button" onClick={handleDelete}>
          Bekreft sletting
        </button>
        <button className="cancel-button" onClick={onClose}>
          Avbryt
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default DeleteBookingPopup;
