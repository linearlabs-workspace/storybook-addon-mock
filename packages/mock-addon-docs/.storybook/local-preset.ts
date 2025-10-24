import { fileURLToPath } from 'node:url';

export function previewAnnotations(entry = []) {
    return [
        ...entry,
        fileURLToPath(import.meta.resolve('../../mock-addon/dist/preview.js')),
    ];
}

export function managerEntries(entry = []) {
    return [
        ...entry,
        fileURLToPath(import.meta.resolve('../../mock-addon/dist/manager.js')),
    ];
}

export * from '../../mock-addon/dist/preset.js';
