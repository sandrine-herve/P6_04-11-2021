const express = require('express'); //appel du framework express.
const bodyParser = require('body-parser');//appel du middleware bodyParser, pour analyser les requêtes entrantes, disponible sous req.body.
const dotenv = require('dotenv');//Module qui charge des variables d'environnement de .env, ex: process.env.DB_CONNECT.
dotenv.config();
const mongoose = require('mongoose');//appel de l'outil mongoose pour utilisation de la base de donnée.
const path = require('path');
const helmet = require('helmet');//middleware de sécurité compatible avec express.
const cookieSession= require('cookie-session');//middleware de session stocke les donnees de session dans un cookie.
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const app = express();

//Mise en place de la base de donnée MongoDB.
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Mise en place des headers pour éviter les erreurs de CORS.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  next();
});


app.use(bodyParser.json());

app.use(helmet());

//Mise en place d'un cookie pour stoker les données de session.
app.set('trust proxy',1);
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 heures.
}));


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);





module.exports = app;