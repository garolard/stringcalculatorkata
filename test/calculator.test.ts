/// <reference path="../source/interfaces/interfaces.d.ts" />

import { expect } from "chai";
import Calculator from "../source/entities/calculator";

const calc: IStringCalculator = new Calculator();

function testResult(expression: string, result: number): void {
    it(`shoud evaluate '${expression.replace(/\n/g, "\\n")}' to ${result}`, () => {
        expect(calc.add(expression)).equal(result);
    });
}

describe("Calculator", function() {

    describe("basic functionality", function() {
        testResult("", 0);

        testResult("42", 42);
    });

    describe("comma separator", function() {
        testResult("1,2", 3);

        testResult("1,2,3,4", 10);
    });

    describe("newline separator", function() {
        testResult("1\n2", 3);

        testResult("1\n2\n3\n4", 10);
    });

    describe("mixed separators", function() {
        testResult("1\n2,4", 7);

        testResult("42,3\n1\n4", 50);
    });

    describe("custom separator", function() {
        testResult("//;\n1;2", 3);

        testResult("//|\n1,2|3", 6);

        testResult("//|\n1|2|3|4", 10);
    });

    describe("negative number are not allowed", function() {
        let caught = null;

        before(function() {
            try {
                let c = new Calculator();
                c.add("-1,2,-3\n4,-5");
            } catch (ex) {
                caught = ex;
            }
        });

        it("should throw an exception", () => {
            expect(caught).not.equal(null);
        });

        it ("should include all negative numbers", () => {
            expect(caught).equal("error: -1, -3, -5");
        });
    });

    describe("numbers bigger than 1000 should be ignored", function() {
        testResult("2,1001", 2);
    });

    describe("custom delimiter can be of any length", () => {
        testResult("//[***]\n1***2***3", 6);

        testResult("//[&&]\n42&&3&&1&&4", 50);
    });
});
