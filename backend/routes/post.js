const express = require('express');
const router = express.Router();

const postCtrl=require('../controllers/post');
//const pour le token
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

//requete get pour afin de renvoyer les posts dans la base de donnee
router.get('/', auth, postCtrl.getAllPosts);

//requete pour poster un nouvel objet avec multer pour les images
router.post('/post', auth, multer , postCtrl.createPost);

//requete pour ciblé et afficher un element grace a son id
router.get('/:userId', auth, postCtrl.findAllPostUser);

//requete pour modifier un objet existant
router.put('/:id', auth, multer, postCtrl.modifyPost );

//requete pour supprimer un objet existant
router.delete('/:id', auth, postCtrl.deletePost );


module.exports = router;