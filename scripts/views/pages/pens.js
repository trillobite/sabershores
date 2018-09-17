var pens = function () {
    return {
        pens: [
            {
                img: "",
                des: `<ul>
                    <li>
                        Hand made item.
                    </li>
                    <li>
                        Made to order!
                    </li>
                    <li>
                        Each quill will be unique from the next, as the feathers are
                        natural and NOT 100% identical to one another!
                    </li>
                </ul>`
            },
        ],
        render: function () {
            var tmp = $jConstruct('div', {
                text: 'this will hold all of your pens items!',
            });

            return tmp;
        }
    }
}