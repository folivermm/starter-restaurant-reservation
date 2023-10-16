import React, { useEffect, useState } from "react"
import { listReservations } from "../utils/api"
import ReservationList from "../reservations/ReservationList"
import ErrorAlert from "../layout/ErrorAlert"
import DateChanger from "./DateChanger"
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <h4>Date selection</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <DateChanger currentDate={date} />

      <div>
        <h5>Reservations date: {date}</h5>
        <ReservationList
          reservations={reservations}
          loadDashboard={loadDashboard}
        />
      </div>
    </main>
  );
}

export default Dashboard;
