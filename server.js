const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '1234') {
        req.session.user = 'admin';
        return res.redirect('/admin.html');
    }

    if (username === 'student' && password === '1234') {
        req.session.user = 'student';
        return res.redirect('/student.html');
    }

    res.send("Invalid login credentials");
});

// Protect Admin Page
app.get('/admin.html', (req, res, next) => {
    if (req.session.user === 'admin') {
        next();
    } else {
        res.redirect('/login.html');
    }
});

// Protect Student Page
app.get('/student.html', (req, res, next) => {
    if (req.session.user === 'student') {
        next();
    } else {
        res.redirect('/login.html');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
