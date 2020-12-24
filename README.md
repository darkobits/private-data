<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/103074729-12974a00-457f-11eb-981c-dcd987904a1b.png" style="max-width: 100%;">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/private-data"><img src="https://img.shields.io/npm/v/@darkobits/private-data.svg?style=flat-square"></a>
  <a href="https://github.com/darkobits/private-data/actions?query=workflow%3ACI"><img src="https://img.shields.io/github/workflow/status/darkobits/private-data/CI/master?style=flat-square"></a>
  <a href="https://app.codecov.io/gh/darkobits/private-data/branch/master"><img src="https://img.shields.io/codecov/c/github/darkobits/private-data/master?style=flat-square"></a>
  <a href="https://david-dm.org/darkobits/private-data"><img src="https://img.shields.io/david/darkobits/private-data.svg?style=flat-square"></a>
  <a href="https://github.com/conventional-changelog/standard-version"><img src="https://img.shields.io/badge/conventional%20commits-1.0.0-027dc6.svg?style=flat-square"></a>
</p>

This package provides a (temporary) way to achieve private fields (and methods)
at runtime with JavaScript classes until the [private fields proposal](https://github.com/tc39/proposal-private-fields)
is finalized. It uses the [Weak Map](https://ponyfoo.com/articles/es6-weakmaps-sets-and-weaksets-in-depth#es6-weakmaps)
approach as outlined by Dr. Axel Rauschmayer's [blog post](http://2ality.com/2016/01/private-data-classes.html#keeping-private-data-in-weakmaps)
on this topic.

> This project is intended for academic purposes only and should not be used in
> production.

# Install

```
$ npm i @darkobits/private-data
```

# Use

This package's default export is a function that creates a new private data
store and returns a function which accepts an instance reference (re: `this`)
and returns its private data object.

**Parameters**

|Name|Type|Description|
|---|---|---|
|`context`|`object`|Reference to a class instance, usually `this`.|

**Returns**

`object` - The instance's private data object.

### Example

In this example, we will define a `Person` class that uses private data. We will
use the variable `$` for the data store.

```js
import dataStore from '@darkobits/private-data';

const $ = dataStore();

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
import dataStore from '@darkobits/private-data';

const $ = dataStore();

class Person {
  constructor(name) {
    $(this).privateMethod = () => {
      // ...
    };
  }

  publicMethod() {
    const result = $(this).privateMethod();
    // ...
  }
}
```

# Caveats

- Private data is backed by an object in a Weak Map. Bear in mind that objects
  in JavaScript are always passed by reference, so if you `return $(this);`,
  consumers of your class will have a direct reference to the instance's private
  data, which they can then modify at will. The same holds for `return`-ing any
  sub-tree of this object. To avoid this, always return primitive values or
  clone non-primitives before returning them.
- This module performs basic checks on `WeakMap.prototype.get` and
  `WeakMap.prototype.set` to ensure they haven't been tampered-with, but a
  sophisticated attacker could subvert these checks.

<br />
<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/102322726-5e6d4200-3f34-11eb-89f2-c31624ab7488.png" style="max-width: 100%;">
</a>
