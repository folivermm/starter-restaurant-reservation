import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { formatAsDate, today, previous, next } from "../utils/date-time";
import useQuery from "../utils/useQuery"; // Update the path to your useQuery file

function Dashboard() {
  const history = useHistory();
  const query = useQuery(); // Use the custom useQuery hook to access query parameters
  const dateParam = query.get("date") || today();
  const [currentDate, setCurrentDate] = useState(dateParam);

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [dateParam]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: dateParam }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const handleDateChange = (newDate) => {
    // Update the URL with the new date
    query.set("date", newDate);
    history.push(`/dashboard?${query.toString()}`);
    setCurrentDate(newDate); // Update the current date
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <h3>Reservation date: {currentDate}</h3>
        <div>
          <button
            onClick={() => handleDateChange(previous(dateParam))}
            className="btn btn-primary mx-1"
          >
            Previous
          </button>
          <button
            onClick={() => handleDateChange(today())}
            className="btn btn-primary mx-1"
          >
            Today
          </button>
          <button
            onClick={() => handleDateChange(next(dateParam))}
            className="btn btn-primary mx-1"
          >
            Next
          </button>
        </div>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
