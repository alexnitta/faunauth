import { ErrorKey } from '~/types';
import { keyedErrors } from './constants';

/**
 * A custom error class that has a `.key` property. This allows us to read `error.key` as a way to
 * translate an error into a locale-specific message.
 * @property key - the unique key for this kind of error. This will be used to look up a message
 * from the `keyedErrors` constant.
 * @property apiError - the error thrown by a third-party API, if any
 */
export class ErrorWithKey extends Error {
    name: string;

    key: string;

    apiError?: Error;

    // eslint-disable-next-line @typescript-eslint/ban-types
    __proto__: Error | undefined;

    constructor(key: ErrorKey, apiError?: Error) {
        super(keyedErrors[key]); // sets the `message` property on the Error parent class
        this.name = 'ErrorWithKey';
        this.key = key;
        this.apiError = apiError;
        // restore prototype chain
        const actualProto = new.target.prototype;

        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        } else {
            // eslint-disable-next-line no-proto
            this.__proto__ = actualProto;
        }
    }
}
