import React from 'react';
import { PlayButton } from '../../../src/components/PlayButton';
import {
    userGuideStyles,
    headerStyles,
    guideItem,
    buttonWrapperStyles,
} from './styles';

export const UserGuide = () => (
    <p style={userGuideStyles}>
        <h2 style={headerStyles}>User Guide</h2>
        <ul>
            <li style={guideItem}>
                Use the{' '}
                <div style={buttonWrapperStyles}>
                    <PlayButton play small />
                </div>{' '}
                button in the panel to stop the mock response and try the real
                API.
            </li>
            <li style={guideItem}>
                Change the status to any error status code (e.g: 404, 503) to
                experience the error message.
            </li>
            <li style={guideItem}>
                Change the delay with numbers in milliseconds (e.g: 1000) to
                experience the loading state.
            </li>
            <li style={guideItem}>
                Change the response with invalid JSON format to experience the
                validity of the response.
            </li>
        </ul>
    </p>
);
