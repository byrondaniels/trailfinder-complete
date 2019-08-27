import { calcAvgValues } from "../../src/utils/calcAvgValues"

describe("Testing func calcAvgValues", () => {

    const mockArray = [
        { a: 1, b: 2, c: 3 },
        { a: 2, b: 4, c: 1 },
        { a: 3, b: 2, c: 3 },
        { a: 1, b: 6, c: 3 }]

    const mockArray2 = [
        { a: 1, b: 2, c: 3 },
        { a: 2, b: 0, c: 1 },
        { a: 3, b: 0, c: 3 },
        { a: 30, b: 0, c: 3 }]

    describe("Testing a", () => {

        test("Trial 1", () => {
            const expected = 2;
            expect(calcAvgValues(mockArray, "a")).toEqual(expected);
        });

        test("Trial 2", () => {
            const expected = 9;
            expect(calcAvgValues(mockArray2, "a")).toEqual(expected);
        });

    });

    describe("Testing b", () => {

        test("Trial 1", () => {
            const expected = 4;
            expect(calcAvgValues(mockArray, "b")).toEqual(expected);
        });

        test("Trial 2", () => {
            const expected = 1;
            expect(calcAvgValues(mockArray2, "b")).toEqual(expected);
        });

    });

});