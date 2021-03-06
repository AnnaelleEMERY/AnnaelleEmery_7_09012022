const models = require('../models/index.js');
const jwt = require('jsonwebtoken');

exports.deleteComment = (req, res, next) => {
    models.comments.findOne({
        where: { id: req.params.id }
    })
    models.comments.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
        .catch(error => res.status(400).json({ error }));

};

exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    const comment = {
        userId: userId,
        postId: req.body.postId,
        comment: req.body.comment
    };
    models.comments.create(comment)
        .then(() => res.status(201).json({ message: "commentaire crée!" }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    models.comments.findAll({
        include: {
            model: models.posts,
            model: models.users
        },
        where: { postId: req.params.postId }
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json(error))
};

