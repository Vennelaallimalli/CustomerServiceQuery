const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./auth/googleAuth');

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use(
  cookieSession({
    name: 'session',
    keys: ['secretkey'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected'));

app.use('/api/requests', require('./routes/requestRoutes'));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

app.get('/logout', (req, res) => {
  req.logout(() => res.redirect(process.env.CLIENT_URL));
});

app.get('/user', (req, res) => {
  res.send(req.user);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
