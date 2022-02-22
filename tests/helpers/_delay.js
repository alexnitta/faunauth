export function delay(millisec) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('');
        }, millisec);
    });
}
