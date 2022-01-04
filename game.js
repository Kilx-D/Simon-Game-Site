let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let userClickedPattern = [];
let gamePattern = [];
let gameOver = false;

function animatePress(currentColor) {
    $(`#${currentColor}`).fadeOut(70).addClass("pressed").fadeIn(70);
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed")
    }, 100);
}

function playSound(name) {
    switch (name) {
        case "yellow":

            let yellow = new Audio("sounds/yellow.mp3");

            yellow.play();
            break;
        case "green":
            let green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "blue":
            let blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "red":
            let red = new Audio("sounds/red.mp3");
            red.play();
            break;
        default:
            console.log(name);
    }
}

function startOver(){
    level = 0;
    gamePattern = 0;

}

function checkAnswer(currentLevel){
    console.log(userClickedPattern);
    console.log(gamePattern);
    console.log(userClickedPattern[currentLevel], gamePattern[currentLevel]);
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("success");
    }else {
        gameOver = true;
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        let wrong = new Audio("sounds/wrong.mp3");
        startOver();
        $(".btn").off();
        wrong.play();
        setTimeout(function(){$("body").removeClass("game-over")}, 200);

        $("body").keydown(function(){
            window.location.reload();
        });
    }
}

function nextSequence() {
    userClickedPattern = [];
    $("h1").text(`Level ${level}`);
    var randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    level++;
    return randomNumber;
}



$("body").on("keydown", function (key) {

    $("body").off();

    nextSequence();
    


    $(".btn").on("click", function (e) {
        let userChosenColor = this.getAttribute("id");
        
        playSound(userChosenColor);
        animatePress(userChosenColor);
        userClickedPattern.push(userChosenColor);
        checkAnswer(userClickedPattern.indexOf(userChosenColor));
        
        
        if(!gameOver){
            setTimeout(nextSequence, 1000);    
        }
        
    });


});
