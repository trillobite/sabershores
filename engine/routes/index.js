const mongo = require("mongodb").MongoClient;
const mongoURL = "mongodb://178.128.176.202:27017/";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const jsonParser = bodyParser.json();

const getData = (query, collectionName, callbackFunc) => {
    mongo.connect(mongoURL, (err, db) => {
        if(err) {
            callbackFunc(undefined);
            return; //exit if error.
        }
        let dbo = db.db("saberShores");
        dbo.collection(collectionName).find(query).toArray((err, result) => {
            if(err) {
                callbackFunc(undefined);
            } else {
                callbackFunc(result);
            }
        });
    });
};

const postData = (input, collectionName, callbackFunc) => {
    mongo.connect(mongoURL, (err, db) => {
        if(err) {
            callbackFunc(false);
            return; //exit if error.
        }
        let dbo = db.db("saberShores");
        dbo.collection(collectionName).insertOne(input, (err, result) => {
            if(err) {
                callbackFunc(false);
            } else {
                callbackFunc(result);
            }
        });
    });
};

router.get('/pens/:name?', (req, res) => {
    const name = req.params.name;
    let query = {};
    if(name) {
        query.name = name;
    }
    getData(query, "pens", (returned) => {
        res.send(JSON.stringify(returned));
    });
});

router.post('/pens', jsonParser, (req, res) => {
    console.log(req.body);
    postData(req.body, "pens", (returned) => {
        res.send(returned ? true : false);
    });
});

router.get('/stamps/:name?', (req, res) => {
    const name = req.params.name;
    let query = {};
    if(name) {
        query.name = name;
    }
    getData(query, "stamps", (returned) => {
        res.send(JSON.stringify(returned));
    });
});

router.post('/stamps', jsonParser, (req, res) => {
    console.log(req.body);
    postData(req.body, "stamps", (returned) => {
        res.send(returned ? true : false);
    });
});

router.get('/leather/:name?', (req, res) => {
    const name = req.params.name;
    let query = {};
    if(name) {
        query.name = name;
    }
    getData(query, "leather", (returned) => {
        res.send(JSON.stringify(returned));
    });
});

router.post('/leather', jsonParser, (req, res) => {
    console.log(req.body);
    postData(req.body, "leather", (returned) => {
        res.send(returned ? true : false);
    });
});

router.get('/jewelry/:name?', (req, res) => {
    const name = req.params.name;
    let query = {};
    if(name) {
        query.name = name;
    }
    getData(query, "jewelry", (returned) => {
        res.send(JSON.stringify(returned));
    });
});

router.post('/jewelry', jsonParser, (req, res) => {
    console.log(req.body);
    postData(req.body, "jewelry", (returned) => {
        res.send(returned ? true : false);
    });
});

app.use("/products", router);

app.listen(3000, () => {
    console.log("live at port 3000");
});

module.exports = router;