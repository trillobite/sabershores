var home = function () {
    return {
        image: 'images/logo.jpg',
        render: function () {
            var tmp = $jConstruct('div', {
                text: ` WELCOME FRIENDS, PLEASE FEEL FREE TO BROWSE MY SHOP! :)
                        SaberShores was started over 10 years ago with many hopes and dreams, but has always been based off of the sharing of unique art and culture perspectives..
                        Since then, SaberShores has grown into a very eclectic and diverse business. Originating as a vendor at a local flea market and online with a free geocities website, higher demanding marketplaces were soon to follow.
                        We now offer not only custom jewelry and sculptures of many different media, but also custom digital graphics as well as, photography and fine art prints.
                        I am so incredibly flattered that you may like my work, but please respect the fact that I have worked very hard and for many years to find my style. And even though Etsy is a wonderful place to share ones ideas and to derive inspiration, I feel the need to urge other artists not to blatantly "copy" my signature designs. `,
            });

            return tmp;
        }
    }
}