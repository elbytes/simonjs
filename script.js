var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPatterns = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function(){
    var userChosenColor = this.id;
    playSounds(userChosenColor);
    userClickedPatterns.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPatterns.length-1);
 });


function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber =  Math.floor(Math.random() *4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#"+ randomColor).fadeOut(100).fadeIn(100);
    playSounds(randomColor);
    
}

function playSounds(name){
    const buttonSound = new Audio("sounds/" + name + ".mp3");
    buttonSound.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(()=>{
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPatterns[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPatterns.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPatterns=[];
        }
    } else{
        var failSound = new Audio("sounds/wrong.mp3");
        failSound.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over\n Press Any Key to Restart!");
            $(document).keypress(startOver());
        }
}

function startOver(){
    level =0;
    gamePattern=[];
    userClickedPatterns=[];
    started=false;
}







