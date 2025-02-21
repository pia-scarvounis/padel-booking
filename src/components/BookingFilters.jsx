import { useState } from "react";

function BookingFilters({ onFilterChange }) {
  const [filterValues, setFilterValues] = useState({
    day: "",
    time: "",
    players: ""
  });

  const handleFilterChange = (e) => {
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value
    }));
  };

  const applyFilters = () => {
    onFilterChange(filterValues);
    onFilterChange(newFilters);
  };

  return (
    <div className="filters-container">
      <label>
        Dato:
        <input
          type="date"
          name="day"
          value={filterValues.day}
          onChange={handleFilterChange}
        />
      </label>

      <label>
        Tidspunkt:
        <select name="time" value={filterValues.time} onChange={handleFilterChange}>
  <option value="">Alle tider</option>
  {[...Array(14)].map((_, i) => {
    const hour = 8 + i;
    return (
      <option key={hour} value={`${hour}:00`}>
        {hour}:00
      </option>
    );
  })}
</select>

      </label>

      <label>
        Banetype:
        <select name="players" value={filterValues.players} onChange={handleFilterChange}>
          <option value="">Alle</option>
          <option value="2">2 spillere</option>
          <option value="4">4 spillere</option>
        </select>
      </label>

      <button onClick={applyFilters}>Bruk filter</button>
<button onClick={() => {
  setFilterValues({ day: "", time: "", players: "" });
  onFilterChange({ day: "", time: "", players: "" });
}}>Nullstill filter</button>
    </div>
  );
}

export default BookingFilters;




