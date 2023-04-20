export const getBaseUrl = (rawUrl = '') => {
    return new URL(rawUrl, location.href);
};

export const getNormalizedUrl = (rawUrl = '') => {
    const url = getBaseUrl(rawUrl);
    const searchParamKeys = [];
    if (url.search) {
        for (let key of url.searchParams.keys()) {
            searchParamKeys.push(key);
        }
    }
    return {
        path: url.host + url.pathname,
        searchParamKeys,
    };
};
