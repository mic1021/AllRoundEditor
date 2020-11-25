const { db } = require('../utils/admin');

exports.favEquations = (req, res) => {
    db.collection(`equations`)
        .orderBy('frequency', 'desc')
        .limit(3)
        .get()
        .then(data => {
            let equations = [];
            data.forEach(doc => {
                equations.push({
                    docId: doc.id,
                    ...doc.data(),
                    // equation: doc.data().equation,
                    // frequency: doc.data().frequency,
                    // createdAt: doc.data(),
                });
            })

            return res.json(equations);
        })
        .catch(err => console.error(err));
}

exports.submitEquation = (req, res) => {
    const equation = {
        equation: req.body.equation,
        frequency: req.body.frequency,
        // createdAt: admin.firestore.Timestamp.fromDate(new Date()), - firebase timestamp format
        createdAt: new Date().toISOString(),
    }

    db.collection('hjkim0822').add(equation)
        .then(doc => {
            res.json({message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({error: 'something went wrong'}); // 500 server side error
            console.error(err);
        })
}

exports.saveEquations = (req, res) => {
    const equation = {
        category: req.body.category,
        equation: req.body.equation,
        createdAt: new Date().toISOString(),
    }

    db.collection(`${req.user.handle}`).add(equation)
        .then(doc => {
            res.json({message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({error: 'something went wrong'}); // 500 server side error
            console.error(err);
        })
}

exports.savedEquations = (req, res) => {
    db.collection(`${req.user.handle}`)
        .orderBy('category', 'desc')
        .get()
        .then(data => {
            let equations = [];
            data.forEach(doc => {
                equations.push({
                    ...doc
                })
            })
        })
        .catch(err => console.error(err));
}
// OTHER SYNTAXES
// exports.getEquations = functions.https.onRequest((req, res) => {
// });
// exports.usedEquation = functions.https.onRequest((req, res) => {
//     if (req.method !== 'POST') {
//         return res.status(400).json({error: 'method not allowed'}); // 400 client side error
//     }
// });