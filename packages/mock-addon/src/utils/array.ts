export function arrayEquals(a: unknown[], b: unknown[]): boolean {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
        return false;
    }

    const sortedA = a.slice().sort();
    const sortedB = b.slice().sort();

    return !sortedA.some((val, index) => val !== sortedB[index]);
}
