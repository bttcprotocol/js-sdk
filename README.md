# Bttc SDK

This repository contains the `bttcjs` client library. `bttcjs` makes it easy for developers, who may not be deeply familiar with smart contract development, to interact with the various components of Bttc Network.

This library will help developers to move assets from Ethereum chain / TRON chain / BSC chian to Bttc chain, and withdraw from Bttc to them using fraud proofs.

We will be improving this library to make all features available like Plasma Faster Exit, challenge exit, finalize exit and more.

## Development

**Setup**

```bash
npm ci
```

**How to debug**

Write your code inside file `test/debug.js` and run below code

```bash
npm run debug
```

Above command will build the source code & install the builded version into test folder, which will be used by `debug.js`.

**Lint**

```bash
# To check lint errors
npm run lint

# To fix most common lint errors
# Note that it might not fix all errors, some need manual intervention
npm run lint:fix
```

**Build code**

```bash
npm run build
```

**Run test**

```bash
npm run test
```

**Generate distribution files**

```bash
npm run deploy
```

**NPM publish**

Before running publish script, make sure you have updated version properly.

Note that `prepublishOnly` script will be automatically called while publishing. It will check lint, clean dist/lib folders and build fresh distribution files before it executes `npm publish`.

```bash
npm publish
```

### License

MIT
