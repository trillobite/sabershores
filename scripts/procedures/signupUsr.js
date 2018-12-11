            /*
                txtBxFrstNm
                txtBxLstNm
                usrNameTxtBx
                usrPassTxtBx
                usrPass2TxtBx
            */

            /*
                {
                    name: {
                        first: "",
                        last: "",
                    },
                    usrName: "",
                    password: "",
                    passConfrm: "",
                }
            */

let signupUsr = (obj) => {

    let chkNull = (val) => {
        if(val) {
            if(val.length > 0) {
                return true;
            }
        }
        return false;
    };

    //ensure that the user entered the same password twice.
    if(obj.password == obj.passConfrm) {
        //check if all values are valid.
        if(chkNull(obj.name.first) && chkNull(obj.name.last) && chkNull(obj.usrName) && chkNull(obj.password)) {
            require(["scripts/backend/crudDB.js"], () => {
                //site account for making db CRUD requests.
                let db = crudDB({
                    usrName: "addUser",
                    password: "",
                });
                db.post("users", {
                    usrName: obj.usrName,
                    password: obj.password,
                    name: obj.name.first + obj.name.last,
                    role: "user", //security flaw here, can make admin as role...
                }, (response) => {
                    console.log(response);
                    return response;
                });
            });
        } else {
            return false;
        }
    } else {
        return false;
    }
}