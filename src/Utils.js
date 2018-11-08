export const Position = {
    DEFAULT: 0,
    ONLY: 1,
    FIRST: 2,
    MIDDLE: 3,
    LAST: 4
}

export function getPosition(numberOfItems, itemOrder) {
    const isFirst = itemOrder === 0;
    const isLast = itemOrder > 0 && itemOrder === numberOfItems - 1; 
    if (isLast) {
        return Position.LAST;
    } else if (isFirst && numberOfItems === 1) {
        return Position.ONLY;
    } else if (isFirst && numberOfItems > 1) {
        return Position.FIRST;
    } else {
        return Position.MIDDLE;
    }
}
