### Common NPM packages (Quick recall)

1). NYC (For tracking unit test coverage) <a href="https://github.com/istanbuljs/nyc" target="_blank">Link</a>

2). Knex (Abstract away SQL -> query builder [a way to talk to db]) <a href="https://www.npmjs.com/package/knex" target="_blank">Link</a>

3). Redux-toolkit (Modern redux) <a href="https://www.npmjs.com/package/@reduxjs/toolkit" target="_blank">Link</a>

4). `package.json` file version update command:

```
npm version major --no-git-tag-version
```

5). How to publish a React custom hook

Step 1: Register an npm account

Step 2: write the hook function

Step 3: <a href="https://egghead.io/lessons/react-extract-a-custom-hook-into-its-own-module-with-create-react-hook" target="_blank">extract hook function into your own module</a>

- At terminal, type `npx create-react-hook`
- Run `git init` inside new created hook project folder
- Start both projects by type `npm start` in terminal
- Copy hook function code into `src/index.js` file (replace the old code)
- Copy your old codebase hook implementation code into `example/src/App.js` (replace the old code)
- Go to README.md file and copy the App.js file content into `Usage` section
- update package.json file with following code

``` js
// ensure react version is `>=` certain version eg: 16.8.6

"peerDependencies": {
  "react": ">=16.8.6"
},

// push changes after commit running by npm
"postpublish": "git push"

// make this codebase/package public
"publishConfig": {
  "access": "public" // if value is private, means this package can not be viewed by public
}

// last step (important) -> update package version
npm version major --no-git-tag-version // -> x.0.0 
npm version minor --no-git-tag-version // -> 0.x.0
npm version patch --no-git-tag-version // -> 0.0.x
```

Step 4: git add and commit and finally publish your package

```js
git add .
git commit  
npm publish // before run this command, ensure you have logged in npm in your local terminal
```

Step 5: done ~~


6). react-query (fetching caching & update asynchronous data for React): <a href="https://www.npmjs.com/package/react-query" target="_blank">Link</a>


7).
