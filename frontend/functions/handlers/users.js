const firebase = require('firebase');
const config = require('../utils/config');
firebase.initializeApp(config);

const { db } = require('../utils/admin');
const { validateSignupData, validateLoginData } = require('../utils/validators');

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    const { valid, errors } = validateSignupData(newUser); // destructuring

    if(!valid) return res.status(400).json(errors);

    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if(doc.exists) {
                return res.status(400).json({ handle: 'this handle is already taken' });
            } else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password); // returns a promise hence can chain .then
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(Idtoken => {
            token = Idtoken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId
            }
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token }); // use status 201 when created
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is already in use' });
            } else {
                return res.status(500).json({ error: err.code }); 
            }
        });
}

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    const { valid, errors } = validateLoginData(user); 

    if(!valid) return res.status(400).json(errors); // 400 - client side, 500 - server side
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({token});
        })
        .catch(err => {
            console.error(err);
            if(err.code === 'auth/wrong-password') { // auth/wrong-password & auth/user-not-found are two main wrong credentials error
                return res.status(403).json({ general: 'Wrong credentials, please try again' }); // 403 - unauthorized
            } else return res.status(500).json({ error: err.code })
        });
}

// Other syntax
// firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
//     .then(data => {
//         return res.status(201).json({ message: `user ${data.user.uid} signed up successfully` });
//     })
//     .catch(err => {
//         console.error(err);
//         return res.status(500).json({ error: err.code });
//     }); 