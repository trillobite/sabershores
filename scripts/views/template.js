var header = $jConstruct('div', {
}).css({
    'width': '100%',
    "height": "250px",
    "background-image": 'url("images/sabershoresbanner.jpg")',
    "background-size": 'cover',
    "background-position": 'center center',
});

var content = $jConstruct('div', {
    id: 'content',
}).css({
    //'border': '1px solid black',
    //'border-radius': '5px',
    'width': 'calc(100% - 200px)',
    'height': '774px', //1024px from template minus the header 200px.
});

var main = $jConstruct('div', {
    class: 'container',
}).css({
    'width': '80%',
    'height': '1024px',
    //'border': '1px solid black',
});

main.addChild(header);
main.addChild(content);