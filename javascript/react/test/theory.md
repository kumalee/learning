[effective-snapshot-testing](https://kentcdodds.com/blog/effective-snapshot-testing)
[making-your-ui-tests-resilient-to-change](https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change)
[Write Tests Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)


## Summary
### Effective Snapshot Testing
#### Where snapshot testing shines
1. Test Error Messages and logs
    
    useful tools: 
    
    [jest in case](https://github.com/atlassian/jest-in-case): Jest utility for creating variations of the same test 
2. [babel-plugin-tester](https://github.com/babel-utils/babel-plugin-tester) (uses snapshots for its assertion with jest)
    ```js
    exports[`importAll.sync uses static imports 1`] = `
    import importAll from 'import-all.macro'
    const a = importAll.sync('./files/*.js')
        ↓ ↓ ↓ ↓ ↓ ↓
    import * as _filesAJs from './files/a.js'
    import * as _filesBJs from './files/b.js'
    import * as _filesCJs from './files/c.js'
    import * as _filesDJs from './files/d.js'
    const a = {
    './files/a.js': _filesAJs,
    './files/b.js': _filesBJs,
    './files/c.js': _filesCJs,
    './files/d.js': _filesDJs,
    }`
    ```
3. [jest-styld-components](https://github.com/styled-components/jest-styled-components) (Jest utilities for Styled Components, include the applicable CSS with whatever you rendered)
    ```js
    - Snapshot
    + Received

    .c0 {
    -  color: green;
    +  color: blue;
    }

    <button
    className="c0"
    />
    ```
4. Custom serializers
    ```
    const projectRoot = path.join(__dirname, '../../')
    expect.addSnapshotSerializer({
    test: val => typeof val === 'string',
    print: val =>
        val
        .split(projectRoot)
        .join('<PROJECT_ROOT>/')
        .replace(/\/g, '/'),
    })
    ```
    [Rogelio Guzman - Jest Snapshots and Beyond - React Conf 2017](https://www.youtube.com/watch?v=HAuXJVI_bUs)
5. [Snapshot Diff](https://github.com/jest-community/snapshot-diff)
    
    One of the most useful things that I've found with test maintainability is when you have many tests that look the same, try to make their differences stand out. This makes it easier for people coming into your codebase to know what the important pieces are. 
    ```js
    const React = require('react')
    const {toMatchDiffSnapshot} = require('snapshot-diff')
    const Component = require('./Component')
    expect.extend({toMatchDiffSnapshot})
    test('snapshot difference between 2 React components state', () => {
        expect(<Component test="say" />).toMatchDiffSnapshot(
            <Component test="my name" />,
        )
    })
    ```
#### Things to avoid with snapshots
1. HUGE snapshots

[Eslint Rule: no-large-snapshots](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-large-snapshots.md)

Remember that tests are all about giving you confidence that you wont ship things that are broken
So, avoid huge snapshots and take smaller, more focused ones. While you're at it, see if you can actually change it from a snapshot to a more explicit assertion (because you probably can）

### Making Your UI Tests Resilient To Change
```js
const sel = id => `[data-testid="${id}"]`
const emailField = rootNode.querySelector(sel('email'))
const passwordField = rootNode.querySelector(sel('password'))
const submitButton = rootNode.querySelector(sel('submit'))
```
We can remove properties by [babel-plugin-react-remove-properties](https://github.com/oliviertassinari/babel-plugin-react-remove-properties)

![](https://kentcdodds.com/static/20c422f5dad15169acfae9613c561dad/8ff1e/2.png)