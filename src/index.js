const {tail, init} = require('./utils')
const compile = require('./compile')
const argMatch = (dictionarys) => (...args) => {
  for (let i = 0; i < dictionarys.length; i++) {
    if (dictionarys[i].match(args)) {
      return dictionarys[i].handler(...args)
    }
  }
}

function Pmatch (patterns = [], appendedPatterns = []) {
  if (!(this instanceof Pmatch)) return Pmatch.of(patterns)
  this._patterns = [...patterns, ...appendedPatterns]
  const _argMatch = argMatch(this._patterns)
  Object.assign(_argMatch, Pmatch.prototype, this)
  return _argMatch
}

Pmatch.prototype.of = function (patterns = []) {
  if (Array.isArray(patterns._patterns)) {
    patterns = patterns._patterns
  }
  return new Pmatch(this._patterns, patterns)
}

Pmatch.prototype.when = function (...args) {
  return this.of([{
    match: new Function( // eslint-disable-line
      'args',
      `return ${init(...args).map(compile.expression).join(' && ')}`
    ),
    handler: tail(...args)
  }])
}

Pmatch.of = Pmatch.prototype.of
Pmatch.argMatch = argMatch

module.exports = Pmatch
