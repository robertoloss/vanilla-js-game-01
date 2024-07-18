const gameScreen = document.getElementById('game-screen');

// 15 width by 10 heights
const gameMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
const tilesArray = [];

const player = {
	position: {
    top: 0,
    left: 0,
	},
	speed: {
		vertical: 0,
		horizontal: 0
	}
};

function movePlayer(axis, increase) {
    player.speed[axis] += increase;
		console.log(player.speed)
    renderPlayer();
}
gameMap.forEach((row, y) => {
    row.forEach((tile, x) => {
        if (tile === 1) {
            const tileDiv = document.createElement('div');
            tileDiv.classList.add('tile');
            tileDiv.style.position = 'absolute';
            tileDiv.style.top = `${56 * y}px`;
            tileDiv.style.left = `${56 * x}px`;
            tilesArray.push(tileDiv);
        }
    });
});

let playerDiv = document.getElementById('player');

function renderPlayer() {
  if (!playerDiv.style.top) {
    playerDiv = document.createElement('div');
    playerDiv.id = 'player';
    playerDiv.style.position = 'absolute';
    playerDiv.style.top = `${player.position.top}px`;
    playerDiv.style.left = `${player.position.left}px`;
    gameScreen.appendChild(playerDiv);
  } else {
    playerDiv.style.transform = `translate(${player.position.left}px, ${player.position.top}px)`;
  }
}

if (gameScreen) {
  gameScreen.innerHTML = '';
  tilesArray.forEach(tile => gameScreen.appendChild(tile));
  renderPlayer();
}
window.addEventListener('keydown', listenerKeyDown);
function listenerKeyDown(event) {
	switch (event.key) {
		case 'ArrowUp':
			break;
		case 'ArrowDown':
			break;
		case 'ArrowLeft':
			player.speed.horizontal = -5;
			break;
		case 'ArrowRight':
			player.speed.horizontal = 5;
			break;
		case 'x':
			player.speed.vertical = -14;
			break;
		default:
			true
	}
}
window.addEventListener('keyup', listenerKeyUp);
function listenerKeyUp(event) {
	switch (event.key) {
		case 'ArrowUp':
			break;
		case 'ArrowDown':
			break;
		case 'ArrowLeft':
			if (player.speed.horizontal < 0) player.speed.horizontal = 0;
			break;
		case 'ArrowRight':
			if (player.speed.horizontal > 0) player.speed.horizontal = 0;
			break;
		case 'x':
			break;
		default:
			true
	}
}

function animate() {

  if (player.position.top < 448) {
    if (player.speed.vertical < 20) {
      player.speed.vertical += 1;
    }
  } else if (player.position.top > 448) {
    player.speed.vertical = 0;
    player.position.top = 448;
  }

  player.position.top += player.speed.vertical;
  player.position.left += player.speed.horizontal;

  renderPlayer();
  window.requestAnimationFrame(animate);
}

animate();
