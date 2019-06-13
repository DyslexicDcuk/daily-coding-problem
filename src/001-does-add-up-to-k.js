// [Easy] - This problem was recently asked by Google.
// Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
// For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
// Bonus: Can you do this in one pass?

// v1 - O(n)
function doesAddUpToK ({ list, k }) {
  let visitedNumbers = new Set()
  for (let i of list) {
    if (visitedNumbers.has(k - i)) {
      return true
    }

    visitedNumbers.add(i)
  }

  return false
}

describe('001 - does add up to k?', function () {
  it('[10, 15, 3, 7], k=17 -> true', function () {
    const obj = {
      list: [10, 15, 3, 7],
      k: 17
    }

    expect(doesAddUpToK(obj)).to.equal(true)
  })

  it('[1, 20, 200], k=50 -> false', function () {
    const obj = {
      list: [1, 20, 200],
      k: 50
    }

    expect(doesAddUpToK(obj)).to.equal(false)
  })
})

// v0 - O(n^2)
// function doesAddUpToK ({ list, k }) {
//   for (let i = 0; i < list.length - 1; i++) {
//     for (let j = i + 1; j < list.length; j++) {
//       if (list[i] + list[j] === k) {
//         return true
//       }
//     }
//   }
//
//   return false
// }
