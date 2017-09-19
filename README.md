[![][travis-img]][travis-url] [![][npm-img]][npm-url] [![][codacy-img]][codacy-url] [![][xo-img]][xo-url] [![][cc-img]][cc-url]

# private-data

This package provides a (temporary) way to achieve private fields (and methods) with JavaScript classes until the [private fields proposal](https://github.com/tc39/proposal-private-fields) is finalized. This solution was inspired by Dr. Axel Rauschmayer's [blog post](http://2ality.com/2016/01/private-data-classes.html#keeping-private-data-in-weakmaps) on this topic. Some noteworthy features of this approach:

- A shared variable which points to the Weak Map is required, but this package lets consumers use a variable name of their choosing.
- Working with private data is relatively terse; compared to working with standard instance fields/methods, only 3 additional characters (at minimum) are required.

## Installation

This package requires `babel-plugin-transform-decorators-legacy`.

```bash
$ yarn add -D babel-plugin-transform-decorators-legacy
$ yarn add @darkobits/private-data
```

or

```bash
$ npm install --save-dev babel-plugin-transform-decorators-legacy
$ npm install --save @darkobits/private-data
```

Then, update your `.babelrc` file:

```
{
  "plugins": ["transform-decorators-legacy"]
}
```

## Usage

#### `privateData(WeakMap: store)`

Class decorator that accepts a reference to the data store exported by this package.

Note: The data store is this package's `default` export, allowing you to assign it any name that suits your existing conventions.

**Example:**

In this example, we will define a `Person` class that uses private data. We will use the variable `$` for the data store.

```js
import $, { privateData } from '@darkobits/private-data';

@privateData($)
class Person {
  constructor(name) {
    $(this).name = name;
  }

  getName() {
    return $(this).name;
  }
}

const frodo = new Person('Frodo');
frodo.getName(); //=> 'Frodo'
```

It is also possible to create "private methods":

```js
import $, { privateData } from '@darkobits/private-data';

@privateData($)
class Person {
  constructor(name) {
    $(this).privateMethod = () => {
      // Do something with public and/or private data here.
    };
  }

  publicMethod() {
    const result = $(this).privateMethod();
    // Do something with result of privateMethod here.
  }
}
```

## &nbsp;
<p align="center">
  <br>
  <img width="22" height="22" src="https://cloud.githubusercontent.com/assets/441546/25318539/db2f4cf2-2845-11e7-8e10-ef97d91cd538.png">
</p>

[travis-img]: https://img.shields.io/travis/darkobits/private-data.svg?style=flat-square
[travis-url]: https://travis-ci.org/darkobits/private-data

[npm-img]: https://img.shields.io/npm/v/@darkobits/private-data.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@darkobits/private-data

[codacy-img]: https://img.shields.io/codacy/coverage/0023b07bb2454f2a8c336f92814f09a0.svg?style=flat-square
[codacy-url]: https://www.codacy.com/app/darkobits/private-data

[xo-img]: https://img.shields.io/badge/code_style-XO-e271a5.svg?style=flat-square
[xo-url]: https://github.com/sindresorhus/xo

[cc-img]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square
[cc-url]: https://conventionalcommits.org/
