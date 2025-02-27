# Compare

Total ordering of native and related Javscript objects.

Features:

* No other library dependencies.
* Especially fast when equal.

100% test coverage.

## Usage

```typescript
const cmp = compare(a,b)
console.log(cmp)
```

## Development Usage

Build:

```bash
npm run build
```

Unit tests:

```bash
npm run test
```

Unit tests, refreshed live:

```bash
npm run watch
```

Prepare for release (e.g. run tests and bump version number), then publish to npm:

```bash
npm run release && npm publish
```
