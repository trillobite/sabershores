/*
    File:   crud.js
    Auth:   trillobite
    Desc:   These are the basic operations for getting data
            in and out of the mongoDB.
*/

let apiKey = undefined; //where the api key will be stored...

const account = {
    "usrName": "saberShoresLanding",
    "password": ""
};

const authenticate = () => {
    let dfd = $.Deferred();
    console.log("running authenticate");
    let restfulCall = `${crud.url}/authenticate`;
    $.ajax(restfulCall, {
        data: JSON.stringify(account),
        contentType: "application/json; charset=utf-8",
        success: (data) => {
            console.log(data);
            dfd.resolve(data.token);
        },
        error: (err) => {
            dfd.reject(err);
        },
        type: "POST",
    });
    return dfd.promise();
};

let crud = {
    url: "http://localhost:3000/api",
    get: (collection, dta, callback) => {
        const restfulCall = dta ? `${crud.url}/${collection}/${dta}?` : `${crud.url}/${collection}`;
        const call = () => {
            $.ajax(restfulCall, {
                success: (data) => {
                    callback(data);
                },
                error: (err) => {
                    console.log(err);
                    callback(false);
                },
                headers: { 'x-access-token': apiKey },
                type: "GET",
            });
        };
        if (!apiKey) {
            authenticate().then((data) => {
                apiKey = data;
                call();
            });
        } else {
            call();
        }
    },
    post: (collection, dta, callback) => {
        const restfulCall = `${crud.url}/${collection}`;
        const call = () => {
            $.ajax(restfulCall, {
                data: JSON.stringify(dta),
                contentType: "application/json; charset=utf-8",
                //dataType: "json",
                success: (data) => {
                    callback(data);
                },
                error: (err) => {
                    console.log(err);
                    callback(false);
                },
                headers: { 'x-access-token': apiKey },
                type: "POST",
            });
        };
        if (!apiKey) {
            authenticate().then((key) => {
                apiKey = key;
                call();
            });
        } else {
            call();
        }
    },
    delete: (collection, id, callback) => {
        const restfulCall = id ? `${crud.url}/${collection}/${id}?` : `${crud.url}/${collection}`;
        const call = () => {
            $.ajax(restfulCall, {
                data: JSON.stringify(dta),
                contentType: "application/json; charset=utf-8",
                //dataType: "json",
                success: (data) => {
                    callback(data);
                },
                error: (err) => {
                    callback(false);
                },
                headers: { 'x-access-token': apiKey },
                type: "POST",
            });
        };
        if (!apiKey) {
            authenticate().then((key) => {
                apiKey = key;
                call();
            });
        } else {
            call();
        }
    },
    patch: (collection, id, dta, callback) => {
        const restfulCall = id ? `${crud.url}/${collection}/${id}?` : `${crud.url}/${collection}`;
        const call = () => {
            $.ajax(restfulCall, {
                data: JSON.stringify(dta),
                contentType: "application/json; charset=utf-8",
                //dataType: "json",
                success: (data) => {
                    callback(data);
                },
                error: (err) => {
                    callback(false);
                },
                headers: { 'x-access-token': apiKey },
                type: "PATCH",
            });
        }
        if (!apiKey) {
            authenticate().then((key) => {
                apiKey = key;
                call();
            })
        } else {
            call();
        }
    },
};