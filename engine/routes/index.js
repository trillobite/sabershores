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

const checkPermission = async (role, res, type, collName) => {
    const sendErr = () => { //sends an error if credendials don't match...
        return res.status(403).send({
            success: false,
            message: `Access to ${collName} of type ${type} is not authorized`
        });
    }

    console.log(role, collName);
    let returned = await getData({ role: role }, "roles");

    console.log(returned);
    if (returned[0].hasOwnProperty("restricted")) {

        const containsEndpoint = (endPnts, find) => {
            for (let i = 0; i < endPnts.length; ++i) {
                if (endPnts[i].hasOwnProperty(find)) {
                    return endPnts[i][find];
                }
            }
            return false;
        };

        const containsType = (endPoint, type) => {
            for (let i = 0; i < endPoint.length; ++i) {
                if (endPoint[i] == type) {
                    return endPoint[i];
                }
            }
            return false;
        };

        const restrictedEndpoints = returned[0].restricted;
        const endPnt = containsEndpoint(restrictedEndpoints, collName);
        if (endPnt) {
            if (containsType(endPnt, type)) {
                return true;
            } else {
                return sendErr();
            }
        }

    }

    if (!returned[0].powers.includes(type)) {
        return sendErr();
    } else { //everything looks good, execute callback!
        return true;
    }
};

//gets data from the sabershores mongodb.
const getData = async (query, collectionName) => {
    return new Promise((resolve, reject) => {
        try {
            query = checkMongoID(query);
            mongo.connect(mongoURL, (err, db) => {
                if (err) {
                    reject(err);
                }
                let dbo = db.db("saberShores");
                dbo.collection(collectionName).find(query).toArray((err, result) => {
                    console.log("getData", result);
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

//adds data to the sabershores mongodb.
const postData = async (query, collectionName) => {
    console.log(query);
    return new Promise((resolve, reject) => {
        try {
            query = checkMongoID(query);
            mongo.connect(mongoURL, (err, db) => {
                if (err) {
                    reject(err);
                }
                let dbo = db.db("saberShores");
                dbo.collection(collectionName).insertOne(query, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

//deletes data from the sabershores mongodb.
const deleteData = async (query, collectionName) => {
    return new Promise((resolve, reject) => {
        try {
            query = checkMongoID(query);
            mongo.connect(mongoURL, (err, db) => {
                if (err) {
                    reject(err);
                }
                let dbo = db.db("saberShores");
                dbo.collection(collectionName).removeOne(query, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

//updates data to the sabershores mongodb.
const patchData = async (query, update, collectionName) => {
    return new Promise((resolve, reject) => {
        try {
            query = checkMongoID(query);

            if (update) { //the update must specify what to set with the $set operator.
                let set = update;
                update = {
                    $set: set,
                };
            }

            mongo.connect(mongoURL, (err, db) => {
                if (err) {
                    reject(err);
                }
                let dbo = db.db("saberShores");
                dbo.collection(collectionName).updateOne(query, update, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

router.post('/authenticate', jsonParser, async (req, res) => {
    console.log("authenticate!");
    if (req.body.hasOwnProperty("usrName") && req.body.hasOwnProperty("password")) {

        let returned = await getData(req.body, "users");

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

router.get('/:collName?/:option?/:data?', async (req, res, next) => {
    console.log("using generic get");
    const collName = req.params.collName;
    const option = req.params.option;
    const data = req.params.data;
    let query = {};

    try {
        const permission = await checkPermission(req.decoded.role, res, "GET", collName);
        console.log("permission:", permission);
        if (permission) {
            if (collName == "collections") {
                next(); //don't use this function for handling collections...
                return;
            }
            if (option && data) {
                query[option] = data;
            }
            let returned = await getData(query, collName);
            if (returned) {
                res.send(returned);
            } else {
                next();
                return;
            }
        }
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: `Internal server error ${e}`
        });
    }
});


router.post('/:collName?', jsonParser, async (req, res) => {
    console.log("using generic post");
    const collName = req.params.collName;

    try {
        const permission = await checkPermission(req.decoded.role, res, "POST", collName);
        console.log("permission:", permission);
        if (permission) {

            if (!collName) {
                res.send(false);
            }
            console.log(req.body);
            const returned = await postData(req.body, collName);
            if (returned) {
                res.send(returned);
            } else {
                res.send(false);
            }
        }
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: `Internal server error ${e}`
        });
    }
});

router.patch('/:collName?/:id?', jsonParser, async (req, res) => {
    console.log("using generic patch");

    try {
        const permission = await checkPermission(req.decoded.role, res, "PATCH", req.params.collName);
        console.log(permission);
        if (permission) {
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
            const returned = await patchData(query, req.body, collName);
            if (returned) {
                res.send(returned);
            } else {
                res.send(false);
            }
        }
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: `Internal server error ${e}`
        });
    }
});

router.delete('/:collName?/:id?', async (req, res) => {
    console.log("using generic delete");
    const collName = req.params.collName;
    try {
        const permission = await checkPermission(req.decoded.role, res, "DELETE", collName);
        console.log(permission);
        if (permission) {
            if (!req.params.collName) {
                res.send(false);
            }
            if (!req.params.id) {
                res.send(false);
            }
            const id = req.params.id;
            let query = {
                "_id": id,
            };

            const returned = await deleteData(query, collName);
            if (returned) {
                res.send(returned);
            } else {
                res.send(false);
            }
        }
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: `Internal server error ${e}`
        });
    }
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