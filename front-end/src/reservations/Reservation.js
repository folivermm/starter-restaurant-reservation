import React from "react";
import { cancelReservation } from "../utils/api";
import { useHistory } from "react-router-dom";

function Reservation({
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
}) {
    const history = useHistory();

    function cancelHandler(event, reservation_id) {
        event.preventDefault();
        const notification = "Do you want to cancel this reservation?";
        if (window.confirm(notification)) {
            cancelReservation(reservation_id, "cancelled")
                .then(() => {
                    history.push("/"); // Redirect to home after cancellation.
                })
                .catch((error) => {
                    console.error("Error canceling the reservation:", error);
                    // Handle the error gracefully on the frontend, for instance, displaying a notification.
                });
        }
    }

    return (
        <div key={reservation_id}>
            <div>
                <p>
                    Name: {first_name} {last_name}
                </p>
                <p>Mobile number: {mobile_number}</p>
                <p>Date: {reservation_date}</p>
                <p>Time: {reservation_time}</p>
                <p>Party Size: {people}</p>
                <p>Reservation ID: {reservation_id}</p>
                <button
                    data-reservation-id-cancel={reservation_id}
                    onClick={(event) => cancelHandler(event, reservation_id)}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default Reservation;
