const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8) //8 caractères minimum.                                   
.is().max(16) //16 caractères maximum.                               
.has().uppercase() //doit contenir au moins 1 majuscule.                            
.has().lowercase() //doit contenir au moins 1 minuscule.                            
.has().digits()  //doit contenir au moins un chiffre.                               
.has().not().spaces(); //ne doit pas contenir d'espace.                         

module.exports = passwordSchema;