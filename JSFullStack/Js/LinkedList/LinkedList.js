class Node {
  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor(head) {
    this.head = head;
  }
  append(value) {
    let current = this.head;
    let newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    return (current.nextNode = newNode);
  }
  prepend(value) {
    let current = this.head;
    let newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    }
    newNode.nextNode = this.head;
    this.head = newNode;
  }
  size() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.nextNode;
    }
    return count;
  }
  gethead() {
    let head = this.head.value;
    return head;
  }
  tail() {
    let current = this.head;
    let cuoicung;
    while (current) {
      current = current.nextNode;
      if (current.nextNode === null) {
        cuoicung = current.value;
        return cuoicung;
      }
    }
  }
  at(index) {
    let i = 0;
    let current = this.head;
    if (index === 0) return current.value;
    while (current !== null) {
      current = current.nextNode;
      i++;
      if (i === index) {
        return current.value;
      }
    }
  }
  pop() {
    if (!this.head) return null;
    if (!this.head.nextNode) {
      const popped = this.head;
      this.head = null;
      return popped.value;
    }
    let current = this.head;
    while (current.nextNode.nextNode !== null) {
      current = current.nextNode;
    }
    const popped = current.nextNode;
    current.nextNode = null;
    return popped.value;
  }
  contains(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }
    return false;
  }
  find(value) {
    let current = this.head;
    if (this.head.value === value) {
      console.log("da tim thay", value);
      return value;
    }
    while (current) {
      current = current.nextNode;

      if (current.value === value) {
        console.log("da tim thay", value);
        return value;
      } else {
        console.log("khong tim thay");
        return null;
      }
    }
    return null;
  }
  toString() {
    let result = "";
    let current = this.head;
    while (current) {
      result += `(${current.value}) -> `;
      current = current.nextNode;
    }
    return result + "null";
  }
}

let linkerlist = new LinkedList();
console.log(linkerlist.append("dog"));
console.log(linkerlist.append("cat"));
console.log(linkerlist.prepend("bird"));
console.log(linkerlist.size());
console.log(linkerlist.gethead());
console.log(linkerlist.tail());
console.log(linkerlist.at(0));
console.log(linkerlist.contains("cat"));
console.log(linkerlist.pop());
console.log(linkerlist.find("bird"));
console.log(linkerlist.toString());
