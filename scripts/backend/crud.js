/*
    File:   crud.js
    Auth:   trillobite
    Desc:   These are the basic operations for getting data
            in and out of the mongoDB.
*/

let crud = {
    url: "http://localhost:3000/api",
    get: (collection, dta, callback) => {
        let restfulCall = dta ? `${crud.url}/${collection}/${dta}?` : `${crud.url}/${collection}`;
        $.ajax(restfulCall, {
            success: (data) => {
                callback(data);
            },
            error: (err) => {
                callback(false);
            },
            type: "GET",
        });
    },
    post: (collection, dta, callback) => {
        let restfulCall = `${crud.url}/${collection}`;
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
            type: "POST",
        });
    },
    delete: (collection, id, callback) => {
        let restfulCall = id ? `${crud.url}/${collection}/${id}?` : `${crud.url}/${collection}`;
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
            type: "POST",
        });
    },
    patch: (collection, id, dta, callback) => {
        let restfulCall = id ? `${crud.url}/${collection}/${id}?` : `${crud.url}/${collection}`;
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
            type: "PATCH",
        });
    },
};