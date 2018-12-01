const config = require("../config.js");
const mongo = require("mongodb").MongoClient;
const mongoURL = "mongodb://178.128.176.202:27017/";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const router = express.Router();

//explicitly allows SAME ORIGIN POLICY ALL.
app.use(cors());

app.set('superSecret', config.secret); // secret variable

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const jsonParser = bodyParser.json();

const checkMongoID = (query) => {
    if (query.hasOwnProperty("_id")) {
        let id = query["_id"];
        let mongoID = require("mongodb").ObjectId; //creates an object id.
        query["_id"] = mongoID(id);
    }
    return query;
};

const checkPermission = (role, res, type, callback, collName) => {
    console.log(role, collName);
    getData({ role: role }, "roles", (returned) => {
        console.log(returned);
        if(returned[0].hasOwnProperty("restricted")) {
            const permitted = returned[0].restricted.includes(collName);
            console.log("returned:", returned[0].restricted);
            console.log("permitted", permitted);
            if(permitted) {
                return res.status(403).send({
                    success: false,
                    message: "you do not have required permissions!"
                });
            }
        }
        if (!returned[0].powers.includes(type)) {
            return res.status(403).send({
                success: false,
                message: "you do not have required permissions!"
            });
        } else {
            callback();
        }
    });
};

//gets data from the sabershores mongodb.
const getData = (query, collectionName, callbackFunc) => {
    query = checkMongoID(query);

    mongo.connect(mongoURL, (err, db) => {
        if (err) {
            callbackFunc(undefined);
            return; //exit if error.
        }
        let dbo = db.db("saberShores");
        dbo.collection(collectionName).find(query).toArray((err, result) => {
            if (err) {
                callbackFunc(undefined);
            } else {
                callbackFunc(result);
            }
        });
    });
};

//adds data to the sabershores mongodb.
const postData = (input, collectionName, callbackFunc) => {
    console.log(input);
    mongo.connect(mongoURL, (err, db) => {
        if (err) {
            callbackFunc(false);
            return; //exit if error.
        }
        let dbo = db.db("saberShores");
        dbo.collection(collectionName).insertOne(input, (err, result) => {
            if (err) {
                callbackFunc(false);
            } else {
                callbackFunc(result);
            }
        });
    });
};

//deletes data from the sabershores mongodb.
const deleteData = (query, collectionName, callbackFunc) => {
    query = checkMongoID(query);

    mongo.connect(mongoURL, (err, db) => {
        if (err) {
            callbackFunc(false);
            return; //exit if error.
        }
        let dbo = db.db("saberShores");
        dbo.collection(collectionName).removeOne(query, (err, result) => {
            if (err) {
                callbackFunc(false);
            } else {
                callbackFunc(result);
            }
        });
    });
};

//updates data to the sabershores mongodb.
const patchData = (query, update, collectionName, callbackFunc) => {
    query = checkMongoID(query);

    if (update) { //the update must specify what to set with the $set operator.
        let set = update;
        update = {
            $set: set,
        };
    }
    mongo.connect(mongoURL, (err, db) => {
        if (err) {
            callbackFunc(false);
            return; //exit if error.
        }
        let dbo = db.db("saberShores");
        console.log(query);
        dbo.collection(collectionName).updateOne(query, update, (err, result) => {
            if (err) {
                callbackFunc(false);
            } else {
                callbackFunc(result);
            }
        });
    });
};

router.post('/authenticate', jsonParser, (req, res) => {
    console.log("authenticate!");
    if (req.body.hasOwnProperty("usrName") && req.body.hasOwnProperty("password")) {
        getData(req.body, "users", (returned) => {
            if (returned && returned.length > 0) {
                console.log(returned);
                let user = returned[0];
                const payload = {
                    role: user.role,
                };
                var token = jwt.sign(payload, app.get('superSecret'));

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });

                //res.send(returned);
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(404);
    }

});

// route middleware to verify a token
router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded; next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

router.get('/:collName?/:option?/:data?', (req, res, next) => {
    console.log("using generic get");
    const collName = req.params.collName;
    const option = req.params.option;
    const data = req.params.data;
    let query = {};

    const executeQuery = () => {
        if (collName == "collections") {
            next(); //don't use this function for handling collections...
            return;
        }
        if (option && data) {
            query[option] = data;
        }
        getData(query, collName, (returned) => {
            if (returned) {
                res.send(returned);
            } else {
                next(); //if it fails, try another...
                return;
            }
        });
    }

    checkPermission(req.decoded.role, res, "GET", executeQuery, collName);

});


router.post('/:collName?', jsonParser, (req, res) => {
    console.log("using generic post");
    const executeQuery = () => {
        const collName = req.params.collName;
        if (!collName) {
            res.send(false);
        }
        console.log(req.body);
        postData(req.body, collName, (returned) => {
            if (returned) {
                res.send(returned);
            } else {
                res.send(false);
            }
        });
    }

    checkPermission(req.decoded.role, res, "POST", executeQuery, collName);
});

router.patch('/:collName?/:id?', jsonParser, (req, res) => {
    console.log("using generic patch");
    const executeQuery = () => {
        if (!req.params.collName) {
            res.send(false);
        }
        if (!req.params.id) {
            res.send(false);
        }
        const id = req.params.id;
        const collName = req.params.collName;
        let query = {
            "_id": id,
        };
        console.log(query);
        patchData(query, req.body, collName, (returned) => {
            if (returned) {
                res.send(returned);
            } else {
                res.send(false);
            }
        });
    }

    checkPermission(req.decoded.role, res, "PATCH", executeQuery, req.params.collName);
});

router.delete('/:collName?/:id?', (req, res) => {
    console.log("using generic delete");
    const executeQuery = () => {
        if (!req.params.collName) {
            res.send(false);
        }
        if (!req.params.id) {
            res.send(false);
        }
        const id = req.params.id;
        const collName = req.params.collName;
        let query = {
            "_id": id,
        };
        deleteData(query, collName, (returned) => {
            if (returned) {
                res.send(returned);
            } else {
                res.send(false);
            }
        });
    }

    checkPermission(req.decoded.role, res, "DELETE", executeQuery, collName);
});

//Get list of all collections.
router.get('/collections', (req, res) => {
    const callbackFunc = (returned) => {
        res.send(returned);
    };
    mongo.connect(mongoURL, (err, db) => {
        if (err) {
            callbackFunc(undefined);
            return; //exit if error.
        }
        let dbo = db.db("saberShores");
        dbo.collections((err, result) => {
            let names = [];
            for (var i = 0; i < result.length; ++i) {
                names[i] = result[i].s.name;
            }
            if (err) {
                callbackFunc(undefined);
            } else {
                console.log(names);
                callbackFunc(names);
            }
        });
    });
});

app.use("/api", router);

app.listen(3000, () => {
    console.log("live at port 3000");
});

module.exports = router;