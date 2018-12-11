
let accounts = () => {

    let getUsr = () => {
        let dfd = $.Deferred();
        require(["scripts/store.legacy.min.js"], (store) => {
            let tmp = store.get("user");
            if (tmp) {
                dfd.resolve(tmp.usrName);
            } else {
                dfd.resolve(undefined);
            }
        });
        return dfd.promise();
    };

    let loginBtn = $jConstruct('div', {
        id: "loginBtn",
        text: "Login",
        class: "link",
    }).event("click", () => {
        getUsr().done((returned) => {
            if (returned) {
                //show the user settings page...
                console.log("already logged in!");
            } else {
                //show the login page...
                require(["scripts/views/pages/login.js"], () => {
                    var tmp = arrdb.get("content");
                    tmp.children = []; //clear the content area!
                    tmp.addChild(login().render());
                    tmp.refresh();
                });
            }
        })
    }).css({
        "margin-right": "20px",
        "float": "right",
        "font-size": "20px"
    });

    let signupBtn = $jConstruct('div', {
        id: "signupBtn",
        text: "Sign Up",
        class: "link",
    }).event('click', function () {
        getUsr().done((returned) => {
            if (returned) {
                require(["scripts/store.legacy.min.js"], (store) => {
                    store.clearAll(); //logout...
                    loginBtn.text = "Login";
                    signupBtn.text = "Sign Up";
                    loginBtn.refresh();
                    signupBtn.refresh();
                });
            } else {
                //get the signup script...
                require(["scripts/views/pages/signup.js"], () => {
                    var tmp = arrdb.get('content');
                    tmp.children = []; //clear the content area!
                    tmp.addChild(signup().render());
                    tmp.refresh();
                });
            }
        })
    }).css({
        "margin-right": "10px",
        "float": "right",
        "font-size": "20px",
    });


    getUsr().then((returned) => {
        if (returned) {
            signupBtn.text = "Sign Out";
            loginBtn.text = returned;
            signupBtn.refresh();
            loginBtn.refresh();
        }
    });

    return $jConstruct('div').css({
        "clear": "right",
        "float": "right",
    }).addChild(loginBtn).addChild(signupBtn);
};