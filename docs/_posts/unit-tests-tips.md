### Unit tests Tips

<b>1.</b> How to mock `react-router-dom` (jest)

```js
// mock router path
export const mockRoute = (pathname: string): any =>
  jest.mock('react-router-dom', () => ({
    useLocation: () => ({
      pathname,
    }),
  }));
```


<b>2.</b> `Jest.resetModules()`: used where local state might conflict between tests

<a href="https://jestjs.io/docs/jest-object#jestresetmodules" target="_blank">Reference</a>

