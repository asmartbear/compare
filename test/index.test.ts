import compare from '../src/index'

const TOTAL_ORDERING: any[] = [
  undefined, null,
  false, true,
  Number.NaN, Number.NEGATIVE_INFINITY, Number.MIN_SAFE_INTEGER, -1, -0.001, -Number.EPSILON, 0, Number.EPSILON, 0.001, 1, Number.MAX_SAFE_INTEGER, Number.POSITIVE_INFINITY,
  "", "a", "aa", "ab", "ac", "az", "b", "ba", "bb", "bc", "bz", "c", "ca", "cb", "cc", "cz", "z", "za", "zb", "zc", "zz",
  new Date(1234), new Date(),
  [], [1], [1, 2], [1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5], [2],
  new Set(), new Set([1]), new Set([1, 2]), new Set([1, 2, 3]), new Set([4, 3, 2, 1]), new Set([1, 2, 3, 4, 5]), new Set([2]),
  {}, { a: 1 }, { a: 1, b: 2 }, { a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3, d: 4 }, { a: 1, b: 2, c: 3, d: 4, e: 5 }, { b: 2 }, { b: 2, c: 1 },
]

test("total ordering", () => {
  for (let i = 0; i < TOTAL_ORDERING.length; ++i) {
    for (let j = 0; j < TOTAL_ORDERING.length; ++j) {
      const a = TOTAL_ORDERING[i];
      const b = TOTAL_ORDERING[j];
      const cmp = compare(a, b)
      console.log(a, b, cmp)
      if (i < j) expect(cmp).toBeLessThan(0);
      if (i === j) expect(cmp).toBe(0);
      if (i > j) expect(cmp).toBeGreaterThan(0);
    }
  }
});

test("things we still don't support", () => {
  expect(compare({}, Symbol("hi"))).toBeLessThan(0)
  expect(compare(Symbol("hi"), {})).toBeGreaterThan(0)
  expect(() => compare(Symbol("hi"), Symbol("there"))).toThrowError()
  expect(() => compare(Symbol("hi"), Symbol("hi"))).toThrowError()
})

