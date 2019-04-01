export let concat = val => val2 => val.concat(val2);

export let ifElse = (predicate1, expression1) => expression2 => value =>
  predicate1(value) ? expression1(value) : expression2(value);
