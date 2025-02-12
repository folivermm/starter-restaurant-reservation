# Periodic Table Reservation System

Welcome to the Periodic Table Reservation System! This web application allows you to manage reservations for a restaurant and seat parties at available tables. Below, you'll find information about the technology stack, features, API documentation, and installation instructions.

## Live Website

You can access the live website [here](https://restaurant-reservation-frontend-u0yg.onrender.com)

## Technology

### Front-End

- React
- Bootstrap
- JavaScript
- CSS
- Jest (for testing)

### Back-End

- Node.js
- Express
- Knex
- PostgreSQL

## Dashboard

On the dashboard, users can see the date and time, along with navigation buttons to switch between days. It defaults to the current day and displays reservations for the selected day. Tables are listed with information about their name, capacity, and status. 

![Dashboard](images.readme/image.png)

## Reservations

### Creating a New Reservation

Users can create new reservations by filling out a form. All fields are required, and mobile numbers should be entered without dashes, spaces, or parentheses. Reservations can only be made for future dates and times, and not during the restaurant's closed hours or on Tuesdays. The party size must be at least 1 person.

![New Reservation](images.readme/image-1.png)

### Editing a Reservation

After creating a reservation, users can edit it if needed. The edit button on the reservation item in the dashboard allows users to make changes.

![Edit reservation](images.readme/image-2.png)
![After clicking edit](images.readme/image-3.png)
### Seating a Reservation

Once a reservation is booked, it appears on the dashboard for the reservation day. Users have three options: Edit, Seat, and Cancel. Seating a reservation is possible by clicking the Seat button, which redirects to the Reservation Seating page.
![Click seat](images.readme/image-5.png)
![Choose seating](images.readme/image-4.png)

### Seating Errors

If the user selects an incompatible table for the party, they will receive an alert and need to choose a different table.

![Seating Error](images.readme/image-6.png)

### Finishing a Reservation

After seating the party, users can click the Finish button, which prompts them to confirm clearing the table. If confirmed, the reservation is removed from the list, and the table status returns to FREE.

![Finish Table](images.readme/image-7.png)

### New Table

Users can create a new table to accommodate larger parties. The form requires a table name and a capacity greater than 1.

![Create new table](images.readme/image-8.png)

## Searching for Reservations

If a reservation needs to be found, users can go to the search page and search by mobile number. Partial mobile number searches return all reservations with matching numbers.

![Search by number response](images.readme/image-10.png)

## API Documentation

Here are the available API endpoints and their descriptions:

- `GET /reservations`: Returns reservations.
- `POST /reservations`: Creates and returns a reservation.
- `GET /reservations?date='YYYY-MM-DD'`: Returns reservations on the specified date.
- `GET /reservations?mobile_number=123`: Returns reservations by searching for a phone number.
- `GET /reservations/:reservationId`: Returns a reservation by reservation ID.
- `PUT /reservations/:reservationId`: Updates and returns the reservation matching the reservation ID.
- `PUT /reservations/:reservationId/status`: Updates the status of a reservation.
- `GET /tables`: Returns all tables.
- `POST /tables`: Creates and returns a new table.
- `PUT /tables/:table_id/seat`: Assigns a table with a reservation ID and changes status to "occupied."
- `GET /tables/:table_id/edit`: Returns a table by table ID.
- `PUT /tables/:table_id/edit`: Updates and returns the table matching the table ID.

## Installation

To set up this project locally, follow these steps:

1. Fork and clone this repository.
2. Run `cp ./back-end/.env.sample ./back-end/.env`.
3. Update the `./back-end/.env` file with your database connections. You can set up a free ElephantSQL database instance.
4. Run `cp ./front-end/.env.sample ./front-end/.env`. You shouldn't need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
5. Run `npm install` to install project dependencies.
6. Run `npm run start:dev` from the back-end directory to start your server in development mode.
7. Run `npm start` from the front-end directory to start the React app at `http://localhost:3000`.
