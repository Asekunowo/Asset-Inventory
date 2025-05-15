import { fizzBuzz } from "@/utils/functions";
import { describe, it, expect } from "vitest";

describe("Fizz Buzz", () => {
  it("should return FizzBuzz if arg is divisible by 3 & 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return Fizz if arg is divisble by 3 only", () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });

  it("should return Buzz if arg is divisible by 5 only", () => {
    expect(fizzBuzz(10)).toBe("Buzz");
  });

  it("should return arg as string if arg is not divisble by 3 or 5", () => {
    expect(fizzBuzz(11)).toBe("11");
  });
});
