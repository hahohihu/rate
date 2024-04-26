export function clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
}

function interpolate(a: number, b: number, weight: number) {
    return a * weight + b * (1 - weight);
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
    const RED = 360;
    const GREEN = 120;
    let normalizedRating;
    let hue;
    if (rating > 0) {
        normalizedRating = rating / MAX_RATING;
        hue = GREEN;
    } else {
        normalizedRating = rating / -MAX_RATING;
        hue = RED;
    }
    let lightness = interpolate(50, 100, normalizedRating);
    return `hsl(${hue}, 90%, ${lightness}%)`;
}

export function formatDatePostgres(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
