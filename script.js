const wall_thickness = 5;
const player_size = 15;
const player_speed = 5;
const player_color = 'red';
const A = 2;
const B = 1;

let next_wall_id = 0;
let walls = [];
const wall_datas = [
    { x: 0, y: -250, width: 700, height: wall_thickness }, // Top wall
    { x: 0, y: 250, width: 700, height: wall_thickness }, // Bottom wall
    { x: -350, y: 0, width: wall_thickness, height: 500 }, // Left wall
    { x: 350, y: 0, width: wall_thickness, height: 500 } // Right wall
];
const portal_shape = {width: 20, height: 100, color: 'blue'};

const player_coor = { x: 0, y: 0 };
const key_states = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

class Room{
    constructor(a, b, wall_datas) {
        this.id = {a : a, b : b};
        this.walls = [];
        this.portals = {left : null, right : null, top : null, bottom : null};
        this.makeWalls(wall_datas);

    }
    makeWalls(wall_datas) {
        for (const wall_data of wall_datas) {
            this.walls.push(new Wall(wall_data));
        }
    }
    makePortals() {
        if(this.id.a > 0){
            
        }
    }
    showWalls() {
        for (const wall of this.walls) {
            wall.show();
        }
    }
    hide(){
        for (const wall of this.walls) {
            wall.hide();
        }
    }
}

class Portal{
    constructor(portal_shape, position) {
        const $portal = document.createElement('div');
            $portal.classList.add('portal');
            $portal.style.position = 'absolute';
            $portal.style.width = portal_shape.width + 'px';
            $portal.style.height = portal_shape.height + 'px';
            $portal.style.backgroundColor = portal_shape.color;
            $portal.style.left = position.x + 'px';
            $portal.style.top = position.y + 'px';
            this.portals.left = $portal;
    }
}

class Wall{
    constructor(wall_data) {
        this.x = wall_data.x;
        this.y = wall_data.y;
        this.width = wall_data.width;
        this.height = wall_data.height;

        this.id = next_wall_id++;

        const $wall = document.createElement('div');
        this.$wall = $wall;
        walls.push(this);

        $wall.classList.add('wall');
        $wall.style.position = 'absolute';
        $wall.style.left = '50%';
        $wall.style.top = '50%';
        $wall.style.width = this.width + 'px';
        $wall.style.height = this.height + 'px';
        $wall.style.backgroundColor = 'black';
        $wall.style.display = 'none';

        $wall.style.transform = `translate(-50%, -50%) translate(${this.x}px, ${this.y}px)`;
    
        document.body.appendChild($wall);
    }
    show(){
        this.$wall.style.display = 'block';
    }
    hide(){
        this.$wall.style.display = 'none';
    }

}

const $player = document.createElement('div');
$player.classList.add('player');
const $player_image = document.createElement('div');
$player_image.classList.add('player-image');

$player_image.style.width = player_size + 'px';
$player_image.style.height = player_size + 'px';
$player_image.style.backgroundColor = player_color;

$player.appendChild($player_image);
document.body.appendChild($player);

function isColliding(playerRect, wallRect) {
  return (
    playerRect.left < wallRect.right &&
    playerRect.right > wallRect.left &&
    playerRect.top < wallRect.bottom &&
    playerRect.bottom > wallRect.top
  );
}

function checkCollision(dx, dy) {
  const playerRect = $player_image.getBoundingClientRect();
  const newPlayerRect = {
    left: playerRect.left + dx,
    right: playerRect.right + dx,
    top: playerRect.top + dy,
    bottom: playerRect.bottom + dy
  };

  for (const wall of walls) {
    if (isColliding(newPlayerRect, wall.$wall.getBoundingClientRect())) {
      return true;
    }
  }
  return false;
}

function movePlayer(dx, dy) {
  if (!checkCollision(dx, dy)) {
    player_coor.x += dx;
    player_coor.y += dy;
    $player.style.transform = `translate(${player_coor.x}px, ${player_coor.y}px)`;
  }
}

document.addEventListener('keydown', (event) => {
    key_states[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    key_states[event.key] = false;
});

function gameLoop() {

    if (key_states['ArrowUp']) {
        
        movePlayer(0, -player_speed);
    }
    if (key_states['ArrowDown']) {
        movePlayer(0, player_speed);
    }
    if (key_states['ArrowLeft']) {
        movePlayer(-player_speed, 0);
    }
    if (key_states['ArrowRight']) {
        movePlayer(player_speed, 0);
    }

    
}

const gameloop_timer = setInterval(gameLoop, 1000 / 60);

let rooms = [];
for(let a = 0; a < 2; a++){
    rooms[a] = [];
    for(let b = 0; b < 1; b++){
        rooms[a][b] = new Room(a, b, wall_datas);
    }
}

rooms[0][0].showWalls();