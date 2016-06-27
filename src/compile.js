const {isObject: isObj, safe} = require('./utils')
const isObject = i => (
  `typeof args[${i}] === 'object' && !Array.isArray(args[${i}]) && args[${i}]`
)
const shallowObjCompare = (arg, i) => {
  return Object.keys(arg).reduce((accum, key, index) => {
    if (index) accum += ' && '
    accum += `args[${i}][${safe(key)}] === ${safe(arg[key])}`
    return accum
  }, '')
}
const shallowArrayCompare = (arr, i) => {
  return arr.reduce((accum, key, index) => {
    if (index) accum += ' && '
    accum += `args[${i}][${index}] === ${safe(key)}`
    return accum
  }, '')
}
const expression = (arg, i) => {
  if (isObj(arg)) return `${isObject(i)} && ${shallowObjCompare(arg, i)}`
  if (Array.isArray(arg)) return `Array.isArray(args[${i}]) && ${shallowArrayCompare(arg, i)}`
  if (typeof arg === 'function') return `typeof args[${i}] === 'function'`
  if (arg === '*') return `typeof args[${i}] !== 'undefined'`
  return `args[${i}] === ${safe(arg)}`
}

module.exports = {
  expression,
  shallowArrayCompare,
  shallowObjCompare,
  isObject
}
