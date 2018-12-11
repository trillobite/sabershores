
    let search = () => {
        let txtbx = $jConstruct("textbox", {
            text: "Search for anything...",
            class: "txtBx",
        }).css({
            "background-color": "gray",
            "opacity": "0.7",
            "float": "left",
            "clear": "left",
        });
        let submit = $jConstruct("div", {
            //text: "Search",
            //class: "link",
        }).css({
            //"cursor": "pointer",
            "border-radius": "5px",
            //"font-family": "Roboto",
            "height": "50px",
            "width": "80px",
            "float": "left",
            "background-color": "gray",
        }).addChild($jConstruct('div', {
            text: "Search",
            class: "link",
        }).css({
            "margin-left": "5px",
            "position": "relative",
            "top": "50%",
            "transform": "translateY(-50%)",
        }));
        return $jConstruct('div').css({
            "font-size": "20px",
            "text-align": "center",
            "margin-top": "50px",
            "margin-left": "50px",
            "float": "left",
            "clear": "left",
        }).addChild(txtbx).addChild(submit);
    }