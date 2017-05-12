# pmatch

[![Greenkeeper badge](https://badges.greenkeeper.io/jcblw/pmatch.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/jcblw/pmatch.svg?branch=master)](https://travis-ci.org/jcblw/pmatch)

Pmatch is yet another attempt to make pattern matching a thing in javascript.
The concept of argument pattern matching comes from [Haskell](https://www.haskell.org/).

```haskell
map _ []     = []
map f (x:xs) = f x : map f xs
```
The idea is to match the patterns of arguments passed to a function to handle different cases in different function.

> Not many pattern features are added and there might be 🐲

## usage

```javascript
const fn = pmatch()
  .when('foo', () => 'it\'s foo')
  .when('bar', () => 'it\'s bar')
  .when(() => 'it\'s something else')

fn('foo') // it's foo
fn('bar') // it's bar
fn('baz') // it's something else
```

Pmatch will attempt to match the correct argument pattern and call the correct function.

```javascript
const _void = () => []
const map = pmatch()
  .when('*', [], _void)
  .when(_void, (f, [x, ...xs]) => [f(x)].concat(map(f, xs)))

map(x => x * 10, [10, 20]) // [100, 200]
```

## shallow compares

pmatch has shallow compares to allow for matching in objects and arrays.

```javascript
const reducer = pmatch()
  .when('*', {type: 'SET'}, (state, {key, value}) => {
    return Object.assign({}, state, {[key]: value})
  })
  .when('*', {type: 'UNSET'}, (state, {key}) => {
    return Object.assign({}, state, {[key]: null})
  })
  .when('*', {type: 'RESET'}, () => Object.assign({}, initialState))
  .when((state = initialState) => state)
```
