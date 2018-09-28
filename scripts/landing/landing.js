/*
<header class="header" id="header3">
	<div class="left">
		<div class="caption">
			<h2 class="title display-3">Header title</h2>
			<p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ea accusamus enim hic, itaque eius quibusdam maxime veritatis maiores, ipsum porro beatae. Quisquam deleniti maxime velit tempora, molestias corrupti iusto!</p>
			<button class="action btn btn-danger">click me</button>	
		</div>	
	</div>
	
	<div class="right">
	  <img src="https://raw.githubusercontent.com/alphadsy/alpha-ui/master/images/laptop.png" alt="" class="img-fluid">
	</div>
	<i class="scroll fa fa-angle-double-down"></i>
</header>
*/

class Landing {
    textbody () {
        let message = $jConstruct('div', {
            class: 'col-lg-8 col-sm-10 col-xs-12',
            text: `Thank you for visiting SaberShores! BinaryOne and SaberShores are
            teaming up to bring you something new. A new store, better prices, more
            products, and more sellers. We are making alliances and forging a whole new
            platform! Please hold tight, changes are coming soon. Please join our news
            letter, we will let you know when you can start shopping. We will have a
            grand opening sale with limited stock, be the first to hop in!`,
        }).css({
            "float": "none",
            "display": "block",
            "margin": "0 auto",
            "margin-top": "100px",
            //"box-shadow": "0px 0px 10px gray", 
        });

        return message;
    }
    otherStores() {
        let container = $jConstruct('div').css({
            "margin-top": "100px",
            "text-align": "center",
        });
        let message = $jConstruct('div', {
            text: "Please visit our other stores!",
        });
        /*let btnPosh = $jConstruct('button', {
            text: "Poshmark",
            class: 'btn btn-primary',
        });*/
        let btnEbay = $jConstruct('button', {
            text: "Ebay",
            class: 'btn btn-primary',
            onclick: "location.href='http://www.ebaystores.com/sabershores';",
            value: "Go to SaberShores Ebay.",
        });
        let row0 = $jConstruct('div', {
            class: "col-lg-12 col-sm-12 col-xs-12",
        }).css({
            "float": "none",
            "display": "block",
            "margin": "0 auto",
        });
        let row1 = $jConstruct('div', {
            class: "col-lg-3 col-sm-3 col-xs-5",
        }).css({
            "float": "none",
            "display": "block",
            "margin": "0 auto",
        });
        row0.addChild(message);
        row1.addChild(btnEbay);
        container.addChild(row0).addChild(row1);
        return container;
    }
    emailSub () {
        let container = $jConstruct('div', {
            class: 'col-lg-3 col-sm-3 col-xs-5',
        }).css({
            "float": "none",
            "display": "block",
            "margin": "0 auto",
            "margin-top": "100px",
            "text-align": "center",
            //"box-shadow": "0px 0px 10px gray", 
        });

        let row0 = $jConstruct('div', {
            class: "row",
        }).css({
            "float": "none",
            "display": "block",
            "margin": "0 auto",
        });
        let message = $jConstruct('div', {
            
            text: `Please join our Newsletter!`,
        }).css({
            //nothing
        });
        row0.addChild(message);

        let row1 = $jConstruct('div', {
            class: "row",
        }).css({
            "float": "none",
            "display": "block",
            "margin": "0 auto",
        });
        let emailSubmit = $jConstruct('textbox', {
            text: `email`,
        }).css({
            "float": "none",
        }).event('click', () => {
            const thisID = emailSubmit.id;
            $("#"+thisID).select();
        });
        let submitBtn = $jConstruct('button', {
            text: `submit`,
            class: 'btn btn-primary',
        }).css({
            "float": "none",
        }).event('click', () => {
            console.log(emailSubmit.id);
            const thisID = emailSubmit.id;
            let value = $('#'+thisID).val();
            
            let sub = {
                "email": value,
                "name": "",
                "type": "newsletter",
            };
            console.log(sub);
            crud.post('emails', sub, (returned) => {
                console.log(returned);
                if(returned) {
                    emailSubmit.type = 'div';
                    emailSubmit.text = 'Thank You!';
                    emailSubmit.refresh();
                    submitBtn.type = 'div';
                    submitBtn.text = '';
                    submitBtn.css({
                        "visible": "false",
                    });
                    submitBtn.refresh();
                }
            });
        });
        row1.addChild(emailSubmit);
        row1.addChild(submitBtn);

        container.addChild(row0);
        container.addChild(row1);

        return container;
    }
    banner () {
        let container = $jConstruct('div').css({
            "width": "100%",
            "height": "350px",
            "background-image": 'url("images/sabershoresbanner.jpg")',
            "background-size": 'cover',
            "background-position": 'center center',
        });
        return container;
    }
    generate () {
        let container = $jConstruct('div').css({
            "font-size": "24px",
            "font-family": 'Alfios',
            "src": "url('resource/alfios.otf')",
            "text-shadow": "1px 1px 1px gray",
        });
        container.addChild(this.banner());
        container.addChild(this.textbody());
        container.addChild(this.otherStores());
        container.addChild(this.emailSub());
        return container;
    }
}