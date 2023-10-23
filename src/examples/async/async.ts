import jwt from "jsonwebtoken";

// Async example
export class Async {
  readonly secret = "shhhhh";
  readonly jwt = jwt;

  generateJwtToken(
    email: string,
    doneFn: (error: Error | null, token?: string | undefined) => void,
  ): void {
    this.jwt.sign({ email: email }, this.secret, doneFn);
  }

  generateJwtTokenPromise(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.jwt.sign(
        { email: email },
        this.secret,
        (error: Error | null, token: string | Promise<string> | undefined) => {
          if (error) {
            reject(error);
          } else {
            resolve(token as Promise<string>);
          }
        },
      );
    });
  }
}
