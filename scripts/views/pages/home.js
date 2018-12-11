var home = function () {
    return {
        image: 'images/logo.jpg',
        render: function () {
            var tmp = $jConstruct('div', {
                text: ` FUZZOLIFY LLC `,
            });

            return tmp;
        }
    }
}