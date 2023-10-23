import { Async } from "./async";

describe("Async promises", () => {
  let asyncExample: Async;
  const email = "test@test.test";

  beforeEach(() => {
    asyncExample = new Async();
  });

  // 1. approach -> done function
  // return the promise assertion -> this guarantees that Jasmine wait for the promise to be resolved
  it("should generate a token value", () => {
    const tokenPromise = asyncExample.generateJwtTokenPromise(email);

    return tokenPromise.then((token) => {
      expect(token).toBeDefined();
    });
  });

  // 2. approach -> (done) function
  // done() -> this guarantees that Jasmine wait for the promise to be resolved
  it("should generate a token value", (done) => {
    const tokenPromise = asyncExample.generateJwtTokenPromise(email);

    tokenPromise.then((token) => {
      expect(token).toBeDefined();
      done();
    });
  });

  // 3. approach -> async/await
  // return is not needed -> function annotated with async returns a promise implicitly
  it("should generate a token value", async () => {
    const tokenPromise = await asyncExample.generateJwtTokenPromise(email);

    expect(tokenPromise).toBeDefined();
    // expect(token).toBe(2);
  });
});
