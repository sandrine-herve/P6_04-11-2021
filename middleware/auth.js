const jwt = require('jsonwebtoken');// création et vérification des tokens d'authentification.

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];//split => récupération des éléments apres l'espace dans l'en-tête d'authentification.
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');// verify => décodage du token.
    const userId = decodedToken.userId;//extraction de l'userId.
    if (req.body.userId && req.body.userId !== userId) {//comparaison des ids.
      throw 'Invalid user ID';//erreur
    } else {
      next();//sinon passe au suivant.
    }
  } catch (error) {
    res.status(403).json({ error: error | 'Unauthorized request!'});
  }
};