const Sauce = require('../models/sauce');
const fs = require('fs'); //module fournit de nombreuses fonctionnalités très utiles pour accéder et interagir avec le système de fichiers.


//Creer une sauce.
exports.createSauce = (req, res, next) => {
    //Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data, et non sous forme de JSON.
    const sauceObject = JSON.parse(req.body.sauce);// analyse de l'objet pour obtenir un objet utilisable.
    delete sauceObject._id;// suppression de l'id de la sauce.
    const sauce = new Sauce({
       ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,// req.protocol(http); req.get('host')=localhost:3000; req.file.filename=nom du fichier.
    });// ceci envoie une requête get vers http://localhost:3000/images/<image-name>.jpg, le chemin statique va répondre a cette requête.

    console.log(sauce);

    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({error}));
};

//Obtenir une sauce.
exports.getSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
  .then((sauce) => {res.status(200).json(sauce);})
  .catch((error) => {res.status(404).json({error: error});});
};


//Modifier une sauce.
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

//Supprimer une sauce.
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id})
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};


//Obtenir toutes les sauces.
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};


//Like Dislike une sauce.
exports.likeDislike = (req, res, next) =>{

// si l'user aime la sauce.
if ( req.body.like === 1 ){
	console.log(req.params.id );  
   Sauce.findOneAndUpdate(
   	{ _id: req.params.id },
   	{
   	 $inc : { likes : 1 },
   	 $push : { usersLiked : req.body.userId },
    }
    )
   .then(() => res.status(200).json({ message: ' Votre like a été rajouté'}))
    .catch(error => res.status(400).json({ error }));
    
  console.log(req.body);
//si l'user n'aime pas la sauce.
} else if( req.body.like === -1) {
	console.log(req.params.id );  
   Sauce.findOneAndUpdate(
   	{ _id: req.params.id },
   	{
   	 $inc : { dislikes : 1 },
   	 $push : { usersDisliked : req.body.userId },
    }
    )
   .then(() => res.status(200).json({ message: ' Votre dislike a été rajouté'}))
    .catch(error => res.status(400).json({ error }));
    
  console.log(req.body);  
//si l'user annule son vote.
}  else {
        Sauce.findOne({_id: req.params.id})
        .then(result => {
            console.log(result)
            if(result.usersLiked.includes(req.body.userId)) {
                console.log(result)
                Sauce.updateOne(
                    {
                        $inc: {likes: -1}, 
                        $pull: {usersLiked: req.body.userId}
                    })
                    .then(() => res.status(200).json({message: 'Like supprimé'}))
                    .catch(error => res.status(400).json({error})
                )
            }
            else if(result.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne(
                    {
                        $inc: {Dislikes: -1}, 
                        $pull: {usersDisliked: req.body.userId}
                    })
                    .then(() => res.status(200).json({message: 'Dislike supprimé'}))
                    .catch(error => res.status(400).json({error})
                )
            }
        })
    }
 };



