import { ErrorKey } from '../types';
import { keyedErrors } from './constants';

export class ErrorWithKey extends Error {
    /**
     * The error name - this is always set to "ErrorWithKey"
     */
    name: string;

    /**
     * The unique key for this kind of error. In your consuming application, you can use this to
     * display the error in the user's locale as part of your internationalization logic.
     */
    key: string;

    /**
     * If there were any underlying errors thrown by third-party APIs, they can be included here by
     * calling `new ErrorWithKey(key, apiErrors)`.
     */
    apiErrors?: Error[];

    // eslint-disable-next-line @typescript-eslint/ban-types
    __proto__: Error | undefined;

    constructor(key: ErrorKey, apiErrors?: Error[]) {
        super(keyedErrors[key]); // sets the `message` property on the Error parent class
        this.name = 'ErrorWithKey';
        this.key = key;
        this.apiErrors = apiErrors;
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
