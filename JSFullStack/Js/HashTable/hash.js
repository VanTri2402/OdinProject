class HashMap {
  prime = 31;
  size = 0;
  constructor() {
    this.bucket = new Array(this.prime); // prime number as bucket size
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * this.prime + key.charCodeAt(i)) % this.bucket.length;
    }
    return hash;
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.bucket[index]) {
      this.bucket[index] = [];
    }
    for (let pair of this.bucket[index]) {
      if (pair[0] === key) {
        pair[1] = value; // cập nhật
        return;
      }
    }
    this.bucket[index].push([key, value]); // thêm mới nếu chưa có
    this.size++;
  }

  get(key) {
    const index = this._hash(key);
    const bucketSlot = this.bucket[index];
    if (bucketSlot) {
      for (let [k, v] of bucketSlot) {
        if (k === key) return v;
      }
    }
    return undefined;
  }
  hasKey(key) {
    const index = this._hash(key);
    const bucketSlot = this.bucket[index];
    if (bucketSlot) {
      for (let [k, v] of bucketSlot) {
        if (k === key) return true;
      }
    }
    return false;
  }
  remove(key) {
    const index = this._hash(key);
    const bucketSlot = this.bucket[index];
    if (!bucketSlot) return false;
    const i = bucketSlot.findIndex(([k, v]) => k === key);
    if (i === -1) return false;

    bucketSlot.splice(i, 1);
    this.size--;

    return true;
  }
  length() {
    return this.size;
  }
  clear() {
    this.bucket = new Array[this.prime]();
    this.size = 0;
  }
  keys() {
    let result = [];
    for (let i = 0; i < this.bucket.length; i++) {
      for (let [k, v] of this.bucket[i]) {
        result.push([`${this.bucket[i][k]}`]);
      }
    }
    return result;
  }
  values() {
    let result = [];
    for (let i = 0; i < this.bucket.length; i++) {
      for (let [k, v] of this.bucket[i]) {
        result.push([`${this.bucket[i][v]}`]);
      }
    }
    return result;
  }
  entries(key) {
    let result = [];
    let bucketSlot = bucket[hash(key)];
    for (let [k, v] of bucketSlot) {
      result.push(`${bucketSlot[k].toString()} : ${bucketSlot[v]} `);
    }
    return result;
  }
}
const map = new HashMap();
map.set("hello", "world");
map.set("name", "Văn Trí");
map.set("hello", "WORLD"); // cập nhật

console.log(map.get("hello")); // "WORLD"
console.log(map.hasKey("name")); // true
console.log(map.keys()); // ["hello", "name"]
console.log(map.values()); // ["WORLD", "Văn Trí"]
map.remove("name");
console.log(map.keys()); // ["hello"]
map.clear();
console.log(map.length()); // 0
