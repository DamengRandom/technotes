module.exports = {
  title: "Tech notes",
  description: "Record what I have learnt so far ..",
  head: [
    ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#ffffff" }],
  ],
  themeConfig: {
    nav: [
      { text: "Dashboard", link: "/" },
      { text: "About", link: "/about" },
    ],
    sidebar: [
      {
        title: `Avoid Using 'else'`,
        path: "/_posts/avoid-use-else",
        collapsable: false,
      },
      {
        title: `Learnt Concepts`,
        path: "/_posts/learnt-concepts",
        collapsable: false,
      },
      { title: `BEM (CSS)`, path: "/_posts/css-bem", collapsable: false },
      {
        title: `BFF (Backend For Frontend)`,
        path: "/_posts/bff",
        collapsable: false,
      },
      {
        title: `CSS Tips (General)`,
        path: "/_posts/css-tips",
        collapsable: false,
      },
      {
        title: `Debug Tips (General)`,
        path: "/_posts/debug-101",
        collapsable: false,
      },
      {
        title: `Docker (Damon)`,
        path: "/_posts/docker-damon",
        collapsable: false,
      },
      { title: `Git Tips`, path: "/_posts/git-tips", collapsable: false },
      {
        title: `JavaScript: Arrow Function`,
        path: "/_posts/js-arrow-function",
        collapsable: false,
      },
      {
        title: `JavaScript: call, bind & apply Function`,
        path: "/_posts/js-call-bind-apply",
        collapsable: false,
      },
      {
        title: `JavaScript: Callback - Promise - Async Await`,
        path: "/_posts/js-callback-promise-async-await",
        collapsable: false,
      },
      {
        title: `JavaScript: Class - Prototype`,
        path: "/_posts/js-class-prototype",
        collapsable: false,
      },
      {
        title: `JavaScript: Closure`,
        path: "/_posts/js-closure",
        collapsable: false,
      },
      {
        title: `JavaScript: Code Pieces`,
        path: "/_posts/js-pieces",
        collapsable: false,
      },
      {
        title: `JavaScript: Event Loop`,
        path: "/_posts/js-event-loop",
        collapsable: false,
      },
      {
        title: `JavaScript: Common note`,
        path: "/_posts/js-common-note",
        collapsable: false,
      },
      {
        title: `JavaScript: Common Patterns`,
        path: "/_posts/js-patterns",
        collapsable: false,
      },
      {
        title: `JavaScript: Functional Programming`,
        path: "/_posts/js-fp",
        collapsable: false,
      },
      {
        title: `JavaScript: High Order Functions`,
        path: "/_posts/js-high-order-functions",
        collapsable: false,
      },
      {
        title: `JavaScript: Hoisting`,
        path: "/_posts/js-hoisting",
        collapsable: false,
      },
      {
        title: `JavaScript: Immutability`,
        path: "/_posts/js-immutability",
        collapsable: false,
      },
      {
        title: `TypeScript: Basics (101)`,
        path: "/_posts/ts-basics",
        collapsable: false,
      },
      { title: `SQL (101)`, path: "/_posts/sql-tips", collapsable: false },
      { title: `NodeJS (101)`, path: "/_posts/node-tips", collapsable: false },
      {
        title: `JavaScript Module Systems`,
        path: "/_posts/js-module-systems",
        collapsable: false,
      },
      {
        title: `JavaScript Reduce Method (Use cases)`,
        path: "/_posts/js-reduce-method",
        collapsable: false,
      },
      {
        title: `JavaScript this`,
        path: "/_posts/js-this",
        collapsable: false,
      },
      {
        title: `Code Practices (Mostly JavaScript)`,
        path: "/_posts/just-code",
        collapsable: false,
      },
      {
        title: `Npm packages (Common)`,
        path: "/_posts/npms",
        collapsable: false,
      },
      {
        title: `One word (Quick memo)`,
        path: "/_posts/one-word-tips",
        collapsable: false,
      },
      {
        title: `PostgreSQL Note`,
        path: "/_posts/postgres-tips",
        collapsable: false,
      },
      {
        title: `Problems Resolved (Records)`,
        path: "/_posts/problems-resolved",
        collapsable: false,
      },
      {
        title: `React: High Order Component`,
        path: "/_posts/react-hoc",
        collapsable: false,
      },
      {
        title: `React: Hooks`,
        path: "/_posts/react-hooks",
        collapsable: false,
      },
      {
        title: `React: Lifecycle Methods`,
        path: "/_posts/react-lifecycles",
        collapsable: false,
      },
      {
        title: `React: General tips`,
        path: "/_posts/react-tips-one",
        collapsable: false,
      },
      {
        title: `React: ZuStand`,
        path: "/_posts/react-zustand",
        collapsable: false,
      },
      {
        title: `React: Redux 101`,
        path: "/_posts/redux-tips",
        collapsable: false,
      },
      { title: `Restful API`, path: "/_posts/restful-api", collapsable: false },
      { title: `RXJS Trials`, path: "/_posts/rxjs-trials", collapsable: false },
      {
        title: `React: Server Side Rendering`,
        path: "/_posts/react-ssr",
        collapsable: false,
      },
      {
        title: `Serverless things`,
        path: "/_posts/serverless",
        collapsable: false,
      },
      {
        title: `Software Development: Solid Principles`,
        path: "/_posts/solid-principles",
        collapsable: false,
      },
      {
        title: `Tips to read before too late`,
        path: "/_posts/tips-to-read",
        collapsable: false,
      },
      {
        title: `Tricky code`,
        path: "/_posts/tricky-codes",
        collapsable: false,
      },
      { title: `TypeScript 101`, path: "/_posts/ts-101", collapsable: false },
      {
        title: `UnderscoreJS 101`,
        path: "/_posts/underscore-js",
        collapsable: false,
      },
      {
        title: `Unit Tests 101`,
        path: "/_posts/unit-tests-tips",
        collapsable: false,
      },
      { title: `VueJS 101`, path: "/_posts/vue-tips", collapsable: false },
      { title: `VueX 101`, path: "/_posts/vuex-101", collapsable: false },
      {
        title: `Web Accessibility 101`,
        path: "/_posts/web-accessibility",
        collapsable: false,
      },
      { title: `Webpack 101`, path: "/_posts/webpack-101", collapsable: false },
      { title: `Weekly tips`, path: "/_posts/weekly-tips", collapsable: false },
      {
        title: `What is the output`,
        path: "/_posts/whats-the-output",
        collapsable: false,
      },
      { title: `Web3`, path: "/_posts/web3", collapsable: false },
    ],
    searchMaxSuggestions: 20,
  },
  plugins: [
    [
      "@vssue/vuepress-plugin-vssue",
      {
        platform: "github",
        owner: "DamengRandom",
        repo: "technotes",
        clientId: "d25c5fdf9d47438a77a3",
        clientSecret: "242d768776d8dbb197b665a1ffbce5bafbbf02bd",
      },
    ],
  ],
  dest: "public",
  evergreen: true,
};
