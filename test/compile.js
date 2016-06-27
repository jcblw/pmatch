const test = require('tape')
const compile = require('../src/compile')

test('the compile export', (t) => {
  t.equal(typeof compile, 'object', 'the compile export is an object')
  t.end()
})
test('the isObject method', (t) => {
  t.equal(
    typeof compile.isObject,
    'function',
    'the compile export is an function'
  )
  t.equal(
    compile.isObject(0),
    'typeof args[0] === \'object\' && !Array.isArray(args[0]) && args[0]',
    `the compile.isObject method when called with a number will return
     a string version of the isObject logic`
  )
  t.end()
})
test('the shallowObjCompare method', (t) => {
  t.equal(
    typeof compile.shallowObjCompare,
    'function',
    'the compile shallowObjCompare is an function'
  )
  t.equal(
    compile.shallowObjCompare({x: 'foo', y: 'bar'}, 0),
    'args[0]["x"] === "foo" && args[0]["y"] === "bar"',
    `the compile.shallowObjCompare method when called with an object
     and a number will rturn a string version of some shallow object
     compare logic`
  )
  t.equal(
    compile.shallowObjCompare({z: 'baz'}, 0).match(/&&/),
    null,
    `the compile.shallowObjCompare method will have no && operators
     when only one key is in the passed object`
  )
  t.end()
})
test('the shallowArrayCompare method', (t) => {
  t.equal(
    typeof compile.shallowArrayCompare,
    'function',
    'the compile shallowArrayCompare is a function'
  )
  t.equal(
    compile.shallowArrayCompare(['foo', 'bar'], 1),
    'args[1][0] === "foo" && args[1][1] === "bar"',
    `the compile.shallowArrayCompare method when called with an array
     and a number will rturn a string version of some shallow array
     compare logic`
  )
  t.equal(
    compile.shallowArrayCompare(['baz'], 0).match(/&&/),
    null,
    `the compile.shallowArrayCompare method will have no && operators
     when only a one item array is passed`
  )
  t.end()
})
test('the expression method', (t) => {
  t.equal(
    typeof compile.expression,
    'function',
    'the compile.expression method is a function'
  )
  t.equal(
    compile.expression({x: 'foo'}, 1),
    'typeof args[1] === \'object\' && !Array.isArray(args[1]) && args[1] && args[1]["x"] === "foo"',
    `compile.expression when passed an object, the output from
     isObject method and the output from shallowObjCompare argument
     are outputed together with an &&`
  )
  t.equal(
    compile.expression(['foo'], 10),
    'Array.isArray(args[10]) && args[10][0] === "foo"',
    `compile.expression when passed an array it outputs an is array
     check and also the output from shallowArrayCompare together with
     an &&`
  )
  t.equal(
    compile.expression(function () {}, 5),
    'typeof args[5] === \'function\'',
    `compile.expression when passed a function will output
     a typeof function check`
  )
  t.equal(
    compile.expression('*', 2),
    'typeof args[2] !== \'undefined\'',
    `compile.expression when passed an * symbol in a string it outputs
     a undefined check`
  )
  t.equal(
    compile.expression('foo', 3),
    'args[3] === "foo"',
    'compile.expression when passed a string will output a === check'
  )
  t.equal(
    compile.expression(2, 3),
    'args[3] === 2',
    'compile.expression when passed a number will output a === check'
  )
  t.end()
})
