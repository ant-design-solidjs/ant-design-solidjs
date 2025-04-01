export function unit(value: number | string): string {
    if (typeof value === "number") {
        return `${value}px`
    }
    if (value.endsWith("%")) {
        return value
    }
    return `${value}px`
}
