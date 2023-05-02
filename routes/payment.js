const express = require('express');
const router = express.Router();
const stripe = require('stripe')('pk_test_51N1oJNAB87pT1j76v4i0wDIhdsHyVzCkxlSwF4CcqbFA9MkLuIhHn76EU0GkDcnRPy1SlqmcaC9ztybp0zNste0700MKFBzuRL');
const uuid = require('uuid')
const Booking = require("../models/Booking")
const Payment = require('../models/payment');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

router.post('/', async (req, res) => {
    const { bookingId, token } = req.body;
    const itemPotencyKey = uuid()
    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (booking.paymentStatus === 'paid') {
            return res.status(400).json({ message: 'Booking already paid' });
        }

        const charge = await stripe.charges.create({
            amount: booking.totalCost * 100,
            currency: 'usd',
            source: token.id,
            description: `Payment for ${booking.hotelData.name} booking`,
        }, {itemPotencyKey});

        const payment = new Payment({
            bookingId,
            paymentId: charge.id,
            amount: booking.totalCost,
        });

        await payment.save();

        booking.paymentStatus = 'paid';
        booking.paymentId = charge.id;
        await booking.save();

        res.json({ message: 'Payment successful', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment failed' });
    }
});

module.exports = router;
