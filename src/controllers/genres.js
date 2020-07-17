const path = require('path')
const modelsRoute = path.join(__basedir, 'db', 'models');

const models = require(modelsRoute);

const listAll = async (req, res) => {
    try {
        const genres = await models.Genre.findAll();
        return res.json(genres);
    } catch (error) {
        return res.status(500).json({ok: false, error})
    }
}

const listOne = async (req, res) => {
    try {
        const genre = await models.Genre.findByPk(req.params.id);
        if(!genre) {
            return res.status(404).json({ok: false, msg: 'No se encontró un genero'});
        }
        return res.json(genre);
    } catch (error) {
        return res.status(500).json({ok: false, error})
    }
}

const create = async (req, res) => {
    try {
        const datosPeticion = req.body;
        console.log(datosPeticion);
        const createdGenre = await models.Genre.create(req.body);
        return res.json(createdGenre)
    } catch (error) {
        if(error.name == 'SequelizeUniqueConstraintError') {
            return res.status(500).json({ok: false, error: 'Ya existe un registro con ese ranking'})
        }
        return res.status(500).json({ok: false, error})
    }
}

const deleteOne = async (req, res) => {
    try {
        const genreToDelete = await models.Genre.findByPk(req.params.id);
        if(!genreToDelete) {
            return res.status(404).json({ok: false, msg: 'No se encontró un genero'});
        }
        await genreToDelete.destroy();
        return res.json({ok: true, msg: 'Se eliminó correctmente el género ' + genreToDelete.name});
    } catch (error) {
        return res.status(500).json({ok: false, error})
    }
}

const updateOne = async (req, res) => {
    try {
        const genreToUpdate = await models.Genre.findByPk(req.params.id);
        if(!genreToUpdate) {
            return res.status(404).json({ok: false, msg: 'No se encontró un genero'});
        }
        await genreToUpdate.update(req.body);
        return res.json(genreToUpdate);
    } catch (error) {
        return res.status(500).json({ok: false, error})
    }
}


module.exports = {
    listAll,
    listOne,
    create,
    deleteOne,
    updateOne
}