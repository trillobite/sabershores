
/*
    File:   crudDB.js
    Auth:   trillobite
    Desc:   Basic operations for getting data
            in and out of the mongoDB.
*/

let crudDB = (account) => {
    let apiKey = undefined;
    let apiUrl = "http://localhost:3000/api";

    const authenticate = () => {
        let dfd = $.Deferred();
        console.log("running authenticate");
        let restfulCall = `${apiUrl}/authenticate`;
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

    return {
        get: (collection, dta, callback) => {
            const restfulCall = dta ? `${apiUrl}/${collection}/${dta}?` : `${apiUrl}/${collection}`;
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
            const restfulCall = `${apiUrl}/${collection}`;
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
            const restfulCall = id ? `${apiUrl}/${collection}/${id}?` : `${apiUrl}/${collection}`;
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
            const restfulCall = id ? `${apiUrl}/${collection}/${id}?` : `${apiUrl}/${collection}`;
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
    }
}
