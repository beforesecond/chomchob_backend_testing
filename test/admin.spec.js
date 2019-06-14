const chai = require('chai')
const chaiHttp = require('chai-http')
const { after, before, describe, it } = require('mocha')

const server = require('../build/main').default

chai.use(chaiHttp)
chai.should()

const mockAddCrypto = {
  name: 'zcoin',
  currency: 'zth',
  rate: 2000
}

const mockUpdateCrypto = {
  currency: 'zth',
  rate: 1500
}

const mockDeleteCrypto = {
  currency: 'zth'
}

describe('Testing Admin API', () => {
  before(done => {
    // Do something here before test
    done()
  })

  describe('GET /ADMIN Get total balance', () => {
    it('it should have message Success', done => {
      chai
        .request(server)
        .get('/admin/total')
        .end((e, res) => {
          res.should.have.status(200)
          res.body.should.have.property('message').eql('Success')
          done()
        })
    })
  })

  describe('POST /ADMIN Delete crypto', () => {
    it('it should have message Success with Delete', done => {
      chai
        .request(server)
        .delete('/admin/crypto')
        .send(mockDeleteCrypto)
        .end((e, res) => {
          res.should.have.status(200)
          res.body.should.have.property('message').eql('Success')
          done()
        })
    })
  })

  describe('POST /ADMIN Add crypto', () => {
    it('it should have message Success with Add', done => {
      chai
        .request(server)
        .post('/admin/crypto')
        .send(mockAddCrypto)
        .end((e, res) => {
          res.should.have.status(200)
          res.body.should.have.property('message').eql('Success')
          done()
        })
    })
  })

  describe('POST /ADMIN Update crypto', () => {
    it('it should have message Success with Update', done => {
      chai
        .request(server)
        .put('/admin/crypto')
        .send(mockUpdateCrypto)
        .end((e, res) => {
          res.should.have.status(200)
          res.body.should.have.property('message').eql('Success')
          done()
        })
    })
  })

  after(done => {
    // Do something here after test
    done()
  })
})
