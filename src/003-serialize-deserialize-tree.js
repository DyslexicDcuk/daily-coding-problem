// [Medium] - This problem was asked by Google.
// Given the root to a binary tree, implement serialize(root), which serializes the tree into a string,
// and deserialize(s), which deserializes the string back into the tree.

// For example, given the following Node class
// class Node:
//     def __init__(self, val, left=None, right=None):
//         self.val = val
//         self.left = left
//         self.right = right

// The following test should pass:
// node = Node('root', Node('left', Node('left.left')), Node('right'))
// assert deserialize(serialize(node)).left.left.val == 'left.left'

class Node {
  constructor (val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

const serialize = (node) => {
  let result = '{val:' + node.val + ''

  if (node.left) {
    result = result + ',left:' + serialize(node.left)
  }

  if (node.right) {
    result = result + ',right:' + serialize(node.right)
  }

  return `${result}}`
}

// {val:root,left:{val:left,left:{val:left.left}},right:{val:right}}
// TODO: revisit this, there must be a more elegant way of parsing this
const deserialize = (str) => {
  if (!str) {
    return null
  }

  let array = str.split('')
  array = array.slice(1, array.length - 1)
  let result = [[], [], []]

  let row = 0
  let brackets = 0

  for (let i of array) {
    if (i === '{') {
      brackets++
    } else if (i === '}') {
      brackets--
    } else if (i === ',' && brackets === 0) {
      row++
      continue
    }

    result[row].push(i)
  }

  result = result.map(arr => arr.join('')).filter((x) => x.length)

  let val = null
  let left = null
  let right = null

  for (let i of result) {
    if (i.startsWith('val')) {
      val = i.slice(4, i.length)
    } else if (i.startsWith('left')) {
      left = i.slice(5, i.length)
    } else if (i.startsWith('right')) {
      right = i.slice(6, i.length)
    }
  }

  return new Node(val, deserialize(left), deserialize(right))
}

describe('003 - serialize/deserialize tree', function () {
  it('left.left', function () {
    const node = new Node(
      'root',
      new Node('left', new Node('left.left')),
      new Node('right')
    )

    const val = deserialize(serialize(node)).left.left.val
    expect(val).to.equal('left.left')
  })

  it('right.left.right', function () {
    const node = new Node(
      'root',
      new Node('left', new Node('left.left')),
      new Node(
        'right',
        new Node(
          'right.left',
          new Node('right.left.left'),
          new Node('right.left.right')
        ),
        new Node('right.right')
      )
    )

    const val = deserialize(serialize(node)).right.left.right.val
    expect(val).to.equal('right.left.right')
  })
})

// v0 - using built-in methods
// const serialize = (node) => JSON.stringify(node)
// const deserialize = (node) => JSON.parse(node)
