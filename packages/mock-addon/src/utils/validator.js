import statusTextMap from '../utils/statusMap';

const methods = ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'];
const statusCodes = Object.keys(statusTextMap);

const isObject = (value) =>
    value && !Array.isArray(value) && typeof value === 'object';

export const schema = {
    url: (value) => {
        return typeof value === 'string';
    },
    method: (value) => {
        return (
            typeof value === 'string' &&
            methods.find(
                (method) => method.toLowerCase() === value.toLowerCase()
            )
        );
    },
    status: (value) => {
        return value && statusCodes.indexOf(value.toString()) >= 0;
    },
    response: (value) => {
        return (
            (isObject(value) ||
                Array.isArray(value) ||
                value === 'string' ||
                typeof value === 'function') &&
            value !== null
        );
    },
    delay: (value) => {
        return value ? typeof value === 'number' : true;
    },
};

export function validate(object, schema) {
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
