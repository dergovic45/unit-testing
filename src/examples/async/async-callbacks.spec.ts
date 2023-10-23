import { Async } from "./async";

describe("Async callbacks", () => {
  let exampleClass: Async;
  const email = "test@test.test";

  beforeEach(() => {
    exampleClass = new Async();
  });

  // invalid example -> doesn't wait for code to finish
  it("should generate a token value", () => {
    exampleClass.generateJwtToken(email, (error, token) => {
      expect(token).toBeDefined();
      // expect(token).toBe(2);
    });
  });

  // valid example -> wait until done() is called and then it will recognize that callback function call is executed and then it will execute the code inside (expect, done)
  it("should generate a token value", (done) => {
    exampleClass.generateJwtToken(email, (error, token) => {
      expect(token).toBeDefined();
      // expect(token).toBe(2);
      done();
    });
  });

  // valid example -> toBe(2); will return an error --> helpful output
  it("should generate a token value", (done) => {
    exampleClass.generateJwtToken(email, (error, token) => {
      expect(token).toBeDefined();
      done();

      // try {
      //   expect(token).toBe(2);
      //   done();
      // } catch (error) {
      //   done(error);
      // }
    });
  });
});
