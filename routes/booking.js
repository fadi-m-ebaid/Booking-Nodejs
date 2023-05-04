const express = require('express');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const jwt = require('jsonwebtoken');

var { addReservation, getAllReservations, getReservationByUser, getReservation, deleteReservation, updateReservation, searchByUserEmail, addReservation } = require("../controllers/booking");
var { searchUserByEmail, getUserById } = require("../controllers/user")


router.post('/', async (req, res) => {
    const reservation = req.body;
    // const token = req.headers.authorization
    // if (token) {
    //     try {
    //         const decodedToken = jwt.decode(token);
    //         const userId = decodedToken.userId;
    //         const user = await getUserById(userId);
    //         if (user) {
    //             reservation.customerEmail = user.userEmail;
    //             reservation.customerName = user.userName;
    //         }
    //     } catch (err) {
    //         res.status(401).json({ message: 'Invalid token' });
    //         return;
    //     }
    // }
    try {
        const addedReservation = await addReservation(reservation);
        res.status(200).json(addedReservation);
    } catch (err) {
        res.status(422).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        var allReservations = await getAllReservations();
        res.status(200).json(allReservations)
    } catch (err) {
        res.status(422).json({ message: err.message });
    }
})

router.get('/:user_id', async (req, res) => {
    try {
        var { user_id } = req.params;
        var getbyUser = await getReservationByUser(user_id);
        res.json(getbyUser);
    } catch (err) {
        res.json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        var { id } = req.params;

        var deleted = await deleteReservation(id);
        res.json(deleted);
    } catch (err) {
        res.json({ message: err.message });
    }
});
module.exports = router;