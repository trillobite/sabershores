// the purpose of this function is to ensure that all of the textboxes
// on the site operate the same way.
let txtBxClear = (obj, action, secondaryAction) => {
    let defaultVal = obj.text;
    obj.event(action, () => {
        $(`#${obj.id}`).select();
        obj.css({
            "color": "white",
        });
    });
    if (secondaryAction) {
        obj.event(secondaryAction, () => {
            if (!$(`#${obj.id}`).val()) {
                obj.text = defaultVal;
                obj.refresh();
            }
        });
    }
};
