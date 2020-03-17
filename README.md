# databuffer-web-components

This project contains custom elements developed for [databuffer-ui](https://github.com/paulscherrerinstitute/databuffer-ui).

## Initial setup

- Install [nodejs v.10 (LTS)](https://nodejs.org/) (includes the commands `node`, `npm`, and `npx`)
- `git clone` the repo
- `npm install` the dependencies

## Running tests

There are two types of tests in here:

- Unit tests
- Visual tests

Run `npm start` to start the local development server and navigate to http://localhost:3000/. You can access the same URL (substituting localhost for your host name, of course) from multiple devices, and [browser-sync][] will keep the displays in sync.

From the start page you can access the unit tests and visual tests.

### Unit tests

The unit tests run in the browser, using the [mocha][] test framework (for defining the tests) and [chai][] assertions.

### Visual tests

The visual tests serve two purposes:

- Simple usage examples, showing the UI for different states (through attributes)
- Baseline for visual comparison

After you add a new element or modify the presentation of an existing one you'll need to regenerate the baseline for comparison by running `npm test:regen`.

When you run `npm test` the automated visual tests, which compare the current rendering outputs with the baseline that has been recorded previously.

## Adding a new component

- Run tests (ensure everything is OK before we start, i.e. _also the screenshots_ aka visual tests):
  - Run visual (screenshot) tests: `npm test`
  - Run unit tests:
    - Run dev server `npm start` (runs `server.js`)
    - Open http://localhost:3000/test/
- <span style="color:#a00000;font-weight:bold;font-size:150%">FIX ANY ERRORS BEFORE CONTINUING!</span>
- Create tests for new component `src/new-component.spec.ts`
- Add test to `src/index.spec.ts`
- Create source for new component `src/new-component.ts`
- Add new component to `src/index.ts`
- Create usage example for new component (using attributes only) `test/visual/new-component.html`
- Add new component to configuration in `test/config.json`
- Run unit tests (see above)
- Generate baseline screenshots for the new component: `npm run test:regen`
- Run all tests again (see above)
- `git commit` and `git push` changes

[browser-sync]: https://www.browsersync.io/
[chai]: https://www.chaijs.com/
[mocha]: https://mochajs.org/
