const Ranking = require('../models/Ranking');

exports.postCreateRanking = ((req, res, next) => {

    const newRanking = new Ranking({
        name: req.body.name,
        email: req.body.email,
        score: req.body.score
    });

    newRanking.save().then((ranking) => {
        if (ranking != null) {
            res.send('Ranking creado exitosamente')
        } else {
            res.status(400).send("No se pudo guardar correctamente")
        }
    }).catch((err) => res.status(500).send(`Error: ${err}`));
});

exports.getAllRankings = (req, res) => {
    Ranking.find({})
    .then(rankings => {
        if (rankings != null) {
            res.send(rankings)
        } else {
            res.status(404).send('No se encontraron rankings.');
        }
    })
    .catch(err => res.status(500).send('Ocurrio un error.'));
}