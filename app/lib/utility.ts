export function clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
}

export function pickHex(color1: number[], color2: number[], weight: number) {
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgb;
}
