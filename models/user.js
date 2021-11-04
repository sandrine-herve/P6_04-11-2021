const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');//plugin pour indiquer a la DB que ce champ doit etre unique.

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);