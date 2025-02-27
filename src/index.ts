
/**
 * Types are ordered this way, when they mis-match.
 */
const TYPEOF_ORDERING = {
  "undefined": 0,
  "boolean": 1,
  "number": 2,
  "string": 3,
  "object": 4,
  "function": 5,
  "symbol": 6,
  "bigint": 7,
} as const

/**
 * Compares two Javscript objects, in the manner used by `Array.sort()`, that also gives
 * a total ordering across all data types.
 */
export default function compare(a: any, b: any): number {

  // Total equality is a quick, common result.
  if (a === b) return 0;

  // Undefined
  if (a === undefined) return -1;
  if (b === undefined) return 1;

  // Null
  if (a === null) return -1;
  if (b === null) return 1;

  // Mis-matched types
  if (typeof a !== typeof b) {
    return TYPEOF_ORDERING[typeof a] - TYPEOF_ORDERING[typeof b];
  }

  // Boolean
  if (typeof a === "boolean") {
    return a ? 1 : -1;
  }

  // Numbers
  if (typeof a === "number") {
    if (Number.isNaN(a)) return Number.isNaN(b) ? 0 : -1
    if (Number.isNaN(b)) return 1
    return (a < b) ? -1 : 1
  }

  // Strings
  if (typeof a === "string") {
    return a.localeCompare(b);
  }

  // Dates
  if (a instanceof Date) {
    if (b instanceof Date) {
      return a.getTime() - b.getTime();
    }
    return -1;
  } else if (b instanceof Date) {
    return 1;
  }

  // Arrays
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return -1;
    const len = Math.min(a.length, b.length);
    for (let k = 0; k < len; ++k) {
      const cmp = compare(a[k], b[k]);
      if (cmp !== 0) return cmp;
    }
    return a.length - b.length;
  } else if (Array.isArray(b)) {
    return 1;
  }

  // Sets
  if (a instanceof Set) {
    if (!(b instanceof Set)) return -1;
    const aa = Array.from(a as Set<any>), bb = Array.from(b as Set<any>);
    aa.sort(compare);
    bb.sort(compare);
    return compare(aa, bb);
  } else if (b instanceof Set) {
    return 1;
  }

  // Generic object (including serializable ones)
  if (typeof a === "object") {
    if (typeof b !== "object") return -1;
    const aa = a as { [field: string]: any }, bb = b as { [field: string]: any };
    const ak = Object.keys(aa), bk = Object.keys(bb);
    ak.sort();
    bk.sort();
    const len = Math.min(ak.length, bk.length);
    for (let k = 0; k < len; ++k) {
      const cmp = ak[k].localeCompare(bk[k]);
      if (cmp !== 0) return cmp;
      const cmp2 = compare(aa[ak[k]], bb[bk[k]]);
      if (cmp2 !== 0) return cmp2;
    }
    return ak.length - bk.length;
  } else if (typeof b === "object") {
    return 1;
  }

  // Don't know!
  throw new Error(`invalid comparison type: ${String(a)}`);
}