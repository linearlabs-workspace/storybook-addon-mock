import React from 'react';

export const GlobalStyles = () => (
    <style>
        {`
        .storybook-addon-mock-fieldItem > div > div > svg > path {
            opacity: 0;
        }
        .storybook-addon-mock-fieldItem > div > div > div > span > div > div > svg > path {
            opacity: 0;
        }
    `}
    </style>
);
