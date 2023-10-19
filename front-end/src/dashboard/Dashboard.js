import React, { useEffect, useState } from "react";
import ReservationTable from "./listReservations/ReservationTable";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function handleToday() {
    history.push(`/dashboard`);
  }

  function handlePrev() {
    const newDate = previous(date);
    history.push(`/dashboard?date=${newDate}`);
  }

  function handleNext() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  return (
    <main>
      <h1 className="d-md-flex justify-content-center">Dashboard</h1>
      <div className="d-md-flex mb-3 justify-content-center">
        <h4>Reservations for {date}</h4>
      </div>
      <div className="pb-2 d-flex justify-content-center">
        <button onClick={handleToday}>
          today
        </button>
        <button onClick={handlePrev}>
          previous
        </button>
        <button onClick={handleNext}>
          next
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationTable
        reservations={reservations}
        setReservations={setReservations}
        setError={setReservationsError}
      />
    </main>
  );
}

export default Dashboard;