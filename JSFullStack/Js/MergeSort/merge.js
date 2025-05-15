let arr = [3, 6, 8, 2, 1, 5, 4, 9];

// 3 6 8 2  | 1 5 4 9 
// 3 6 | 8 2 || 1 5 | 4 9

// r36 | r28 || r15 | r49
// r2368 | r1459
// r12345689


function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Test
console.log(mergeSort(arr)); // [1, 2, 3, 4, 5, 6, 8, 9]
