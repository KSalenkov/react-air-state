import {SetValueAction, Subscription} from "./types";

export const idAdapter = () => {
    let id = 0;

    return () => {
        return id = id + 1;
    }
}

export const subscriptionAdapter = <T>() => {
    const getId = idAdapter();

    const subscriptions: Record<number, SetValueAction<T>> = {};

    const subscribe = (sub: SetValueAction<T>): Subscription => {
        const subId = getId();

        subscriptions[subId] = sub;

        return () => {
            delete subscriptions[subId]
        }
    }

    const sendToSubscribers = (value: T) => {
        Object.values(subscriptions).forEach((dispatch) => {
            dispatch(value);
        })
    }

    return {
        subscribe,
        sendToSubscribers
    }
}
