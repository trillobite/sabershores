

let builderNav = () => {
    let dfd = $.Deferred();
    require([""], () => {

        var navDiv = $jConstruct('div', {
            class: 'col-sm-2 col-md-1'
            //text: 'nav',
        }).css({
            "margin": "auto",
            //'width': '200px',
            //'height': 'calc(100% - 200)',
            //'float': 'left',
            //'border': '1px solid black',
        });

        //name all of the products which will be sold...
        var index = ["Store Home", "Templates", "Products", "Category Pages", "tmp", "tmp"];
        var register = [{
            name: "Store Home",
            obj: "home",
        },
        {
            name: "Templates",
            obj: "pens",
        },
        {
            name: "Products",
            obj: "store",
        },
        {
            name: "Category Pages",
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

        for (var i = 0; i < register.length; i++) {
            navDiv.addChild($jConstruct('div', {
                text: register[i].name,
                class: "link",
            }).event('click', function () {
                var tmp = arrdb.get('content');
                tmp.children = []; //clear the content area!
                var text = arrdb.get(this.id).text;
                var indx = index.indexOf(text);
                if (typeof (register[index].obj) == "function") {
                    tmp.addChild(register[indx].obj().render());
                }
                tmp.refresh();
            }).css({
                //"margin-right": "0px",
                //"margin": "auto",
                "text-shadow": "1px 1px 1px black",
                "background-color": "gray",
                "border-radius": "5px",
                "font-size": "20px",
                'width': 'inherit',
                'height': '100px',
                'text-align': 'center',
                //'border': '1px solid black',
                "background-size": 'cover',
                "background-position": 'center center',
                "background-image": (function () {
                    if (typeof (register[i].obj) == "function") {
                        if (register[i].obj().hasOwnProperty("image")) {
                            return `url("${register[i].obj().image}")`;
                        } else {
                            return "";
                        }
                    }
                })(),
            }));
        }
        dfd.resolve(navDiv);
    });

    return dfd.promise();
};