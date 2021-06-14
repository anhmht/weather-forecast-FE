export const sleep = (ms, clear) => {
    return new Promise(resolve => {
        clear.timeout = setTimeout(resolve, ms)
    });
}
