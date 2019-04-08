export let concat = <T extends any>(val: string | T[]) => (
  val2: string | T[]
) =>
  typeof val === 'string'
    ? val.concat(val2 as string)
    : val.concat(val2 as T[]);

export let isUndefined = (val: any): boolean =>
  typeof val === 'undefined' ? true : false;

export let exists = (val: any): boolean => val !== null && !isUndefined(val);

export let hasProperty = (key: string) => (
  obj:
    | {
        [key: string]: any;
        [key: number]: any;
      }
    | undefined
): boolean => exists(obj) && Object.keys(obj as {}).includes(key);
