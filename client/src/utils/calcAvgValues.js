export const calcAvgValues = (array, parameter) => {
    const totalLength = array.reduce((a, b) => { return a + b[parameter]; }, 0);
    return Math.round(totalLength / array.length)
}