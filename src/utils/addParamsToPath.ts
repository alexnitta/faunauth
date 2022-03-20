type URLParamTuple = [string, string];

interface AddParamsToPathInput {
    path: string;
    params: URLParamTuple[];
}

/**
 * Add URL search params to a path. The path does not need to be a complete URL; it can be a path
 * starting in `/`. If the path contains existing search parameters, they will be preserved. If the
 * path contains a hash, it will also be preserved.
 *
 * Search params are encoded to their UTF-8 equivalent by the `new URLSearchParams` constructor, similar to how
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent} works.
 * @param input - see {@link AddParamsToPathInput}
 * @returns the input.path with the input.params added as search params
 */
export const addParamsToPath = ({
    path,
    params,
}: AddParamsToPathInput): string => {
    const pathParts = path.split('?');
    // This is the part before the '?', even if there is no '?' character
    const basePath = pathParts?.[0];

    // Match the part of the string between '?' and '#', not including '#' - but '#' does not need
    // to exist. This gives us the existing search params.
    const paramMatchGroups = path.match(/\?((?:(?!#).)*)/gm);
    const existingParams = paramMatchGroups?.[0] ?? null;

    // This gives us the hash if it exists, including the '#' character
    const hashMatchGroups = path.match(/(#.*)/gm);
    const hash = hashMatchGroups?.[0] ?? '';

    if (basePath && existingParams) {
        const newParams = new URLSearchParams([
            ...Array.from(new URLSearchParams(existingParams).entries()),
            ...params,
        ]);

        return `${basePath}?${newParams.toString()}${hash}`;
    }

    const newParams = new URLSearchParams(params);

    return `${basePath}?${newParams.toString()}${hash}`;
};
