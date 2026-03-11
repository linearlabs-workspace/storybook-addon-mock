import { arrayEquals } from './array';

describe('array', () => {
    describe('arrayEquals', () => {
        it('should match two arrays based on values, ignoring order', () => {
            const array1 = ['jeff', 'fred', 'cecily'];
            const array2 = ['fred', 'cecily', 'jeff'];

            const result = arrayEquals(array1, array2);

            expect(result).toBeTruthy();
        });

        it('should not mutate the original arrays', () => {
            const array1 = ['jeff', 'fred', 'cecily'];
            const array2 = ['fred', 'cecily', 'jeff'];

            const array1String = array1.toString();
            const array2String = array2.toString();

            arrayEquals(array1, array2);

            expect(array1.toString()).toBe(array1String);
            expect(array2.toString()).toBe(array2String);
        });
    });
});
