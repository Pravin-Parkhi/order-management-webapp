export const getUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Makes deep copy of object and an array
// Works only for JSON serializable content
export function deepCopy (data) {
    if (data) {
        return JSON.parse(JSON.stringify(data))
    }
}