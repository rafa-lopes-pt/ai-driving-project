//Types
export type Coordinate2DType = { x: number; y: number };
export type SegmentType = [Coordinate2DType, Coordinate2DType];
export type IntersectionType = Coordinate2DType & { offset: number };
/**
 * Linear Interpolation
 * @returns a number between A and B, depending on t
 */
export function lerp(A: number, B: number, t: number) {
    return A + (B - A) * t;
}
export function getIntersection(
    A: Coordinate2DType,
    B: Coordinate2DType,
    C: Coordinate2DType,
    D: Coordinate2DType
): IntersectionType | undefined {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t,
            };
        }
    }

    return undefined;
}
/**
 * Polygon Intersection
 * @returns @true or @false wether the 2 polygons intersect or not
 */
export function isPolysIntersection(
    poly1: Coordinate2DType[],
    poly2: Coordinate2DType[]
) {
    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            const touch = getIntersection(
                poly1[i],
                poly1[(i + 1) % poly1.length],
                poly2[j],
                poly2[(j + 1) % poly2.length]
            );
            if (touch) {
                return true;
            }
        }
    }
    return false;
}
export function getRGBA(value: number) {
    const alpha = Math.abs(value);
    const R = value < 0 ? 0 : 255;
    const G = R;
    const B = value > 0 ? 0 : 255;
    return "rgba(" + R + "," + G + "," + B + "," + alpha + ")";
}
export function getRandomColor() {
    const hue = 290 + Math.random() * 260;
    return "hsl(" + hue + ", 100%, 60%)";
}
