class KnightTravails {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.path = [];

    if (start[0] === end[0] && start[1] === end[1]) {
      this.path.push(start);
    }
  }

  getValidMoves([x, y]) {
    const moves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];
    let validMoves = [];

    for (let [dx, dy] of moves) {
      let nx = x + dx;
      let ny = y + dy;
      if (nx >= 0 && nx <= 7 && ny >= 0 && ny <= 7) {
        validMoves.push([nx, ny]);
      }
    }
    return validMoves;
  }

  bfs(start, end) {
    let queue = [start];
    let startKey = start.join(",");
    let visitedMove = new Map();
    let parent = new Map();

    visitedMove.set(startKey, true);
    parent.set(startKey, null);

    while (queue.length > 0) {
      let current = queue.shift();
      let currentKey = current.join(",");

      if (current[0] === end[0] && current[1] === end[1]) {
        break; // Đã đến đích
      }

      let nextMoves = this.getValidMoves(current);
      for (let move of nextMoves) {
        let moveKey = move.join(",");
        if (!visitedMove.has(moveKey)) {
          visitedMove.set(moveKey, true);
          parent.set(moveKey, current);
          queue.push(move);
        }
      }
    }
    return parent;
  }

  tracePath(parent, start, end) {
    let path = [];
    let currKey = end.join(",");

    while (parent.get(currKey) !== null) {
      let parentPos = parent.get(currKey);
      path.push(parentPos);
      currKey = parentPos.join(",");
    }

    path.reverse();
    path.push(end); // Bổ sung điểm đích
    return path;
  }

  findPath() {
    if (this.path.length > 0) return this.path;

    const parentMap = this.bfs(this.start, this.end);
    this.path = this.tracePath(parentMap, this.start, this.end);

    console.log(
      `You made it in ${this.path.length - 1} moves! Here's your path:`
    );
    this.path.forEach((pos) => console.log(pos));

    return this.path;
  }
}

const knight = new KnightTravails([0, 0], [5, 6]);
knight.findPath();
