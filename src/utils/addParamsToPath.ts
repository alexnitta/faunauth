/**
 * A [name, value] pair that will be used to create a URL search parameter.
 */
export type URLParamTuple = [name: string, value: string];

export interface AddParamsToPathInput {
    /**
     * A path to add URL search parameters to. Can be a complete URL (starting in 'http://' or
     * 'https://') or a path starting in '/'.
     */
    path: string;
    /**
     * Array of {@link URLParamTuple}s that will be used to create new URL search parameters.
     */
    params: URLParamTuple[];
}

/**
 * Add URL search params to a path. If the path contains existing search parameters or a hash, they
 * will be preserved.
 *
 * Search params are encoded to their UTF-8 equivalent by the `new URLSearchParams` constructor,
 * similar to how
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent}
 * works.
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
