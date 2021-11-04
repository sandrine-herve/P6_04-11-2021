const password = require('../models/password');

module.exports = (req, res, next) => {
	if (!password.validate(req.body.password)) {
		res.status(400).json({ message: 'Mot de passe faible doit contenir au moins 8 caractère, au moins 1 majuscule, au moins 1 minuscule, au moins 1 chiffre, au moins 1 caractère spécial. Les espaces ne sont pas autorisés.'})
	} else {
		next();
	}
};