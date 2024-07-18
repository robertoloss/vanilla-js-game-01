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
    top: 56 * 8,
    left: 56 * 2,
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
function renderPlayer() {
    const playerDiv = document.createElement('div');
    playerDiv.id = 'player';
    playerDiv.style.position = 'absolute';
    playerDiv.style.top = `${player.position.top}px`;
    playerDiv.style.left = `${player.position.left}px`;
    if (gameScreen)
        gameScreen.appendChild(playerDiv);
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
            console.log('Arrow Up pressed');
            break;
        case 'ArrowDown':
            console.log('Arrow Down pressed');
            break;
        case 'ArrowLeft':
            movePlayer('horizontal', -2);
            console.log('Arrow Left pressed');
            break;
        case 'ArrowRight':
            movePlayer('horizontal', 2);
            console.log('Arrow Right pressed');
            break;
        case 'x':
            console.log('X pressed');
            break;
        default:
            console.log('Other key pressed');
    }
}
window.addEventListener('keyup', listenerKeyUp);
function listenerKeyUp(event) {
    switch (event.key) {
			case 'ArrowUp':
				console.log('Arrow Up pressed');
				break;
			case 'ArrowDown':
				console.log('Arrow Down pressed');
				break;
			case 'ArrowLeft':
				console.log('Arrow Left pressed');
				break;
			case 'ArrowRight':
				movePlayer('horizontal', 2);
				console.log('Arrow Right pressed');
				break;
			case 'x':
				console.log('X pressed');
				break;
			default:
				console.log('Other key pressed');
    }
}

function animate() {
	window.requestAnimationFrame(animate);
	
	player.position = {
		top: player.position.top += player.speed.vertical,
		left: player.position.left += player.speed.horizontal
	}



	gameScreen.innerHTML = '';
	const emptyCanvas = document.createElement('div');
	emptyCanvas.style.width = '100%';
	emptyCanvas.style.height = '100%';
	emptyCanvas.style.backgroundColor = 'black';
	gameScreen.appendChild(emptyCanvas);
	tilesArray.forEach(tile => gameScreen.appendChild(tile));
	renderPlayer();
}
animate();
