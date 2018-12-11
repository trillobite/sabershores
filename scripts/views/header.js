
//get all dependencies...
define(["scripts/views/searchBar.js", "scripts/views/loginBtn.js", "scripts/views/pages/signup.js"], () => {

    let siteHeader = () => {
        let header = $jConstruct('div', {
        }).css({
            "border-radius": "10px",
            "text-shadow": "1px 1px 1px black",
            'width': '100%',
            "height": "250px",
            "background-image": 'url("images/indexBackground.png")',
            "background-size": 'cover',
            "background-position": 'center center',
        });

        let headerLogo = $jConstruct('div', {
            text: "FUZZOLIFY",
        }).css({
            "margin-left": "50px",
            "color": "#c699ff",
            "font-family": "Norwester",
            "float": "left",
            "font-size": "64px",
        });

        let headerSlogan = $jConstruct("div", {
            text: "Changing your hobbies into dreams!"
        }).css({
            "margin-left": "50px",
            "color": "#d9d9d9",
            "font-family": "Roboto",
            "clear": "left",
            "float": "left",
            "font-size": "20px",
        });

        header.addChild(headerLogo);
        header.addChild(headerSlogan);
        header.addChild(accounts());
        header.addChild(search());

        return header;
    };

    return siteHeader;
});
