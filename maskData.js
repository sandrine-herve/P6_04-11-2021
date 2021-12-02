const MaskData = require('maskdata');
const mongoose = require('mongoose');
const emailMask2Options = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
};
const email = require('./models/user');

module.exports = MaskData(email, emailMask2Options);
