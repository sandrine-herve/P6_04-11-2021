const MaskData = require('./maskdata');

const maskPassword = {
	maskWith: "*",
	maxMaskedCharacters: 100,
	unmaskedStartCharacters: 0,
	unmaskedEndCharacters : 0
};

const password = require('./middleware/password');

const maskedPassword = MaskData.maskPassword(password);