const fs = require('fs');
const post = require('../models/post');
const models = require('../models/index.js')
const jwt = require('jsonwebtoken');


exports.deletePost = (req, res, next) => {
    // nous utilisons l'ID que nous recevons comme paramètre pour accéder au post correspondant dans la base de données 

    models.posts.findOne({
        where: { id: req.params.id }
    })
        .then(post => {
            if (post.image != null) {
                const filename = post.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    models.posts.destroy({ where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'post supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            } else {
                models.posts.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'post supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    // On trouve le post à modifier
    models.posts.findOne({
        where: { id: req.params.id }
    })
        .then(post => {
            console.log(post.image);
            // Si le post comportait déjà une image
            if (post.image != null) {
                // On supprime l'ancienne
                const filename = post.image.split('/images/')[1];
                fs.unlink('images/' + filename, () => { });

                // On ajoute les modifications
                post.title = req.body.titleEdited;
                post.content = req.body.contentEdited;
                post.image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
                post.save()

            // Si le post ne comportait pas d'image à la base
            } else {
                // On ajoute les modifications
                post.title = req.body.titleEdited;
                post.content = req.body.contentEdited;
                post.image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
                post.save()
            }
        })
        .then(() => res.status(200).json({ message: "post modifié !!" }))
        .catch(error => console.log('Echec de la modification du post'));
}






exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    models.posts.create({
        userId: userId,
        content: req.body.content,
        title: req.body.title,
        image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
    })
        .then((post) => res.status(201).json({ post }))
        .catch((error) => res.status(500).json(error));
}


exports.findAllPostUser = (req, res, next) => {

    models.posts.findAll({
        order: [[
            'createdAt', 'DESC'
        ]],
        include: {
            model: models.users,
        },
        where: { userId: req.params.userId }
    })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(500).json(error));
};

exports.getAllPosts = (req, res, next) => {
    models.posts.findAll({
        order: [[
            'createdAt', 'DESC'
        ]],
        include: {
            model: models.users,
        }
    }).then(posts => {
        return res.status(200).json(posts);
    }).catch(error => {
        return res.status(500).json({

        });
    });
};




