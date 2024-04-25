export function clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
}

function pickHex(color1: number[], color2: number[], weight: number) {
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgb;
}

export function ratingColor(rating: number) {
    const MAX_RATING = 2.5;
    rating = clamp(rating, -MAX_RATING, MAX_RATING);
    const WHITE = [120, 120, 120];
    const RED = [240, 0, 0];
    const GREEN = [0, 240, 0];
    let color;
    if (rating > 0) {
        color = pickHex(GREEN, WHITE, rating / MAX_RATING);
    } else {
        color = pickHex(RED, WHITE, rating / -MAX_RATING);
    }
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

export function formatDatePostgres(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
