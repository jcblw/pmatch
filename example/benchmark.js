const pmatch = require('../src/.')
const AMOUNT = +process.argv[2]

function test (id, method, times) {
  console.time(id)
  const fn = method()
    .when({type: 'FOO'}, 1, 'foo', 'foo', () => ({foo: true}))
    .when({type: 'BAR'}, 2, 'bar', 'bar', () => ({bar: true}))
    .when({type: 'BAZ'}, 3, 'baz', 'baz', () => ({baz: true}))
    .when('*', x => x)

  for (let i = 0; i < times; i++) {
    fn({type: 'FOO'})
    fn({type: 'FOO'})
    fn({type: 'FOO'})
    fn({type: 'BAR'})
    fn({type: 'BAZ'})
    fn({type: 'BAR'})
  }
  console.timeEnd(id)
}

function precompile (id, method) {
  console.log('===================')
  console.time(id)
  const fn = method()
    .when({type: 'FOO'}, 1, 'foo', 'foo', () => ({foo: true}))
    .when({type: 'BAR'}, 2, 'bar', 'bar', () => ({bar: true}))
    .when({type: 'BAZ'}, 3, 'baz', 'baz', () => ({baz: true}))
    .when('*', x => x)
  console.timeEnd(id)
  return fn
}

function precompileTest (id, fn, times) {
  console.time(id)
  for (let i = 0; i < times; i++) {
    fn({type: 'FOO'})
    fn({type: 'FOO'})
    fn({type: 'FOO'})
    fn({type: 'BAR'})
    fn({type: 'BAZ'})
    fn({type: 'BAR'})
  }
  console.timeEnd(id)
}

function runsuite (times) {
  console.log('===================')
  test('pmatch generated', pmatch, times)
  console.log(`${times} times`)
}

function runprecompilesuite (fn, times) {
  setTimeout(() => {
    console.log('===================')
    precompileTest('precompile pmatch generated', fn, times)
    console.log(`${times} times`)
  }, 0)
}

runsuite(AMOUNT)
const pregen = precompile('precompile gen', pmatch)
runprecompilesuite(pregen, AMOUNT)
