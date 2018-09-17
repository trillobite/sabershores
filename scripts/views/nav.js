var nav = $jConstruct('div', {
    //text: 'nav',
}).css({
    'width': '200px',
    'height': 'calc(100% - 200)',
    'float': 'right',
    //'border': '1px solid black',
});

//name all of the products which will be sold...
var index = ["Home", "Pens", "Stamps", "Leather", "Jewelry"];
var register = [{
        name: "Home",
        obj: home,
    },
    {
        name: "Pens",
        obj: pens,
    }, 
    {
        name: "Stamps",
        obj: stamps,
    }, 
    {
        name: "Leather",
        obj: leather,
    },
    {
        name: "Jewelry",
        obj: jewelry,
    }];

(function() {
    for(var i = 0; i < register.length; i++) {
        nav.addChild($jConstruct('div', {
            text: register[i].name,
        }).event('click', function() {
            var tmp = arrdb.get('content');
            tmp.children = []; //clear the content area!
            var text = arrdb.get(this.id).text;
            var indx = index.indexOf(text);
            tmp.addChild(register[indx].obj().render());
            tmp.refresh();
        }).css({    
            'width': 'inherit',
            'height': '100px',
            'text-align': 'center',
            'border': '1px solid black',
            "background-size": 'cover',
            "background-position": 'center center',
            "background-image": (function() {
                    if(register[i].obj().hasOwnProperty("image")) {
                        return `url("${register[i].obj().image}")`;
                    } else {
                        return "";
                    }
                })(),
        }));
    }
})();