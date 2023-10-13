const knex = require("../db/connection");

function list(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .orderBy("reservation_time");
}

function create(newRes) {
    return knex("reservations")
        .insert(newRes)
        .returning("*")
        .then((results) => results[0]);
}

function read(res_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: res_id })
        .first();
}

module.exports = {
    list,
    create,
    read,
};