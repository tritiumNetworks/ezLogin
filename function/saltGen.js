/**
 * Make Salts Array (Harder)
 * @param {Number} ol Max Index of Salts Array
 * @param {Number} il Length of Salt
 * @returns {String[]}
 */
function hard (ol, il) {
  if (!ol || ol < 1) ol = 100
  if (!il || il < 1) il = 5

  let arr = []
  for (let o = 0; o < ol; o++) {
    let str = ''
    for (let i = 0; i < il; i++) {
      str += il % 2 < 1
        ? String.fromCharCode(Math.floor(Math.random() * 106 - il) + 21 + i)
        : String.fromCharCode(Math.floor(Math.random() * 169 - il) + 697 + i)
    }
    arr[arr.length] = str
  }

  if (ol === 1) arr = arr[0]
  return arr
}

/**
 * Make Salts Array
 * @param {Number} ol Max Index of Salts Array
 * @param {Number} il Length of Salt
 * @returns {String[]}
 */
function soft (ol, il) {
  if (!ol || ol < 1) ol = 100
  if (!il || il < 1) il = 5

  let arr = []
  for (let o = 0; o < ol; o++) {
    let str = ''
    for (let i = 0; i < il; i++) str += String.fromCharCode(Math.floor(Math.random() * 106) + 21)
    arr[arr.length] = str
  }

  if (ol === 1) arr = arr[0]
  return arr
}

module.exports = { hard, soft }
