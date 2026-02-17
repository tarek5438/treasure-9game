const level = document.getElementById('level');
const hearts = document.getElementById('hearts');
const boxes = document.getElementById('boxes');
const statusText = document.getElementById('status');
const reset = document.getElementById('reset');

let gameOver = false;
let currentLevel = 1;
let lives = 3;
let treasureIndex = 0;
reset.style.display = 'none';
function generateBoxes(x) {
    lives = 3;
    hearts.innerText = '💖'.repeat(lives);
    level.innerText = `Level = ${currentLevel}`;
    boxes.innerHTML = '';
    statusText.innerText = '';
    gameOver = false;
    treasureIndex = Math.floor(Math.random() * x);
    for (let i=0; i<x; i++) {
        // creating a new box inside boxes.
        const box = document.createElement('img');
        // give each box an index number.
        box.dataset.index = i
        box.src = 'files/box_closed.png';
        // add class to each box.
        box.classList.add('box');
        box.addEventListener('click', boxClick)
        boxes.appendChild(box);
    }
}

function boxClick(event) {
    if (gameOver == true) return;
    const boxClicked = event.currentTarget;
    const boxClickedIndex = Number(boxClicked.dataset.index);
    if (boxClickedIndex === treasureIndex){
        boxClicked.src ='files/win_box.png';
        statusText.innerText = 'You Win';
        statusText.style.color = 'green';
        currentLevel++;
        gameOver = true;

        setTimeout( () => {
            generateBoxes(currentLevel+1)
        }, 3000)

    } else {
        lives--;
        hearts.innerText = '💖'.repeat(lives);
        if (lives == 0){
            statusText.innerText = 'You Lost';
            statusText.style.color = 'red';
            gameOver = true;
            reset.style.display = '';
        }
        boxClicked.src ='files/lose_box.png';
        
    }

}

reset.addEventListener('click', () => {
    generateBoxes(2);
    reset.style.display = 'none';
    currentLevel = 1;
})

generateBoxes(2);

