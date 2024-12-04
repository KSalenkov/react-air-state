import { AirStateOptions } from '../types';

export const getInitValue = <T>(defaultValue: T, options?: AirStateOptions): T => {
    if (options?.localStorageKey) {
        try {
            const item = window.localStorage.getItem(options.localStorageKey);

            return item ? (JSON.parse(item) as T) : defaultValue;
        } catch (error) {
            console.error(error);

            return defaultValue;
        }
    }

    return defaultValue;
};
