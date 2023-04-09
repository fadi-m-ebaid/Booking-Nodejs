const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;

        // clear session data and redirect to the login page
        res.clearCookie('session-id');
        res.redirect('/login');
    });
});

module.exports = router;