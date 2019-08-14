
const miles = 0.6242
export const initialFilterValues = [
    {
        "id": 1,
        "min": 0,
        "max": 5 * miles,
        "name": "0 -> 5",
        "color": "blue",
        "checked": true
    },
    {
        "id": 2,
        "min": 5 * miles,
        "max": 20 * miles,
        "name": "5 -> 20",
        "color": "olive",
        "checked": true
    },
    {
        "id": 3,
        "min": 20 * miles,
        "max": 50 * miles,
        "name": "20 -> 50",
        "color": "red",
        "checked": true
    },
    {
        "id": 4,
        "min": 50 * miles,
        "max": 1000 * miles,
        "name": "> 50",
        "color": "black",
        "checked": true
    }
]