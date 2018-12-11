
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
//stores user credentials for further reference...

const loginUsr = (obj) => {
    let dfd = $.Deferred();
    let chkNull = (val) => {
        if (val) {
            if (val.length > 0) {
                return true;
            }
        }
        return false;
    };

    //ensure that the user entered a password.
    if (obj.password) {
        //check if all values are valid.
        if (chkNull(obj.usrName) && chkNull(obj.password)) {
            require(["scripts/backend/crud.js"], () => {

                authenticate({
                    usrName: obj.usrName,
                    password: obj.password
                }).fail((err) => {
                    dfd.fail(err);
                }).done((result) => {
                    dfd.resolve(result);
                });

            });
        } else {
            dfd.fail(false);
        }
    } else {
        dfd.fail(false);
    }

    return dfd.promise();
}
