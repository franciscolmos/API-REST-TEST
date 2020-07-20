let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app")

const apiMethods = require('../src/controllers/genres')

//Assertion Style
chai.should()

chai.use(chaiHttp)

describe('Genres API', () => {

    //TEST GET ROUTE
    describe('GET /genres', () => {
        it('it should GET all the genres', (done) => {
            chai.request(server)
                .get('/genres')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.should.be.an('object')
                    //response.body.length.should.be.eq(16)
                    done()
                })
        })

        it('it should NOT GET all the genres', (done) => {
            chai.request(server)
                .get('/genre')
                .end((err, response) => {
                    response.should.have.status(404)
                    done()
                })
        })
    })

    //TEST GET/:ID ROUTE
    describe('GET /genres/:id', () => {
        it('it should GET a genre by id', (done) => {
            const genreId = 1
            chai.request(server)
                .get('/genres/' + genreId)
                .end((err, response) => {
                    response.should.have.status(200),
                    response.body.should.be.an('object')
                    response.body.should.have.property('id').eq(1)
                    response.body.should.have.property('name').eq('Nueva Comedia')
                    response.body.should.have.property('ranking')
                    response.body.should.have.property('active')
                    response.body.should.have.property('createdAt')
                    response.body.should.have.property('updatedAt')     
                    done()
                })
        })

        it('it should GET a genre by id', (done) => {
            const genreId = 2
            chai.request(server)
                .get('/genres/' + genreId)
                .end((err, response) => {
                    response.should.have.status(200),
                    response.body.should.be.an('object')
                    response.body.should.have.property('id').eq(2)
                    response.body.should.have.property('name').eq('Terror')
                    response.body.should.have.property('ranking')
                    response.body.should.have.property('active')
                    response.body.should.have.property('createdAt')
                    response.body.should.have.property('updatedAt')
                    done()
                })
        })

        it('it should NOT GET any genre', (done) => {
            chai.request(server)
                .get('/genres/999')
                .end((err, response) => {
                    response.should.have.status(404)
                    response.text.should.be.eq('No se encontró un genero')
                    done()
                })
        })
    })

    //TEST POST ROUTE
    describe('POST /genres', () => {

        it('it should POST a new genre', (done) => {
            const genre = {
                name: "New Genre",
                ranking: 101,
                active: 1
            }
            chai.request(server)
                .post('/genres')
                .send(genre)
                .end((err, response) => {
                    response.should.have.status('200')
                    //response.body.should.have.property('id').eq(24)
                    response.body.should.have.property('name').eq("New Genre")
                    response.body.should.have.property('ranking').eq(101)
                    response.body.should.have.property('active').eq(1)
                done()
                })
        })

        it('it should NOT POST a new genre, because the ranking`s value already exists', (done) => {
            const genre = {
                ranking: 25,
                active: 1
            }
            chai.request(server)
                .post('/genres')
                .send(genre)
                .end((err, response) => {
                    response.should.have.status('500')
                    response.body.should.be.an('object').have.property('error')
                done()
                })

        })
    })

    //TEST PUT ROUTE
    describe('PUT /genres/:id', () => {
        it('it should PUT an existing genre by id', (done) => {
            const genreId = 1
            const genreUpdated =  {
                name: 'Nueva Comedia'
            }
            chai.request(server)
                .put('/genres/' + genreId)
                .send(genreUpdated)
                .end((err, response) => {
                    response.should.have.status(200),
                    response.body.should.be.an('object')
                    response.body.should.have.property('id').eq(1)
                    response.body.should.have.property('name').eq('Nueva Comedia')    
                    done()
                })
        })

        it('it should NOT PUT an existing genre by id, because the ranking already exists', (done) => {
            const genreId = 1
            const genreUpdated =  {
                ranking: 2
            }
            chai.request(server)
                .put('/genres/' + genreId)
                .send(genreUpdated)
                .end((err, response) => {
                    response.should.have.status(500),
                    response.body.should.be.an('object')
                    response.body.should.be.an('object').have.property('error')  
                    done()
                })
        })
    })

    //TEST DELETE ROUTE
    describe('DELETE /genres/:id', () => {
        it('it should DELETE an existing genre by id', (done) => {
            const genreId = 19
            chai.request(server)
                .delete('/genres/' + genreId)
                .end((err, response) => {
                    response.should.have.status(200)
                    done()
                })
        })

        it('it should NOT DELETE an existing genre by id, because the id doesnt exists', (done) => {
            const genreId = 999
            chai.request(server)
                .delete('/genres/' + genreId)
                .end((err, response) => {
                    response.should.have.status(404)
                    response.body.should.have.property('error')
                    done()
                })
        })
    })

})