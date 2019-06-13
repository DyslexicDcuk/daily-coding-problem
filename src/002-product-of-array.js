// [Hard] - This problem was asked by Uber.
// Given an array of integers, return a new array such that each element at index i of the new array is the product
// of all the numbers in the original array except the one at i.
// For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24].
// If our input was [3, 2, 1], the expected output would be [2, 3, 6].
// Follow-up: what if you can't use division?

// TODO: need to revisit this to get O(n)

// v1 - O(n^2)
function getProductOfArray (oldArray) {
  let result = []

  for (let i = 0; i < oldArray.length; i++) {
    result[i] = 1

    for (let j = 0; j < oldArray.length; j++) {
      if (i !== j) {
        result[i] *= oldArray[j]
      }
    }
  }

  return result
}

describe('002 - product of array not including i', function () {
  it('[1, 2, 3, 4, 5] -> [120, 60, 40, 30, 24]', function () {
    expect(getProductOfArray([1, 2, 3, 4, 5]))
      .to.deep.equal([120, 60, 40, 30, 24])
  })

  it('[3, 2, 1] -> [2, 3, 6]', function () {
    expect(getProductOfArray([3, 2, 1]))
      .to.deep.equal([2, 3, 6])
  })
})

// v0 - using divison
// function getProductOfArray (oldArray) {
//   const productOfAll = oldArray.reduce((acc, curr) => acc * curr, 1)
//   return oldArray.map((i) => productOfAll / i)
// }
