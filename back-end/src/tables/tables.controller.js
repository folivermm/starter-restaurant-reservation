// const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// const service = require("./tables.service");

// // Middleware to validate if table data exists in request body
// function tableDataExists(req, res, next) {
//     const { data = {} } = req.body;
//     if (data.table_name && data.capacity) {
//         return next();
//     }
//     next({ status: 400, message: "Request body must include table_name and capacity" });
// }

// // Middleware to check if the table exists by its id
// async function tableExists(req, res, next) {
//     const { table_id } = req.params;
//     const foundTable = await service.read(table_id);
//     if (foundTable) {
//         res.locals.table = foundTable;
//         return next();
//     }
//     next({ status: 404, message: `Table id does not exist: ${table_id}` });
// }

// async function reservationExists(req, res, next) {
//     const { reservation_id } = req.body.data;
//     const foundReservation = await reservationsService.read(reservation_id);
//     if (foundReservation) {
//         res.locals.reservation = foundReservation;
//         return next();
//     }
//     next({ status: 404, message: `Reservation id does not exist: ${reservation_id}` });
// }

// // Create a new table
// async function create(req, res) {
//     const newTable = req.body.data;
//     const data = await service.create(newTable);
//     res.status(201).json({ data });
// }

// // List all tables
// async function list(req, res) {
//     const data = await service.list();
//     res.json({ data });
// }

// // Assign a reservation to a table
// // Seat a reservation to a table
// async function seat(req, res, next) {
//     const { table_id } = req.params;
//     const { reservation_id } = req.body.data;
//     await service.seat(table_id, reservation_id);
//     res.status(200).json({ data: { status: "seated" } });
// }

// // Unseat a reservation from a table (release a table)
// async function unseat(req, res, next) {
//     const { table_id } = req.params;
//     await service.unseat(table_id);
//     res.status(200).json({ data: { status: "unseated" } });
// }

// module.exports = {
//     create: [tableDataExists, asyncErrorBoundary(create)],
//     list: [asyncErrorBoundary(list)],
//     seat: [tableDataExists, tableExists, reservationExists, asyncErrorBoundary(seat)],
//     unseat: [tableDataExists, tableExists, asyncErrorBoundary(unseat)],
// }
