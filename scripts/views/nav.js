
let nav = () => {
    let dfd = $.Deferred();
    require(["views/pages/home"], () => {

        var navDiv = $jConstruct('div', {
            class: 'row',
            id: "navDiv",
            //text: 'nav',
        }).css({
            "margin": "auto",
            //'width': '200px',
            //'height': 'calc(100% - 200)',
            //'float': 'left',
            //'border': '1px solid black',
        });

        //name all of the products which will be sold...
        var index = ["Home", "Account", "Store", "tmp", "tmp", "tmp"];
        var pages = [{
            name: "Home",
            obj: home,
        },
        {
            name: "Account",
            obj: "pens",
        },
        {
            name: "Store",
            obj: (obj, callback) => {
                require(["views/pages/storeBuilder/storeBuilder"], () => {
                    storeBuilder().then((builder) => {
                        obj.addChild(builder.builderContainer);
                        callback(builder);
                    });
                });
            },
        },
        {
            name: "tmp",
            obj: "tmp",
        },
        {
            name: "tmp",
            obj: "tmp",
        },
        {
            name: "tmp",
            obj: "tmp",
        }];

        for (var i = 0; i < pages.length; i++) {
            navDiv.addChild($jConstruct('div', {
                text: pages[i].name,
                class: "link col-sm-2",
            }).event('click', function () {
                var tmp = arrdb.get('content');
                tmp.children = []; //clear the content area!
                var text = arrdb.get(this.id).text;
                var indx = index.indexOf(text);
                console.log({
                    text: text,
                    indx: indx,
                });
                if (typeof (pages[indx].obj) == "function") {
                    pages[indx].obj(tmp, (returned) => {
                        console.log(returned);
                        tmp.refresh();
                    });
                }
            }).css({
                "margin-right": "0px",
                //"margin": "auto",
                "text-shadow": "1px 1px 1px black",
                "background-color": "gray",
                "border-radius": "5px",
                "font-size": "20px",
                //'width': 'inherit',
                //'height': '100px',
                'text-align': 'center',
                //'border': '1px solid black',
                "background-size": 'cover',
                "background-position": 'center center',
                /*"background-image": (function () {
                    if (typeof (register[i].obj) == "function") {
                        if (register[i].obj().hasOwnProperty("image")) {
                            return `url("${register[i].obj().image}")`;
                        } else {
                            return "";
                        }
                    }
                })()*/
            }));
        }
        dfd.resolve(navDiv);
    });

    return dfd.promise();
};

