export function getPageCount(limit: number, count: number) {
    return Math.ceil(count / limit)
}