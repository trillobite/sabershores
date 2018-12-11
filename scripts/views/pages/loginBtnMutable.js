let loginBtnMutable = (usrName) => {

    let submit = $jConstruct("div", {
        //text: "Search",
        class: "col-lg-1 mx-auto",
    }).css({
        //"cursor": "pointer",
        "border-radius": "5px",
        //"font-family": "Roboto",
        "height": "50px",
        "width": "80px",
        //"float": "left",
        "background-color": "gray",
    }).addChild($jConstruct('div', {
        text: usrName ? usrName : "Login",
        class: "link",
    }).event("click", () => {
        if (usrName) {
            //open settings...
            console.log("already logged in!");
        } else {
            require(["scripts/procedures/loginUsr.js"], () => {
                //collect all user data, and send to api.
                let obj = {
                    usrName: $("#usrNameTxtBx").val(),
                    password: $("#usrPassTxtBx").val(),
                }

                loginUsr(obj).done((result) => {
                    let tmp0 = arrdb.get("signupBtn");
                    tmp0.css({
                        "display": "none"
                    });
                    let tmp = arrdb.get("loginBtn");
                    tmp.text = result.usrName;
                    tmp.refresh();
                });
            });
        }
    }).css({
        "font-size": "20px",
        "text-align": "center",
        //"margin-left": "5px",
        "position": "relative",
        "top": "50%",
        "transform": "translateY(-50%)",
    }));

    return submit;
}