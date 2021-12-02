const { Dog, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should work when its a valid name", () => {
        Dog.create({ name: "Pug" });
      });

      describe("max_height", () => {
        it("should throw an error if max_height is null", (done) => {
          Dog.create({})
            .then(() => done(new Error("It requires a valid max_height")))
            .catch(() => done());
        });

        it("should work when its a valid max_height", () => {
          Dog.create({ max_height: "10" });
        });
      });
    });
  });
});
