
var signup = () => {
    let css = {
        //"center": "block",
        "background-color": "gray",
        "font-size": "20px",
        //"color": "#d9d9d9"
    }

    let introCss = {
        "margin": "20px",
        "font-size": "20px",
        "text-align": "center",
        "font-family": "Roboto",
        "text-shadow": "1px 1px 1px gray",
    }

    let intro0 = $jConstruct('div', {
        text: `Hello, and welcome! You appear to either be someone who wishes to purchase an item from a fuzzolified
                store, or you are a seller who wishes to fuzzolify your own hobby or business!`,
        class: "col-lg-10 mx-auto",
    }).css(introCss);

    let intro1 = $jConstruct('div', {
        text: `Either way, we welcome you to Fuzzolify, and we hope you have a wonderful experience.`,
        class: "col-lg-10 mx-auto",
    }).css(introCss);

    let txtBxFrstNm = $jConstruct("textbox", {
        text: "First",
        id: "txtBxFrstNm",
        class: "txtBx",
    }).css(css).css({
        "width": "50%",
        "margin-bottom": "10px",
    });

    let txtBxLstNm = $jConstruct("textbox", {
        text: "Last",
        id: "txtBxLstNm",
        class: "txtBx",
    }).css(css).css({
        "width": "50%",
        "margin-bottom": "10px",
    });

    let col0 = $jConstruct('div', {
        class: "col-lg-7 mx-auto",
    }).addChild(txtBxFrstNm).addChild(txtBxLstNm);

    let row0 = $jConstruct('div', {
        class: "row",
    }).addChild(col0);

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

    let row3TxtBx = $jConstruct("textbox", {
        text: "retype password",
        id: "usrPass2TxtBx",
        class: "col-lg-6 mx-auto txtBx",
    }).event("focus", () => {
        let tmp = arrdb.get(row3TxtBx.id);
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

    let row3 = $jConstruct('div', {
        class: "row",
    }).addChild(row3TxtBx);

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
        text: "Register",
        class: "link",
    }).event("click", () => {
        require(["scripts/procedures/signupUsr.js"], () => {
            //collect all user data, and send to api.
            let obj = {
                name: {
                    first: $(`#txtBxFrstNm`).val(),
                    last: $("#txtBxLstNm").val(),
                },
                usrName: $("#usrNameTxtBx").val(),
                password: $("#usrPassTxtBx").val(),
                passConfrm: $("#usrPass2TxtBx").val(),
            }
            let success = signupUsr(obj);
            console.log(success);
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
        txtBxClear(txtBxFrstNm, "focus");
        txtBxClear(txtBxLstNm, "focus");
        txtBxClear(row1TxtBx, "focus");
        //txtBxClear(row2TxtBx, "focus");
        //txtBxClear(row3TxtBx, "focus");
    });

    return {
        image: "",
        render: function () {
            let introRow0 = $jConstruct('div', {
                class: "row",
            }).addChild(intro0);
            let introRow1 = $jConstruct('div', {
                class: "row",
            }).addChild(intro1);
            var tmp = $jConstruct('div', {
                class: "container center-block",
            });
            tmp.addChild(introRow0).addChild(intro1).addChild(row0).addChild(row1).addChild(row2).addChild(row3).addChild(row4);

            return tmp;
        }
    }
}