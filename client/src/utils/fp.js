export var concat = function (val) { return function (val2) {
    return typeof val === 'string'
        ? val.concat(val2)
        : val.concat(val2);
}; };
export var isUndefined = function (val) {
    return typeof val === 'undefined' ? true : false;
};
export var exists = function (val) { return val !== null && !isUndefined(val); };
export var hasProperty = function (key) { return function (obj) { return exists(obj) && Object.keys(obj).includes(key); }; };
