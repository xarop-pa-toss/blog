export function randomFloatFromInterval(min: number, max: number) {
    const minUnit = Math.ceil(min * 10);
    const maxUnit = Math.floor(max * 10);
    const rand = Math.floor(Math.random() * (maxUnit - minUnit + 1)) + minUnit;

    return rand / 10;
}