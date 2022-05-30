const game = document.getElementById("game");
var context = game.getContext("2d");

const height = 480; // 24 блока по 20px
const width = 720; // 36 блоков по 20px

//Ширина и высота обычных блоков
const BLOCK_SIZE_X = 20;
const BLOCK_SIZE_Y = 20;

//Сдвиг карты
var shiftMapX = 0;
var shiftMapY = 0;

class Person {
  constructor(xpos, ypos, moveSpeed, width, height) {
    this.x = xpos;
    this.y = ypos;
    this.width = width;
    this.height = height;
    this.moveSpeed = moveSpeed;
  }
  getCurrentPos() {
    return {
      x: Math.round(this.x / BLOCK_SIZE_X),
      y: Math.round(this.y / BLOCK_SIZE_Y),
    };
  }
}

class PersonHero extends Person {
  move() {
    if (keyW && !getMapCollision(this).W) {
      this.y -= this.moveSpeed;
      shiftMapY -= this.moveSpeed;
    }
    if (keyA && !getMapCollision(this).A) {
      this.x -= this.moveSpeed;
      shiftMapX -= this.moveSpeed;
    }
    if (keyS && !getMapCollision(this).S) {
      this.y += this.moveSpeed;
      shiftMapY += this.moveSpeed;
    }
    if (keyD && !getMapCollision(this).D) {
      this.x += this.moveSpeed;
      shiftMapX += this.moveSpeed;
    }
  }
}

class PersonEnemy extends Person {
  constructor(xpos, ypos, moveSpeed, width, height, direction) {
    super(xpos, ypos, moveSpeed, width, height);
    this.direction = direction;
  }
}

//Геройчика обьявлю аХаХа 20 на 20 в клетке 1/1 я же могу это сделать ?
const Hero = new PersonHero(18 * BLOCK_SIZE_X, 12 * BLOCK_SIZE_Y, 2, 20, 20);

//Это чтобы центр карты был равен позиции героя
shiftMapX = Hero.x - width / 2;
shiftMapY = Hero.y - height / 2;

class MapBlock {
  constructor(xpos, ypos, width, height, color, collision = false) {
    this.x = xpos;
    this.y = ypos;
    this.width = width;
    this.height = height;
    this.color = color;
    this.collision = collision;
  }
}

const MapSetup = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var Map = [];

function mapInit() {
  for (let y = 0; y < MapSetup.length; y++) {
    const tempArr = [];
    for (let x = 0; x < MapSetup[y].length; x++) {
      switch (MapSetup[y][x]) {
        case 0:
          tempArr.push(new MapBlock(x * BLOCK_SIZE_X, y * BLOCK_SIZE_Y, BLOCK_SIZE_X, BLOCK_SIZE_Y, "lightgreen", false));
          break;
        case 1:
          tempArr.push(new MapBlock(x * BLOCK_SIZE_X, y * BLOCK_SIZE_Y, BLOCK_SIZE_X, BLOCK_SIZE_Y, "green", true));
          break;
        default:
          break;
      }
    }
    Map.push(tempArr);
  }
}
mapInit();

//Отрисовка карты
function drowMap() {
  for (let y = 0; y < Map.length; y++) {
    for (let x = 0; x < Map[y].length; x++) {
      context.fillStyle = Map[y][x].color;
      context.fillRect(Map[y][x].x - shiftMapX, Map[y][x].y - shiftMapY, Map[y][x].width, Map[y][x].height);
    }
  }
}

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
      keyW = true;
      break;
    case "KeyA":
      keyA = true;
      break;
    case "KeyS":
      keyS = true;
      break;
    case "KeyD":
      keyD = true;
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyW":
      keyW = false;
      break;
    case "KeyA":
      keyA = false;
      break;
    case "KeyS":
      keyS = false;
      break;
    case "KeyD":
      keyD = false;
      break;
    default:
      break;
  }
});

//Переключение вкладки
window.onblur = function () {
  keyW = keyA = keyS = keyD = false;
};

const visionCollissionRadius = 2;

//Ааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааа сука памагите
function getMapCollision(person) {
  let collW = false;
  let collA = false;
  let collS = false;
  let collD = false;
  for (let y = person.getCurrentPos().y - visionCollissionRadius; y < Map.length && y < person.getCurrentPos().y + visionCollissionRadius; y++) {
    if (Map[y] != null) {
      for (let x = person.getCurrentPos().x - visionCollissionRadius; x < Map[y].length && x < person.getCurrentPos().x + visionCollissionRadius; x++) {
        if (Map[y][x] != null && Map[y][x].collision) {
          if (person.y == Map[y][x].y + Map[y][x].height && Map[y][x].x < person.x + person.width && person.x < Map[y][x].x + Map[y][x].width) {
            collW = true;
          }
          if (person.x == Map[y][x].x + Map[y][x].width && Map[y][x].y < person.y + person.height && person.y < Map[y][x].y + Map[y][x].height) {
            collA = true;
          }
          if (person.y + person.height == Map[y][x].y && Map[y][x].x < person.x + person.width && person.x < Map[y][x].x + Map[y][x].width) {
            collS = true;
          }
          if (person.x + person.width == Map[y][x].x && Map[y][x].y < person.y + person.height && person.y < Map[y][x].y + Map[y][x].height) {
            collD = true;
          }
          // Отрисовать все читаемые блоки
          // context.fillStyle = "red";
          // context.fillRect(Map[y][x].x - shiftMapX, Map[y][x].y - shiftMapY, Map[y][x].width, Map[y][x].height);
        }
      }
    }
  }
  return {
    W: collW,
    A: collA,
    S: collS,
    D: collD,
  };
}

const Enemy = new PersonEnemy(10 * BLOCK_SIZE_X, 10 * BLOCK_SIZE_Y, 4, 20, 20, null);

const startTime = new Date();

setInterval(() => {
  switch (Math.floor(Math.random() * 4) + 1) {
    case 1:
      Enemy.direction = "W";
      break;
    case 2:
      Enemy.direction = "A";
      break;
    case 3:
      Enemy.direction = "S";
      break;
    case 4:
      Enemy.direction = "D";
      break;
    default:
      break;
  }
}, Math.random() * 1000);

//Игровой цикл
function play() {
  context.clearRect(0, 0, 720, 480);
  drowMap();
  Hero.move();

  switch (Enemy.direction) {
    case "W":
      if (Enemy.y > BLOCK_SIZE_Y && !getMapCollision(Enemy).W) {
        Enemy.y -= Enemy.moveSpeed;
      }
      break;
    case "A":
      if (Enemy.x > BLOCK_SIZE_X && !getMapCollision(Enemy).A) {
        Enemy.x -= Enemy.moveSpeed;
      }
      break;
    case "S":
      if (Enemy.y < height - Enemy.height - BLOCK_SIZE_Y && !getMapCollision(Enemy).S) {
        Enemy.y += Enemy.moveSpeed;
      }
      break;
    case "D":
      if (Enemy.x < width - Enemy.width - BLOCK_SIZE_X && !getMapCollision(Enemy).D) {
        Enemy.x += Enemy.moveSpeed;
      }
      break;
    default:
      break;
  }
  context.fillStyle = "blue";
  context.fillText("Памагите", Enemy.x - shiftMapX - 12, Enemy.y - shiftMapY - 6);
  context.fillRect(Enemy.x - shiftMapX, Enemy.y - shiftMapY, Enemy.width, Enemy.height);

  //Рисование персонажа
  context.fillStyle = "red";
  context.fillRect(width / 2, height / 2, Hero.width, Hero.height);

  requestAnimationFrame(play);
}
play();
