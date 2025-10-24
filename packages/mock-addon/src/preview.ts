import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';

import { withRoundTrip } from './withRoundTrip';

/**
 * Note: if you want to use JSX in this file, rename it to `preview.tsx`
 * and update the entry prop in tsup.config.ts to use "src/preview.tsx",
 */

const preview: ProjectAnnotations<Renderer> = {
    decorators: [withRoundTrip],
};

export default preview;
