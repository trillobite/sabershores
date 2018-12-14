

let storeBuilder = () => {
    let dfd = $.Deferred();

    require(["fabric"], () => {

        let headerCanvas = {
            canvas: $jConstruct('canvas', {
                id: "headerCanvas",
            }).css({
                "float": "left",
                "width": "100%",
                "height": "200px",
                "border": "1px solid black",
            }),
            fab: new fabric.Canvas("headerCanvas"),
            db: new micronDB(),
        };

        let sidebarCanvas = {
            canvas: $jConstruct("canvas", {
                id: "sidebarCanvas",
            }).css({
                "float": "left",
                "width": "200px",
                "height": "1000px",
                "border": "1px solid black",
            }),
            fab: new fabric.Canvas("sidebarCanvas"),
            db: new micronDB(),
        };

        let bodyCanvas = {
            canvas: $jConstruct("canvas", {
                id: "bodyCanvas",
            }).css({
                "clear": "right",
                "float": "right",
                "width": "824px",
                "height": "1000px",
                "border": "1px solid black",
            }),
            fab: new fabric.Canvas("bodyCanvas"),
            db: new micronDB(),
        };

        let footerCanvas = {
            canvas: $jConstruct("canvas", {
                id: "footerCanvas",
            }).css({
                "float": "left",
                "width": "100%",
                "height": "200px",
                "border": "1px solid black",
            }),
            fab: new fabric.Canvas("footerCanvas"),
            db: new micronDB(),
        };

        let builderCanvases = [headerCanvas, sidebarCanvas, bodyCanvas, footerCanvas];

        let builderContainer = $jConstruct('div', {
            id: "builderContainer",
        }).css({
            "width": "1024px",
            "height": "1024px",
        });

        //set the canvases to the container object.
        for (let i = 0; i < builderCanvases.length; ++i) {
            builderContainer.addChild(builderCanvases[i].canvas);
        }

        require(["views/pages/storeBuilder/builderNav"], () => {
            let namespace = {
                builderCanvases: builderCanvases,
                builderContainer: builderContainer,
            };
            dfd.resolve(namespace);
        });
    });


    return dfd.promise();
};