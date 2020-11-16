const { db, admin } = require('./admin');

module.exports = (req, res, next) => { // next is function that follows
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startWith('Bearer ')) { // Bearer - good convention - your token has to start with 'Bearer '
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(403).json({ error: 'Unauthorized' }) // 403 - unauthorized error
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => { // add to request object
            req.user = decodedToken;
            return db.collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then(data => { // why is this happening again... isn't req.user already full of info?
            req.user.handle = data.docs[0].data().handle;
            return next();
        })
        .catch(err => {
            console.error('Error while verifying token ', err);
            return res.status(403).json(err);
        })
}
