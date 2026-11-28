export function getSortedSet(set: Set<number>) {
    const array = Array.from(set);
    const sortedArray = array.toSorted((a, b) => a - b);
    return new Set(sortedArray);
}
