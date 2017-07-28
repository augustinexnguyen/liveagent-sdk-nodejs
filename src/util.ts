export function getNullPropertyOf(obj: any): string {
    if (!obj && !(obj instanceof Object)) {
        return "";
    }

    for (let i in obj) {
        if (!obj[i]) {
            return i;
        }
    }
    return "";
}
