const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const router = express.Router();

router.post('/checkout', async (req, res) => {
    const { amount, token } = req.body;
    try {
        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            source: token,
            description: 'Payment'
        });
        res.json(charge);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;