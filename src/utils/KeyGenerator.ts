const LOCAL_STORAGE_KEY: string = "__KEY_GENERATOR__"

class KeyGenerator {
    static generateNextKey(): string {
        let previousKey = localStorage.getItem(LOCAL_STORAGE_KEY),
            nextKey = '';

        if (previousKey) {
            const lastChar = previousKey.charAt(previousKey.length - 1),
                numericPart = parseInt(previousKey.slice(0, -1));

            if (!isNaN(numericPart)) {
                nextKey = `${numericPart + 1}${lastChar}`;
            } else {
                nextKey = `${previousKey}1`;
            }
        } else {
            nextKey = '1';
        }

        localStorage.setItem(LOCAL_STORAGE_KEY, nextKey);

        return nextKey;
    }
}

export default KeyGenerator;
