
define(["scripts/views/header.js"], (siteHeader) => {
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
        class: 'container',
    }).css({
        'width': '95%',
        'height': '1024px',
        "background-color": "#e6e6e6",
        "box-shadow": "1px 1px 1px gray",
        //'border': '1px solid black',
    });

    main.addChild(header);
    main.addChild(content);
    return main;
});
