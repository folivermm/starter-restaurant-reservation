import React, { useState } from "react"
import { useHistory } from "react-router"
import ReservationForm from "./ReservationForm"
import { newReservation } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert"


function NewReservation() {
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    }

    const [reservation, setReservation] = useState(initialFormState);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const changeHandler = (event) => {
        setError(null); // Clear any previous error when a user modifies any input
        setReservation({ ...reservation, [event.target.name]: event.target.value });
    }

    const submitHandler = (event) => {
        event.preventDefault();

        // Basic validation
        if (!reservation.first_name || !reservation.last_name || !reservation.mobile_number || !reservation.reservation_date || !reservation.reservation_time) {
            setError(new Error("Please fill out all fields."));
            return;
        }

        setIsLoading(true);
        const abortController = new AbortController();
        newReservation(reservation, abortController.signal)
            .then(() => {
                history.push(`/dashboard?date=${reservation.reservation_date}`);
            })
            .catch(setError)
            .finally(() => setIsLoading(false));
        return (() => abortController.abort());
    }

    return (
        <>
            <ErrorAlert error={error} />
            <h2>Create New Reservation</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ReservationForm
                    reservation={reservation}
                    changeHandler={changeHandler}
                    submitHandler={submitHandler}
                />
            )}
            <br />
        </>
    );
}

export default NewReservation;
