const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function hasBodyData(req, _res, next) {
  const { data } = req.body;
  if (!data)
    next({
      status: 400,
    });
  next();
}

async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `${req.params.reservation_id}`,
  });
}

// Validate name exists and is not empty
function validName(req, _res, next) {
  const { first_name, last_name } = req.body.data;
  const error = { status: 400 };
  if (!first_name || !first_name.length) {
    error.message = `first_name`;
    return next(error);
  }
  if (!last_name || !last_name.length) {
    error.message = `last_name`;
    return next(error);
  }

  next();
}

// Validate mobile number exists
function validMobileNumber(req, _res, next) {
  const { mobile_number } = req.body.data;
  if (!mobile_number)
    return next({
      status: 400,
      message: "mobile_number",
    });
  next();
}

// Validate that reservation date exists and is correctly formatted
function validDate(req, _res, next) {
  const { reservation_date } = req.body.data;
  if (!reservation_date || new Date(reservation_date) == "Invalid Date")
    return next({
      status: 400,
      message: "reservation_date",
    });
  next();
}

// Validate that reservation time exists and is correctly formatted
function validTime(req, res, next) {
  const { reservation_time } = req.body.data;

  if (!reservation_time || !isValidTimeFormat(reservation_time)) {
    return next({
      status: 400,
      message: "Invalid time format or time is not within open hours.",
    });
  }

  // Extract hours and minutes
  const [hours, minutes] = reservation_time.split(":").map(Number);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return next({
      status: 400,
      message: "Invalid time format or time is not within open hours.",
    });
  }
  res.locals.hour = hours;
  res.locals.minutes = minutes;
  next();
}

function enoughPeople(req, _res, next) {
  const { people } = req.body.data;
  if (!people || !Number.isInteger(people) || people <= 0) {
    return next({
      status: 400,
      message: `people`,
    });
  }
  next();

}

function dateIsInTheFuture(req, _res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const dateTime = new Date(`${reservation_date}T${reservation_time}`);
  if (dateTime < new Date()) {
    return next({
      status: 400,
      message: "Reservation must be in the future",
    });
  }
  next();
}

function dateIsNotTuesday(req, _res, next) {
  const { reservation_date } = req.body.data;
  const day = new Date(reservation_date).getUTCDay();
  if (day === 2)
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesdays",
    });
  next();
}

function isDuringOpenHours(_req, res, next) {
  const { hour, mins } = res.locals;
  if (hour >= 22 || (hour <= 10 && mins <= 30)) {
    return next({
      status: 400,
      message: "We are not open at that time",
    });
  }
  next();
}


// Add other validation functions as needed


// checks if body contains data

async function create(req, res, next) {
  const reservation = req.body.data;
  const data = await service.create(reservation);

  if (data) {
    return res.status(201).json({ data });
  } else {
    return next({
      status: 500,
      message: "Failed to create reservation",
    });
  }
}

async function read(_req, res, _next) {
  res.json({ data: res.locals.reservation });
}

async function list(req, res, _next) {
  const { date } = req.query;
  let data;
  if (date) {
    data = await service.list(date);
    res.status(200).json({ data });
  }
}



module.exports = {
  create: [
    hasBodyData,
    validName,
    validMobileNumber,
    validDate,
    validTime,
    enoughPeople,
    reservationExists, // Add other validations as needed
    dateIsInTheFuture,
    dateIsNotTuesday,
    isDuringOpenHours,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
};
