import blue_marker from "./media/blue_icon.png"
import black_marker from "./media/black_icon.png"
// import brown_marker from "./media/brown_icon.png"
import red_marker from "./media/red_icon.png"
import yellow_marker from "./media/yellow_icon.png"
import green_marker from "./media/green_icon.png"

export function setMapIconColor(length) {
    const lengthKm = length * 1.609;
    if (lengthKm < 5) {
        const icon = {
            url: blue_marker,
        };
        return icon
    } else if (lengthKm < 20) {
        const icon = {
            url: yellow_marker,
        };
        return icon
    } else if (lengthKm < 50) {
        const icon = {
            url: red_marker,
        };
        return icon
    } else if (lengthKm > 50) {
        const icon = {
            url: black_marker
        };
        return icon
    } else {
        const icon = {
            url: green_marker
        };
        return icon
    }
}