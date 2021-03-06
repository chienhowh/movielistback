const express = require('express');
const Movie = require('../models/movie');
// 分流
const router = express.Router();

// 針對object schema 去操作
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find({})
        res.json(movies)
    } catch (err) {
        res.json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findOne({ id: req.params.id })
        res.json(movie)
    } catch (err) {
        res.json(err)
    }
})

router.post('/', async (req, res) => {
    const movie = new Movie({
        id: req.body.id,
        title: req.body.title
    });
    try {
        const saveMovie = await movie.save();//等儲存成功再動作
        res.json(saveMovie);
    } catch (err) {
        res.json(err)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const patchMovie = await Movie.updateOne({ id: req.params.id }, {
            $set: {
                beenWatched: req.body.beenWatched,
                comment:req.body.comment,
                watchedDate:req.body.watchedDate
            }
        })
        res.json(patchMovie);
    } catch (err) {
        res.json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deleteMovie = await Movie.deleteOne({ id: req.params.id })
        res.json(deleteMovie)
    } catch (err) {
        res.json(err)
    }
})
module.exports = router;