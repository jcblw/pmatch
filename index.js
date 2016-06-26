/*
pmatch()
  .when(2, 1, (two, one) => {
    return 3
  })
  .when('*', 2, (x, two) => {
    return x * two
  })
*/
const tail = (...args) => args[args.length - 1]
const init = (...args) => args.slice(0, args.length -1)
const isObject = n => typeof n === 'object' && !Array.isArray(n) && n
const shallowObjectCompare = (x, y) => Object.keys(x).every(k => x[k] === y[k])
const shallowArrayCompare = (x, y) => x.every((k, i) => k === y[i])
const matchesAll = (args) => (arg, i) => {
  if (isObject(arg) && isObject(args[i])) {
    return shallowObjectCompare(arg, args[i])
  }

  if (Array.isArray(arg) && Array.isArray(args[i])) {
    return shallowArrayCompare(arg, args[i])
  }

  if (arg === '*') {
    return true
  }

  return args[i] === arg
}
const argMatch = (dictionarys) => (...args) => {
  // might get clever and generate code for this based on the dictionary
  // https://www.youtube.com/watch?v=wBOX_i7Z514
  let ret;
  const matchesArgs = matchesAll(args)
  dictionarys.forEach((dictionary) => {
    if (dictionary.pattern.every(matchesArgs) && !ret) {
      ret = true
      dictionary.handler(...args)
    }
  })
}

function pmatch (patterns = [], appendedPatterns = []) {
  if (!(this instanceof pmatch)) return pmatch.prototype.of()
  this._patterns = [...patterns, ...appendedPatterns];
  const _argMatch = argMatch(this._patterns)
  Object.assign(_argMatch, pmatch.prototype, this)
  return _argMatch
}

pmatch.prototype.of = function (patterns = []) {
  if (Array.isArray(patterns._patterns)) {
    patterns = patterns._patterns
  }
  return new pmatch(this._patterns, patterns)
}

pmatch.prototype.when = function (...args) {
  return this.of([{
    pattern: init(...args),
    handler: tail(...args)
  }])
}

module.exports = pmatch
