const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const scale = 20;
const cols = 12;
const rows = 20;
const arena = createMatrix(cols, rows);
let dropCounter = 0;
let dropInterval = 800;
let lastTime = 0;
let score = 0;
let lines = 0;
let level = 1;

const player = {
  pos: {x: 0, y: 0},
  matrix: null,
  score: 0,
};

const colors = [
  null,
  '#00f0f0', // I
  '#0000f0', // J
  '#f0a000', // L
  '#f0f000', // O
  '#00f000', // S
  '#a000f0', // T
  '#f00000', // Z
];

const pieces = {
  I: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
  J: [[2,0,0],[2,2,2],[0,0,0]],
  L: [[0,0,3],[3,3,3],[0,0,0]],
  O: [[4,4],[4,4]],
  S: [[0,5,5],[5,5,0],[0,0,0]],
  T: [[0,6,0],[6,6,6],[0,0,0]],
  Z: [[7,7,0],[0,7,7],[0,0,0]],
};

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[player.pos.y + y][player.pos.x + x] = value;
      }
    });
  });
}

function rotate(matrix, dir) {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }
  if (dir > 0) matrix.forEach(row => row.reverse());
  else matrix.reverse();
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
    updateScore();
  }
  dropCounter = 0;
}

function playerMove(offset) {
  player.pos.x += offset;
  if (collide(arena, player)) {
    player.pos.x -= offset;
  }
}

function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}

function arenaSweep() {
  let rowCount = 0;
  outer: for (let y = arena.length - 1; y >= 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) {
        continue outer;
      }
    }
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    ++y;
    rowCount++;
  }
  if (rowCount > 0) {
    lines += rowCount;
    score += (rowCount * 100) * level;
    level = Math.floor(lines / 10) + 1;
    dropInterval = Math.max(100, 800 - (level - 1) * 60);
  }
}

function playerReset() {
  const keys = Object.keys(pieces);
  const piece = keys[(keys.length * Math.random()) | 0];
  player.matrix = pieces[piece].map(row => row.slice());
  player.pos.y = 0;
  player.pos.x = ((arena[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    score = 0;
    lines = 0;
    level = 1;
    dropInterval = 800;
  }
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = colors[value];
        ctx.fillRect((x + offset.x) * scale, (y + offset.y) * scale, scale - 1, scale - 1);
      }
    });
  });
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(arena, {x: 0, y: 0});
  drawMatrix(player.matrix, player.pos);
}

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }
  draw();
  requestAnimationFrame(update);
}

function updateScore() {
  document.getElementById('score').innerText = score;
  document.getElementById('level').innerText = level;
  document.getElementById('lines').innerText = lines;
}

document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    playerMove(-1);
  } else if (event.keyCode === 39) {
    playerMove(1);
  } else if (event.keyCode === 40) {
    playerDrop();
  } else if (event.keyCode === 38) {
    playerRotate(1);
  } else if (event.keyCode === 32) {
    while (!collide(arena, player)) {
      player.pos.y++;
    }
    player.pos.y--;
    playerDrop();
  }
});

document.getElementById('startBtn').addEventListener('click', () => {
  arena.forEach(row => row.fill(0));
  score = 0;
  lines = 0;
  level = 1;
  dropInterval = 800;
  playerReset();
  updateScore();
});

playerReset();
updateScore();
update();
