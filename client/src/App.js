import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);

    const handleRegister = async () => {
        await axios.post('http://localhost:5000/auth/register', { email, password });
    }

    const handleLogin = async () => {
        const { data } = await axios.post('http://localhost:5000/auth/login', { email, password });
        setToken(data.token);
    };

    const handlePayment = async () => {
        const stripe = await stripePromise;
        const { data } = await axios.post('http://localhost:5000/payment/checkout', {
            amount: 1000,
            token: 'test_token'
        });
        console.log(data);
    };

    return (
        <div>
            <h1>MERN Stripe Auth Boilerplate</h1>
            <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
            {token && <button onClick={handlePayment}>Pay $10</button>}
        </div>
    );
};

export default App;