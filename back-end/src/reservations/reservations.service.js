const knex = require("../db/connection");

function list() {
    return knex("reservations")
        .select("*")
        .whereNotIn("status", ["finished", "cancelled"])
        .orderBy("reservations.reservation_date");
}

function create(reservation) {
    return knex("reservations as r")
        .insert(reservation)
        .returning("*")
        .then((newReservation) => newReservation[0]);
}

function listByDate(reservation_date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date })
        .whereNotIn("status", ["finished", "cancelled"])
        .orderBy("reservations.reservation_time");
}

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first();
}
//updates status only
function update(reservation_id, status) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .update({ status })
        .returning("*")
        .then((updated) => updated[0]);
}

function finish(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .update({ status: "finished" });
}

module.exports = {
    list,
    create,
    listByDate,
    read,
    finish,
    update,
};