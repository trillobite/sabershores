const mongo = require("mongodb").MongoClient;
const mongoURL = "mongodb://178.128.176.202:27017/";
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

//explicitly allows SAME ORIGIN POLICY ALL.
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const jsonParser = bodyParser.json();

//gets data from the sabershores mongodb.
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

//adds data to the sabershores mongodb.
const postData = (input, collectionName, callbackFunc) => {
    console.log(input);
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

//deletes data from the sabershores mongodb.
const deleteData = (query, collectionName, callbackFunc) => {
    mongo.connect(mongoURL, (err, db) => {
        if(err) {
            callbackFunc(false);
            return; //exit if error.
        }
        let dbo = db.db("saberShores");
        dbo.collection(collectionName).removeOne(query, (err, result) => {
            if(err) {
                callbackFunc(false);
            } else {
                callbackFunc(result);
            }
        });
    });
};

//updates data to the sabershores mongodb.
const patchData = (query, update, collectionName, callbackFunc) => {
    mongo.connect(mongoURL, (err, db) => {
        if(err) {
            callbackFunc(false);
            return; //exit if error.
        }
        let dbo = db.db("saberShores");
        dbo.collection(collectionName).updateOne(query, update, (err, result) => {
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
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.post('/pens', jsonParser, (req, res) => {
    console.log(req.body);
    postData(req.body, "pens", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.patch('/pens/:id?', jsonParser, (req, res) => {
    if(!req.params.id) {
        res.send(false);
    }
    const id = req.params.id;
    let query = {
        "_id": id,
    };
    patchData(query, req.body, "pens", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.delete('/pens', jsonParser, (req, res) => {
    console.log(req.body);
    deleteData(req.body, "pens", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.get('/stamps/:name?', (req, res) => {
    const name = req.params.name;
    let query = {};
    if(name) {
        query.name = name;
    }
    getData(query, "stamps", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.post('/stamps', jsonParser, (req, res) => {
    console.log(req.body);
    postData(req.body, "stamps", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.patch('/stamps/:id?', jsonParser, (req, res) => {
    if(!req.params.id) {
        res.send(false);
    }
    const id = req.params.id;
    let query = {
        "_id": id,
    };
    patchData(query, req.body, "stamps", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.delete('/stamps', jsonParser, (req, res) => {
    console.log(req.body);
    deleteData(req.body, "stamps", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.get('/leather/:name?', (req, res) => {
    const name = req.params.name;
    let query = {};
    if(name) {
        query.name = name;
    }
    getData(query, "leather", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.post('/leather', jsonParser, (req, res) => {
    console.log(req.body);
    postData(req.body, "leather", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.patch('/leather/:id?', jsonParser, (req, res) => {
    if(!req.params.id) {
        res.send(false);
    }
    const id = req.params.id;
    let query = {
        "_id": id,
    };
    patchData(query, req.body, "leather", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.delete('/leather', jsonParser, (req, res) => {
    console.log(req.body);
    deleteData(req.body, "leather", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.get('/jewelry/:name?', (req, res) => {
    const name = req.params.name;
    let query = {};
    if(name) {
        query.name = name;
    }
    getData(query, "jewelry", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.post('/jewelry', jsonParser, (req, res) => {
    console.log(req.body);
    postData(req.body, "jewelry", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.patch('/jewelry/:id?', jsonParser, (req, res) => {
    if(!req.params.id) {
        res.send(false);
    }
    const id = req.params.id;
    let query = {
        "_id": id,
    };
    patchData(query, req.body, "jewelry", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.delete('/jewelry', jsonParser, (req, res) => {
    console.log(req.body);
    deleteData(req.body, "jewelry", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.get('/reviews/:productID?', (req, res) => {
    const productID = req.params.productID;
    let query = {};
    if(productID) {
        query.productID = productID;
    }
    getData(query, "reviews", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.post('/reviews', jsonParser, (req, res) => {
    console.log(req.body);
    postData(req.body, "reviews", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.patch('/reviews/:id?', jsonParser, (req, res) => {
    if(!req.params.id) {
        res.send(false);
    }
    const id = req.params.id;
    let query = {
        "_id": id,
    };
    patchData(query, req.body, "reviews", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.delete('/reviews', jsonParser, (req, res) => {
    console.log(req.body);
    deleteData(req.body, "reviews", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.get('/images/:imageID?', (req, res) => {
    const imageID = req.params.imageID;
    let query = {};
    if(imageID) {
        query.imageID = imageID;
    }
    getData(query, "images", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.post('/images', jsonParser, (req, res) => {
    console.log(req.body);
    postData(req.body, "images", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.patch('/images/:id?', jsonParser, (req, res) => {
    if(!req.params.id) {
        res.send(false);
    }
    const id = req.params.id;
    let query = {
        "_id": id,
    };
    patchData(query, req.body, "images", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.delete('/images', jsonParser, (req, res) => {
    console.log(req.body);
    deleteData(req.body, "images", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

//Get list of all collections.
router.get('/collections', (req, res) => {
    const callbackFunc = (returned) => {
        res.send(returned);
    };
    mongo.connect(mongoURL, (err, db) => {
        if(err) {
            callbackFunc(undefined);
            return; //exit if error.
        }
        let dbo = db.db("saberShores");
        dbo.collections((err, result) => {
            let names = [];
            for(var i = 0; i < result.length; ++i) {
                names[i] = result[i].s.name;
            }
            if(err) {
                callbackFunc(undefined);
            } else {
                console.log(names);
                callbackFunc(names);
            }
        });
    });
});

router.post('/emails', jsonParser, (req, res) => {
    console.log(req.body);
    postData(req.body, "emails", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

router.get('/emails/:emailID?', (req, res) => {
    const emailID = req.params.imageID;
    let query = {};
    if(emailID) {
        query.emailID = emailID;
    }
    getData(query, "emails", (returned) => {
        if(returned) {
            res.send(returned);
        } else {
            res.send(false);
        }
    });
});

app.use("/api", router);

app.listen(3000, () => {
    console.log("live at port 3000");
});

module.exports = router;