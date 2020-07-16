const path = require('path')
const modelsRoute = path.join(__basedir, 'db', 'models');
const models = require(modelsRoute);

const listAll = async (req, res) => {
return res.send("hola")
}

module.exports = {
    listAll
}