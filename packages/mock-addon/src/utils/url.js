export const getBaseUrl = (rawUrl = '') => {
    const baseUrl =
        rawUrl.indexOf('http') == 0 ? undefined : 'http://localhost';
    const url = new URL(rawUrl, baseUrl);

    return url;
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
