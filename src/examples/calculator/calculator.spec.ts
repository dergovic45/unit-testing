import { Calculator } from "./calculator";

describe("Calculator", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  })

  it("should add two numbers", () => {
    const result = calculator.calculate("5+5");

    expect(result).toEqual(10);
  });

  it("should subtract two numbers", () => {
    const result = calculator.calculate("5-5");

    expect(result).toEqual(0);
  });

  it("should multiply two numbers", () => {
    const result = calculator.calculate("5*5");

    expect(result).toEqual(25);
  });

  it("should divide two numbers", () => {
    const result = calculator.calculate("5/5");

    expect(result).toEqual(1);
  });

  // Error handling -> won't work because this will throw normal error
  // it("should handle division by 0", () => {
  //   const inputValue = "5/0";
  //
  //   const result = calculator.calculate(inputValue);
  //
  //   expect(result).toThrow();
  // });

  it("should handle division by 0", () => {
    const resultFn = () => {
      calculator.calculate("5/0");
    };

    expect(resultFn).toThrow();
    expect(resultFn).toThrow(new Error("Cannot divide by zero!"));
    expect(resultFn).toThrowError(Error);
    expect(resultFn).toThrowError("Cannot divide by zero!");
  });

  //TODO write test for "Expression not recognized!"

  it("should handle invalid expressions", () => {
    const resultFn = () => {
      calculator.calculate("test");
    };

    expect(resultFn).toThrow();
    expect(resultFn).toThrow(new Error("Expression not recognized!"));
    expect(resultFn).toThrowError(Error);
    expect(resultFn).toThrowError("Expression not recognized!");
  });

  //TODO write test for "Operation not recognized" -> add "&" to expression

  // it("should handle invalid operations", () => {
  //   const calculator = new Calculator();
  //
  //   const resultFn = () => {
  //     calculator.calculate("5&5");
  //   };
  //
  //   expect(resultFn).toThrow();
  //   expect(resultFn).toThrow(new Error("Operation not recognized!"));
  //   expect(resultFn).toThrowError(Error);
  //   expect(resultFn).toThrowError("Operation not recognized!");
  // });
});
