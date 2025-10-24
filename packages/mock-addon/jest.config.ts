import type { Config } from 'jest';

export default {
    extensionsToTreatAsEsm: ['.ts', '.jsx', '.tsx'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    },
} satisfies Config;
