class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array = []) {
    const sortedArr = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArr);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const root = new Node(arr[mid]);
    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));
    return root;
  }

  insert(value, node = this.root) {
    if (!node) return new Node(value);

    if (value < node.value) {
      node.left = this.insert(value, node.left);
    } else if (value > node.value) {
      // ❗ Sửa lỗi: so sánh với node.value, không phải với node
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  delete(value, node = this.root) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.delete(value, node.left);
    } else if (value > node.value) {
      node.right = this.delete(value, node.right);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const minRight = this.findMin(node.right);
      node.value = minRight.value;
      node.right = this.delete(minRight.value, node.right);
    }

    return node;
  }

  find(value, node = this.root) {
    if (!node) return null;
    if (value === node.value) return node;
    return value < node.value
      ? this.find(value, node.left)
      : this.find(value, node.right);
  }

  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  preOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  postOrder(node = this.root, result = []) {
    if (node) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  levelOrder(callback) {
    const queue = [this.root];
    const result = [];

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue;
      if (callback) callback(current);
      else result.push(current.value);

      queue.push(current.left);
      queue.push(current.right);
    }

    return callback ? null : result;
  }

  height(node = this.root) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(target, node = this.root, level = 0) {
    if (!node) return -1;
    if (node === target) return level;

    if (target.value < node.value) {
      return this.depth(target, node.left, level + 1);
    } else {
      return this.depth(target, node.right, level + 1);
    }
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const leftH = this.height(node.left);
    const rightH = this.height(node.right);

    return (
      Math.abs(leftH - rightH) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    const values = this.inOrder();
    this.root = this.buildTree(values);
  }

  findMin(node = this.root) {
    while (node.left !== null) node = node.left;
    return node;
  }
  totalItem(node = this.root, current = 0) {
    if (!node) return current;
    current++;
    current = this.totalItem(node.left, current);
    current = this.totalItem(node.right, current);
    return current;
  }
}
const tree = new Tree();

tree.root = tree.insert(10);
tree.insert(5);
tree.insert(20);
tree.insert(3);
tree.insert(7);
tree.insert(15);
tree.insert(30);

console.log("In-order:", tree.inOrder());
// 👉 [3, 5, 7, 10, 15, 20, 30]

console.log("Find 15:", tree.find(15));
// 👉 Node { value: 15, left: null, right: null }

tree.delete(10);

console.log("In-order after deleting 10:", tree.inOrder());
// 👉 [3, 5, 7, 15, 20, 30]
