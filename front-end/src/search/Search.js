import React, { useState } from "react";
import { listReservationsForPhoneNumber } from "../utils/api";
import ReservationTable from "../dashboard/listReservations/ReservationTable";
import ErrorAlert from "../layout/ErrorAlert";

export default function Search() {
    const [reservations, setReservations] = useState([]);
    const [display, setDisplay] = useState(false);
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState(null);

    function changeHandler(e) {
        setMobile(e.target.value);
    }

    function searchHandler(e) {
        e.preventDefault();
        setDisplay(false);
        setError(null);
        listReservationsForPhoneNumber(mobile)
            .then(setReservations)
            .then(() => setDisplay(true))
            .catch(setError);
    }

    return (
        <>
            <div className="d-flex justify-content-center pt-3">
                <h3>Search</h3>
            </div>
            <ErrorAlert error={error} />
            <div className="pt-3 pb-3">
                <form className="form-group" onSubmit={searchHandler}>
                    <input
                        name="mobile_number"
                        id="mobile_number"
                        onChange={changeHandler}
                        placeholder="Enter a customer's phone number"
                        value={mobile}
                        className="form-control"
                        required
                    />
                    <div className="pt-2">
                        <button type="submit" className="btn btn-primary">
                            Find
                        </button>
                    </div>
                </form>
            </div>
            {display && (
                <div>
                    {reservations.length ? (
                        <ReservationTable
                            reservations={reservations}
                            setReservations={setReservations}
                            setError={setError}
                        />
                    ) : (
                        <h3>No reservations found</h3>
                    )}
                </div>
            )}
        </>
    );
}