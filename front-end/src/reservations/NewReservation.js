import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert"; // Import the ErrorAlert component

function NewReservation() {
    const history = useHistory();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1, // Default value
    });
    const [apiError, setApiError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await createReservation(formData);
            // Assuming the API returns a reservation_id in the response
            const reservationId = response.reservation_id;
            history.push(`/dashboard?date=${formData.reservation_date}`);
        } catch (error) {
            setApiError(error.message || "An error occurred.");
        }
    };

    const handleCancel = () => {
        history.push("/dashboard"); // Redirect to the dashboard
    };

    return (
        <div>
            <h2>Create a New Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="mobile_number">Mobile Number:</label>
                    <input
                        type="tel"
                        id="mobile_number"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="reservation_date">Reservation Date:</label>
                    <input
                        type="date"
                        id="reservation_date"
                        name="reservation_date"
                        value={formData.reservation_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="reservation_time">Reservation Time:</label>
                    <input
                        type="time"
                        id="reservation_time"
                        name="reservation_time"
                        value={formData.reservation_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="people">Number of People:</label>
                    <input
                        type="number"
                        id="people"
                        name="people"
                        value={formData.people}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
            {/* Display the ErrorAlert component for API errors */}
            <ErrorAlert error={apiError} />
        </div>
    );
}

export default NewReservation;
