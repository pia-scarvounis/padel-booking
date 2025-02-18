import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Velkommen til Admin Dashboard</h1>
      <p>Her får du en oversikt over bookinger og brukere.</p>
      <button onClick={() => navigate("/")}>Tilbake til forsiden</button>
    </div>
  );
}

export default AdminDashboard;
