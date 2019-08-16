import blue_marker from "./media/blue_icon.png"
import black_marker from "./media/black_icon.png"
import red_marker from "./media/red_icon.png"
import yellow_marker from "./media/yellow_icon.png"
import green_marker from "./media/green_icon.png"

export const setMapIconColor = (length) => {
    const lengthKm = length * 1.609;
    if (lengthKm < 5) {
        return { url: blue_marker };
    } else if (lengthKm < 20) {
        return { url: yellow_marker };
    } else if (lengthKm <= 50) {
        return { url: red_marker };
    } else if (lengthKm > 50) {
        return { url: black_marker };
    } else {
        return { url: green_marker };
    }
}