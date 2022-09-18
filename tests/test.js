const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

describe("People", () => {
  describe("post /api/v1/people", () => {
    it("should not create an entry without a name", (done) => {
      chai
        .request(app)
        .post("/api/v1/people")
        .send({age: 10})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({message: "Please enter a name"});
          done();
        });
    });

    it("should not create an entry without the age", (done) => {
      chai
        .request(app)
        .post("/api/v1/people")
        .send({name: "Chung"})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({
            message: "Please enter an age greater than 0",
          });
          done();
        });
    });

    it("should not create an entry if the age is lesser than 1", (done) => {
      chai
        .request(app)
        .post("/api/v1/people")
        .send({name: "Chung", age: 0})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({
            message: "Please enter an age greater than 0",
          });
          done();
        });
    });

    it("should give multiple error messages for validation errors", (done) => {
      chai
        .request(app)
        .post("/api/v1/people")
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({
            message: "Please enter a name; Please enter an age greater than 0",
          });
        });

      chai
        .request(app)
        .post("/api/v1/people")
        .send({age: 0})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({
            message: "Please enter a name; Please enter an age greater than 0",
          });
        });
      done();
    });

    it("should create an entry with valid input", (done) => {
      chai
        .request(app)
        .post("/api/v1/people")
        .send({name: "Chung", age: 61})
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.eql({message: "A person was added"});
        });
      done();
    });
  });

  describe("get /api/v1/people", () => {
    it("should return an array of person(s) or an empty array", (done) => {
      chai
        .request(app)
        .get("/api/v1/people")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("people").to.be.an("array");
        });
      done();
    });
  });

  describe("get /apl/v1/people/:id", () => {
    before((done) => {
      chai.request(app).post("/api/v1/people").send({name: "Chung", age: 61});
      done();
    });

    it("should return the entry corresponding to person[0]", (done) => {
      chai
        .request(app)
        .get("/api/v1/people/0")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql({person: {name: "Chung", age: 61}});
        });
      done();
    });

    it("should return an error if the index is >= the length of the array", (done) => {
      chai
        .request(app)
        .get("/api/v1/people/1")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.eql({message: "The person entry does not exist"});
        });
      done();
    });
  });
});
