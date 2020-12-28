const supertest = require("supertest");
const expect = require("chai").expect;
const ServerHolder = require("../dist/backend/server");
const server = new ServerHolder.Server({ port: 3001 });
const global = require("./global");

let newDocumentId = 0;

describe("POST /document", function () {

  it("it should has status code 400", function(done) {
    supertest(server.app)
      .post("/api/document")
      .send()
      .expect(400)
      .end(function(err, res){
        if (err) done(err)
        done();
      });
    
  });
  
  it("it should has status code 200", function(done) {
    supertest(server.app)
      .post("/api/document")
      .send({markdown: 'test'})
      .expect(200)
      .end(function(err, res){
        if (err) done(err)

        expect(res.status).to.eql(200);
        expect(res.body).has.property("id");
        expect(res.body).has.property("markdown");
        expect(res.body.markdown).to.equal("test");
        
        done();
        
      });
    
  });

});


describe("PUT /document", function () {

  it("it should has status code 400", function(done) {
    supertest(server.app)
      .put("/api/document/1000")
      .send()
      .expect(400)
      .end(function(err, res){
        if (err) done(err)
        done();
      });
    
  });
  
  it("it should has status code 200", function(done) {
    supertest(server.app)
      .put(`/api/document/${global.documentIdToDelete}`)
      .send({markdown: 'test'})
      .expect(200)
      .end(function(err, res){
        if (err) done(err)

        expect(res.status).to.eql(200);
        expect(res.body).has.property("id");
        expect(res.body).has.property("markdown");
        expect(res.body.markdown).to.equal("test");
        
        done();
        
      });
    
  });

});

describe("Delete /document", function () {

  it("it should has status code 400", function(done) {
    supertest(server.app)
      .delete(`/api/document/1000`)
      .send()
      .expect(400)
      .end(function(err, res){
        if (err) done(err)
        done();
      });
    
  });
  
  it("it should has status code 200", function(done) {
    supertest(server.app)
      .delete(`/api/document/${global.documentIdToDelete}`)
      .expect(200)
      .end(function(err, res){
        if (err) done(err)

        expect(res.status).to.eql(200);
        
        done();
        
      });
    
  });

});


describe("GET /document", function() {
  it("it should has status code 200", function(done) {
    supertest(server.app)
      .get("/api/document")
      .expect(200)
      .end(function(err, res){
        if (err) done(err)

        expect(res.status).to.eql(200);
        expect(res.body).to.be.an("array");
        
        done();

      });
  });
});