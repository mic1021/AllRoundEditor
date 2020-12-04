const { db } = require('../utils/admin');

exports.favEquations = (req, res) => {
    db.collection('equations')
        .orderBy('frequency', 'desc')
        .limit(3)
        .get()
        .then(data => {
            let equations = [];
            data.forEach(doc => {
                // equations.push({
                //     equation: doc.id,
                //     ...doc.data(),
                //     // equation: doc.data().equation,
                //     // frequency: doc.data().frequency,
                //     // createdAt: doc.data(),
                // });
                equations.push(doc.id)
            })

            return res.json({equations});
        })
        .catch(err => console.error(err));
}

exports.submitEquation = (req, res) => {
    const equationRef = db.doc(`/equations/${req.body.equation}`);
    let mode;
    equationRef.get()
        .then(doc => {
            if(doc.exists) {
                mode = 0;
                return equationRef.update({
                    frequency: doc.data().frequency + 1
                });
            } else {
                mode = 1;
                const equation = {
                    frequency: 1,
                    // createdAt: admin.firestore.Timestamp.fromDate(new Date()), - firebase timestamp format
                    createdAt: new Date().toISOString(),
                }
                return equationRef.set(equation);
            }
        })
        .then(doc => {
            if (mode === 1) {
                res.json({message: `document ${doc.id} created successfully`});
            } else {
                res.json({message: `document ${doc.id} updated successfully`});
            }
        })
        .catch(err => {
            console.error(err);
        });
    
    // equationRef.update({
    //     frequency: firebase.firestore.FieldValue.increment(1)
    //     // frequency: 1
    // })
    // .then(res => {
    //     console.log(res);
    // })
    // .catch(err => {
    //     console.error(err);
    //     console.log("HERE");
    //     db.collection('equations').add(equation)
    //         .then(doc => {
    //             res.json({message: `document ${doc.id} created successfully`});
    //         })
    //         .catch(err => {
    //             res.status(500).json({error: 'something went wrong'}); // 500 server side error
    //             console.error(err);
    //         });
    // });
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
            data.forEach((doc) => {
                equations.push(doc.data())
            })
            return res.json(equations)
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