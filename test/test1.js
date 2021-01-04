const supertest = require("supertest");
const expect = require("chai").expect;
const Server = require("../dist/backend/server");
const server = Server.server;


describe("GET /", function() {
  it("it should has status code 200", function(done) {
    supertest(server.app)
      .get("/")
      .expect(200)
      .end(function(err, res){
            if (err) done(err)

            expect(res.status).to.eql(200);

        done();
      });
  });
});