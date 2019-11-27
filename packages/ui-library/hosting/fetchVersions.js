export const versionToNumber = version => {
    const numbers = version.replace("-SNAPSHOT", "").split(".").map(string => string * 1); // parseInt didn't work
    return (numbers[0] * 1000 * 1000) + (numbers[1] * 1000) + numbers[2];
}

export const sortVersions = versions => versions.slice().sort(
    (first, second) => ((versionToNumber(first) < versionToNumber(second)) ? 1 : -1)
);

export const filterVersions = versions => versions.filter((version, index, list) => (
    (index <= 0) || (list[index - 1].match(/^[^\.]*\.[^\.]*/)[0] !== version.match(/^[^\.]*\.[^\.]*/)[0])
));

export const parseVersions = versions => filterVersions(sortVersions(versions)).map((version) => {
    return ({
        value: version,
        label: version.replace("-SNAPSHOT", ""),
    });
});

export const fetchVersions = (onSuccess, onError = () => {}) => (versionPath) => {
    fetch(`${versionPath}versions.json?_=${new Date().getTime()}`)
        .then((resp) => {
            if (resp.status >= 400) {
                throw new Error("Could not get versions from server.");
            }
            return resp.json();
        })
        .then((versions) => parseVersions(versions))
        .then((parsedVersions) => {
            onSuccess(parsedVersions);
        })
        .catch((error) => {
            onError(error);
            console.error(error);
        })
}

