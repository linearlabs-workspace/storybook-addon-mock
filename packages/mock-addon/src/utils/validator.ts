import statusTextMap from '../utils/statusMap';

const methods = ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'];
const statusCodes = Object.keys(statusTextMap);

const isObject = (value: any): boolean =>
    value && !Array.isArray(value) && typeof value === 'object';

export const schema: Record<string, (value: any) => boolean> = {
    url: (value: any) => {
        return typeof value === 'string';
    },
    method: (value: any) => {
        return (
            typeof value === 'string' &&
            !!methods.find(
                (method) => method.toLowerCase() === value.toLowerCase()
            )
        );
    },
    status: (value: any) => {
        return value && statusCodes.indexOf(value.toString()) >= 0;
    },
    response: (value: any) => {
        return (
            (isObject(value) ||
                Array.isArray(value) ||
                typeof value === 'function') &&
            value !== null
        );
    },
    delay: (value: any) => {
        return value ? typeof value === 'number' : true;
    },
};

export function validate(object: any, schema: Record<string, (value: any) => boolean>): string[] {
    if (!isObject(object)) {
        return [`item: ${JSON.stringify(object)} is not a valid object.`];
    }
    const errors = Object.keys(schema)
        .filter(function (key) {
            return !schema[key](object[key]);
        })
        .map(function (key) {
            return key + `: ${JSON.stringify(object[key])} is not valid.`;
        });
    return errors;
}
