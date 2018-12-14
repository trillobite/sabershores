let mainTemplate = () => {

    let dfd = $.Deferred();
    require(["views/header"], (siteHeader) => {
        require(["views/nav"], () => {

            let header = siteHeader();

            let content = $jConstruct('div', {
                id: 'content',
            }).css({
                //'border': '1px solid black',
                //'border-radius': '5px',
                //'width': 'calc(100% - 200px)',
                "width": "100%",
                'height': '774px', //1024px from template minus the header 200px.
            });


            let main = $jConstruct('div', {
                class: 'container col-sm-12',
            }).css({
                //'width': '95%',
                'height': '1024px',
                "background-color": "#e6e6e6",
                "box-shadow": "1px 1px 1px gray",
                //'border': '1px solid black',
            });


            nav().then((navDiv) => {
                main.addChild(header);
                main.addChild(content);
                main.addChild(navDiv);
                dfd.resolve(main);
            });

        });
    });

    return dfd.promise();
};