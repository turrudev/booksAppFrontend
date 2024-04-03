export default class Time {
    static getTimeInMs() {
        return (new Date()).getTime();
    }

    static ttlInvalid(ttl: number) {
        return (Time.getTimeInMs() - ttl) > ttl;
    }
}