/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Pug",
  min_height: "10",
  max_height: "15",
  min_weight: "5",
  max_weight: "8",
  lifespan: "10",
  image:
    "https://cdn.pixabay.com/photo/2017/09/25/13/12/cocker-spaniel-2785074__480.jpg",
  temperament: "Aloof",
};

describe("Dog routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));

  describe("GET /dogs", () => {
    it("should be 200 on success", async () =>
      await agent.get("/api/dogs").expect(200));
    it("should be 404 if not found or typo exists", async () =>
      await agent.get("/ap/dgs").expect(404));
    it("should return Content type->JSON and the recently created dog", async () =>
      await agent
        .get("/api/dogs")
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => {
          res.body.forEach((d) => {
            expect(d).to.have.property("id");
            expect(d).to.have.property("name");
            expect(d).to.have.property("image");
          });
        }));
  });

  describe("GET /dogs?name", () => {
    it("Should be 200 and bring a dog by its query name", async () =>
      await agent
        .get("/api/dogs?name=akita")
        .expect(200)
        .then((res) => {
          expect(res.body[0]).to.deep.include({ name: "Akita" });
        }));
  });

  describe("GET /dogs/:id", () => {
    it("Should be 200 and bring a dog by its id", async () =>
      await agent
        .get("/api/dogs/101")
        .expect(200)
        .then((res) => {
          expect(res.body[0]).to.deep.include({ name: "English Setter" });
        }));
  });

  describe("POST /dogs", () => {
    it("Should be 200 un successful post", async () =>
      await agent.post("/api/dogs").send(dog).expect(200));
  });
});
