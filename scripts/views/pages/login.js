
var login = () => {
    let css = {
        //"center": "block",
        "background-color": "gray",
        "font-size": "20px",
        //"color": "#d9d9d9"
    }

    let row1TxtBx = $jConstruct("textbox", {
        text: "email",
        id: "usrNameTxtBx",
        class: "col-lg-6 mx-auto txtBx",
    }).css(css).css({
        "margin": "10px",
    });

    let row1 = $jConstruct('div', {
        class: "row",
    }).addChild(row1TxtBx);

    let row2TxtBx = $jConstruct("textbox", {
        text: "password",
        id: "usrPassTxtBx",
        class: "col-lg-6 mx-auto txtBx",
    }).event("focus", () => {
        let tmp = arrdb.get(row2TxtBx.id);
        if (tmp.type == "textbox") {
            tmp.css({
                "color": "white",
            });
            tmp.type = "password";
            tmp.refresh();
            $(`#${tmp.id}`).select();
        }
    }).css(css).css({
        "margin-bottom": "10px",
    });

    let row2 = $jConstruct('div', {
        class: "row",
    }).addChild(row2TxtBx);

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
        text: "Login",
        class: "link",
    }).event("click", () => {
        require(["scripts/procedures/loginUsr.js"], () => {
            //collect all user data, and send to api.
            let obj = {
                usrName: $("#usrNameTxtBx").val(),
                password: $("#usrPassTxtBx").val(),
            }

            loginUsr(obj).done((result) => {
                let tmp0 = arrdb.get("signupBtn");
                tmp0.text = "Log Out";
                tmp0.refresh();
                let tmp = arrdb.get("loginBtn");
                tmp.text = obj.usrName;
                tmp.refresh();
            });
        });
    }).css({
        "font-size": "20px",
        "text-align": "center",
        //"margin-left": "5px",
        "position": "relative",
        "top": "50%",
        "transform": "translateY(-50%)",
    }));

    let row4 = $jConstruct('div', {
        class: "row",
    }).addChild(submit);

    require(["scripts/txtBxClear.js"], () => {
        txtBxClear(row1TxtBx, "focus");
        txtBxClear(row2TxtBx, "focus");
    });

    return {
        image: "",
        render: function () {
            var tmp = $jConstruct('div', {
                class: "container center-block",
            }).css({
                "padding-right": "25px",
            });
            tmp.addChild(row1).addChild(row2).addChild(row4);

            return tmp;
        }
    };
}