### Unit tests Tips

<b>1.</b> How to mock `react-router-dom` (jest)

```js
// mock router path
export const mockRoute = (pathname: string): any =>
  jest.mock("react-router-dom", () => ({
    useLocation: () => ({
      pathname,
    }),
  }));
```

<b>2.</b> `Jest.resetModules()`: used where local state might conflict between tests

<a href="https://jestjs.io/docs/jest-object#jestresetmodules" target="_blank">Reference</a>

<b>3.</b> Puppeteer & Cypress (Trials)

- Cypress

* Easier to be setup (npm i cypress && npm run e2e)
* Able to integrate with testing library, cypress testing library
* Has UI interface to run different tests and also easier to track the performance of testing running
* Personal experience: documentation is much easier to follow
* Slower than puppeteer
* A testing framework which contains its own assertions
* Synchronous process which means must be waiting before go next step
* Support multiple browsers to run tests [More compatible]

- Puppeteer

* Headless browser, which supports two different modes (UI or terminal) [headless: false/true]
* Have to use setTimeout for waiting a bit longer when doing testing. Otherwise, it will be too fast to view the e2e tests.
* Faster than cypress
* Doesn’t have its own assertions, needs to use with jest or jasmine or mocha together
* Has to use async await to handle the headache waiting process.
* Only support chromium engine-based browser for running tests [Chromium only]
* Has to run the web app locally before running the test

<a href="https://chercher.tech/puppeteer/puppeteer-vs-cypress" target="_blank">Reference</a>

Conclusion: Cypress is a better tool from my trial ⛳️⛳️

<b>3.</b> Test 2 useState hook in unit test:

<a href="https://stackoverflow.com/questions/57025753/how-to-set-initial-state-for-usestate-hook-in-jest-and-enzyme/71712376#71712376" target="_blank">Example Reference</a>

<b>4.</b>
