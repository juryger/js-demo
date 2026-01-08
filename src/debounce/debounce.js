const debounce = (fn, delay) => {
    let timeoutId;
    return function(...args) {
        console.log('debounce: main function', args, delay);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            console.log('debounce: preapre to call fn with args', args);
            fn(...args)
        }, delay);
    }
}

export { debounce }
