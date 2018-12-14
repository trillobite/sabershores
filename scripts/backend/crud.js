/*
    File:   crud.js
    Auth:   trillobite
    Desc:   These are the basic operations for getting data
            in and out of the mongoDB.
*/

const account = {
    "usrName": "saberShoresLanding",
    "password": ""
};

//authenticate needs to be run before anything will work...
const authenticate = (usrAccount) => {
    let dfd = $.Deferred();

    require(["store"], (store) => {

        console.log("running authenticate");
        if(!store.get("user") && !usrAccount) { //check to see if there is any way to get a token.
            dfd.reject("no account, and no credentials provided.");
            return;
        }
        if(store.get("user")) {
            if(store.get("user").usrName == usrAccount.usrName) { //if there is a cookie with a token, and a user was provided.
                dfd.resolve(store.get("user"));
                return;
            } else if(store.get("user") && !usrAccount) { //if there is a cookie with a token, and no user was provided.
                dfd.resolve(store.get("user"));
                return;
            } else { //clear if there was a cookie with a token, but usrAccount.usrName does not match what is currently there.
                store.clearAll();
                return;
            }
        }

        let restfulCall = `${crud.url}/authenticate`;
        $.ajax(restfulCall, {
            data: JSON.stringify(usrAccount), //use whichever is not undefined;
            contentType: "application/json; charset=utf-8",
            success: (data) => {
                console.log(data);
                store.set("user", { //store the account in a cookie...
                    token: data.token,
                    usrName: usrAccount.usrName,
                });
                dfd.resolve(data.token);
            },
            error: (err) => {
                dfd.reject(err);
            },
            type: "POST",
        });

    });

    return dfd.promise();
};

let crud = {
    url: "http://localhost:3000/api",
    get: (collection, dta, callback) => {
        const restfulCall = dta ? `${crud.url}/${collection}/${dta}?` : `${crud.url}/${collection}`;
        const call = (apiKey) => {
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
        require(["store"], () => {
            const apiKey = store.get("user").token;
            call(apiKey);
        });
    },
    post: (collection, dta, callback) => {
        const restfulCall = `${crud.url}/${collection}`;
        const call = (apiKey) => {
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
        require(["store"], () => {
            const apiKey = store.get("user").token;
            call(apiKey);
        });
    },
    delete: (collection, id, callback) => {
        const restfulCall = id ? `${crud.url}/${collection}/${id}?` : `${crud.url}/${collection}`;
        const call = (apiKey) => {
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
        require(["store"], () => {
            const apiKey = store.get("user").token;
            call(apiKey);
        });
    },
    patch: (collection, id, dta, callback) => {
        const restfulCall = id ? `${crud.url}/${collection}/${id}?` : `${crud.url}/${collection}`;
        const call = (apiKey) => {
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
                type: "PATCH",
            });
        }
        require(["store"], () => {
            const apiKey = store.get("user").token;
            call(apiKey);
        });
    },
};