const rateLimit = require('express-rate-limit'); //middleware qui sert a limiter les demandes répétées.


const apilimiter = rateLimit ({
	windowMs : 60 * 60 * 1000, //1h
	max : 50,
	message: "Trop de comptes créés à partir de cette IP, veuillez réessayer après une heure"
});



module.exports=apilimiter;