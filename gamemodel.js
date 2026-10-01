
//Lucas Fernandes
//game borders
let gameBox = document.querySelector("#gameSection"); //svg game window
let width = gameBox.getAttribute("width"); //window width
let height = gameBox.getAttribute("height"); //window height
//player positions and directions
let player = document.querySelector("#player");
let playerX = parseInt(player.getAttribute("x"));
let playerY = parseInt(player.getAttribute("y"));
let playerW = parseInt(player.getAttribute("width")); //player width, height doesnt matter as its a square
//original player positions for reset
let playerOriginalX = playerX;
let playerOriginalY = playerY;
//directions speed set to zero
let playerDirX = 0;
let playerDirY = 0;
let colorChoice = document.querySelector("#colorInput").innerText
//enemys
let enemies = [document.querySelector("#squareX1"), document.querySelector("#squareX2"), document.querySelector("#squareX3"), document.querySelector("#squareX4"), document.querySelector("#squareX5"), document.querySelector("#squareX6")]
let enemyWidth = parseInt(enemies[0].getAttribute("width")); //width constant to all enemies and all sides equal, not height required
//directions and original positions are arrays so individual enemies can have unique start points and movement directions
let directionsX = [];
let directionsY = [];
let enemyOringinalX = [];
let enemyOringinalY = [];
let startGame = false; //checks when to begin movement
let svg = document.querySelector("svg") //actual svg section
let time = 10; //timer for ingame reset
let timer = document.querySelector("#timer") //actual timer html element
timer.innerHTML = "Time Left: " + time //updates to current time left. 
let timeUpCount = 0;
let timeUpCountDisplay = document.querySelector("#timeUpDisplay")
//elements that increase timer count creation
svgNS = "http://www.w3.org/2000/svg";
let timeUps = [] //time up rectangle elements that increase time limit when player element collides with them
//initializes all timeUpElements and appends them to the game window
for (let i = 0; i < 4; i++) {
    timeUps[i] = document.createElementNS(svgNS, "rect");
    timeUps[i].setAttribute("x", Math.random() * (width - 100) + 50)
    timeUps[i].setAttribute("y", Math.random() * (height - 100) + 50)
    timeUps[i].setAttribute("fill", "yellow")
    timeUps[i].setAttribute("width", 25)
    timeUps[i].setAttribute("height", 25)
    gameBox.appendChild(timeUps[i])
}
//initializes all enemy direction speeds to 0 and takes their original positions
for (let i = 0; i < enemies.length; i++) {
    //initializes zero before game movement. 
    directionsX[i] = 0;
    directionsY[i] = 0;
    //records all original x and y positions for game reset. 
    enemyOringinalX[i] = parseInt(enemies[i].getAttribute("x"));
    enemyOringinalY[i] = parseInt(enemies[i].getAttribute("y"));
}

/**
* takes user keyboard input and sets player direction accordingly
*
* @param {event} event //the key click event
* @returns nothing
*/
document.addEventListener("keydown", function (event) {
    //if control pressed player element moves in that direction, Snake style constant movement and one direction at a time
    if(startGame == true)
    {
        if (event.key === "s") {

        playerDirY = 1;
        playerDirX = 0;
    }
    if (event.key === "a") {

        playerDirX = -1;
        playerDirY = 0;
    }
    if (event.key === "d") {

        playerDirX = 1;
        playerDirY = 0;
    }
    if (event.key === "w") {
        playerDirX = 0;
        playerDirY = -1;
    }
    }
    
    
}); //specific key event input syntax learned from https://www.w3schools.com/js/js_events_keyboard.asp

/**
* deletes and creates a timeUp every time theres a collision
*
* @param {number} i //the index of the timeUp that the user collided with.
* @returns nothing
*/
function replaceTimeUp(i) //function called in a for loop
{
    time += 1; //increases timer by 1
    timeUpCount +=1; 
    timeUpCountDisplay.innerHTML = "Time Ups Collected: " + timeUpCount
    timer.innerHTML = "Time Left: " + time //updates html timer
    gameBox.removeChild(timeUps[i]) //removes collided timeUp
    //generates new time up
    timeUps[i] = document.createElementNS(svgNS, "rect");
    timeUps[i].setAttribute("x", Math.random() * (width - 100) + 50)
    timeUps[i].setAttribute("y", Math.random() * (height - 100) + 50)
    timeUps[i].setAttribute("fill", "yellow")
    timeUps[i].setAttribute("width", 25)
    timeUps[i].setAttribute("height", 25)
    //adds new time up to game window
    gameBox.appendChild(timeUps[i])
}

/**
* checks for player element collision with all enemies and or timeUPs and calls functions accordingly
* checks through each corner of none player elements.
* @param nothing
* @returns nothing
*/
setInterval(function () {
    //player collision with enemies
    for (let i = 0; i < enemies.length; i++) {
        let enemyX = parseInt(enemies[i].getAttribute("x"));
        let enemyY = parseInt(enemies[i].getAttribute("y"));
        if ((enemyX >= playerX && enemyX <= playerX + playerW) && ((enemyY >= playerY && enemyY <= playerY + playerW))) //top left corner
        {
            resetGame(); //if contact with any enemies you lose and game restarts
        }
        if ((enemyX + enemyWidth >= playerX && enemyX + enemyWidth <= playerX + playerW) && ((enemyY >= playerY && enemyY <= playerY + playerW))) //top right corner
        {
            resetGame();
        }
        if ((enemyX >= playerX && enemyX <= playerX + playerW) && (enemyY + enemyWidth >= playerY && enemyY + enemyWidth <= playerY + playerW)) //bottom left
        {
            resetGame();
        }
        if ((enemyX + enemyWidth >= playerX && enemyX + enemyWidth <= playerX + playerW) && (enemyY + enemyWidth >= playerY && enemyY + enemyWidth <= playerY + playerW)) //bottom right
        {
            resetGame();
        }
    }
    //player collision with time ups. 
    for (let i = 0; i < timeUps.length; i++) {
        let timeUpX = parseInt(timeUps[i].getAttribute("x"))
        let timeUpY = parseInt(timeUps[i].getAttribute("y"))
        let timeUpWidth = parseInt(timeUps[i].getAttribute("width"))
        if ((timeUpX >= playerX && timeUpX <= playerX + playerW) && ((timeUpY >= playerY && timeUpY <= playerY + playerW))) //top left corner
        {
            replaceTimeUp(i) //collision results in function to delete, recreat and push to game window and increase timer. 
        }
        if ((timeUpX + timeUpWidth >= playerX && timeUpX + timeUpWidth <= playerX + playerW) && ((timeUpY >= playerY && timeUpY <= playerY + playerW))) //top right corner
        {
            replaceTimeUp(i)
        }
        if ((timeUpX >= playerX && timeUpX <= playerX + playerW) && (timeUpY + timeUpWidth >= playerY && timeUpY + timeUpWidth <= playerY + playerW)) { //bottom left
            replaceTimeUp(i)
        }
        if ((timeUpX + timeUpWidth >= playerX && timeUpX + timeUpWidth <= playerX + playerW) && (timeUpY + timeUpWidth >= playerY && timeUpY + timeUpWidth <= playerY + playerW)) { //bottom right
            replaceTimeUp(i)
        }
    }

}, 1)
/**
* resets game by setting all speeds/directions to zero and placing all svg elemens save time ups into their original places
* also resets the timer.
* @param nothing
* @returns nothing
*/
function resetGame() {
    //resets enemies
    for (let i = 0; i < enemies.length; i++) {
        //stops movement
        directionsX[i] = 0;
        directionsY[i] = 0;
        //resets all enemy positions to their original spots
        enemies[i].setAttribute("x", enemyOringinalX[i]);
        enemies[i].setAttribute("y", enemyOringinalY[i]);

    }
    //resets player position and speed
    playerX = playerOriginalX;
    playerY = playerOriginalY;
    playerDirX = 0;
    playerDirY = 0;
    player.setAttribute("x", playerX);
    player.setAttribute("y", playerY);
    //resets timer and startgame freeze. 
    startGame = false; //allows for a pause in game speed until any keydown event is pressed to restart game. 
    time = 10;
    timer.innerHTML = "Time Left: " + time
    //resets score
    timeUpCount = 0;
    timeUpCountDisplay.innerHTML = "Time Ups Collected: " + timeUpCount
    clearInterval(timerInterval)
}

/**
* checks for player border collision and swaps direction if true
*
* @param nothing
* @returns nothing
*/
let playerDirectionInterval = setInterval(function () {
    //border collision diverts to opposite direction
    if (playerX <= width - width) {
        playerDirX = 2;
    }
    if (playerX + playerW >= width) {
        playerDirX = -2;
    }
    if (playerY <= height - height) {
        playerDirY = 2;
    }
    if (playerY + playerW >= height) {
        playerDirY = -2;
    }
    //increases and sets player positions
    playerX += playerDirX;
    playerY += playerDirY;
    player.setAttribute("y", playerY);
    player.setAttribute("x", playerX);

}, 3)

/**
* checks for enemy border collision and swaps direction if true
* only changes speed when collides with border
* @param nothing
* @returns nothing
*/
let enemyMovementInterval = setInterval(function () {

    for (let i = 0; i < enemies.length; i++) //does it for every enemy
    {
        let enemyX = parseInt(enemies[i].getAttribute("x"));
        let enemyY = parseInt(enemies[i].getAttribute("y"));
        let speed = parseInt(Math.random() * 2 + 1); //speed only changes during collision
        //border control for each enemy
        if (enemyX <= 0) {
            directionsX[i] = speed;
        }
        if (enemyX + enemyWidth >= width) {
            directionsX[i] = -speed;
        }
        if (enemyY <= 0) {
            directionsY[i] = speed;
        }
        if (enemyY + enemyWidth >= height) {
            directionsY[i] = -speed;
        }
        //calcuates and sets enemy x and y positions
        enemyX += directionsX[i];
        enemies[i].setAttribute("x", enemyX);
        enemyY += directionsY[i];
        enemies[i].setAttribute("y", enemyY);
    }


}, 15)


/**
* stars game and timer interval when any key is pressed, once game starts
* check boolean set to true so its not tiggered after every key press. 
* @param nothing
* @returns nothing
*/
svg.addEventListener("click", function () //only starts enemy movement after svg is pressed
{
    if (startGame == false) {
        for (let i = 0; i < enemies.length; i++) {
            let rand = parseInt(Math.random() * 4);
            if (rand == 0) {
                directionsX[i] = 1;
                directionsY[i] = 1;
            }
            if (rand == 1) {
                directionsX[i] = 1;
                directionsY[i] = -1;
            }
            if (rand == 2) {
                directionsX[i] = -1;
                directionsY[i] = 1;
            }
            if (rand == 3) {
                directionsX[i] = -1;
                directionsY[i] = -1;
            }


        }
        //timer that resets game if time runs out. 
        /**
         * this function counts down until timer is less than 0, when it then calls that reset game as you lose.
         */
        timerInterval = setInterval(function () //needs to be global as its declared here but manipulated elsewhere.
        {
            timer.innerHTML = "Time Left: " + time
            if (time < 0) {
                resetGame() //if timer is less than 0, you lose, game restarts.
            }
            time -= 1
        }, 700)
        //user color options
        colorChoice = document.querySelector("#colorInput").value
        if(colorChoice == "t")
        {
            player.setAttribute("fill", "turquoise")
        }
        else if(colorChoice == "o")
        {
            player.setAttribute("fill", "orange")
        }
        else if(colorChoice == "g")
        {
            player.setAttribute("fill", "green")
        }
        else 
        {
            player.setAttribute("fill", "white")
        }
      
        startGame = true; //causes the game and intervals to intialize only once one key is pressed. 
    }
})


