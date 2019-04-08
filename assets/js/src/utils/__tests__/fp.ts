import { exists, hasProperty } from '../fp';

describe('exists', () => {
  it('returns false if value does NOT exist', () => {
    let undefinedValue = void 0;
    let nullValue = null;

    expect(exists(undefinedValue)).toBe(false);
    expect(exists(nullValue)).toBe(false);
  });

  it('returns true if value exists', () => {
    let str = 'hello world';
    let num = 1;
    let obj = {};
    let arr: any[] = [];
    let bool = true;

    expect(exists(str)).toBe(true);
    expect(exists(num)).toBe(true);
    expect(exists(obj)).toBe(true);
    expect(exists(arr)).toBe(true);
    expect(exists(bool)).toBe(true);
  });
});

describe('has property', () => {
  it('returns false if property does NOT exist on the object', () => {
    let obj = { hello: 'world' };
    let undefinedProperty = 'test';

    expect(hasProperty(undefinedProperty)(obj)).toBe(false);
  });

  it('returns true if property exists on an object', () => {
    let obj = { hello: 'world' };
    let definedProperty = 'hello';

    expect(hasProperty(definedProperty)(obj)).toBe(true);
  });
});
