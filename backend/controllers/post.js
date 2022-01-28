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
            const filename = post.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                models.posts.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'post supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    if (req.file) {
        models.posts.findOne({
            where: { id: req.params.id }
        })
            .then(post => {
                const filename = post.image.split('/images/')[1];
                fs.unlink('images/' + filename, () => { });
            })
            .catch(error => console.log('Echec de la suppression de l\'ancienne image'));
    }

    models.posts.update({
        content: req.body.contentEdited,
        title: req.body.titleEdited,
        image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
    })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
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




