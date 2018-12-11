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
    textbody() {
        let msgCss = {
            "float": "none",
            "display": "block",
            "margin": "0 auto",
            "margin-top": "10px",
            "text-align": "center",
        }
        let msg1 = $jConstruct('div', {
            class: 'col-lg-8 col-sm-10 col-xs-12',
            text: `Thank you for visiting SaberShores!`
        }).css(msgCss);
        let msg2 = $jConstruct('div', {
            class: 'col-lg-8 col-sm-10 col-xs-12',
            text: `BinaryOne and SaberShores are teaming up to bring you something HUGE!`,
        }).css(msgCss);
        let msg3 = $jConstruct('div', {
            class: 'col-lg-8 col-sm-10 col-xs-12',
            text: `We are forging a whole NEW platform with cutting edge products, bigger SALE discounts, and a variety of CRAFTERS!`,
        }).css(msgCss);
        let msg4 = $jConstruct('div', {
            class: 'col-lg-8 col-sm-10 col-xs-12',
            text: `Hold tight, HUGE changes are coming soon!`,
        }).css(msgCss);
        let msg5 = $jConstruct('div', {
            class: 'col-lg-8 col-sm-10 col-xs-12',
            text: `Please join our newsletter below for updates 
            on our extensive new stock, discounts you can use at 
            our Grand Opening, and much more!`,
        }).css(msgCss);

        let message = $jConstruct('div');
        message.addChild(msg1).addChild(msg2).addChild(msg3).addChild(msg4).addChild(msg5);

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
    verifyEmail(strEmail) {
        if (strEmail.indexOf('@') > -1 && strEmail.indexOf('.com') > -1) {
            return true;
        }
        return false;
    }
    emailSub() {
        let container = $jConstruct('div', {
            class: 'col-lg-12',
        }).css({
            "float": "none",
            "display": "block",
            "margin": "0 auto",
            "margin-top": "50px",
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
        /*let message = $jConstruct('div', {
            
            text: `Please join our Newsletter!`,
        }).css({
            //nothing
        });
        row0.addChild(message);*/

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
            $("#" + thisID).select();
        });
        let submitBtn = $jConstruct('button', {
            text: `submit`,
            class: 'btn btn-primary',
        }).css({
            "float": "none",
        }).event('click', () => {
            console.log(emailSubmit.id);
            const thisID = emailSubmit.id;
            let value = $('#' + thisID).val();
            if (this.verifyEmail(value)) {

                require(["scripts/backend/crud.js"], () => {
                    //login as saberShoresLanding
                    authenticate({
                        usrName: "saberShoresLanding",
                        password: ""
                    }).fail((err) => {
                        alert(err);
                        console.log(err);
                    }).done((result) => {
                        //get token
                        console.log(result);

                        let sub = { //get newsletter email...
                            "email": value,
                            "name": "",
                            "type": "newsletter",
                        };
                        console.log(sub);
                        crud.post('emails', sub, (returned) => {
                            console.log(returned);

                            require(["scripts/store.legacy.min.js"], (store) => {
                                store.clearAll(); //make sure the cookie is cleared...

                                if (returned) {
                                    alert("Thank you!");
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
                    });

                });
            }
        });
        row1.addChild(emailSubmit);
        row1.addChild(submitBtn);

        container.addChild(row0);
        container.addChild(row1);

        return container;
    }
    banner() {
        let row0 = $jConstruct('div', {
            class: "row",
        }).css({
            "float": "none",
            "display": "block",
            "margin": "0 auto",
        });
        let banner = $jConstruct('img', {
            class: "col-lg-10 col-sm-12",
            src: "images/sabershoresbanner.jpg",
        }).css({
            "float": "none",
            "display": "block",
            "margin": "0 auto",
        });
        row0.addChild(banner);
        return row0;
    }
    generate() {
        let container = $jConstruct('div').css({
            "font-size": "24px",
            "font-family": 'Alfios',
            "src": "url('resource/alfios.otf')",
            "text-shadow": "1px 1px 1px gray",
        });
        container.addChild(this.banner());
        container.addChild(this.textbody());
        container.addChild(this.emailSub());
        container.addChild(this.otherStores());
        return container;
    }
}