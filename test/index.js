const test = require('tape')
const pmatch = require('../src/')

test('the pmatch import', (t) => {
  t.equal(
    typeof pmatch,
    'function',
    'the main pmatch export is a function'
  )
  t.equal(
    typeof pmatch.of,
    'function',
    'the main pmatch.of method is a function'
  )
  t.equal(
    pmatch.of,
    pmatch.prototype.of,
    'the main pmatch.of and pmatch.prototype.of method is the same'
  )
  t.end()
})
test('the pmatch.argMatch method', (t) => {
  t.equal(
    typeof pmatch.argMatch,
    'function',
    'the main pmatch.argMatch method is a function'
  )
  t.equals(
    typeof pmatch.argMatch(),
    'function',
    'the pmatch.argMatch should return a function'
  )
  t.end()
})
test('the returned function from pmatch.argMatch method', (t) => {
  const fn = pmatch.argMatch([{
    match: () => false,
    handler: () => t.fail('the incorrect handler was called')
  }, {
    match: () => true,
    handler: () => {
      t.pass('the correct handler is called')
      return true
    }
  }, {
    match: () => true,
    handler: () => t.fail('the incorrect handler was called')
  }])
  t.equals(
    fn(),
    true,
    `the correct value was passed from the handler function to
     the original function call`
  )
  t.end()
})
test('the pmatch.of method', (t) => {
  const fn = pmatch.of()
  t.equals(
    typeof fn,
    'function',
    'the pmatch.of function returns a function'
  )
  t.assert(
    Array.isArray(fn._patterns),
    'there is a cache of patterns asscoiated with the function'
  )
  t.equal(
    typeof fn.when,
    'function',
    'there is a method "when" on the function'
  )
  t.equal(
    typeof fn.of,
    'function',
    'there is a method "of" on the function'
  )
  t.end()
})
test('the pmatch.prototype.when method', (t) => {
  const fn = pmatch.of()
  t.equals(
    typeof fn,
    'function',
    'the pmatch.of function returns a function'
  )
  t.equals(
    fn._patterns.length,
    0,
    'there are currently 0 patterns in the pmatch fns cache'
  )
  const fn2 = fn.when('foo', () => 'foo')
  t.equal(
    typeof fn2,
    'function',
    'the method "when"\'s return is another function'
  )
  t.equals(
    fn2._patterns.length,
    1,
    'there are currently 1 patterns in the pmatch fns cache'
  )
  t.equals(
    typeof fn2._patterns[0].match,
    'function',
    'the first patterns match method is a function'
  )
  t.equals(
    typeof fn2._patterns[0].handler,
    'function',
    'the first patterns handler method is a function'
  )
  t.equals(
    fn2._patterns[0].handler(),
    'foo',
    'the first patterns handler method returns the correct value'
  )
  t.false(
    fn2._patterns[0].match(['bar']),
    'calling the match method with an incorrect param should be false'
  )
  t.true(
    fn2._patterns[0].match(['foo']),
    'calling the match method with a correct param should be true'
  )
  t.equal(
    fn2('foo'),
    'foo',
    'calling returned function with the correct param should get the return from the matched pattern'
  )
  t.end()
})
