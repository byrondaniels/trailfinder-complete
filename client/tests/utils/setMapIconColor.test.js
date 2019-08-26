import { setMapIconColor } from "../../src/utils/setMapIconColor"
import black_marker from "../../src/utils/media/black_icon.png"
import blue_marker from "../../src/utils/media/blue_icon.png"
import red_marker from "../../src/utils/media/red_icon.png"
import yellow_marker from "../../src/utils/media/yellow_icon.png"
import green_marker from "../../src/utils/media/green_icon.png"

describe("testing func setMapIconColor", () => {

    test("Trial 1", () => {
        const expected = blue_marker;
        const length = 1
        const returnValue = setMapIconColor(length)
        expect(returnValue.url).toEqual(expected);
    });

    test("Trial 2", () => {
        const expected = yellow_marker;
        const length = 11
        const returnValue = setMapIconColor(length)
        expect(returnValue.url).toEqual(expected);
    });

    test("Trial 3", () => {
        const expected = black_marker;
        const length = 111
        const returnValue = setMapIconColor(length)
        expect(returnValue.url).toEqual(expected);
    });

    test("Trial 4", () => {
        const expected = red_marker;
        const length = 50
        const returnValue = setMapIconColor(length)
        expect(returnValue.url).toEqual(expected);
    });

    test("Trial 5", () => {
        const expected = green_marker;
        const length = null
        const returnValue = setMapIconColor(length)
        expect(returnValue.url).toEqual(expected);
    });



});



