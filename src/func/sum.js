var Promise = require('es6-promise').Promise;

const sum = (a, b) => a + b;
export default sum;


function initial() {
    return 1;
}

export function setInitialFunc(newInitial) {
    initial = newInitial;
}

export function sum2(a, b) {
    return initial() + a + b;
}

export function sum3(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve({
                value: initial(1) + a + b,
                param1: a,
                param2: b,
            });
        }, 100);
    });
}
