const init = (...args) => args.slice(0, args.length - 1)
const isObject = n => !!n && typeof n === 'object' && !Array.isArray(n)
const safe = JSON.stringify
const tail = (...args) => args[args.length - 1]

module.exports = {
  init,
  isObject,
  safe,
  tail
}
