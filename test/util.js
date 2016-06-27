const test = require('tape')
const _ = require('../src/utils')

test('the utils export', (t) => {
  t.equal(typeof _, 'object', 'the utils export is an object')
  t.end()
})
test('the init method', (t) => {
  t.equal(
    typeof _.init,
    'function',
    'the utils.init property is a function'
  )
  t.deepEqual(
    _.init(),
    [],
    'utils.init will return a blank array when nothing is passed to it'
  )
  t.deepEqual(
    _.init('foo', 'bar', 'baz'),
    ['foo', 'bar'],
    'utils.init will take the first of the array minus the last item in the array'
  )
  const arr = [1, 2, 3, 4]
  _.init(...arr)
  t.deepEqual(
    arr,
    [1, 2, 3, 4],
    'calling utils.init on an arr should not modify the original array'
  )
  t.end()
})
test('the isObject method', (t) => {
  t.equal(
    typeof _.isObject,
    'function',
    'the utils.isObject property is a function'
  )
  t.equal(
    _.isObject(null),
    false,
    'the utils.isObject should return false if null is passed to it'
  )
  t.equal(
    _.isObject([]),
    false,
    'the utils.isObject should return false if an array is passed to it'
  )
  t.equal(
    _.isObject({}),
    true,
    'the utils.isObject should return true if a plain object is passed to it'
  )
  t.end()
})
test('the safe method', (t) => {
  t.equal(
    typeof _.safe,
    'function',
    'the utils.safe property is a function'
  )
  t.equal(
    _.safe,
    JSON.stringify,
    'the utils.safe is just JSON.stringify'
  )
  t.end()
})
test('the tail method', (t) => {
  t.equal(
    typeof _.tail,
    'function',
    'the utils.tail property is a function'
  )
  t.deepEqual(
    _.tail(),
    undefined,
    'utils.tail will return undefined when nothing is passed to it'
  )
  t.deepEqual(
    _.tail('foo', 'bar', 'baz'),
    'baz',
    'utils.tail will return the last argument'
  )
  const arr = [1, 2, 3, 4]
  _.tail(...arr)
  t.deepEqual(
    arr,
    [1, 2, 3, 4],
    'calling utils.tail on an arr should not modify the original array'
  )
  t.end()
})
