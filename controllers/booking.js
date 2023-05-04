const fs = require('fs');
const bookingModel = require("../models/Booking");


function addReservation(reservation) {
    return bookingModel.create(reservation);
}

function getAllReservations() {
    return bookingModel.find().populate("hotelData");
}

function getReservation(id) {
    return bookingModel.findById(id).populate("hotelData");
}

function getReservationByUser(userId) {
    return bookingModel.find({ "customerId": userId }).populate("customerId").populate("hotelData");
}

function deleteReservation(id) {
    return bookingModel.findByIdAndDelete(id);
}

function updateReservation(id, reservation) {
    return bookingModel.findByIdAndUpdate(id, reservation).populate("hotelData");
}

function searchByUserEmail(email) {
    return bookingModel.find({ 'customerEmail': email })
}

module.exports = { addReservation, getReservationByUser, getAllReservations, getReservation, deleteReservation, updateReservation, searchByUserEmail }