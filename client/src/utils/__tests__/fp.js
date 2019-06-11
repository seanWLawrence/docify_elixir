import { exists, hasProperty } from '../fp';
describe('exists', function () {
    it('returns false if value does NOT exist', function () {
        var undefinedValue = void 0;
        var nullValue = null;
        expect(exists(undefinedValue)).toBe(false);
        expect(exists(nullValue)).toBe(false);
    });
    it('returns true if value exists', function () {
        var str = 'hello world';
        var num = 1;
        var obj = {};
        var arr = [];
        var bool = true;
        expect(exists(str)).toBe(true);
        expect(exists(num)).toBe(true);
        expect(exists(obj)).toBe(true);
        expect(exists(arr)).toBe(true);
        expect(exists(bool)).toBe(true);
    });
});
describe('has property', function () {
    it('returns false if property does NOT exist on the object', function () {
        var obj = { hello: 'world' };
        var undefinedProperty = 'test';
        expect(hasProperty(undefinedProperty)(obj)).toBe(false);
    });
    it('returns true if property exists on an object', function () {
        var obj = { hello: 'world' };
        var definedProperty = 'hello';
        expect(hasProperty(definedProperty)(obj)).toBe(true);
    });
});
