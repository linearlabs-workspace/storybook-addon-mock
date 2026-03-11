import { Request } from './request';

const mockURL = 'http://storybook-addon-mock.com';

describe('Request', () => {
    it('should support an abort signal', () => {
        const controller = new AbortController();
        const request = new Request(mockURL, { signal: controller.signal });

        controller.abort();

        expect(request.signal.aborted).toBe(true);
    });

    it('should support an abort signal listener', (done) => {
        const controller = new AbortController();
        const request = new Request(mockURL, { signal: controller.signal });

        request.signal.addEventListener('abort', () => {
            expect(request.signal.aborted).toBe(true);
            done();
        });

        expect(request.signal.aborted).toBe(false);

        controller.abort();
    });
});
