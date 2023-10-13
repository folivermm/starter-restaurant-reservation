const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

// validations
function dataBodyExists(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "Body must have data property" });
}

function dataBodyHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName] && data[propertyName] !== "") {
      return next();
    }
    next({
      status: 400,
      message: `Must include a ${propertyName}`,
    });
  };
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const foundReservation = await service.read(reservation_id);
  if (foundReservation) {
    res.locals.reservation = foundReservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation id does not exist: ${reservation_id}`,
  });
}

async function list(req, res, next) {
  const date = req.query.date;
  if (date) {
    const data = await service.list(date);
    res.json({ data });
  } else {
    let currentDate = new Date().toJSON().slice(0, 10);
    const data = await service.list(currentDate);
    res.json({ data });
  }
}

async function read(req, res, next) {
  const data = res.locals.reservation;
  res.json({ data });
}

async function create(req, res, next) {
  const newReservation = req.body.data;
  const data = await service.create(newReservation);
  res.status(201).json({ data: data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    dataBodyExists,
    dataBodyHas("first_name"),
    dataBodyHas("last_name"),
    dataBodyHas("mobile_number"),
    dataBodyHas("reservation_date"),
    dataBodyHas("reservation_time"),
    dataBodyHas("people"),
    create,
  ],
};
